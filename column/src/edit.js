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
	CheckboxControl,
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
} ) => {
	colSpan = colSpan || 12;

	const onCustomizeStartEnd = ( val ) => {
		if ( colStart && colEnd ) {
			setAttributes( {
				colStart: undefined,
				colEnd: undefined,
			} );
		} else {
			setAttributes( {
				colStart: 1,
				colEnd: 13,
			} );
		}
	};

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
				<PanelBody title={ __( 'Column settings' ) }>
					<RangeControl
						label={ __( 'Span' ) }
						onChange={ ( nextVal ) => {
							setAttributes( { colSpan: nextVal } );
						} }
						min={ 1 }
						max={ 12 }
						initialPosition={ colSpan }
						value={ colSpan }
					/>
					<CheckboxControl
						label={ __( 'Customize Start/End props' ) }
						checked={ colStart || colEnd }
						onChange={ onCustomizeStartEnd }
					/>
					{ colStart && (
						<RangeControl
							label={ __( 'Start' ) }
							onChange={ ( nextVal ) => {
								setAttributes( { colStart: nextVal } );
							} }
							min={ 1 }
							max={ 12 }
							initialPosition={ colStart }
							value={ colStart }
						/>
					) }
					{ colEnd && (
						<RangeControl
							label={ __( 'End' ) }
							onChange={ ( nextVal ) => {
								setAttributes( { colEnd: nextVal } );
							} }
							min={ 1 }
							max={ 13 }
							initialPosition={ colEnd }
							value={ colEnd }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
};
export default Edit;
