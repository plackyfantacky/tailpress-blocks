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

function tailpress_blocks_init() {
	register_block_type(__DIR__ . '/build/link');
    register_block_type(__DIR__ . '/build/inline-svg');
}
add_action( 'init', 'tailpress_blocks_init' );

function tailpress_block_categories_all($block_categories, $block_editor_context) {
    if (!($block_editor_context instanceof WP_Block_Editor_Context)) {
        return $block_categories;
    }

    return array_merge(
        array(
            array(
                'slug' => 'tailpress-blocks',
                'title' => __('Tailpress Blocks', 'tailpress-blocks'),
                'icon' => null,
            ),
        ),
        $block_categories
    );
}
add_filter('block_categories_all',  'tailpress_block_categories_all', 10, 2);

function tailpress_enqueue_editor_modifications() {
    $code_block_asset_file = include(plugin_dir_path(__FILE__) . 'build/code/code.asset.php');
    $code_block_js_file = plugins_url('build/code/code.js', __FILE__);
    wp_enqueue_script(
        'tailpress-code-block-modifications',
        $code_block_js_file,
        $code_block_asset_file['dependencies'],
        $code_block_asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'tailpress_enqueue_editor_modifications');

function tailpress_filter_block_output($block_content, $block) {
    if ($block['blockName'] === 'core/code') {
        $highlight_language = $block['attrs']['highlightLanguage'] ?? 'plaintext';
        //wp html tag processor
        $p = new WP_HTML_Tag_Processor($block_content);
        $p->next_tag('pre');
        $p->next_tag('code');
        $p->add_class("language-$highlight_language");
        $block_content = $p->get_updated_html();
        $block_content = <<<HTML
            <div class="wp-block-code-outer relative">
                <small class="code-label">$highlight_language</small>
                $block_content
            </div>
        HTML;
    }
    if($block['blockName'] === 'core/preformatted') {
        //wp html tag processor
        $p = new WP_HTML_Tag_Processor($block_content);
        $p->next_tag('pre');
        $p->add_class("language-plaintext");
        $block_content = $p->get_updated_html();
        $block_content = <<<HTML
            <div class="wp-block-preformatted-outer relative">
                <small class="code-label">plaintext</small>
                $block_content
            </div>
        HTML;
    }

    return $block_content;
}
add_filter('render_block', 'tailpress_filter_block_output', 10, 2);

function tailpress_blocks_enqueue_scripts() {
    //shared/dist/block-code.js
    $code_block_js_file = plugins_url('shared/dist/block-code.js', __FILE__);
    $code_block_js_file_time = filemtime(plugin_dir_path(__FILE__) . 'shared/dist/block-code.js');
    wp_enqueue_script('tailpress-code-block', $code_block_js_file, array(), $code_block_js_file_time, true);


    wp_enqueue_style('highlight-js-default', plugins_url('node_modules/highlight.js/styles/default.min.css', __FILE__), array(), '10.7.2');
    wp_enqueue_style('highlight-js-monokai', plugins_url('node_modules/highlight.js/styles/monokai.min.css', __FILE__), array(), '10.7.2');

    //shared/dist/block-code.css
    $code_block_css_file = plugins_url('shared/dist/block-code.css', __FILE__);
    $code_block_css_file_time = filemtime(plugin_dir_path(__FILE__) . 'shared/dist/block-code.css');
    wp_enqueue_style('tailpress-code-block', $code_block_css_file, array(), $code_block_css_file_time);
}
add_action('enqueue_block_assets', 'tailpress_blocks_enqueue_scripts');

