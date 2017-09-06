<?php
/**
 * Plugin Name: Instasport Calendar
 * Description: Instasport Calendar as Wordpress plugin
 * Version: 1.0.0
 * Author: Instasport
 * Author URI: https://info.instasport.co
 * License: GPL2
 */
add_action('admin_menu','intacalendar_admin_actions');
function intacalendar_admin_actions(){
    add_options_page('IntaCalendar','IntaCalendar','manage_options',__FILE__,'intacalendar_admin');
}

function intacalendar_admin(){
?>
    <div class="wrap">
        
<?php
    global $wpdb;

    if($_POST){
        //print_r($_POST);
        $table_name = $wpdb->prefix."intacalendar_options";
        $wpdb->update( 
            $table_name, 
            [ 
                'switch_halls_button_bg' => $_POST['switch_halls_button_bg'],  // string
                'switch_halls_button_bg_hover' => $_POST['switch_halls_button_bg_hover'],   // integer (number)
                'switch_halls_button_bg_active' => $_POST['switch_halls_button_bg_active'],
                'switch_halls_button_color' => $_POST['switch_halls_button_color'],
                'switch_halls_button_color_hover' => $_POST['switch_halls_button_color_hover'],
                'switch_halls_button_color_active' => $_POST['switch_halls_button_color_active'],
                //Styles for Next,Prev BUTTONS and title of current month of calendar 
                'title_current_month_color' => $_POST['title_current_month_color'],
                'next_prev_buttons_color' => $_POST['next_prev_buttons_color'],
                'next_prev_buttons_color_hover' => $_POST['next_prev_buttons_color_hover'],
                'short_names_of_days_of_week_color' => $_POST['short_names_of_days_of_week_color'],
                //Styles for dates of calendar  
                'tr_color' => $_POST['tr_color'],
                'date_number_color' => $_POST['date_number_color'],
                'date_number_color_saturday_sunday' => $_POST['date_number_color_saturday_sunday'],
                'date_number_color_active' => $_POST['date_number_color_active'],
                'date_number_color_active_circle' => $_POST['date_number_color_active_circle'],
                'date_number_bg_today' => $_POST['date_number_bg_today'],
                'date_number_color_today' => $_POST['date_number_color_today'],
                'date_number_bg_today_hover' => $_POST['date_number_bg_today_hover'],
                'date_number_color_today_hover' => $_POST['date_number_color_today_hover'],
                'date_number_bg_choosen' => $_POST['date_number_bg_choosen'],
                'date_number_color_choosen' => $_POST['date_number_color_choosen'],
                'date_number_bg_choosen_hover' => $_POST['date_number_bg_choosen_hover'],
                'date_number_color_choosen_hover' => $_POST['date_number_color_choosen_hover'],
            ], 
            ['id' => 1] 
            /*array( 
                '%s',   // value1
                '%d'    // value2
            ), 
            array( '%d' )*/ 
        );
    }

    /*
    $table_name = $wpdb->prefix."intacalendar_options";
    $results = $wpdb->get_results( "SELECT * FROM $table_name WHERE id = 1" );
    echo count($results);

    $switch_halls_button_bg = '#333';
    $switch_halls_button_bg_hover = '#ccc';
    $wpdb->insert( 
            $table_name, 
            array( 
                //'switch_halls_button_bg' => current_time( 'mysql' ), 
                'switch_halls_button_bg' => $switch_halls_button_bg, 
                'switch_halls_button_bg_hover' => $switch_halls_button_bg_hover, 
            ) 
        );


    $mytestdrafts = $wpdb->get_results(
            "
                SELECT ID, post_title FROM $wpdb->posts
                WHERE post_status = 'draft'
            "
        );*/
    $table_name = $wpdb->prefix."intacalendar_options";
    $result = $wpdb->get_row( "SELECT * FROM $table_name WHERE id = 1" );
    //echo $result->switch_halls_button_bg;
?>
        <form method="post" action=""> 
            <h2>Цвет кнопок переключения залов</h2>
            
            <input type="text" name="switch_halls_button_bg" value="<?=$result->switch_halls_button_bg;?>">
            - Фоновый цвет <br />
            <input type="text" name="switch_halls_button_bg_hover" value="<?=$result->switch_halls_button_bg_hover;?>">
            - Фоновый цвет при наведении<br />
            <input type="text" name="switch_halls_button_bg_active" value="<?=$result->switch_halls_button_bg_active;?>">
            - Фоновый цвет активной кнопки<br />
            <input type="text" name="switch_halls_button_color" value="<?=$result->switch_halls_button_color;?>">
            - Цвет текста кнопки<br />
            <input type="text" name="switch_halls_button_color_hover" value="<?=$result->switch_halls_button_color_hover;?>">
            - Цвет текста кнопки при наведении мыши<br />
            <input type="text" name="switch_halls_button_color_active" value="<?=$result->switch_halls_button_color_active;?>">
            - Цвет активной кнопки<br />

            <br />
            <h2>Цвет кнопок переключения на следующий и предыдущий месяца и названия текущего месяца</h2>

            <input type="text" name="title_current_month_color" value="<?=$result->title_current_month_color;?>">
            - Цвет заголовка календаря(текущий месяц) <br />
            <input type="text" name="next_prev_buttons_color" value="<?=$result->next_prev_buttons_color;?>">
            - Цвет кнопок переключения на следующий и предыдущий месяца <br />
            <input type="text" name="next_prev_buttons_color_hover" value="<?=$result->next_prev_buttons_color_hover;?>">
            - Цвет кнопок переключения на следующий и предыдущий месяца при наведении <br />
            <input type="text" name="short_names_of_days_of_week_color" value="<?=$result->short_names_of_days_of_week_color;?>">
            - Цвет коротких названий дней недели <br />
            
            <br />
            <h2>Цвет дат календаря</h2>

            <input type="text" name="tr_color" value="<?=$result->tr_color;?>">
            - Цвет горизонтальных линий календаря <br />
            <input type="text" name="date_number_color" value="<?=$result->date_number_color;?>">
            - Цвет дат в будни <br />
            <input type="text" name="date_number_color_saturday_sunday" value="<?=$result->date_number_color_saturday_sunday;?>">
            - Цвет дат в выходные <br />
            <input type="text" name="date_number_color_active" value="<?=$result->date_number_color_active;?>">
            - Цвет номера даты с ивентами <br />
            <input type="text" name="date_number_color_active_circle" value="<?=$result->date_number_color_active_circle;?>">
            - Цвет кружка под датой <br />
            <input type="text" name="date_number_bg_today" value="<?=$result->date_number_bg_today;?>">
            - Фоновый цвет текущей даты <br />
            <input type="text" name="date_number_color_today" value="<?=$result->date_number_color_today;?>">
            - Цвет номера текущей даты <br />
            <input type="text" name="date_number_bg_today_hover" value="<?=$result->date_number_bg_today_hover;?>">
            - Фоновый цвет текущей даты при наведении <br />
            <input type="text" name="date_number_color_today_hover" value="<?=$result->date_number_color_today_hover;?>">
            - Цвет номера текущей даты при наведении <br />


            <input type="text" name="date_number_bg_choosen" value="<?=$result->date_number_bg_choosen;?>">
            - Фоновый цвет выбраной даты <br />
            <input type="text" name="date_number_color_choosen" value="<?=$result->date_number_color_choosen;?>">
            - Цвет номера выбраной даты <br />
            <input type="text" name="date_number_bg_choosen_hover" value="<?=$result->date_number_bg_choosen_hover;?>">
            - Фоновый цвет выбраной даты при наведении <br />
            <input type="text" name="date_number_color_choosen_hover" value="<?=$result->date_number_color_choosen_hover;?>">
            - Цвет номера выбраной даты при наведении <br />


            <br /><br />
            <input type="submit" value="Внести изменения">


        </form>
    </div>
<?php
}








function instasport_shortcodes_init()
{
    function instasport_shortcode($atts = [], $content = null, $tag = '')
    {
        global $wpdb;

        wp_enqueue_style('fullcalendar.min.css');
        wp_enqueue_style('modal-style.css');
        wp_enqueue_style('mycalendars.css');
        wp_enqueue_script('fontawesome');
        wp_enqueue_script('jquery.min.js');
        //wp_enqueue_script('modal.js');
        //wp_enqueue_script('bootstrap.min.js');
        wp_enqueue_script('initfullcallendar.js');
        wp_enqueue_script('moment-with-locales.min.js');
        wp_enqueue_script('fullcalendar.min.js');
        wp_enqueue_script('ru.js');
        wp_enqueue_script('main.js');
        wp_enqueue_script('modal.js');

        $table_name = $wpdb->prefix."intacalendar_options";
        $result = $wpdb->get_row( "SELECT * FROM $table_name WHERE id = 1" );
        //echo $result->switch_halls_button_bg;


        $parsed = shortcode_atts(['slug' => '/', 'height' => '900',], $atts, $tag);


        include("mycalendar.php");
?>

<style type="text/css">

/*Month calendar styles
********************************************************************/
    /*Styles for buttons to switch the halls in MONTH calendar
    ********************************************************************/
    .switch-halls-mycalendar span{
        background: <?=$result->switch_halls_button_bg;?>;
        color: <?=$result->switch_halls_button_color;?>!important;
    }
    .switch-halls-mycalendar span:hover{
        background: <?=$result->switch_halls_button_bg_hover;?>;
        color: <?=$result->switch_halls_button_color_hover;?>!important;
    }
    .switch-halls-mycalendar span.active{
        background: <?=$result->switch_halls_button_bg_active;?>;
        color: <?=$result->switch_halls_button_color_active;?>!important;
    }

    /*Styles for title and buttons(Next,Prev) in MONTH calendar
    **and fo short names of days of week
    ********************************************************************/
    .mycalendars .mymonthcalendar table thead tr:nth-child(1) td:nth-child(2){
        color: <?=$result->title_current_month_color;?>!important;
    }
    .mycalendars .mymonthcalendar table thead tr:nth-child(1) td a{
        color: <?=$result->next_prev_buttons_color;?>!important;
    }
    .mycalendars .mymonthcalendar table thead tr:nth-child(1) td a:hover{
        color: <?=$result->next_prev_buttons_color_hover;?>!important;
    }
    .mycalendars .mymonthcalendar table thead tr:nth-child(2) td{
        /*text-decoration: underline;*/
        color: <?=$result->short_names_of_days_of_week_color;?>!important;
    }

    /*Styles for dates of calendar in MONTH view
    ********************************************************************/
    .mycalendars .mymonthcalendar.w700px table tr td .show .day-number{
        /*background-color: #fc3a2e;*/
        color: <?=$result->date_number_color;?>!important;
    }
    .mycalendars .mymonthcalendar table tr td.day[data-day-week=sunday] .show .day-number{
        color: <?=$result->date_number_color_saturday_sunday;?>!important;
    }
    .mycalendars .mymonthcalendar table tr td.day[data-day-week=saturday] .show .day-number{
        color: <?=$result->date_number_color_saturday_sunday;?>!important;
    }
    

    .mycalendars .mymonthcalendar.w700px table tr td.active .show .day-number{
        color: <?=$result->date_number_color_active;?>!important;
        background: none;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.active .show .active-circle{
        position: absolute;
        top: 45px;
        left: 0px;
        z-index: 10;
        width: 100%; 
        height: 10px;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.active .show .active-circle div{
        background-color: <?=$result->date_number_color_active_circle;?>!important;
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 5px; 
    }
    

    .mycalendars .mymonthcalendar.w700px table tr td.today .show .day-number{
        background-color: <?=$result->date_number_bg_today;?>!important;
        color: <?=$result->date_number_color_today;?>!important;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.today .show .day-number:hover{
        background-color: <?=$result->date_number_bg_today_hover;?>!important;
        color: <?=$result->date_number_color_today_hover;?>!important;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.active.choosen .show .day-number{
        background-color: <?=$result->date_number_bg_choosen;?>!important;
        color: <?=$result->date_number_color_choosen;?>!important;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.active.choosen .show .day-number:hover{
        background-color: <?=$result->date_number_bg_choosen_hover;?>!important;
        color: <?=$result->date_number_color_choosen_hover;?>!important;
    }
    .mycalendars .mymonthcalendar.w700px table tr td.active.choosen .show .day-number:focus{
        background-color: <?=$result->date_number_bg_choosen;?>!important;
        color: <?=$result->date_number_color_choosen;?>!important;
    }
    .mycalendars .mymonthcalendar table tr{
        /*background-color: #fc3a2e;*/
        border-color: <?=$result->tr_color;?>!important;
    }


      
</style>
        <div id="events-on-day"></div>

        <div style="display: none;" class="date-interval">
            <div class="date-begin"></div>
            <div class="date-end"></div>
        </div>
        <div style="display: none;" class="intaclub"><?=$parsed['slug'];?></div>
        <div class="calen-tab">
            <div class="cld-tabs"></div>
        </div>
        <div id="calendar"></div>
        <div id="calendar-data" data-full="notfull"></div>


<?php
        include("modal.php");
        /*
        print_r($atts);

        // normalize attribute keys, lowercase
        $atts = array_change_key_case((array)$atts, CASE_LOWER);

        //print_r($atts);
        // override default attributes with slug attributes
        $parsed = shortcode_atts(['slug' => '/', 'height' => '900',], $atts, $tag);

        // create output
        $url = 'https://instasport.co/club/';

        $slug = '';
        if ( isset( $parsed['slug'] ) ) {
            $slug = $parsed['slug'];
        }

        $height = 900;
        if ( isset( $parsed['height'] ) ) {
            $height = $parsed['height'];
        }


        $url .= $slug . '/schedule/';

        // secure URL
        $url = esc_url($url);

        $o = '<strong><a href="' . $url . '">' . $content . '</a></strong><br><br>';
        //error_log($o);

        //$path = 'template.html';
        //$file = file_get_contents($path, FILE_USE_INCLUDE_PATH);

        // wget -rkp --no-parent https://instasport.co/club/acro/calendar/

        $frame = '<iframe src="' . plugins_url( 'index.php', __FILE__ ) . '?title=' . $slug . '" frameborder="0" width="100%" height="' . $height . '"></iframe>';
        //error_log($frame);

        $o .= $frame;

        return $o;
        */
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
    //wp_register_style( 'namespace', '/wp-content/plugins/instasport-calendar-master/css/bootstrap-grid-12.css' );
    //wp_register_style( 'namespace', plugins_url( 'css/bootstrap-grid-12.css', __FILE__ ) );
    wp_register_style( 'fullcalendar.min.css', plugins_url( 'js/rasp/libs/fullcalendar/fullcalendar.min.css', __FILE__ ) );
    wp_register_style( 'modal-style.css', plugins_url( 'modal/style.css', __FILE__ ) );
    wp_register_style( 'mycalendars.css', plugins_url( 'css/mycalendars.css', __FILE__ ) );
    wp_register_script( "fontawesome", "https://use.fontawesome.com/8f02526f3f.js", __FILE__ );
    wp_register_script( "jquery.min.js", "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", __FILE__ );

    wp_register_script( "modal.js", plugins_url( "modal/modal.js", __FILE__ ) );

    wp_register_script( "initfullcallendar.js", plugins_url( "js/rasp/initfullcallendar.js", __FILE__ ) );
    wp_register_script( "moment-with-locales.min.js", plugins_url( "js/rasp/libs/moment-with-locales.min.js", __FILE__ ) );
    wp_register_script( "fullcalendar.min.js", plugins_url( "js/rasp/libs/fullcalendar/fullcalendar.min.js", __FILE__ ) );
    wp_register_script( "ru.js", plugins_url( "js/rasp/libs/fullcalendar/lang/ru.js", __FILE__ ) );
    wp_register_script( "main.js", plugins_url( "js/rasp/main.js", __FILE__ ) );
}
add_action('init', 'instasport_shortcodes_init');


register_activation_hook( __FILE__, 'intacalendar_create_db' );

function intacalendar_create_db(){
    global $wpdb;

    $table_name = $wpdb->prefix."intacalendar_options";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      switch_halls_button_bg varchar(50) NOT NULL,
      switch_halls_button_bg_hover varchar(50) NOT NULL,
      switch_halls_button_bg_active varchar(50) NOT NULL,
      switch_halls_button_color varchar(50) NOT NULL,
      switch_halls_button_color_hover varchar(50) NOT NULL,
      switch_halls_button_color_active varchar(50) NOT NULL,
      title_current_month_color varchar(50) NOT NULL,
      next_prev_buttons_color varchar(50) NOT NULL,
      next_prev_buttons_color_hover varchar(50) NOT NULL,
      short_names_of_days_of_week_color varchar(50) NOT NULL,
      tr_color varchar(50) NOT NULL,
      date_number_color varchar(50) NOT NULL,
      date_number_color_saturday_sunday varchar(50) NOT NULL,
      date_number_color_active varchar(50) NOT NULL,
      date_number_color_active_circle varchar(50) NOT NULL,
      date_number_bg_today varchar(50) NOT NULL,
      date_number_color_today varchar(50) NOT NULL,
      date_number_bg_today_hover varchar(50) NOT NULL,
      date_number_color_today_hover varchar(50) NOT NULL,
      date_number_bg_choosen varchar(50) NOT NULL,
      date_number_color_choosen varchar(50) NOT NULL,
      date_number_bg_choosen_hover varchar(50) NOT NULL,
      date_number_color_choosen_hover varchar(50) NOT NULL,
      PRIMARY KEY  (id)
    ) $charset_collate;";
    

    

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );

    $results = $wpdb->get_results( "SELECT * FROM $table_name WHERE id = 1" );
    if(count($results) == 0){
        //Default styles for BUTTONS to switch halls of calendar 
        $switch_halls_button_bg = '#ccc';
        $switch_halls_button_bg_hover = '#ccc';
        $switch_halls_button_bg_active = '#000';
        $switch_halls_button_color = '#000';
        $switch_halls_button_color_hover = '#000';
        $switch_halls_button_color_active = '#fff';

        //Default styles for Next,Prev BUTTONS and title of current month of calendar 
        $title_current_month_color = '#000';
        $next_prev_buttons_color = '#000';
        $next_prev_buttons_color_hover = '#666';
        $short_names_of_days_of_week_color = '#000';

        //Styles for dates of calendar  
        $tr_color = '#555';
        $date_number_color = '#000';
        $date_number_color_saturday_sunday = 'red';
        $date_number_color_active = '#000';
        $date_number_color_active_circle = '#ccc';
        $date_number_bg_today = '#000';
        $date_number_color_today = '#fff';
        $date_number_bg_today_hover = '#666';
        $date_number_color_today_hover = '#fff';
        $date_number_bg_choosen = 'red';
        $date_number_color_choosen = '#fff';
        $date_number_bg_choosen_hover = 'red';
        $date_number_color_choosen_hover = '#fff';

        
        //$table_name = $wpdb->prefix . 'liveshoutbox';

        $wpdb->insert( 
            $table_name, 
            array( 
                //'switch_halls_button_bg' => current_time( 'mysql' ), 
                'switch_halls_button_bg' => $switch_halls_button_bg, 
                'switch_halls_button_bg_hover' => $switch_halls_button_bg_hover,
                'switch_halls_button_bg_active' => $switch_halls_button_bg_active, 
                'switch_halls_button_color' => $switch_halls_button_color, 
                'switch_halls_button_color_hover' => $switch_halls_button_color_hover,
                'switch_halls_button_color_active' => $switch_halls_button_color_active,
                //Default styles for Next,Prev BUTTONS and title of current month of calendar
                'title_current_month_color' => $title_current_month_color, 
                'next_prev_buttons_color' => $next_prev_buttons_color,
                'next_prev_buttons_color_hover' => $next_prev_buttons_color_hover, 
                'short_names_of_days_of_week_color' => $short_names_of_days_of_week_color,
                //Styles for dates of calendar  
                'tr_color' => $tr_color,
                'date_number_color' => $date_number_color,
                'date_number_color_saturday_sunday' => $date_number_color_saturday_sunday,
                'date_number_color_active' => $date_number_color_active,
                'date_number_color_active_circle' => $date_number_color_active_circle,
                'date_number_bg_today' => $date_number_bg_today,
                'date_number_color_today' => $date_number_color_today,
                'date_number_bg_today_hover' => $date_number_bg_today_hover,
                'date_number_color_today_hover' => $date_number_color_today_hover,
                'date_number_bg_choosen' => $date_number_bg_choosen,
                'date_number_color_choosen' => $date_number_color_choosen,
                'date_number_bg_choosen_hover' => $date_number_bg_choosen_hover,
                'date_number_color_choosen_hover' => $date_number_color_choosen_hover,

            ) 
        );
    }
}