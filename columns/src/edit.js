/**
 * External dependencies
 */
 import classnames from 'classnames';
 import { dropRight, times } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Notice,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	withDispatch,
	useSelect,
} from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

const ALLOWED_BLOCKS = [ 'yoast/column' ];

function YoastColumnsEditContainer( { attributes, setAttributes, clientId, updateColumns, } ) {
	const { columns, layoutSwitch, flexDirection, smallScreenFlexDirection, flexWrap } = attributes;

	const { count } = useSelect(
		( select ) => {
			return {
				count: select( blockEditorStore ).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `yst-grid-cols-${ columns }` ]: columns,
			'yst-flex': ! layoutSwitch,
			'yst-grid': layoutSwitch,
			'yst-flex-wrap': ! layoutSwitch && flexWrap,
			'yst-flex-nowrap': ! layoutSwitch && ! flexWrap,
			'yst-flex-row': ! layoutSwitch && flexDirection == 'row',
			'yst-flex-row-reverse': ! layoutSwitch && flexDirection == 'row-reverse',
			'yst-flex-col': ! layoutSwitch && flexDirection == 'column',
			'yst-flex-col-reverse': ! layoutSwitch && flexDirection == 'column-reverse',
		} )
	} );

	const TEMPLATE = [
		[ 'yoast/column' ],
		[ 'yoast/column' ],
		[ 'yoast/column' ],
	];

	// Direction options for the flex-direction property.
	const flexDirections = [
		{ label: __( 'Row' ), value: 'row' },
		{ label: __( 'Column' ) , value: 'column' },
		{ label: __( 'Row reverse' ) , value: 'row-reverse' },
		{ label: __( 'Column reverse' ) , value: 'column-reverse' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Columns' ) }>
					<RangeControl
						value={ count }
						onChange={ ( value ) => {
							setAttributes( { columns: value } );
							updateColumns( count, value );
						} }

						min={ 1 }
						max={ Math.max( 12, count ) }// Default max Tailwind columns is 12.
					/>
					{ count > 12 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'This column count exceeds the recommended amount and may cause visual breakage.'
							) }
						</Notice>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Layout' ) }>
					<ToggleControl
						label={ __( 'Enable grid' ) }
						checked={ layoutSwitch }
						onChange={ () =>
							setAttributes( {
								layoutSwitch: ! layoutSwitch, // False / unchecked represents "display: flex"
							} )
						}
						help={ __( 'Default is flex. Enable to use CSS grid.' ) }
					/>
				</PanelBody>
					{ ! layoutSwitch && (
						<PanelBody title={ __( 'Flex settings' ) }>
							<SelectControl
								label={ 'Flex Direction' }
								options={ flexDirections }
								value={ flexDirection }
								onChange={ ( value ) =>
									setAttributes( { flexDirection: value } )
								}
							>
							</SelectControl>
							<SelectControl
								label={ 'Small Screen Flex Direction' }
								options={ flexDirections }
								value={ smallScreenFlexDirection }
								onChange={ ( value ) =>
									setAttributes( { smallScreenFlexDirection: value } )
								}
							>
							</SelectControl>
							<ToggleControl
								label={ __( 'Wrap' ) }
								checked={ flexWrap }
								onChange={ () =>
									setAttributes( {
										flexWrap: ! flexWrap, // False / unchecked represents "nowrap"
									} )
								}
								help={ __( 'Disable to use "nowrap".' ) }
							/>
						</PanelBody>
					) }
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE }/>
			</div>
		</>
	);
}

const YoastColumnsEditContainerWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		/**
		 * Updates the column count.
		 *
		 * @param {number} previousColumns Previous column count.
		 * @param {number} newColumns      New column count.
		 */
		updateColumns( previousColumns, newColumns ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );
			const { getBlocks } = registry.select( blockEditorStore );
			let innerBlocks = getBlocks( clientId );
			const isAddingColumn = newColumns > previousColumns;

			if ( isAddingColumn ) {
				innerBlocks = [
					...innerBlocks,
					...times( newColumns - previousColumns, () => {
						return createBlock( 'yoast/column' );
					} ),
				];
			} else {
				// The removed column will be the last of the inner blocks.
				innerBlocks = dropRight(
					innerBlocks,
					previousColumns - newColumns
				);
			}

			replaceInnerBlocks( clientId, innerBlocks );
		},
	} )
)( YoastColumnsEditContainer );

const YoastColumnsEdit = ( props ) => {
	return <YoastColumnsEditContainerWrapper { ...props } />;
};
export default YoastColumnsEdit;
