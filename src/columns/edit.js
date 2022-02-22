/**
 * External dependencies
 */
 import classnames from 'classnames';
 import { dropRight, times } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
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

function YoastColumnsEditContainer( { attributes, setAttributes, clientId, updateColumns, updateGridColumnsCount } ) {
	const { useGrid, gap, flexDirection, smallScreenFlexDirection, flexWrap, gridColumns } = attributes;

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
			[ `yst-grid-cols-${ gridColumns }` ]: gridColumns,
			'yst-flex': ! useGrid,
			'yst-grid': useGrid,
			[ `yst-gap-${ gap }` ]: gap,
			'yst-flex-wrap': ! useGrid && flexWrap,
			'yst-flex-nowrap': ! useGrid && ! flexWrap,
			'yst-flex-row': ! useGrid && flexDirection == 'row',
			'yst-flex-row-reverse': ! useGrid && flexDirection == 'row-reverse',
			'yst-flex-col': ! useGrid && flexDirection == 'column',
			'yst-flex-col-reverse': ! useGrid && flexDirection == 'column-reverse',
		} )
	} );

	const TEMPLATE = [
		[ 'yoast/column' ],
		[ 'yoast/column' ],
		[ 'yoast/column' ],
	];

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
	} );

	// Direction options for the flex-direction property.
	const flexDirections = [
		{ label: __( 'Row' ), value: 'row' },
		{ label: __( 'Column' ) , value: 'column' },
		{ label: __( 'Row reverse' ) , value: 'row-reverse' },
		{ label: __( 'Column reverse' ) , value: 'column-reverse' },
	];

	// Tailwind gap options. See https://tailwindcss.com/docs/gap
	const gapOptions = [
		{ label: __( 'auto' ), value: 'auto' },
		{ label: __( '1' ) , value: '1' },
		{ label: __( '2' ) , value: '2' },
		{ label: __( '3' ) , value: '3' },
		{ label: __( '4' ) , value: '4' },
		{ label: __( '5' ) , value: '5' },
		{ label: __( '6' ) , value: '6' },
		{ label: __( '8' ) , value: '8' },
		{ label: __( '10' ) , value: '10' },
		{ label: __( '12' ) , value: '12' },
		{ label: __( '16' ) , value: '16' },
		{ label: __( '20' ) , value: '20' },
		{ label: __( '24' ) , value: '24' },
		{ label: __( '32' ) , value: '32' },
		{ label: __( '40' ) , value: '40' },
		{ label: __( '48' ) , value: '48' },
		{ label: __( '56' ) , value: '56' },
		{ label: __( '64' ) , value: '64' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Number of inner blocks:' ) }
						value={ count }
						onChange={ ( value ) => {
							updateColumns( count, value );
						} }

						min={ 1 }
						max={ Math.max( 12, count ) } // Default max Tailwind columns is 12.
					/>
					{ count > 12 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'This count exceeds the recommended amount and may cause visual breakage.'
							) }
						</Notice>
					) }
					<SelectControl
						label={ 'Gap' }
						options={ gapOptions }
						value={ gap }
						onChange={ ( value ) =>
							setAttributes( { gap: value } )
						}
					>
					</SelectControl>
					<ToggleControl
						label={ __( 'Enable grid' ) }
						checked={ useGrid }
						onChange={ () =>
							setAttributes( {
								useGrid: ! useGrid, // False / unchecked represents "display: flex"
							} )
						}
						help={ __( 'Default is flex. Enable to use CSS grid.' ) }
					/>
				</PanelBody>
					{ ! useGrid && (
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
					{ useGrid && (
						<PanelBody title={ __( 'Grid settings' ) }>
							<RangeControl
								label={ __( 'Grid Columns' ) }
								onChange={ ( nextVal ) => {
									updateGridColumnsCount( gridColumns, nextVal, count );
									setAttributes( { gridColumns: nextVal } );
								} }
								min={ 1 }
								max={ 12 }
								initialPosition={ 12 }
								value={ gridColumns }
							/>
						</PanelBody>
					) }
			</InspectorControls>
			<div { ...innerBlocksProps } />
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

		/**
		 * Updates the grid-column count.
		 *
		 * @param {number} previousColumns Previous column count.
		 * @param {number} newColumns      New column count.
		 */
		 updateGridColumnsCount( oldVal, newVal, count ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );
			const { updateBlockAttributes } = dispatch( blockEditorStore );
			const { getBlocks } = registry.select( blockEditorStore );
			let innerBlocks = getBlocks( clientId );

			innerBlocks.forEach( ( block, index ) => {
				// Figure out the colSpan.
				let colSpan = ! block?.attributes?.colSpan
					? Math.floor( newVal / count )
					: Math.floor( block.attributes.colSpan * oldVal / newVal );

				// Figure out the colStart.
				let colStart = 0 === index ? 1 : Math.min(
					innerBlocks[ index - 1 ].attributes.colStart + innerBlocks[ index - 1 ].attributes.colSpan,
					newVal
				);

				updateBlockAttributes( block.clientId, {
					colSpan,
					colStart,
				} );
			} );

			replaceInnerBlocks( clientId, innerBlocks );
		},
	} )
)( YoastColumnsEditContainer );

const YoastColumnsEdit = ( props ) => {
	return <YoastColumnsEditContainerWrapper { ...props } />;
};
export default YoastColumnsEdit;
