/**
 * External dependencies
 */
import classnames from 'classnames';

 /**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const { colStart, colSpan } = attributes
	const classes = classnames( {
		[ `yst-col-start-${ colStart }` ]: colStart,
		[ `yst-col-span-${ colSpan }` ]: colSpan,
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
