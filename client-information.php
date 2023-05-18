<?php
/*
Plugin Name: Client Information Block
Description: Store client image, title, description and social links as well.
Plugin URI: https://malavvasita.github.io
Author: Malav Vasita
Author URI: https://malavvasita.github.io
*/
function client_information_block() {

    $styleURI = plugin_dir_url( __FILE__  ).'/src/style.css';
    //Enquee style
    wp_enqueue_style( 
        'client-information-block-style', 
        $styleURI, 
     );

    // Register JavasScript File build/index.js
    wp_register_script(
        'client-information-block',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
    );

    // Register editor style src/editor.css
    wp_register_style(
        'client-information-block-editor-style',
        plugins_url( 'src/editor.css', __FILE__ ),
    );

    // Register block
    register_block_type( 'client/client-information', array(
        'editor_script' => 'client-information-block',
        'editor_style' => 'client-information-block-editor-style',
        'style' => 'client-information-block-style'
    ) );

}

add_action( 'init', 'client_information_block' );