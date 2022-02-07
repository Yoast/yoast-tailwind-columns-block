/**
 * External dependencies
 */
import classnames from 'classnames';

 /**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const { colStart, colSpan, colEnd } = attributes;
	const classes = classnames( {
		[ `col-start-${ colStart }` ]: colStart,
		[ `col-span-${ colSpan }` ]: colSpan,
		[ `col-end-${ colEnd }` ]: colEnd,
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
