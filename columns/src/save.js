/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const { columns, layoutSwitch, flexDirection, smallScreenFlexDirection, flexWrap  } = attributes;
	const classes = classnames( {
		[ `yst-grid-cols-${ columns }` ]: columns,
		'yst-flex': ! layoutSwitch,
		'yst-grid': layoutSwitch,
		'yst-flex-wrap': ! layoutSwitch && flexWrap,
		'yst-flex-nowrap': ! layoutSwitch && ! flexWrap,
		'yst-flex-row': ! layoutSwitch && flexDirection == 'row',
		'yst-flex-row-reverse': ! layoutSwitch && flexDirection == 'row-reverse',
		'yst-flex-col': ! layoutSwitch && flexDirection == 'column',
		'yst-flex-col-reverse': ! layoutSwitch && flexDirection == 'column-reverse',
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
