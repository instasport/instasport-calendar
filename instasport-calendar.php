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

        // secure URL
        $url = esc_url($url);

        $o = '<strong><a href="' . $url . '">' . $content . '</a></strong><br><br>';
        //error_log($o);

        //$path = 'template.html';

        //$file = file_get_contents($path, FILE_USE_INCLUDE_PATH);

        // wget -rkp --no-parent https://instasport.co/club/acro/calendar/

        //$f1 = file_get_contents(plugins_url( 'template_start.html', __FILE__ ), FILE_USE_INCLUDE_PATH);
        //$f2 = file_get_contents(plugins_url( 'template_data.html', __FILE__ ), FILE_USE_INCLUDE_PATH);
        //$f3 = file_get_contents(plugins_url( 'template_finish.html', __FILE__ ), FILE_USE_INCLUDE_PATH);

        //$frame = '<iframe src="' . $f1 . $f2 . $f3 . '" frameborder="0" width="100%" height="900"></iframe>';

        $frame = '<iframe src="' . plugins_url( 'template.html', __FILE__ ) . '" frameborder="0" width="100%" height="900"></iframe>';
        //error_log($frame);

        $o .= $frame;

        return $o;
    }
    add_shortcode('instasport-calendar', 'instasport_shortcode');

/*
    function register_instasport_scripts()
    {
        // Register the script like this for a plugin:
        wp_register_script( 'moment-script', '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js', array( 'jquery' ), null, false );
        wp_register_script( 'fullcalendar-script', '//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.5.0/fullcalendar.min.js', array( 'jquery' ), null, false );
        wp_register_script( 'fullcalendar-lang-script', '//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.5.0/lang/ru.js', array( 'jquery' ), null, false );

        wp_register_script( 'calendar-script', plugins_url( 'calendar.js', __FILE__ ), 
            array( 'jquery', 'moment-script', 'fullcalendar-script', 'fullcalendar-lang-script' ), null, false );

        // Enqueue scripts
        wp_enqueue_script( 'moment-script' );
        wp_enqueue_script( 'fullcalendar-script' );
        wp_enqueue_script( 'fullcalendar-lang-script' );

        wp_enqueue_script( 'calendar-script' );
    }

    add_action( 'wp_enqueue_scripts', 'register_instasport_scripts' );
*/

}
add_action('init', 'instasport_shortcodes_init');
