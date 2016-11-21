
<?php
/**
 * Plugin Name: Instasport Calendar
 * Description: Instasport Calendar
 * Version: 1.0.0
 * Author: Artem Sunduchkov
 * Author URI: http://instasport.co
 * License: GPL2
 */

function instasport_shortcodes_init()
{
    function instasport_shortcode($atts = [], $content = null, $tag = '')
    {
        // normalize attribute keys, lowercase
        $atts = array_change_key_case((array)$atts, CASE_LOWER);

        // override default attributes with user attributes
        $wporg_atts = shortcode_atts(['slug' => '/',], $atts, $tag);

        // create output
        $o = '<a href="https://instasport.co/club/"' . $wporg_atts['slug'] . '/schedule/>' . $content . '</a>';

        return $o;
    }
    add_shortcode('instasport-calendar', 'instasport_shortcode');
}
add_action('init', 'instasport_shortcodes_init');

