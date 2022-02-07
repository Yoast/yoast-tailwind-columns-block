/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'yoast/column' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { columns, layoutSwitch, flexDirection, breakpointDirection, flexWrap } = attributes;

	const blockProps = useBlockProps( {
		className: classnames( {
			'yoast-column-is-flex': ! layoutSwitch,
			'yoast-column-is-grid': layoutSwitch,
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
			// 'flex-direction': ! layoutSwitch && breakpointDirection ? breakpointDirection : undefined,
			'flex-wrap': ! layoutSwitch && flexWrap ? 'wrap' : ! layoutSwitch && ! flexWrap ? 'nowrap' : undefined,
		},
	} );

	// Just a placeholder.
	const TEMPLATE = [
		[ 'yoast/column' ],
		[ 'yoast/column' ],
		[ 'yoast/column' ],
	];
	
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Columns' ) }>
					<RangeControl
						min={ 1 }
						max={ 12 } // Default max Tailwind columns is 12.
					/>
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
					/>
				</PanelBody>
					{ ! layoutSwitch && (
						<PanelBody title={ __( 'Flex settings' ) }>
							<SelectControl
								label={ 'Flex Direction' }
								options={ [
									{ label: __( 'Row' ), value: 'row' },
									{ label: __( 'Column' ) , value: 'column' },
									{ label: __( 'Row reverse' ) , value: 'row-reverse' },
									{ label: __( 'Column reverse' ) , value: 'column-reverse' },
								] }
								value={ flexDirection }
								onChange={ ( value ) =>
									setAttributes( { flexDirection: value } )
								}
							>
							</SelectControl>
							<SelectControl
								label={ 'Breakpoint Flex Direction' }
								options={ [
									{ label: __( 'Row' ), value: 'row' },
									{ label: __( 'Column' ) , value: 'column' },
									{ label: __( 'Row reverse' ) , value: 'row-reverse' },
									{ label: __( 'Column reverse' ) , value: 'column-reverse' },
								] }
								value={ breakpointDirection }
								onChange={ ( value ) =>
									setAttributes( { breakpointDirection: value } )
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