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
			/*
			 * These class names need to be updated to match
			 * Yoast naming conventions and Tailwind.
			*/
			'yst-column-is-flex': ! layoutSwitch,
			'yst-column-is-grid': layoutSwitch,
		} ),
		/*
		 * I don't know if we want inline styles, but here they are.
		 * Note that in the editor the flex-direction and flex-wrap are
		 * converted to shorthand "flex-flow: column wrap".
		 */
		style: {
			'display': layoutSwitch ? 'grid' : 'flex',
			'flex-direction': ! layoutSwitch && flexDirection ? flexDirection : undefined,
			// I assume the breakpoint should be enabled by a CSS class.
			// 'flex-direction': ! layoutSwitch && smallScreenFlexDirection ? smallScreenFlexDirection : undefined,
			'flex-wrap': ! layoutSwitch && flexWrap ? 'wrap' : ! layoutSwitch && ! flexWrap ? 'nowrap' : undefined,
		},
	} );

	// Just a placeholder.
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
						onChange={ ( value ) => updateColumns( count, value ) }
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
		 * Updates the column count, including necessary revisions to child Column
		 * blocks to grant required or redistribute available space.
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
