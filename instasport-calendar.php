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
    add_options_page('IntaCalendar','Instasport Calendar','manage_options',__FILE__,'intacalendar_admin');
}

function intacalendar_admin(){
?>
    <div class="wrap">
        
<?php
    global $wpdb;

    $retrieved_nonce = $_REQUEST['_wpnonce'];
    if(wp_verify_nonce($retrieved_nonce, "change_options")){
        //print_r($_POST);
        //die();
        //$wpdb->show_errors = true;
        $table_name = $wpdb->prefix."intacalendar_options";
        $result = $wpdb->update( 
            $table_name, 
            array(
                //DESCTOP STYLES
                // 'api_code' => $_POST['api_code'],
                // 'api_key' => $_POST['api_key'],
                'default_view_to_show' => $_POST['default_view_to_show'],
                'use_api_colors' => $_POST['use_api_colors'],
                'additional_info_month_duration' => $_POST['additional_info_month_duration'],
                'additional_info_month_seats' => $_POST['additional_info_month_seats'],
                'additional_info_week_duration' => $_POST['additional_info_week_duration'],
                'additional_info_week_seats' => $_POST['additional_info_week_seats'],
                'desktop_month_quantity_trainings' => $_POST['desktop_month_quantity_trainings'],
                'desktop_week_quantity_trainings' => $_POST['desktop_week_quantity_trainings'],
                'desktop_month_more_text' => $_POST['desktop_month_more_text'],
                'desktop_week_more_text' => $_POST['desktop_week_more_text'],
                'desktop_week_hide_empty_rows' => $_POST['desktop_week_hide_empty_rows'],
                'desktop_filter_train_show' => $_POST['desktop_filter_train_show'],
                'desktop_filter_couch_show' => $_POST['desktop_filter_couch_show'],
                'desktop_filter_activity_show' => $_POST['desktop_filter_activity_show'],
                'desktop_filter_complexity_show' => $_POST['desktop_filter_complexity_show'],
                'desktop_nav_filter_font' => $_POST['desktop_nav_filter_font'],
                'desktop_event_title_time_font' => $_POST['desktop_event_title_time_font'],
                'desktop_event_dur_seats_font' => $_POST['desktop_event_dur_seats_font'],
                'desktop_title_font' => $_POST['desktop_title_font'],
                'desktop_days_of_week_font' => $_POST['desktop_days_of_week_font'],
                'desktop_month_days_numbers_font' => $_POST['desktop_month_days_numbers_font'],
                'desktop_week_hours_font' => $_POST['desktop_week_hours_font'],
                'desktop_filter_list_font' => $_POST['desktop_filter_list_font'],

                //MOBILE STYLES
                'mobile_use_api_colors' => $_POST['mobile_use_api_colors'],
                'mobile_additional_info_week_duration' => $_POST['mobile_additional_info_week_duration'],
                'mobile_additional_info_week_seats' => $_POST['mobile_additional_info_week_seats'],
                'mobile_filter_train_show' => $_POST['mobile_filter_train_show'],
                'mobile_filter_couch_show' => $_POST['mobile_filter_couch_show'],
                'mobile_filter_activity_show' => $_POST['mobile_filter_activity_show'],
                'mobile_filter_complexity_show' => $_POST['mobile_filter_complexity_show'],
                'mobile_nav_filter_font' => $_POST['mobile_nav_filter_font'],
                'mobile_event_title_time_font' => $_POST['mobile_event_title_time_font'],
                'mobile_event_dur_seats_font' => $_POST['mobile_event_dur_seats_font'],
                'mobile_title_font' => $_POST['mobile_title_font'],
                'mobile_days_of_week_font' => $_POST['mobile_days_of_week_font'],
            ), 
            array('id' => 1) 
            /*array( 
                '%s',   // value1
                '%d'    // value2
            ), 
            array( '%d' )*/ 
        );
        //exit( var_dump( $wpdb->last_query ) );
        //if($result){echo 'true';}else{
        //    $wpdb->show_errors();
        //}
        //die();
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
            <?php wp_nonce_field('change_options'); ?>
            
            <h1>Основные настройки</h1>


            <h1>Настройки Десктопной версии календаря</h1>


            <h3>Главные настройки</h3>
            <select name="default_view_to_show">
                <option <?php if($result->default_view_to_show == "month"){echo "selected='selected'";}?> value="month">Месяц</option>
                <option <?php if($result->default_view_to_show == "week"){echo "selected='selected'";}?> value="week">Неделя</option>
            </select>
            - Вид календаря (изначально) <br />

            <select name="use_api_colors">
                <option <?php if($result->use_api_colors == 0){echo "selected='selected'";}?> value="0">Выкл</option>
                <option <?php if($result->use_api_colors == 1){echo "selected='selected'";}?> value="1">Вкл</option>
            </select>
            - Использование API Цветов <br />

            <select name="additional_info_month_duration">
                <option <?php if($result->additional_info_month_duration == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->additional_info_month_duration == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Месяц (продолжительность тренировки) <br />

            <select name="additional_info_month_seats">
                <option <?php if($result->additional_info_month_seats == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->additional_info_month_seats == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Месяц (свободные места) <br />

            <select name="additional_info_week_duration">
                <option <?php if($result->additional_info_week_duration == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->additional_info_week_duration == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Неделя (продолжительность тренировки) <br />

            <select name="additional_info_week_seats">
                <option <?php if($result->additional_info_week_seats == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->additional_info_week_seats == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Неделя (свободные места) <br />

            <input type="text" name="desktop_month_quantity_trainings" value="<?=$result->desktop_month_quantity_trainings;?>">
            - Количество тренировок которое показывается в одной клетке - Месяц<br />

            <input type="text" name="desktop_week_quantity_trainings" value="<?=$result->desktop_week_quantity_trainings;?>">
            - Количество тренировок которое показывается в одной клетке - Неделя<br />

            <input type="text" name="desktop_month_more_text" value="<?=$result->desktop_month_more_text;?>">
            - Текст для кнопки смотреть больше (...) - Месяц<br />

            <input type="text" name="desktop_week_more_text" value="<?=$result->desktop_week_more_text;?>">
            - Текст для кнопки смотреть больше (...) - Неделя<br />

            <select name="desktop_week_hide_empty_rows">
                <option <?php if($result->desktop_week_hide_empty_rows == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->desktop_week_hide_empty_rows == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - строки без тренировок - Неделя <br />

            <select name="desktop_filter_train_show">
                <option <?php if($result->desktop_filter_train_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->desktop_filter_train_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по тренировкам <br />

            <select name="desktop_filter_couch_show">
                <option <?php if($result->desktop_filter_couch_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->desktop_filter_couch_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по тренерам <br />

            <select name="desktop_filter_activity_show">
                <option <?php if($result->desktop_filter_activity_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->desktop_filter_activity_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по направлениям <br />

            <select name="desktop_filter_complexity_show">
                <option <?php if($result->desktop_filter_complexity_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->desktop_filter_complexity_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по сложности <br />


            <h3>Шрифты</h3>
            <input type="text" name="desktop_nav_filter_font" value="<?=$result->desktop_nav_filter_font;?>">
            - Шрифт залов, фильтров и типа календаря<br />

            <input type="text" name="desktop_event_title_time_font" value="<?=$result->desktop_event_title_time_font;?>">
            - Шрифт названия и времени события<br />

            <input type="text" name="desktop_event_dur_seats_font" value="<?=$result->desktop_event_dur_seats_font;?>">
            - Шрифт продолжительности и мест события<br />

            <input type="text" name="desktop_title_font" value="<?=$result->desktop_title_font;?>">
            - Шрифт тайтла<br />

            <input type="text" name="desktop_days_of_week_font" value="<?=$result->desktop_days_of_week_font;?>">
            - Шрифт названия дней недели<br />

            <input type="text" name="desktop_month_days_numbers_font" value="<?=$result->desktop_month_days_numbers_font;?>">
            - Шрифт числа дня (месяц)<br />

            <input type="text" name="desktop_week_hours_font" value="<?=$result->desktop_week_hours_font;?>">
            - Шрифт времени (неделя)<br /> 

            <input type="text" name="desktop_filter_list_font" value="<?=$result->desktop_filter_list_font;?>"> 
            - Шрифт списка в фильтре<br /> 



            <!--    MOBILE STYLE INPUTS     -->
            <h1>Настройки Мобильной версии календаря</h1>


            <h3>Главные настройки</h3>
            <select name="mobile_use_api_colors">
                <option <?php if($result->mobile_use_api_colors == 0){echo "selected='selected'";}?> value="0">Выкл</option>
                <option <?php if($result->mobile_use_api_colors == 1){echo "selected='selected'";}?> value="1">Вкл</option>
            </select>
            - Использование API Цветов <br />


            <select name="mobile_additional_info_week_duration">
                <option <?php if($result->mobile_additional_info_week_duration == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_additional_info_week_duration == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Неделя (продолжительность тренировки) <br />

            <select name="mobile_additional_info_week_seats">
                <option <?php if($result->mobile_additional_info_week_seats == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_additional_info_week_seats == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Неделя (свободные места) <br /> 

            <select name="mobile_filter_train_show">
                <option <?php if($result->mobile_filter_train_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_filter_train_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по тренировкам <br />

            <select name="mobile_filter_couch_show">
                <option <?php if($result->mobile_filter_couch_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_filter_couch_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по тренерам <br />

            <select name="mobile_filter_activity_show">
                <option <?php if($result->mobile_filter_activity_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_filter_activity_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по направлениям <br />

            <select name="mobile_filter_complexity_show">
                <option <?php if($result->mobile_filter_complexity_show == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_filter_complexity_show == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - фильтр по сложности <br />

            <h3>Шрифты</h3>
            <input type="text" name="mobile_nav_filter_font" value="<?=$result->mobile_nav_filter_font;?>">
            - Шрифт залов, фильтров<br />

            <input type="text" name="mobile_event_title_time_font" value="<?=$result->mobile_event_title_time_font;?>">
            - Шрифт названия и времени события<br />

            <input type="text" name="mobile_event_dur_seats_font" value="<?=$result->mobile_event_dur_seats_font;?>">
            - Шрифт продолжительности и мест события<br />

            <input type="text" name="mobile_title_font" value="<?=$result->mobile_title_font;?>">
            - Шрифт тайтла<br />

            <input type="text" name="mobile_days_of_week_font" value="<?=$result->mobile_days_of_week_font;?>">
            - Шрифт названия дней недели<br /> 




            <br /><br />
            <input type="submit" value="Внести изменения">


        </form>
    </div>
<?php
}








function instasport_shortcodes_init()
{
    function instasport_shortcode($atts = array(), $content = null, $tag = '')
    {
        global $wpdb;


        wp_enqueue_style('inta-calendar-style.css');

        wp_enqueue_script('jquery.validate.js');
        wp_enqueue_script('jquery.inputmask.min.js');
        wp_enqueue_script('jquery.cookie.js');
        wp_enqueue_script('inta-locale.js');
        wp_enqueue_script('inta-calendar.js');
        wp_enqueue_script('inta-calendar-helper.js');
        wp_enqueue_script('inta-calendar-desktop-month.js'); 
        wp_enqueue_script('inta-calendar-desktop-week.js');
        wp_enqueue_script('inta-calendar-mobile-week.js');
        wp_enqueue_script('inta-calendar-profile-helper.js');
        wp_enqueue_script('inta-calendar-profile.js'); 


        $table_name = $wpdb->prefix."intacalendar_options";
        $result = $wpdb->get_row( "SELECT * FROM $table_name WHERE id = 1" );


        $parsed = shortcode_atts(array('club' => '', 'key' => '', 'code' => '', 'next' => ''), $atts, $tag); 

        if($result->use_api_colors == "1" || $result->mobile_use_api_colors == "1"){
            $clubInfo = json_decode(file_get_contents("https://instasport.co/club/".$parsed['club']."/api/v1/info/?format=json"), true);
            // var_dump($clubInfo[0]["primary_color"]); 
            // var_dump($result->use_api_colors);
            function hex2rgba($color, $opacity = false) {

                $default = 'rgb(0,0,0)';

                //Return default if no color provided
                if(empty($color))
                      return $default; 

                //Sanitize $color if "#" is provided 
                    if ($color[0] == '#' ) {
                        $color = substr( $color, 1 );
                    }

                    //Check if color has 6 or 3 characters and get values
                    if (strlen($color) == 6) {
                            $hex = array( $color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5] );
                    } elseif ( strlen( $color ) == 3 ) {
                            $hex = array( $color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2] );
                    } else {
                            return $default;
                    }

                    //Convert hexadec to rgb
                    $rgb =  array_map('hexdec', $hex);

                    //Check if opacity is set(rgba or rgb)
                    if($opacity){
                        if(abs($opacity) > 1)
                            $opacity = 1.0;
                        $output = 'rgba('.implode(",",$rgb).','.$opacity.')';
                    } else {
                        $output = 'rgb('.implode(",",$rgb).')';
                    }

                    //Return rgb(a) color string
                    return $output;
            }

            function adjustBrightness($hex, $steps) {
                // Steps should be between -255 and 255. Negative = darker, positive = lighter
                $steps = max(-255, min(255, $steps));

                // Normalize into a six character long hex string
                $hex = str_replace('#', '', $hex);
                if (strlen($hex) == 3) {
                    $hex = str_repeat(substr($hex,0,1), 2).str_repeat(substr($hex,1,1), 2).str_repeat(substr($hex,2,1), 2);
                }

                // Split into three parts: R, G and B
                $color_parts = str_split($hex, 2);
                $return = '#';

                foreach ($color_parts as $color) {
                    $color   = hexdec($color); // Convert to decimal
                    $color   = max(0,min(255,$color + $steps)); // Adjust color
                    $return .= str_pad(dechex($color), 2, '0', STR_PAD_LEFT); // Make two char hex code
                }

                return $return; 
            }

        }

        ob_start();
?>


<?php if($result->use_api_colors == "1"):?>

<style type="text/css">
/******************    Desktop Month   **********************/
#intaCallendar .dm-calendar .dm-filters ul li.active a.dm-filter-item,
#intaCallendar .dm-calendar .dm-filters ul li.choosed a.dm-filter-item{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}



#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dm-calendar .dm-filters ul li.active a.dm-filter-item div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dm-calendar .dm-filters ul li.choosed a.dm-filter-item div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today .dm-day_number{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}
#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today .dm-more a{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}



/**************************    Desktop Week    ******************************/

#intaCallendar .dw-calendar .dw-filters ul li.active a.dw-filter-item,
#intaCallendar .dw-calendar .dw-filters ul li.choosed a.dw-filter-item{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dw-calendar .dw-filters ul li a.dw-filter-item:hover{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dw-calendar .dw-filters ul li a.dw-filter-item:hover div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dw-calendar .dw-filters ul li.active a.dw-filter-item div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaCallendar .dw-calendar .dw-filters ul li.choosed a.dw-filter-item div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .dw-calendar .dw-events .dw-for_day.dw-day_today{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .dw-calendar .dw-day_today .dw-day .dw-more a{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}


/**************************    Desktop Modal    ******************************/
#intaCallendar.desktop .inta_modal .mde-header{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar.desktop .inta_modal .mde-header a.mde-close div{
    background-color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}
#intaCallendar.desktop .inta_modal .mde-header div,
#intaCallendar.desktop .inta_modal .mde-header a{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}


/**************************    Desktop Profile Modal    ******************************/
#intaProfileModal.desktop input[type='text']:focus,
#intaProfileModal.desktop input[type='password']:focus,
#intaProfileModal.desktop input[type='button']:focus{
    -webkit-box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    -moz-box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    border-color: <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
}

#intaProfileModal.desktop .button2:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.desktop .button2.active{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaProfileModal.desktop .button_nav{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.desktop .button_nav:hover{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.desktop .button1{
    color: black;
}

#intaProfileModal.desktop .button1:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.desktop .button1.active{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}

#intaProfileModal.desktop input[type='button'] {
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.desktop .ipm-body .ipm-close {
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.desktop .button_suc{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.desktop .button_suc:hover{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important; 
}

#intaProfileModal.desktop .ipm-visit_disable{
    color: black!important;
}
#intaProfileModal.desktop .ipm-visit_disable:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
    text-decoration: underline;
}


#intaProfileModal.desktop .button_link:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}


</style>

<?php endif;?>


<?php if($result->mobile_use_api_colors == "1"):?>

<style type="text/css">

/**************************    Halls    ******************************/
#intaCallendar .mw-calendar .mw-halls ul li:hover{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .mw-calendar .mw-halls ul li.active,
#intaCallendar .mw-calendar .mw-filters ul li.active{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .mw-calendar .mw-filters ul li a:hover div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar .mw-calendar .mw-filters ul li.choosed a div{
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}


/**************************    Mobile Modal    ******************************/
#intaCallendar.mobile .inta_modal .mde-header{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaCallendar.mobile .inta_modal .mde-header a.mde-close div{
    background-color: <?=$clubInfo[0]["primary_text_color"]?>!important; 
}
#intaCallendar.mobile .inta_modal .mde-header div,
#intaCallendar.mobile .inta_modal .mde-header a{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}


/**************************    Mobile profile Modal    ******************************/
#intaProfileModal.mobile input[type='text']:focus,
#intaProfileModal.mobile input[type='password']:focus,
#intaProfileModal.mobile input[type='button']:focus{
    -webkit-box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    -moz-box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    box-shadow: 0px 0px 5px 0px <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
    border-color: <?=hex2rgba($clubInfo[0]["primary_color"], 0.3)?>!important;
}

#intaProfileModal.mobile .button2:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.mobile .button2.active{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}

#intaProfileModal.mobile .button_nav{
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.mobile .button_nav:hover{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.mobile .button1{
    color: black;
}

#intaProfileModal.mobile .button1:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.mobile .button1.active{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
}

#intaProfileModal.mobile input[type='button'] {
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
    border-color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.mobile .ipm-body .ipm-close {
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}


#intaProfileModal.mobile .button_suc{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important;
}
#intaProfileModal.mobile .button_suc:hover{
    background-color: <?=$clubInfo[0]["primary_color"]?>!important; 
}

#intaProfileModal.mobile .ipm-visit_disable{
    color: black!important;
}
#intaProfileModal.mobile .ipm-visit_disable:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
    text-decoration: underline;
}


#intaProfileModal.mobile .button_link:hover{
    color: <?=$clubInfo[0]["primary_color"]?>!important;
}



/**************************    Mobile Calendar    ******************************/
#intaCallendar .mw-header{
    background-color: <?=$clubInfo[0]["secondary_color"]?>!important;
}
#intaCallendar .mw-header .mw-switch_days .mw-for_day{
    background-color: <?=adjustBrightness($clubInfo[0]["secondary_color"], 10)?>!important;
}
#intaCallendar .mw-header .mw-switch_days .mw-for_day a{
    color: <?=$clubInfo[0]["secondary_text_color"]?>!important;
}
#intaCallendar .mw-header .mw-header_title{
    color: <?=$clubInfo[0]["secondary_text_color"]?>!important;
}
#intaCallendar .mw-header .mw-switch_days .inta_table-td.active a{
    color: <?=$clubInfo[0]["primary_color"]?>!important; 
}


</style>

<?php endif;?>



<style type="text/css">

#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item,
#intaCallendar .dw-calendar .dw-filters ul li a.dw-filter-item{
    font-size: <?=$result->desktop_nav_filter_font;?>!important; 
}

#intaCallendar .dm-controls .dm-title_month a,
#intaCallendar .dw-controls .dw-title_month a,
#intaCallendar.desktop .inta_modal .mde-header div{
    font-size: <?=$result->desktop_title_font;?>!important; 
}

#intaCallendar .dm-calendar .dm-for_events table thead td,
#intaCallendar .dw-calendar .dw-for_events table thead td{
    font-size: <?=$result->desktop_days_of_week_font;?>!important; 
}

#intaCallendar .dm-calendar .dm-title a,
#intaCallendar .dm-calendar .dm-begin_time,
#intaCallendar .dw-calendar .dw-title a,
#intaCallendar .dw-calendar .dw-begin_time,
#intaCallendar .inta_modal .mde-event_begining,
#intaCallendar .inta_modal .mde-event_title a{
    font-size: <?=$result->desktop_event_title_time_font;?>!important;  
}

#intaCallendar .dm-calendar .dm-duration,
#intaCallendar .dm-calendar .dm-seats,
#intaCallendar .dw-calendar .dw-seats,
#intaCallendar .dw-calendar .dw-duration,
#intaCallendar .inta_modal .mde-event_duration,
#intaCallendar .inta_modal .mde-event_seats{
    font-size: <?=$result->desktop_event_dur_seats_font;?>!important; 
}

#intaCallendar .dm-calendar .dm-day .dm-day_number{
    font-size: <?=$result->desktop_month_days_numbers_font;?>!important; 
}

#intaCallendar .dw-calendar .dw-for_events table tbody td .dw-day-hour{
    font-size: <?=$result->desktop_week_hours_font;?>!important; 
}

#intaCallendar .inta_filter_1 a{
    font-size: <?=$result->desktop_filter_list_font;?>!important; 
}



#intaCallendar .mw-calendar .mw-halls ul li a,
#intaCallendar .mw-calendar .mw-filters ul li a{
    font-size: <?=$result->mobile_nav_filter_font;?>!important; 
}

#intaCallendar .mw-header .mw-switch_days .inta_table-td a{
    font-size: <?=$result->mobile_days_of_week_font;?>!important;
}

#intaCallendar .mw-header .mw-header_title{
    font-size: <?=$result->mobile_title_font;?>!important;
}

#intaCallendar .mw-event .inta_table .inta_table-td .mw-begining,
#intaCallendar .mw-event .inta_table .inta_table-td .mw-title{
    font-size: <?=$result->mobile_event_title_time_font;?>!important;
}

#intaCallendar .mw-event .inta_table .inta_table-td .mw-duration,
#intaCallendar .mw-event .inta_table .inta_table-td .mw-seats{
    font-size: <?=$result->mobile_event_dur_seats_font;?>!important;
}



</style>



<script type="text/javascript">

    var configData = {
        "apiCode": "<?=$parsed['code'];?>", 
        "apiKey": "<?=$parsed['key'];?>",
        "apiClub": "<?=$parsed['club'];?>",
        // "apiClub": "acro",
        // "apiClub": "kayablum", 
        // "calendarType": null,
        "pluginUrl": "<?=plugin_dir_url(__FILE__);?>", 
        "desktopSettings": {
            "useApiColors": !!<?=$result->use_api_colors;?>,
            "defaultView": "<?=$result->default_view_to_show;?>",
            "filters": { 
                "train": !!<?=$result->desktop_filter_train_show;?>,
                "couch": !!<?=$result->desktop_filter_couch_show;?>,
                "activity": !!<?=$result->desktop_filter_activity_show;?>,
                "complexity": !!<?=$result->desktop_filter_complexity_show;?>, 
            },
            "monthView": {
                "showDuration": !!<?=$result->additional_info_month_duration;?>,
                "showSeats": !!<?=$result->additional_info_month_seats;?>,
                "showEventsPerDay": <?=$result->desktop_month_quantity_trainings;?>,
                "moreText": "<?=$result->desktop_month_more_text;?>"
            },
            "weekView": {
                "showDuration": !!<?=$result->additional_info_week_duration;?>,
                "showSeats": !!<?=$result->additional_info_week_seats;?>,
                "showEventsPerHour": <?=$result->desktop_week_quantity_trainings;?>,
                "moreText": "<?=$result->desktop_week_more_text;?>",
                "hideEmptyRows": !<?=$result->desktop_week_hide_empty_rows;?>
            }
            // "showSeats": !!<?=$result->additional_info_month_seats;?>
            "showDuration": !!<?=$result->additional_info_week_duration;?>,
        },
        "mobileSettings": {
            "useApiColors": !!<?=$result->mobile_use_api_colors;?>,
            "filters": { 
                "train": !!<?=$result->mobile_filter_train_show;?>,
                "couch": !!<?=$result->mobile_filter_couch_show;?>,
                "activity": !!<?=$result->mobile_filter_activity_show;?>,
                "complexity": !!<?=$result->mobile_filter_complexity_show;?>, 
            },
            "weekView": {
                "showDuration": !!<?=$result->mobile_additional_info_week_duration;?>,
                "showSeats": !!<?=$result->mobile_additional_info_week_seats;?>,
            }
        }
    };

</script>
        
        <div id="intaCallendar"></div> 
        

<?php
        
        $output = ob_get_clean();
        return $output;
    }
    add_shortcode('instasport-calendar', 'instasport_shortcode');


    
    wp_register_style( 'inta-calendar-style.css', plugins_url( 'css/inta-calendar-style.css', __FILE__ ) );

    wp_register_script( "jquery.validate.js", plugins_url( "js/jquery.validate.js", __FILE__ ) );
    wp_register_script( "jquery.inputmask.min.js", plugins_url( "js/jquery.inputmask.min.js", __FILE__ ) );
    wp_register_script( "jquery.cookie.js", plugins_url( "js/jquery.cookie.js", __FILE__ ) );
    wp_register_script( "inta-locale.js", plugins_url( "js/inta-locale.js", __FILE__ ) );
    wp_register_script( "inta-calendar.js", plugins_url( "js/inta-calendar.js", __FILE__ ) );
    wp_register_script( "inta-calendar-helper.js", plugins_url( "js/inta-calendar-helper.js", __FILE__ ) );
    wp_register_script( "inta-calendar-desktop-month.js", plugins_url( "js/inta-calendar-desktop-month.js", __FILE__ ) ); 
    wp_register_script( "inta-calendar-desktop-week.js", plugins_url( "js/inta-calendar-desktop-week.js", __FILE__ ) );
    wp_register_script( "inta-calendar-mobile-week.js", plugins_url( "js/inta-calendar-mobile-week.js", __FILE__ ) );
    wp_register_script( "inta-calendar-profile-helper.js", plugins_url( "js/inta-calendar-profile-helper.js", __FILE__ ) );
    wp_register_script( "inta-calendar-profile.js", plugins_url( "js/inta-calendar-profile.js", __FILE__ ) );
    
}
add_action('init', 'instasport_shortcodes_init');


register_activation_hook( __FILE__, 'intacalendar_create_db' );

function intacalendar_create_db(){
    global $wpdb;

    $table_name = $wpdb->prefix."intacalendar_options";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      default_view_to_show ENUM('month', 'week') NOT NULL, 
      use_api_colors ENUM('0', '1') NOT NULL,
      additional_info_month_duration ENUM('1', '0') NOT NULL,
      additional_info_month_seats ENUM('1', '0') NOT NULL,
      additional_info_week_duration ENUM('1', '0') NOT NULL,
      additional_info_week_seats ENUM('1', '0') NOT NULL,
      desktop_month_quantity_trainings varchar(50) NOT NULL,
      desktop_week_quantity_trainings varchar(50) NOT NULL,
      desktop_month_more_text varchar(100) NOT NULL,
      desktop_week_more_text varchar(100) NOT NULL,
      desktop_week_hide_empty_rows ENUM('1', '0') NOT NULL,
      desktop_filter_train_show ENUM('1', '0') NOT NULL,
      desktop_filter_couch_show ENUM('1', '0') NOT NULL,
      desktop_filter_complexity_show ENUM('1', '0') NOT NULL,
      desktop_filter_activity_show ENUM('1', '0') NOT NULL,  
      desktop_nav_filter_font varchar(10) NOT NULL,
      desktop_event_title_time_font varchar(10) NOT NULL,
      desktop_event_dur_seats_font varchar(10) NOT NULL,
      desktop_title_font varchar(10) NOT NULL,
      desktop_days_of_week_font varchar(10) NOT NULL,
      desktop_month_days_numbers_font varchar(10) NOT NULL,
      desktop_week_hours_font varchar(10) NOT NULL,
      desktop_filter_list_font varchar(10) NOT NULL,
      mobile_use_api_colors ENUM('0', '1') NOT NULL,
      mobile_additional_info_week_duration ENUM('1', '0') NOT NULL,
      mobile_additional_info_week_seats ENUM('1', '0') NOT NULL,
      mobile_filter_train_show ENUM('1', '0') NOT NULL,
      mobile_filter_couch_show ENUM('1', '0') NOT NULL,
      mobile_filter_complexity_show ENUM('1', '0') NOT NULL,
      mobile_filter_activity_show ENUM('1', '0') NOT NULL,
      mobile_nav_filter_font varchar(10) NOT NULL,
      mobile_event_title_time_font varchar(10) NOT NULL,
      mobile_event_dur_seats_font varchar(10) NOT NULL,
      mobile_title_font varchar(10) NOT NULL,
      mobile_days_of_week_font varchar(10) NOT NULL,
      PRIMARY KEY  (id)
    ) $charset_collate;";
    

    

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' ); 
    dbDelta( $sql );

    $results = $wpdb->get_results( "SELECT * FROM $table_name WHERE id = 1" );
    if(count($results) == 0){
        
        //$table_name = $wpdb->prefix . 'liveshoutbox';

        $wpdb->insert( 
            $table_name, 
            array( 
                //DESKTOP STYLES
                'default_view_to_show' => 'month',
                'use_api_colors' => 0,
                'additional_info_month_duration' => '1',
                'additional_info_month_seats' => '1',
                'additional_info_week_duration' => '1',
                'additional_info_week_seats' => '1',
                'desktop_month_quantity_trainings' => '2',
                'desktop_week_quantity_trainings' => '2',
                'desktop_month_more_text' => ' ...',
                'desktop_week_more_text' => ' ...',
                'desktop_week_hide_empty_rows' => '1',
                'desktop_filter_train_show' => '1',
                'desktop_filter_couch_show' => '1',
                'desktop_filter_complexity_show' => '1',
                'desktop_filter_activity_show' => '1',
                'desktop_nav_filter_font' => '14px',
                'desktop_event_title_time_font' => '12px',
                'desktop_event_dur_seats_font' => '10px',
                'desktop_title_font' => '16px',
                'desktop_days_of_week_font' => '14px',
                'desktop_month_days_numbers_font' => '12px',
                'desktop_week_hours_font' => '14px',
                'desktop_filter_list_font' => '14px', 
                //MOBILE STYLES
                'mobile_use_api_colors' => 0,
                'mobile_additional_info_week_duration' => '1',
                'mobile_additional_info_week_seats' => '1',
                'mobile_filter_train_show' => '1',
                'mobile_filter_couch_show' => '1',
                'mobile_filter_complexity_show' => '1',
                'mobile_filter_activity_show' => '1', 
                'mobile_nav_filter_font' => '14px',
                'mobile_event_title_time_font' => '14px',
                'mobile_event_dur_seats_font' => '14px',
                'mobile_title_font' => '14px',
                'mobile_days_of_week_font' => '14px',
            ) 
        );
    }



}