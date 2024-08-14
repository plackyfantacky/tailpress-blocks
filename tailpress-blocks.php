<?php
/**
 * Plugin Name:       Tailpress Blocks
 * Description:       Various blocks to use with Tailpress Theme.
 * Requires at least: 6.6
 * Requires PHP:      8.2
 * Version:           0.1.0
 * Author:            Adam Trickett
 * License:           LGPLv2 or later
 * Text Domain:       tailpress-blocks
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function tailpress_blocks_block_init() {
	register_block_type(__DIR__ . '/build/link');
    register_block_type(__DIR__ . '/build/inline-svg');
}
add_action( 'init', 'tailpress_blocks_block_init' );

function tailpress_blocks_block_categories_all($categories, $editorContext) {
    if(empty($editorContext->post)) {
        return $categories;
    }
    return array_merge(
        array(
            array(
                'slug' => 'tailpress-blocks',
                'title' => __('Tailpress Blocks', 'tailpress-blocks'),
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'tailpress_blocks_block_categories_all', 10, 2);


/**
 * function tailpress_blocks_action_init() {
 *        $build_dir = get_parent_theme_file_path('/blocks');
 *       foreach (scandir($build_dir) as $result ) {
 *           $block_location = $build_dir . '/' . $result;
 *           if ( ! is_dir( $block_location ) || '.' === $result || '..' === $result ) {
 *               continue;
 *           }
 *           $block = register_block_type($block_location);
 *       }
 *   }
 *
 */
