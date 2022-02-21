/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const { useGrid, gap, flexDirection, smallScreenFlexDirection, flexWrap, gridColumns  } = attributes;
	const classes = classnames( {
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
	} );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return (
		<div { ...innerBlocksProps } />
	);
};
export default Save;
