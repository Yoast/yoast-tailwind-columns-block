<?php

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function yoast_content_areas_block_container() {
	// Register the block by passing the location of block.json to register_block_type.
	register_block_type( __DIR__ );
}
add_action( 'init', 'yoast_content_areas_block_container' );
