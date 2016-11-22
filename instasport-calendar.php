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

        return $o;
    }
    add_shortcode('instasport-calendar', 'instasport_shortcode');
}
add_action('init', 'instasport_shortcodes_init');

