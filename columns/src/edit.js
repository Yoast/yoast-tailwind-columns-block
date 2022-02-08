/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'yoast/column' ];

const Edit = () => {
	const blockProps = useBlockProps( {
		className: [
			'yst-grid',
		],
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
		</div>
	);
};
export default Edit;
