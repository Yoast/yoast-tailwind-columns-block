<?php
/**
 * Plugin Name:       Yoast Columns
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.0.1
 * Author:            The Yoast Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       yoast-columns
 *
 * @package           yoast-columns
 */

 /**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function yoast_columns_blocks() {
	// Register the blocks by passing the location of block.json to register_block_type.
	register_block_type( __DIR__ . '/build/columns' );
	register_block_type( __DIR__ . '/build/column' );

	if ( function_exists( 'wp_enqueue_block_style' ) ) {
		wp_enqueue_block_style(
			'yoast/column',
			[
				'handle' => 'yoast-column-block-style',
				'src'    => plugins_url( 'build/style.min.css', __FILE__ ),
				'deps'   => [],
				'ver'    => time(), // ONLY FOR DEVELOPMENT.
				'path'   => __DIR__ . '/build/style.min.css',
			]
		);
	} else {
		// Register the styles used for the block.
		wp_register_style(
			'yoast-column-block-style',
			plugins_url( 'build/style.min.css', __FILE__ ),
			array(),
			time() // ONLY FOR DEVELOPMENT
		);
		wp_enqueue_style( 'yoast-tailwind-column-block-style' );
	}
}
add_action( 'init', 'yoast_columns_blocks' );
