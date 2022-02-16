/**
 * External dependencies
 */
import classnames from 'classnames';

 /**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes, context } ) => {
	const { colStart, colSpan, colEnd } = attributes
	const useGrid = context
	const classes = classnames( {
		[ `yst-col-start-${ colStart }` ]: colStart,
		[ `yst-col-span-${ colSpan }` ]: colSpan && useGrid, // Only use the default value for grid layouts.
		[ `yst-col-end-${ colEnd }` ]: colEnd,
	} ); 

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
};
export default Save;
