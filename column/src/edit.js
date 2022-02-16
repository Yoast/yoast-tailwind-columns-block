/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { useSelect } from '@wordpress/data';

const Edit = ( {
	attributes: {
		colSpan,
		colStart,
		colEnd,
	},
	setAttributes,
	clientId,
	context: { numberOfInnerBlocks, useGrid, gridColumns },
} ) => {

	// Default colSpan to half the total columns width,
	// and max to the total columns width (default is 6).
	colSpan = colSpan || Math.floor( gridColumns / 2 );
	colSpan = Math.min( colSpan, gridColumns );
	colEnd  = colStart + colSpan; 

	if ( ! useGrid ) {
		setAttributes( {
			colStart: undefined,
			colEnd: undefined,
			colSpan: undefined,
		} );
	}

	const classes = classnames( {
		[ `yst-col-start-${ colStart }` ]: colStart,
		[ `yst-col-span-${ colSpan }` ]: colSpan,
		[ `yst-col-end-${ colEnd }` ]: colEnd,
	} );

	const { hasChildBlocks } = useSelect(
		( select ) => {
			const { getBlockOrder } = select(
				blockEditorStore
			);

			return {
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
			};
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);
	return (
		<>
			<InspectorControls>
				{ useGrid && (
					<PanelBody title={ __( 'Column settings' ) }>
						<RangeControl
							label={ __( 'Span' ) }
							onChange={ ( nextVal ) => {
								setAttributes( { colSpan: nextVal } );
							} }
							min={ 1 }
							max={ colStart === 1 || ! colStart ? gridColumns : gridColumns - colStart }
							initialPosition={ colSpan }
							value={ colSpan }
						/>
						<RangeControl
							label={ __( 'Start' ) }
							onChange={ ( nextVal ) => {
								setAttributes( { colStart: nextVal } );
							} }
							min={ 1 }
							max={ gridColumns }
							initialPosition={ colStart }
							value={ colStart }
						/>							
					</PanelBody>
				) }
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
};
export default Edit;
