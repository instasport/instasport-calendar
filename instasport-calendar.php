<?php
/**
 * Plugin Name: Instasport Calendar
 * Description: Instasport Calendar as Wordpress plugin
 * Version: 1.0.0
 * Author: Artem Sunduchkov
 * Author URI: https://instasport.com.ua
 * License: GPL2
 */

function instasport_shortcodes_init()
{
    function instasport_shortcode($atts = [], $content = null, $tag = '')
    {
        // normalize attribute keys, lowercase
        $atts = array_change_key_case((array)$atts, CASE_LOWER);

        // override default attributes with slug attributes
        $parsed = shortcode_atts(['slug' => '/',], $atts, $tag);

        // create output
        $url = 'https://instasport.co/club/';

        if ( isset( $parsed['slug'] ) ) {
            $url .= $parsed['slug'];
        }

        $url .= '/schedule/';

        // secure output
        $o = '<strong><a href="' . esc_url($url) . '">' . $content . '</a></strong><br><br>';
        error_log($o);

        $path = 'template.html';
        error_log($path);

        $file = file_get_contents($path, FILE_USE_INCLUDE_PATH);
        error_log($file);
        $o .= $file;

        return $o;
    }
    add_shortcode('instasport-calendar', 'instasport_shortcode');

    function register_instasport_scripts()
    {
        // Register the script like this for a plugin:
        wp_register_script( 'moment-script', '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js', array( 'jquery' ), null, false );
        wp_register_script( 'fullcalendar-script', '//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.5.0/fullcalendar.min.js', array( 'jquery' ), null, false );
        wp_register_script( 'fullcalendar-lang-script', '//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.5.0/lang/ru.js', array( 'jquery' ), null, false );

        // Enqueue scripts
        wp_enqueue_script( 'moment-script' );
        wp_enqueue_script( 'fullcalendar-script' );
        wp_enqueue_script( 'fullcalendar-lang-script' );

        error_log('Registered scripts for a plugin');
    }

    add_action( 'wp_enqueue_scripts', 'register_instasport_scripts' );

}
add_action('init', 'instasport_shortcodes_init');
