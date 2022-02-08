<?php

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function yoast_tailwind_column_block() {
	// Register the block by passing the location of block.json to register_block_type.
	register_block_type( __DIR__ );

	// Register the script used for the block.
	wp_register_script(
		'yoast-tailwind-column-block',
		plugins_url( 'view.js', __FILE__ ),
		array(),
		time(), // ONLY FOR DEVELOPMENT
		true
	);

	wp_enqueue_script( 'yoast-tailwind-column-block' );

	if ( function_exists( 'wp_enqueue_block_style' ) ) {
		wp_enqueue_block_style(
			'yoast/column',
			[
				'handle' => 'yoast-tailwind-column-block-style',
				'src'    => plugins_url( 'build/style.min.css', __FILE__ ),
				'deps'   => [],
				'ver'    => time(), // ONLY FOR DEVELOPMENT.
				'path'   => __DIR__ . '/build/style.min.css',
			]
		);
	} else {
		// Register the styles used for the block.
		wp_register_style(
			'yoast-tailwind-column-block-style',
			plugins_url( 'build/style.min.css', __FILE__ ),
			array(),
			time() // ONLY FOR DEVELOPMENT
		);
		wp_enqueue_style( 'yoast-tailwind-column-block-style' );
	}
}
add_action( 'init', 'yoast_tailwind_column_block' );
