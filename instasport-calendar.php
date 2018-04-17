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
                'api_code' => $_POST['api_code'],
                'api_key' => $_POST['api_key'],
                'api_button_color_default' => $_POST['api_button_color_default'],
                'api_button_bg_default' => $_POST['api_button_bg_default'],
                'api_button_color_hover' => $_POST['api_button_color_hover'],
                'api_button_bg_hover' => $_POST['api_button_bg_hover'],
                'default_color_switch_hall_btn' => $_POST['default_color_switch_hall_btn'],
                'default_bg_switch_hall_btn' => $_POST['default_bg_switch_hall_btn'],
                'active_color_switch_hall_btn' => $_POST['active_color_switch_hall_btn'],
                'active_bg_switch_hall_btn' => $_POST['active_bg_switch_hall_btn'],
                'hover_color_switch_hall_btn' => $_POST['hover_color_switch_hall_btn'],
                'hover_bg_switch_hall_btn' => $_POST['hover_bg_switch_hall_btn'],
                'default_color_switch_wiev_btn' => $_POST['default_color_switch_wiev_btn'],
                'default_bg_switch_wiev_btn' => $_POST['default_bg_switch_wiev_btn'],
                'active_color_switch_wiev_btn' => $_POST['active_color_switch_wiev_btn'],
                'active_bg_switch_wiev_btn' => $_POST['active_bg_switch_wiev_btn'],
                'hover_color_switch_wiev_btn' => $_POST['hover_color_switch_wiev_btn'],
                'hover_bg_switch_wiev_btn' => $_POST['hover_bg_switch_wiev_btn'],
                'default_color_arrows' => $_POST['default_color_arrows'],
                'hover_color_arrows' => $_POST['hover_color_arrows'],
                'title_color' => $_POST['title_color'],
                'week_day_name_color' => $_POST['week_day_name_color'],
                'week_day_name_border_bottom_color' => $_POST['week_day_name_border_bottom_color'],
                'number_date_color' => $_POST['number_date_color'],
                'item_event_odd_color' => $_POST['item_event_odd_color'],
                'item_event_odd_bg' => $_POST['item_event_odd_bg'],
                'item_event_even_color' => $_POST['item_event_even_color'],
                'item_event_even_bg' => $_POST['item_event_even_bg'],
                'item_event_today_color' => $_POST['item_event_today_color'],
                'item_event_today_bg' => $_POST['item_event_today_bg'],
                'item_event_border_bottom_color' => $_POST['item_event_border_bottom_color'],
                'hour_value_left_color' => $_POST['hour_value_left_color'],
                'hour_value_left_bg' => $_POST['hour_value_left_bg'],
                'modal_header_text_color' => $_POST['modal_header_text_color'],
                'modal_header_close_color' => $_POST['modal_header_close_color'],
                'modal_header_bg' => $_POST['modal_header_bg'],
                'default_wiev_to_show' => $_POST['default_wiev_to_show'],
                'use_api_colors' => $_POST['use_api_colors'],
                'additional_info_month_duration' => $_POST['additional_info_month_duration'],
                'additional_info_month_seats' => $_POST['additional_info_month_seats'],
                'additional_info_week_duration' => $_POST['additional_info_week_duration'],
                'additional_info_week_seats' => $_POST['additional_info_week_seats'],
                'desktop_month_height_cell' => $_POST['desktop_month_height_cell'],
                'desktop_week_height_cell' => $_POST['desktop_week_height_cell'],
                'desktop_month_quantity_trainings' => $_POST['desktop_month_quantity_trainings'],
                'desktop_week_quantity_trainings' => $_POST['desktop_week_quantity_trainings'],
                'desktop_month_more_text' => $_POST['desktop_month_more_text'],
                'desktop_week_more_text' => $_POST['desktop_week_more_text'],
                'desktop_month_more_text_font_size' => $_POST['desktop_month_more_text_font_size'],
                'desktop_month_more_text_color' => $_POST['desktop_month_more_text_color'],
                'desktop_week_more_text_font_size' => $_POST['desktop_week_more_text_font_size'],
                'desktop_week_more_text_color' => $_POST['desktop_week_more_text_color'],
                'desktop_week_hide_empty_rows' => $_POST['desktop_week_hide_empty_rows'],
                'desktop_filter_bg' => $_POST['desktop_filter_bg'],
                'desktop_filter_text_color' => $_POST['desktop_filter_text_color'],
                'desktop_filter_train_show' => $_POST['desktop_filter_train_show'],
                'desktop_filter_couch_show' => $_POST['desktop_filter_couch_show'],
                //MOBILE STYLES
                'mobile_default_color_switch_hall_btn' => $_POST['mobile_default_color_switch_hall_btn'],
                'mobile_default_bg_switch_hall_btn' => $_POST['mobile_default_bg_switch_hall_btn'],
                'mobile_active_color_switch_hall_btn' => $_POST['mobile_active_color_switch_hall_btn'],
                'mobile_active_bg_switch_hall_btn' => $_POST['mobile_active_bg_switch_hall_btn'],
                'mobile_hover_color_switch_hall_btn' => $_POST['mobile_hover_color_switch_hall_btn'],
                'mobile_hover_bg_switch_hall_btn' => $_POST['mobile_hover_bg_switch_hall_btn'],
                'mobile_default_color_switch_wiev_btn' => $_POST['mobile_default_color_switch_wiev_btn'],
                'mobile_default_bg_switch_wiev_btn' => $_POST['mobile_default_bg_switch_wiev_btn'],
                'mobile_active_color_switch_wiev_btn' => $_POST['mobile_active_color_switch_wiev_btn'],
                'mobile_active_bg_switch_wiev_btn' => $_POST['mobile_active_bg_switch_wiev_btn'],
                'mobile_hover_color_switch_wiev_btn' => $_POST['mobile_hover_color_switch_wiev_btn'],
                'mobile_hover_bg_switch_wiev_btn' => $_POST['mobile_hover_bg_switch_wiev_btn'],
                'mobile_default_color_arrows' => $_POST['mobile_default_color_arrows'],
                'mobile_hover_color_arrows' => $_POST['mobile_hover_color_arrows'],
                'mobile_title_color' => $_POST['mobile_title_color'],
                'mobile_week_day_name_color' => $_POST['mobile_week_day_name_color'],
                'mobile_week_day_name_border_bottom_color' => $_POST['mobile_week_day_name_border_bottom_color'],
                'mobile_today_week_day_bg' => $_POST['mobile_today_week_day_bg'],
                'mobile_dot_big_default_color' => $_POST['mobile_dot_big_default_color'],
                'mobile_dot_big_default_bg' => $_POST['mobile_dot_big_default_bg'],
                'mobile_dot_big_active_color' => $_POST['mobile_dot_big_active_color'],
                'mobile_dot_big_active_bg' => $_POST['mobile_dot_big_active_bg'],
                'mobile_dot_big_today_color' => $_POST['mobile_dot_big_today_color'],
                'mobile_dot_big_today_bg' => $_POST['mobile_dot_big_today_bg'],
                'mobile_dot_big_choosen_color' => $_POST['mobile_dot_big_choosen_color'],
                'mobile_dot_big_choosen_bg' => $_POST['mobile_dot_big_choosen_bg'],
                'mobile_dot_little_bg' => $_POST['mobile_dot_little_bg'],
                'mobile_day_number_default_color' => $_POST['mobile_day_number_default_color'],
                'mobile_day_number_active_color' => $_POST['mobile_day_number_active_color'],
                'mobile_day_number_today_color' => $_POST['mobile_day_number_today_color'],
                'mobile_day_number_choosen_color' => $_POST['mobile_day_number_choosen_color'],
                'mobile_hour_value_left_color' => $_POST['mobile_hour_value_left_color'],
                'mobile_item_event_border_bottom_color' => $_POST['mobile_item_event_border_bottom_color'],   
                //'mobile_modal_header_text_color' => $_POST['mobile_modal_header_text_color'],
                //'mobile_modal_header_close_color' => $_POST['mobile_modal_header_close_color'],
                //'mobile_modal_header_bg' => $_POST['mobile_modal_header_bg'],
                'mobile_default_wiev_to_show' => $_POST['mobile_default_wiev_to_show'],
                'mobile_use_api_colors' => $_POST['mobile_use_api_colors'],
                'mobile_additional_info_month_duration' => $_POST['mobile_additional_info_month_duration'],
                'mobile_additional_info_month_seats' => $_POST['mobile_additional_info_month_seats'],
                'mobile_additional_info_week_duration' => $_POST['mobile_additional_info_week_duration'],
                'mobile_additional_info_week_seats' => $_POST['mobile_additional_info_week_seats'],
                'mobile_modal_month_show' => $_POST['mobile_modal_month_show'],
                'mobile_modal_week_show' => $_POST['mobile_modal_week_show'],
                'mobile_show_dot' => $_POST['mobile_show_dot'],
                'mobile_default_week_circle_bg' => $_POST['mobile_default_week_circle_bg'],
                'mobile_today_week_circle_bg' => $_POST['mobile_today_week_circle_bg'],
                'mobile_choosen_week_circle_bg' => $_POST['mobile_choosen_week_circle_bg'],
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
            
            <h1>Параметры доступа по API</h1>
            <input type="text" name="api_key" value="<?=$result->api_key;?>">
            - KEY<br />
            <input type="text" name="api_code" value="<?=$result->api_code;?>">
            - CODE<br />

            <h4>Настройки цвета кнопки Входа</h4>
            <input type="text" name="api_button_color_default" value="<?=$result->api_button_color_default;?>">
            - Цвет текста кнопки<br />

            <input type="text" name="api_button_bg_default" value="<?=$result->api_button_bg_default;?>">
            - Цвет фона кнопки<br />

            <input type="text" name="api_button_color_hover" value="<?=$result->api_button_color_hover;?>">
            - Цвет текста кнопки при наведении<br />

            <input type="text" name="api_button_bg_hover" value="<?=$result->api_button_bg_hover;?>">
            - Цвет фона кнопки при наведении<br />


            <h1>Основные настройки</h1>
            <h2>Настройки модального окна</h2>
            <input type="text" name="modal_header_text_color" value="<?=$result->modal_header_text_color;?>">
            - Цвет текста в заглавии модального окна<br />

            <input type="text" name="modal_header_close_color" value="<?=$result->modal_header_close_color;?>">
            - Цвет крестика закрытия модального окна<br />

            <input type="text" name="modal_header_bg" value="<?=$result->modal_header_bg;?>">
            - Цвет фона заглавия модального окна<br />


            <h1>Настройки Десктопной версии календаря</h1>


            <h3>Главные настройки</h3>
            <select name="default_wiev_to_show">
                <option <?php if($result->default_wiev_to_show == "month"){echo "selected='selected'";}?> value="month">Месяц</option>
                <option <?php if($result->default_wiev_to_show == "agendaWeek"){echo "selected='selected'";}?> value="agendaWeek">Неделя</option>
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

            <input type="text" name="desktop_month_height_cell" value="<?=$result->desktop_month_height_cell;?>">
            - Высота клеток календаря Месяц-десктоп (Пример - 100px, если указывается auto
            высота клетки будет зависеть от количества тренировок в ней)<br />

            <input type="text" name="desktop_week_height_cell" value="<?=$result->desktop_week_height_cell;?>">
            - Высота клеток календаря Неделя-десктоп (Пример - 100px, если указывается auto
            высота клетки будет зависеть от количества тренировок в ней)<br />

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
            - Показывать/Не показывать строки без тренировок - Неделя <br />

            <select name="desktop_filter_train_show">
                <option <?php if($result->desktop_filter_train_show == "inline-block"){echo "selected='selected'";}?> value="inline-block">Показывать</option>
                <option <?php if($result->desktop_filter_train_show == "none"){echo "selected='selected'";}?> value="none">Не показывать</option>
            </select>
            - Показывать/Не показывать фильтр по тренировкам <br />

            <select name="desktop_filter_couch_show">
                <option <?php if($result->desktop_filter_couch_show == "inline-block"){echo "selected='selected'";}?> value="inline-block">Показывать</option>
                <option <?php if($result->desktop_filter_couch_show == "none"){echo "selected='selected'";}?> value="none">Не показывать</option>
            </select>
            - Показывать/Не показывать фильтр по тренерам <br />






            <h3>Настройки цвета кнопок фильтров</h3>
            <input type="text" name="desktop_filter_bg" value="<?=$result->desktop_filter_bg;?>">
            - Цвет фона кнопки фильтра<br />

            <input type="text" name="desktop_filter_text_color" value="<?=$result->desktop_filter_text_color;?>">
            - Цвет текста кнопки фильтра<br />








            <h3>Настройки цвета и размера шрифта кнопки (СМОТРЕТЬ ДАЛЕЕ)</h3>
            <input type="text" name="desktop_month_more_text_font_size" value="<?=$result->desktop_month_more_text_font_size;?>">
            - Размер шрифта кнопки - Месяц (СМОТРЕТЬ ДАЛЕЕ) <br />

            <input type="text" name="desktop_month_more_text_color" value="<?=$result->desktop_month_more_text_color;?>">
            - Цвет текста кнопки - Месяц (СМОТРЕТЬ ДАЛЕЕ) <br />

            <input type="text" name="desktop_week_more_text_font_size" value="<?=$result->desktop_week_more_text_font_size;?>">
            - Размер шрифта кнопки - Неделя (СМОТРЕТЬ ДАЛЕЕ) <br />

            <input type="text" name="desktop_week_more_text_color" value="<?=$result->desktop_week_more_text_color;?>">
            - Цвет текста кнопки - Неделя (СМОТРЕТЬ ДАЛЕЕ) <br />




            <h3>Настройки цвета кнопок переключения залов</h3>
            <input type="text" name="default_color_switch_hall_btn" value="<?=$result->default_color_switch_hall_btn;?>">
            - Цвет текста не активной кнопки <br />

            <input type="text" name="default_bg_switch_hall_btn" value="<?=$result->default_bg_switch_hall_btn;?>">
            - Цвет фона не активной кнопки <br />

            <input type="text" name="active_color_switch_hall_btn" value="<?=$result->active_color_switch_hall_btn;?>">
            - Цвет текста активной кнопки <br />

            <input type="text" name="active_bg_switch_hall_btn" value="<?=$result->active_bg_switch_hall_btn;?>">
            - Цвет фона активной кнопки <br />

            <input type="text" name="hover_color_switch_hall_btn" value="<?=$result->hover_color_switch_hall_btn;?>">
            - Цвет текста не активной кнопки при наведении <br />

            <input type="text" name="hover_bg_switch_hall_btn" value="<?=$result->hover_bg_switch_hall_btn;?>">
            - Цвет фона не активной кнопки при наведении <br />


            <h3>Настройки цвета кнопок переключения вида календаря</h3>
            <input type="text" name="default_color_switch_wiev_btn" value="<?=$result->default_color_switch_wiev_btn;?>">
            - Цвет текста не активной кнопки <br />

            <input type="text" name="default_bg_switch_wiev_btn" value="<?=$result->default_bg_switch_wiev_btn;?>">
            - Цвет фона не активной кнопки <br />

            <input type="text" name="active_color_switch_wiev_btn" value="<?=$result->active_color_switch_wiev_btn;?>">
            - Цвет текста активной кнопки <br />

            <input type="text" name="active_bg_switch_wiev_btn" value="<?=$result->active_bg_switch_wiev_btn;?>">
            - Цвет фона активной кнопки <br />

            <input type="text" name="hover_color_switch_wiev_btn" value="<?=$result->hover_color_switch_wiev_btn;?>">
            - Цвет текста не активной кнопки при наведении <br />

            <input type="text" name="hover_bg_switch_wiev_btn" value="<?=$result->hover_bg_switch_wiev_btn;?>">
            - Цвет фона не активной кнопки при наведении <br />


            <h3>Настройки цвета элементов вверху календаря</h3>
            <input type="text" name="default_color_arrows" value="<?=$result->default_color_arrows;?>">
            - Цвет стрелок<br />

            <input type="text" name="hover_color_arrows" value="<?=$result->hover_color_arrows;?>">
            - Цвет стрелок при наведении<br />

            <input type="text" name="title_color" value="<?=$result->title_color;?>">
            - Цвет названия текущего месяца(недели)<br />

            <input type="text" name="week_day_name_color" value="<?=$result->week_day_name_color;?>">
            - Цвет названия дней недели<br />

            <input type="text" name="week_day_name_border_bottom_color" value="<?=$result->week_day_name_border_bottom_color;?>">
            - Цвет нижней линии верхушки календаря<br />


            <h3>Настройки цвета элементов ячеек календаря</h3>
            <input type="text" name="number_date_color" value="<?=$result->number_date_color;?>">
            - Цвет даты в ячейке(месяц)<br />

            <input type="text" name="item_event_odd_color" value="<?=$result->item_event_odd_color;?>">
            - Цвет текста в нечетной колонке календаря<br />

            <input type="text" name="item_event_odd_bg" value="<?=$result->item_event_odd_bg;?>">
            - Цвет фона нечетной колонки календаря<br />

            <input type="text" name="item_event_even_color" value="<?=$result->item_event_even_color;?>">
            - Цвет текста в четной колонке календаря<br />

            <input type="text" name="item_event_even_bg" value="<?=$result->item_event_even_bg;?>">
            - Цвет фона четной колонки календаря<br />

            <input type="text" name="item_event_today_color" value="<?=$result->item_event_today_color;?>">
            - Цвет текста в ячейке сегоднешней даты<br />

            <input type="text" name="item_event_today_bg" value="<?=$result->item_event_today_bg;?>">
            - Цвет фона ячейки сегоднешней даты<br />

            <input type="text" name="item_event_border_bottom_color" value="<?=$result->item_event_border_bottom_color;?>">
            - Цвет нижней линии каждой строки с датами<br />

            <input type="text" name="hour_value_left_color" value="<?=$result->hour_value_left_color;?>">
            - Цвет текста времени слева(неделя)<br />

            <input type="text" name="hour_value_left_bg" value="<?=$result->hour_value_left_bg;?>">
            - Цвет фона времени слева(неделя)<br />


            









            <!--    MOBILE STYLE INPUTS     -->
            <h1>Настройки Мобильной версии календаря</h1>


            <h3>Главные настройки</h3>
            <select name="mobile_default_wiev_to_show">
                <option <?php if($result->mobile_default_wiev_to_show == "month"){echo "selected='selected'";}?> value="month">Месяц</option>
                <option <?php if($result->mobile_default_wiev_to_show == "agendaWeek"){echo "selected='selected'";}?> value="agendaWeek">Неделя</option>
            </select>
            - Вид календаря (изначально) <br />

            <select name="mobile_use_api_colors">
                <option <?php if($result->mobile_use_api_colors == 0){echo "selected='selected'";}?> value="0">Выкл</option>
                <option <?php if($result->mobile_use_api_colors == 1){echo "selected='selected'";}?> value="1">Вкл</option>
            </select>
            - Использование API Цветов <br />



            <select name="mobile_additional_info_month_duration">
                <option <?php if($result->mobile_additional_info_month_duration == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_additional_info_month_duration == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Месяц (продолжительность тренировки) <br />

            <select name="mobile_additional_info_month_seats">
                <option <?php if($result->mobile_additional_info_month_seats == "1"){echo "selected='selected'";}?> value="1">Показывать</option>
                <option <?php if($result->mobile_additional_info_month_seats == "0"){echo "selected='selected'";}?> value="0">Не показывать</option>
            </select>
            - дополнительная информация Месяц (свободные места) <br />

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



            <select name="mobile_modal_month_show">
                <option <?php if($result->mobile_modal_month_show == "true"){echo "selected='selected'";}?> value="true">Показывать</option>
                <option <?php if($result->mobile_modal_month_show == "false"){echo "selected='selected'";}?> value="false">Не показывать</option>
            </select>
            - Модальное окно (месяц) <br />

            <select name="mobile_modal_week_show">
                <option <?php if($result->mobile_modal_week_show == "true"){echo "selected='selected'";}?> value="true">Показывать</option>
                <option <?php if($result->mobile_modal_week_show == "false"){echo "selected='selected'";}?> value="false">Не показывать</option>
            </select>
            - Модальное окно (неделя) <br /> 

            <select name="mobile_show_dot">
                <option <?php if($result->mobile_show_dot == "true"){echo "selected='selected'";}?> value="true">Включено</option>
                <option <?php if($result->mobile_show_dot == "false"){echo "selected='selected'";}?> value="false">Выключено</option>
            </select>
            - Вид с точкой <br /> 


            <h3>Настройки цвета кнопок переключения залов</h3>
            <input type="text" name="mobile_default_color_switch_hall_btn" value="<?=$result->mobile_default_color_switch_hall_btn;?>">
            - Цвет текста не активной кнопки <br />

            <input type="text" name="mobile_default_bg_switch_hall_btn" value="<?=$result->mobile_default_bg_switch_hall_btn;?>">
            - Цвет фона не активной кнопки <br />

            <input type="text" name="mobile_active_color_switch_hall_btn" value="<?=$result->mobile_active_color_switch_hall_btn;?>">
            - Цвет текста активной кнопки <br />

            <input type="text" name="mobile_active_bg_switch_hall_btn" value="<?=$result->mobile_active_bg_switch_hall_btn;?>">
            - Цвет фона активной кнопки <br />

            <input type="text" name="mobile_hover_color_switch_hall_btn" value="<?=$result->mobile_hover_color_switch_hall_btn;?>">
            - Цвет текста не активной кнопки при наведении <br />

            <input type="text" name="mobile_hover_bg_switch_hall_btn" value="<?=$result->mobile_hover_bg_switch_hall_btn;?>">
            - Цвет фона не активной кнопки при наведении <br />


            <h3>Настройки цвета кнопок переключения вида календаря</h3>
            <input type="text" name="mobile_default_color_switch_wiev_btn" value="<?=$result->mobile_default_color_switch_wiev_btn;?>">
            - Цвет текста не активной кнопки <br />

            <input type="text" name="mobile_default_bg_switch_wiev_btn" value="<?=$result->mobile_default_bg_switch_wiev_btn;?>">
            - Цвет фона не активной кнопки <br />

            <input type="text" name="mobile_active_color_switch_wiev_btn" value="<?=$result->mobile_active_color_switch_wiev_btn;?>">
            - Цвет текста активной кнопки <br />

            <input type="text" name="mobile_active_bg_switch_wiev_btn" value="<?=$result->mobile_active_bg_switch_wiev_btn;?>">
            - Цвет фона активной кнопки <br />

            <input type="text" name="mobile_hover_color_switch_wiev_btn" value="<?=$result->mobile_hover_color_switch_wiev_btn;?>">
            - Цвет текста не активной кнопки при наведении <br />

            <input type="text" name="mobile_hover_bg_switch_wiev_btn" value="<?=$result->mobile_hover_bg_switch_wiev_btn;?>">
            - Цвет фона не активной кнопки при наведении <br />


            <h3>Настройки цвета элементов вверху календаря</h3>
            <input type="text" name="mobile_default_color_arrows" value="<?=$result->mobile_default_color_arrows;?>">
            - Цвет стрелок<br />

            <input type="text" name="mobile_hover_color_arrows" value="<?=$result->mobile_hover_color_arrows;?>">
            - Цвет стрелок при наведении<br />

            <input type="text" name="mobile_title_color" value="<?=$result->mobile_title_color;?>">
            - Цвет названия текущего месяца(недели)<br />

            <input type="text" name="mobile_week_day_name_color" value="<?=$result->mobile_week_day_name_color;?>">
            - Цвет названия дней недели<br />

            <input type="text" name="mobile_week_day_name_border_bottom_color" value="<?=$result->mobile_week_day_name_border_bottom_color;?>">
            - Цвет нижней линии верхушки календаря<br />


            <h3>Настройки цвета элементов ячеек календаря</h3>
            <input type="text" name="mobile_today_week_day_bg" value="<?=$result->mobile_today_week_day_bg;?>">
            - Цвет дня текущей даты (неделя) <br />

            <input type="text" name="mobile_dot_big_default_color" value="<?=$result->mobile_dot_big_default_color;?>">
            - Цвет текста в кружке без тренировок(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_default_bg" value="<?=$result->mobile_dot_big_default_bg;?>">
            - Цвет фона кружка без тренировок(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_active_color" value="<?=$result->mobile_dot_big_active_color;?>">
            - Цвет текста в кружке с тренировками(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_active_bg" value="<?=$result->mobile_dot_big_active_bg;?>">
            - Цвет фона кружка с тренировками(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_today_color" value="<?=$result->mobile_dot_big_today_color;?>">
            - Цвет текста в кружке текущей даты(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_today_bg" value="<?=$result->mobile_dot_big_today_bg;?>">
            - Цвет фона кружка текущей даты(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_choosen_color" value="<?=$result->mobile_dot_big_choosen_color;?>">
            - Цвет текста в выбранном кружке(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_big_choosen_bg" value="<?=$result->mobile_dot_big_choosen_bg;?>">
            - Цвет фона в выбранном кружке(при вкл. кружке)<br />

            <input type="text" name="mobile_dot_little_bg" value="<?=$result->mobile_dot_little_bg;?>">
            - Цвет фона маленького кружка(при вкл. кружке)<br />

            <input type="text" name="mobile_day_number_default_color" value="<?=$result->mobile_day_number_default_color;?>">
            - Цвет даты без тренировок (при выкл. кружке)<br />

            <input type="text" name="mobile_day_number_active_color" value="<?=$result->mobile_day_number_active_color;?>">
            - Цвет даты с тренировками (при выкл. кружке)<br />

            <input type="text" name="mobile_day_number_today_color" value="<?=$result->mobile_day_number_today_color;?>">
            - Цвет даты текущей даты (при выкл. кружке)<br />

            <input type="text" name="mobile_day_number_choosen_color" value="<?=$result->mobile_day_number_choosen_color;?>">
            - Цвет даты выбранной даты (при выкл. кружке)<br />

            <input type="text" name="mobile_hour_value_left_color" value="<?=$result->mobile_hour_value_left_color;?>">
            - Цвет времени слева(неделя)<br />

            <input type="text" name="mobile_item_event_border_bottom_color" value="<?=$result->mobile_item_event_border_bottom_color;?>">
            - Цвет нижней линии каждой строки <br />

            <input type="text" name="mobile_default_week_circle_bg" value="<?=$result->mobile_default_week_circle_bg;?>">
            - Цвет кружка с тренировками (неделя) <br />

            <input type="text" name="mobile_today_week_circle_bg" value="<?=$result->mobile_today_week_circle_bg;?>">
            - Цвет кружка текущей даты (неделя) <br />

            <input type="text" name="mobile_choosen_week_circle_bg" value="<?=$result->mobile_choosen_week_circle_bg;?>">
            - Цвет выбранного кружка (неделя) <br />






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

        wp_enqueue_style('fullcalendar.min.css');
        wp_enqueue_style('modal-style.css');
        wp_enqueue_style('mycalendar.css');
        wp_enqueue_style('bootstrap.min.css');
        wp_enqueue_style('inta-modal.css');
        wp_enqueue_script('fontawesome'); 
        //wp_enqueue_script('jquery.min.js');
        //wp_enqueue_script('modal.js');
        //wp_enqueue_script('bootstrap.min.js');
        wp_enqueue_script('moment.min.js');
        wp_enqueue_script('fullcalendar.min.js');
        wp_enqueue_script('locale-all.js');
        //wp_enqueue_script('ru.js');

        //wp_enqueue_script('initfullcallendar.js');
        //wp_enqueue_script('moment-with-locales.min.js');
        //wp_enqueue_script('fullcalendar.min.js');
        //wp_enqueue_script('ru.js');
        //wp_enqueue_script('main.js');
        wp_enqueue_script('jquery.validate.js');
        wp_enqueue_script('validate.js');
        wp_enqueue_script('mymain.js');
        wp_enqueue_script('bootstrap.min.js');
        wp_enqueue_script('profile.js');
        wp_enqueue_script('jquery.cookie.js');
        wp_enqueue_script('modal.js');

        $table_name = $wpdb->prefix."intacalendar_options";
        $result = $wpdb->get_row( "SELECT * FROM $table_name WHERE id = 1" );
        //echo $result->switch_halls_button_bg;


        $parsed = shortcode_atts(array('club' => ''), $atts, $tag);

        ob_start();
        //include("mycalendar-btn-enter.php");
        include("mycalendar-mobile.php");
        include("mycalendar-desktop.php");
?>

<style type="text/css">

/*Desktop styles
********************************************************************/
    /*
    ********************************************************************/
    

    /*Styles for button ENTER-API*/
    #intaAuthTop{
        padding: 5px 10px;
        background-color: <?=$result->api_button_bg_default;?>;
        color: <?=$result->api_button_color_default;?>;
        display: inline-block;
        margin-bottom: 8px;
    }
    #intaAuthTop:hover{
        background-color: <?=$result->api_button_bg_hover;?>;
        color: <?=$result->api_button_color_hover;?>;
    }



    /*Styles for button MORE in table cell*/
    .mycalendar-desktop .mymonthcalendar.mycalendar>table>tbody>tr>td .more-items{
        font-size: <?=$result->desktop_month_more_text_font_size;?>!important;
        color: <?=$result->desktop_month_more_text_color;?>;
    }
    .mycalendar-desktop .myweekcalendar.mycalendar>table>tbody>tr>td .more-items{
        font-size: <?=$result->desktop_week_more_text_font_size;?>!important;
        color: <?=$result->desktop_week_more_text_color;?>;
    }




    /*Styles for filter buttons*/
    .filters a{
        background-color: <?=$result->desktop_filter_bg;?>!important;
        color: <?=$result->desktop_filter_text_color;?>!important;
    }
    .filters .filter-by-traine{
        display: <?=$result->desktop_filter_train_show;?>!important;
    }
    .filters .filter-by-couch{
        display: <?=$result->desktop_filter_couch_show;?>!important;
    }




    .mycalendar-desktop .switch-halls-mycalendar .switch-btn{
        background-color: <?=$result->default_bg_switch_hall_btn;?>!important;
        color: <?=$result->default_color_switch_hall_btn;?>!important;
    }
    .mycalendar-desktop .switch-halls-mycalendar .switch-btn:hover{
        background-color: <?=$result->hover_bg_switch_hall_btn;?>!important;
        color: <?=$result->hover_color_switch_hall_btn;?>!important;
    }
    .mycalendar-desktop .switch-halls-mycalendar .switch-btn.active{
        background-color: <?=$result->active_bg_switch_hall_btn;?>!important;
        color: <?=$result->active_color_switch_hall_btn;?>!important;
        cursor: default;
    }

    .mycalendar-desktop .mymonthcalendar.mycalendar>table>tbody>tr>td{
        height: <?=$result->desktop_month_height_cell;?>!important; 
    }

    .mycalendar-desktop .switch-type-mycalendars .switch-btn{
        background-color: <?=$result->default_bg_switch_wiev_btn;?>!important;
        color: <?=$result->default_color_switch_wiev_btn;?>!important;
    }
    .mycalendar-desktop .switch-type-mycalendars .switch-btn:hover{
        background-color: <?=$result->hover_bg_switch_wiev_btn;?>!important;
        color: <?=$result->hover_color_switch_wiev_btn;?>!important;
    }
    .mycalendar-desktop .switch-type-mycalendars .switch-btn.active{
        background-color: <?=$result->active_bg_switch_wiev_btn;?>!important;
        color: <?=$result->active_color_switch_wiev_btn;?>!important;
        cursor: default;
    }
    .mycalendar-desktop .mycalendar>table>thead div.calendar-title{
        color: <?=$result->title_color;?>!important;
    }
    .mycalendar-desktop .mycalendar>table>thead div.calendar-title a{
        color: <?=$result->default_color_arrows;?>!important;
    }
    .mycalendar-desktop .mycalendar>table>thead div.calendar-title a:hover{
        color: <?=$result->hover_color_arrows;?>!important;
    }

    .mycalendar-desktop .mycalendar>table>thead>tr:last-child>td{
        color: <?=$result->week_day_name_color;?>!important;
        border-color: <?=$result->week_day_name_border_bottom_color;?>!important;
    }

    .mycalendar-desktop .mycalendar>table>tbody>tr>td .day-number{
        color: <?=$result->number_date_color;?>;
    }

<?php if($result->use_api_colors == 0):?>
    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(odd){
        background-color: <?=$result->item_event_odd_bg;?>!important; 
        color: <?=$result->item_event_odd_color;?>!important; 
    }
<?php endif;?>

    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(odd) .events{
        color: <?=$result->item_event_odd_color;?>;
    }
    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(odd) .item-event .item-event-title .three-dot{
        background-color: <?=$result->item_event_odd_bg;?>;
    }

<?php if($result->use_api_colors == 0):?>
    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(even){
        background-color: <?=$result->item_event_even_bg;?>!important;
        color: <?=$result->item_event_even_color;?>!important;  
    }
<?php endif;?>

    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(even) .events{
        color: <?=$result->item_event_even_color;?>;
    }
    .mycalendar-desktop .mycalendar>table>tbody>tr>td:nth-child(even) .item-event .item-event-title .three-dot{
        background-color: <?=$result->item_event_even_bg;?>;
    }


<?php if($result->use_api_colors == 0):?>
    .mycalendar-desktop .mycalendar>table>tbody>tr>td.today .item-event{
        background-color: <?=$result->item_event_today_bg;?>!important;
        color: <?=$result->item_event_today_color;?>!important;
    }
    .mycalendar-desktop .mycalendar>table>tbody>tr>td.today .item-event .item-event-title .three-dot{
        background-color: <?=$result->item_event_today_bg;?>!important;
    }
<?php endif;?>


    .mycalendar-desktop .mycalendar>table>tbody>tr>td.today{
        background-color: <?=$result->item_event_today_bg;?>!important;
    }

    .mycalendar-desktop .mycalendar>table>tbody>tr>td{
        border-color: <?=$result->item_event_border_bottom_color;?>!important;
    }


    .mycalendar-desktop .myweekcalendar.mycalendar>table>tbody>tr>td:first-child{
        color: <?=$result->hour_value_left_color;?>!important;
        background-color: <?=$result->hour_value_left_bg;?>!important;
    }

    .mycalendar-desktop .myweekcalendar.mycalendar>table>tbody>tr>td{
        height: <?=$result->desktop_week_height_cell;?>!important; 
    }
    

    #calendarModal .modal-header{
        color: <?=$result->modal_header_text_color;?>!important;
        background-color: <?=$result->modal_header_bg;?>!important;
    }
    #calendarModal .modal-header .close{
        color: <?=$result->modal_header_close_color;?>!important;
    }







/*Mobile styles
********************************************************************/
    /*
    ********************************************************************/
    .mycalendar-mobile .switch-halls-mycalendar .switch-btn{
        background-color: <?=$result->mobile_default_bg_switch_hall_btn;?>!important;
        color: <?=$result->mobile_default_color_switch_hall_btn;?>!important;
    }
    .mycalendar-mobile .switch-halls-mycalendar .switch-btn:hover{
        background-color: <?=$result->mobile_hover_bg_switch_hall_btn;?>!important;
        color: <?=$result->mobile_hover_color_switch_hall_btn;?>!important;
    }
    .mycalendar-mobile .switch-halls-mycalendar .switch-btn.active{
        background-color: <?=$result->mobile_active_bg_switch_hall_btn;?>!important;
        color: <?=$result->mobile_active_color_switch_hall_btn;?>!important;
        cursor: default;
    }

    .mycalendar-mobile .switch-type-mycalendars .switch-btn{
        background-color: <?=$result->mobile_default_bg_switch_wiev_btn;?>!important;
        color: <?=$result->mobile_default_color_switch_wiev_btn;?>!important;
    }
    .mycalendar-mobile .switch-type-mycalendars .switch-btn:hover{
        background-color: <?=$result->mobile_hover_bg_switch_wiev_btn;?>!important;
        color: <?=$result->mobile_hover_color_switch_wiev_btn;?>!important;
    }
    .mycalendar-mobile .switch-type-mycalendars .switch-btn.active{
        background-color: <?=$result->mobile_active_bg_switch_wiev_btn;?>!important;
        color: <?=$result->mobile_active_color_switch_wiev_btn;?>!important;
        cursor: default;
    }
    .mycalendar-mobile .mycalendar>table>thead div.calendar-title{
        color: <?=$result->mobile_title_color;?>!important;
    }
    .mycalendar-mobile .mycalendar>table>thead div.calendar-title a{
        color: <?=$result->mobile_default_color_arrows;?>!important;
    }
    .mycalendar-mobile .mycalendar>table>thead div.calendar-title a:hover{
        color: <?=$result->mobile_hover_color_arrows;?>!important;
    }

    .mycalendar-mobile .mycalendar>table>thead>tr:last-child>td{
        color: <?=$result->mobile_week_day_name_color;?>!important;
        border-color: <?=$result->mobile_week_day_name_border_bottom_color;?>!important;
    }


    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td .day-number{
        background-color: <?=$result->mobile_dot_big_default_bg;?>;
        color: <?=$result->mobile_dot_big_default_color;?>;
    }
    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td.active .day-number{
        background-color: <?=$result->mobile_dot_big_active_bg;?>;
        color: <?=$result->mobile_dot_big_active_color;?>;
    }

    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td.today{
        background-color: <?=$result->mobile_today_week_day_bg;?>!important;
    }
    /*.mycalendar-mobile .mycalendar.dot>table>tbody>tr>td.today{
        background-color: red!important;
    }*/

    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td.today.active .day-number,
    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td.today .day-number{
        background-color: <?=$result->mobile_dot_big_today_bg;?>!important;
        color: <?=$result->mobile_dot_big_today_color;?>!important;
    }
    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td.choosen.active .day-number{
        background-color: <?=$result->mobile_dot_big_choosen_bg;?>!important;
        color: <?=$result->mobile_dot_big_choosen_color;?>!important;
    }
    .mycalendar-mobile .mycalendar.dot>table>tbody>tr>td .for-circle .circle{
        background-color: <?=$result->mobile_dot_little_bg;?>!important;
    }


    .mycalendar-mobile .mycalendar>table>tbody>tr>td .day-number{
        color: <?=$result->mobile_day_number_default_color;?>;
    }
    .mycalendar-mobile .mycalendar>table>tbody>tr>td.active .day-number{
        color: <?=$result->mobile_day_number_active_color;?>;
    }
    .mycalendar-mobile .mycalendar>table>tbody>tr>td.today.active .day-number,
    .mycalendar-mobile .mycalendar>table>tbody>tr>td.today .day-number{
        color: <?=$result->mobile_day_number_today_color;?>!important;
    }
    .mycalendar-mobile .mycalendar>table>tbody>tr>td.choosen.active .day-number{
        color: <?=$result->mobile_day_number_choosen_color;?>!important;
    }



    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td:first-child{
        color: <?=$result->mobile_hour_value_left_color;?>!important;
    }
    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td{
        border-color: <?=$result->mobile_item_event_border_bottom_color;?>!important;
    }




    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td .circle{
        background-color: <?=$result->mobile_default_week_circle_bg;?>;
    }
    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td.today.active .circle{
        background-color: <?=$result->mobile_today_week_circle_bg;?>;
    }
    .mycalendar-mobile .mycalendar.myweekcalendar>table>tbody>tr>td.choosen.active .circle{
        background-color: <?=$result->mobile_choosen_week_circle_bg;?>!important;
    }



      
</style>


<script type="text/javascript">

    var apiCode = '<?=$result->api_code;?>';  
    var apiKey = '<?=$result->api_key;?>';
    var apiClub = '<?=$parsed['club'];?>';
    //var apiCode = <?=$result->api_code;?>;
    //alert("<?=$result->api_code;?>");   
</script>


    <!--   CALENDAR MODAL   -->
    <div class="inta-auth-top-modal">
        
        <!-- Trigger the modal with a button 
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>-->
        
        <!-- Modal -->
        <div id="intaAuthTopModal" class="modal fade" role="dialog">
          <div class="modal-dialog modal-lg">
        
            <!-- Modal content-->
            <div class="modal-content">
              
              
              <div class="modal-preload">
                    <table>
                        <tr>
                            <td>
                                <div class="loader"></div>
                            </td>
                        </tr>
                    </table>
              </div>
              
              
              <div class="modal-nav">
                    <!--<a class="modal-nav-close" href="#">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>-->
                    <table>
                        <tr>
                            <td>
                                <ul>
                                    <li><a class="modal-nav-profile" href="#">Профайл</a></li>
                                    <li><a class="modal-nav-visit" href="#">Записи</a></li>
                                    <li><a class="modal-nav-order-visit" href="#">Записаться на тренировку</a></li>
                                    <li><a class="modal-nav-logout" href="#">Выход</a></li> 
                                </ul>
                            </td>
                        </tr>
                    </table>
              </div>
            
              <div class="modal-header">
                <a class="modal-close" href="#">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <h4 class="modal-title">
                    <a class="cm-navbar-toggle" href="#">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <span class="modal-title-name">
                        <?php if(isset($_COOKIE['intaName'])){echo $_COOKIE['intaName'];}else{echo "Аккаунт";}?>
                    </span>
                </h4>
              </div>
              
              <div class="modal-breadcrumbs">
              
              </div>
              
              
              <div class="modal-choose-event">
                    <div class="modal-choose-event-menu">
                        <a href="#" class="cm-navbar-toggle-2">Меню</a>
                        <a href="#" class="modal-nav-logout">Выйти</a>
                    </div>
                    <h4>Запись на тренировку<br><span></span></h4>
                    <div class="temp">
                        <div class="cm-title">Название: <span>Индивид-я тренировка</span></div>
                        <div class="cm-hall">Зал: <span>СК Олимпийский (Физкультуры 1, К3)</span></div>
                        <div class="cm-price">Цена: <span>450</span></div>
                        <div class="cm-date">Дата: <span>2018-03-28</span></div>
                        <div class="cm-time">Время: <span>20:00:00</span></div>
                        <div class="cm-duration">Продолжительность: <span>01:00:00</span></div>
                    </div>
                    <div class='for-btn'>
                        <a href='#' class='btn' id='btnTopCheckIn'>Записаться</a>
                    </div>
              </div>
              
              
              <div class="modal-auth">
                  
                  <ul class="nav nav-tabs nav-1">
                    <li class="active"><a data-toggle="tab" href="#home">Вход</a></li>
                    <li><a data-toggle="tab" href="#menu1">Регистрация</a></li>
                  </ul>
                
                  <div class="tab-content tab-content-1">
                    <div id="home" class="tab-pane fade in active">
                        
                        <ul class="nav nav-tabs nav-1-1">
                            <li class="active"><a data-toggle="tab" href="#homeEmail">Email</a></li>
                            <li><a data-toggle="tab" href="#homePhone">Телефон</a></li>
                        </ul>
                        
                        <div class="tab-content tab-content-1-1">
                            <div id="homeEmail" class="tab-pane fade in active">
                                
                                <div class="cm-log">
                    
                                    <form id="api-top-login-email" action="/" method="post" role="form">
                                                                            
                                        <div class="form-group field-apiTopLoginEmail-email required has-error">

                                            <input type="text" id="apiTopLoginEmail-email" class="form-control" name="email" placeholder="E-mail">

                                            <label id="apiTopLoginEmail-email-error" class="error" for="apiTopLoginEmail-email"></label>

                                        </div>                                                                        
                                        <div class="form-group field-apiTopLoginEmail-password required has-error">

                                            <input type="password" id="apiTopLoginEmail-password" class="form-control" name="password" placeholder="Пароль">

                                        </div>                                                                        
                                        <button type="button" class="btn">Войти</button>    

                                    </form>
                                    
                                </div>
                                
                            </div>
                            <div id="homePhone" class="tab-pane fade">
                            
                                <div class="cm-log">
                    
                                    <form id="api-top-login" action="/" method="post" role="form">
                                    
                                        <div class="form-group field-apiTopLogin required has-error">

                                            <input type="text" id="apiTopLogin" class="form-control" name="phone" placeholder="+380xxxxxxxxx">

                                            <label id="apiTopLogin-error" class="error" for="apiTopLogin"></label>

                                        </div>
                                        <button type="button" class="btn">Войти</button>                                       
                                    </form>
                                    
                                </div>
                            
                            </div>
                        </div>
                      
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        
                        <ul class="nav nav-tabs nav-1-1">
                            <li class="active"><a data-toggle="tab" href="#menu1Email">Email</a></li>
                            <li><a data-toggle="tab" href="#menu1Phone">Телефон</a></li>
                        </ul>
                        
                        <div class="tab-content tab-content-1-1">
                            <div id="menu1Email" class="tab-pane fade in active">
                                
                                <div class="cm-reg">
                            
                                    
                                    <form id="api-top-register-email" action="" method="post">                                    
                                        
                                        <div class="form-group field-apiTopRegisterEmail-email">
                                            <input type="text" class="form-control" id="apiTopRegisterEmail-email" name="email" placeholder="E-mail">
                                            <label id="apiTopRegisterEmail-email-error" class="error" for="apiTopRegisterEmail-email"></label>
                                        </div>

                                        <div class="form-group field-apiTopRegisterEmail-first_name">
                                            <input type="text" class="form-control" id="apiTopRegisterEmail-first_name" name="first_name" placeholder="Имя">
                                            <label id="apiTopRegisterEmail-first_name-error" class="error" for="apiTopRegisterEmail-first_name"></label>
                                        </div>

                                        <div class="form-group field-apiTopRegisterEmail-last_name">
                                            <input type="text" id="apiTopRegisterEmail-last_name" class="form-control" name="last_name" placeholder="Фамилия">
                                            <label id="apiTopRegisterEmail-last_name-error" class="error" for="apiTopRegisterEmail-last_name"></label>
                                        </div>

                                        <div class="form-group field-apiTopRegisterEmail-password">
                                            <input type="password" id="apiTopRegisterEmail-password" class="form-control" name="password" placeholder="Пароль">
                                            <label id="apiTopRegisterEmail-password-error" class="error" for="apiTopRegisterEmail-password"></label>
                                        </div>

                                        <div class="form-group field-apiTopRegisterEmail-password_confirm">
                                            <input type="password" id="apiTopRegisterEmail-password_confirm" class="form-control" name="password_confirm" placeholder="Подтверждение пароля">
                                            <label id="apiTopRegisterEmail-password_confirm-error" class="error" for="apiTopRegisterEmail-password_confirm"></label>
                                        </div>

                                        <button type="button" class="btn" name="apiRegisterEmail">Зарегистрироваться</button>                                       
                                    </form>

                                </div>
                                
                            </div>
                            <div id="menu1Phone" class="tab-pane fade">
                            
                                <div class="cm-reg">
                            
                                    
                                    <form id="api-top-register" action="" method="post">                                    
                                        
                                        <div class="form-group field-apiTopRegister">
                                            <input type="text" id="apiTopRegister" class="form-control" name="phone" placeholder="+380xxxxxxxxx">
                                            <label id="apiTopRegister-error" class="error" for="apiTopRegister"></label>
                                        </div>

                                        <div class="form-group field-apiTopFirstName">
                                            <input type="text" id="apiTopFirstName" class="form-control" name="first_name" placeholder="Имя">
                                            <label id="apiTopFirstName-error" class="error" for="apiTopFirstName"></label>
                                        </div>

                                        <div class="form-group field-apiTopLastName">
                                            <input type="text" id="apiTopLastName" class="form-control" name="last_name" placeholder="Фамилия">
                                            <label id="apiTopLastName-error" class="error" for="apiTopLastName"></label>
                                        </div>

                                        <button type="button" class="btn" name="apiRegister">Зарегистрироваться</button>                                       
                                    </form>

                                    
                                </div>
                            
                            </div>
                        </div> 
                           
                                
                      
                    </div>
                  </div>
                  
              </div>
              
              
              <div class="modal-code-confirm">
                    
                    <form id="api-top-code" action="/" method="post" data-action="">                
                        <div class="form-group field-apiTopCode">
                            <label class="control-label" for="apiTopCode">Код подтверждения</label>
                            <input type="text" id="apiTopCode" class="form-control" name="code" placeholder="xxxx">
                            <label id="apiTopCode-error" class="error" for="apiTopCode"></label>
                        </div>                        
                        <button type="button" class="btn" ip="sendApiTopCode">Отправить</button>                       
                    </form>

              </div>
              
              
              <div class="modal-body">
                  
                  <div class="cm-visit cm-item" style="display: none;"></div>
                  
                  <div class="cm-profile cm-item" style="<?php if(!isset($_COOKIE['intaToken'])){echo "display: none;";}?>">
                        
                        <div class="row big">
                            <div class="col-xs-6 col">
                                <table>
                                    <tr>
                                        <td>
                                            Имя:
                                        </td>
                                        <td>
                                            <div class="cm-profile-first-name"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Телефон:
                                        </td>
                                        <td>
                                            <div class="cm-profile-phone"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            E-mail:
                                        </td>
                                        <td>
                                            <div class="cm-profile-email"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-xs-6 col">
                                <table>
                                    <tr>
                                        <td>
                                            Фамилия:
                                        </td>
                                        <td>
                                            <div class="cm-profile-last-name"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            id:
                                        </td>
                                        <td>
                                            <div class="cm-profile-id"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Зарегистрирован:
                                        </td>
                                        <td>
                                            <div class="cm-profile-registered"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        
                        <div class="row small">
                            <div class="col-xs-12 col">
                                <table>
                                    <tr>
                                        <td>
                                            Имя:
                                        </td>
                                        <td>
                                            <div class="cm-profile-first-name-small"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Фамилия:
                                        </td>
                                        <td>
                                            <div class="cm-profile-last-name-small"></div>
                                        </td>
                                    </tr>
                                    <!--<tr>
                                        <td>
                                            id:
                                        </td>
                                        <td>
                                            <div class="cm-profile-id-small"></div>
                                        </td>
                                    </tr>-->
                                    <tr>
                                        <td>
                                            Телефон:
                                        </td>
                                        <td>
                                            <div class="cm-profile-phone-small"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            E-mail:
                                        </td>
                                        <td>
                                            <div class="cm-profile-email-small"></div>
                                        </td>
                                    </tr>
                                    <!--<tr>
                                        <td>
                                            Зарегистрирован:
                                        </td>
                                        <td>
                                            <div class="cm-profile-registered-small"></div>
                                        </td>
                                    </tr>-->
                                </table>
                            </div>
                        </div>
                        
                        
                  </div>
                  
                  
                  <div class="cm-check-in-success cm-item" style="display: none;">
                    <h4>Вы успешно записались на тренировку!</h4>
                    
                    <div class="temp">
                        <div class="cm-title">Название: <span>Индивид-я тренировка</span></div>
                        <div class="cm-hall">Зал: <span>СК Олимпийский (Физкультуры 1, К3)</span></div>
                        <div class="cm-price">Цена: <span>450</span></div>
                        <div class="cm-date">Дата: <span>2018-03-28</span></div>
                        <div class="cm-time">Время: <span>20:00:00</span></div>
                        <div class="cm-duration">Продолжительность: <span>01:00:00</span></div>
                    </div>
                    
                    <div class='for-btn'>
                        <a href='#' class='btn btn-close'>Ok</a>
                        <a href='#' class='btn' id='btnTopCheckOut' data-id=''>Отменить</a>
                    </div>
                  </div>
                  
                  
                  <div class="cm-check-in-error cm-item" style="display: none;">
                    Запись на эту тренировку не доступна!
                  </div>
                
              </div>
            </div>
        
          </div>
        </div>
        
    </div><!--   /CALENDAR MODAL   -->






        <div id="events-on-day"></div>
        <div id="full-text"></div>
        <div style="display: none;" class="date-interval">
            <div class="date-begin"></div>
            <div class="date-end"></div>
        </div>
        <div style="display: none;" id="club-name"><?=$parsed['club'];?></div>
        <div style="display: none;" id="mobile-month-show-dot"><?=$result->mobile_show_dot;?></div>
        <div style="display: none;" id="mobile-month-inplace"><?=$result->mobile_modal_month_show;?></div>
        <div style="display: none;" id="mobile-week-inplace"><?=$result->mobile_modal_week_show;?></div>
        <div style="display: none;" id="desktop-typecalendar"><?=$result->default_wiev_to_show;?></div>
        <div style="display: none;" id="use-api-colors"><?=$result->use_api_colors;?></div>
        
        <div style="display: none;" id="desktop-month-duration"><?=$result->additional_info_month_duration;?></div>
        <div style="display: none;" id="desktop-month-seats"><?=$result->additional_info_month_seats;?></div>
        <div style="display: none;" id="desktop-week-duration"><?=$result->additional_info_week_duration;?></div>
        <div style="display: none;" id="desktop-week-seats"><?=$result->additional_info_week_seats;?></div>

        <div style="display: none;" id="desktop-month-quantity-trainings"><?=$result->desktop_month_quantity_trainings;?></div>
        <div style="display: none;" id="desktop-week-quantity-trainings"><?=$result->desktop_week_quantity_trainings;?></div>

        <div style="display: none;" id="desktop-month-more-text"><?=$result->desktop_month_more_text;?></div>
        <div style="display: none;" id="desktop-week-more-text"><?=$result->desktop_week_more_text;?></div>

        <div style="display: none;" id="desktop-week-hide-empty-rows"><?=$result->desktop_week_hide_empty_rows;?></div>

        <div style="display: none;" id="mobile-typecalendar"><?=$result->mobile_default_wiev_to_show;?></div>
        <div style="display: none;" id="mobile-use-api-colors"><?=$result->mobile_use_api_colors;?></div>

        <div style="display: none;" id="mobile-month-duration"><?=$result->mobile_additional_info_month_duration;?></div>
        <div style="display: none;" id="mobile-month-seats"><?=$result->mobile_additional_info_month_seats;?></div>
        <div style="display: none;" id="mobile-week-duration"><?=$result->mobile_additional_info_week_duration;?></div>
        <div style="display: none;" id="mobile-week-seats"><?=$result->mobile_additional_info_week_seats;?></div>
        
        <div class="calen-tab">
            <div class="cld-tabs"></div>
        </div>
        <div id="calendar-desktop"></div>
        <div id="calendar-mobile"></div>
        <div id="calendar-data-mobile" data-full="notfull"></div>
        <div id="calendar-data-desktop" data-full="notfull"></div>



<?php
        include("modal.php");

        $output = ob_get_clean();
        return $output;
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
    //wp_register_style( 'mycalendars.css', plugins_url( 'css/mycalendars.css', __FILE__ ) );
    wp_register_style( 'mycalendar.css', plugins_url( 'css/mycalendar.css', __FILE__ ) );
    wp_register_style( 'bootstrap.min.css', plugins_url( 'css/bootstrap.min.css', __FILE__ ) );
    wp_register_style( 'inta-modal.css', plugins_url( 'css/inta-modal.css', __FILE__ ) ); 
    
    wp_register_script( "fontawesome", "https://use.fontawesome.com/8f02526f3f.js", __FILE__ );
    wp_register_script( "jquery.min.js", "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", __FILE__ );

    wp_register_script( "modal.js", plugins_url( "modal/modal.js", __FILE__ ) );

    wp_register_script( "moment.min.js", plugins_url( "js/fullcalendar/moment.min.js", __FILE__ ) ); 
    wp_register_script( "fullcalendar.min.js", plugins_url( "js/fullcalendar/fullcalendar.min.js", __FILE__ ) );
    wp_register_script( "locale-all.js", plugins_url( "js/fullcalendar/locale-all.js", __FILE__ ) );
    //wp_register_script( "ru.js", plugins_url( "js/rasp/libs/fullcalendar/lang/ru.js", __FILE__ ) );
    //jquery.validate.js
    wp_register_script( "jquery.validate.js", plugins_url( "js/jquery.validate.js", __FILE__ ) );
    wp_register_script( "validate.js", plugins_url( "js/validate.js", __FILE__ ) );
    wp_register_script( "mymain.js", plugins_url( "js/rasp/mymain.js", __FILE__ ) );
    wp_register_script( "jquery.cookie.js", plugins_url( "js/jquery.cookie.js", __FILE__ ) );
    
    wp_register_script( "bootstrap.min.js", plugins_url( "js/bootstrap.min.js", __FILE__ ) );
    wp_register_script( "profile.js", plugins_url( "js/profile.js", __FILE__ ) );
    //wp_register_script( "initfullcallendar.js", plugins_url( "js/rasp/initfullcallendar.js", __FILE__ ) );
    //wp_register_script( "moment-with-locales.min.js", plugins_url( "js/rasp/libs/moment-with-locales.min.js", __FILE__ ) );
    //wp_register_script( "fullcalendar.min.js", plugins_url( "js/rasp/libs/fullcalendar/fullcalendar.min.js", __FILE__ ) );
    //wp_register_script( "ru.js", plugins_url( "js/rasp/libs/fullcalendar/lang/ru.js", __FILE__ ) );
    //wp_register_script( "main.js", plugins_url( "js/rasp/main.js", __FILE__ ) );
    //wp_register_script( "mymain.js", plugins_url( "js/rasp/mymain.js", __FILE__ ) );
}
add_action('init', 'instasport_shortcodes_init');


register_activation_hook( __FILE__, 'intacalendar_create_db' );

function intacalendar_create_db(){
    global $wpdb;

    $table_name = $wpdb->prefix."intacalendar_options";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      api_key varchar(500),
      api_code varchar(500),
      api_button_color_default varchar(50) NOT NULL,
      api_button_bg_default varchar(50) NOT NULL,
      api_button_color_hover varchar(50) NOT NULL,
      api_button_bg_hover varchar(50) NOT NULL,
      default_color_switch_hall_btn varchar(50) NOT NULL,
      default_bg_switch_hall_btn varchar(50) NOT NULL,
      active_color_switch_hall_btn varchar(50) NOT NULL,
      active_bg_switch_hall_btn varchar(50) NOT NULL,
      hover_color_switch_hall_btn varchar(50) NOT NULL,
      hover_bg_switch_hall_btn varchar(50) NOT NULL,
      default_color_switch_wiev_btn varchar(50) NOT NULL,
      default_bg_switch_wiev_btn varchar(50) NOT NULL,
      active_color_switch_wiev_btn varchar(50) NOT NULL,
      active_bg_switch_wiev_btn varchar(50) NOT NULL,
      hover_color_switch_wiev_btn varchar(50) NOT NULL,
      hover_bg_switch_wiev_btn varchar(50) NOT NULL,
      default_color_arrows varchar(50) NOT NULL,
      hover_color_arrows varchar(50) NOT NULL,
      title_color varchar(50) NOT NULL,
      week_day_name_color varchar(50) NOT NULL,
      week_day_name_border_bottom_color varchar(50) NOT NULL,
      number_date_color varchar(50) NOT NULL,
      item_event_odd_color varchar(50) NOT NULL,
      item_event_odd_bg varchar(50) NOT NULL,
      item_event_even_color varchar(50) NOT NULL,
      item_event_even_bg varchar(50) NOT NULL,
      item_event_today_color varchar(50) NOT NULL,
      item_event_today_bg varchar(50) NOT NULL,
      item_event_border_bottom_color varchar(50) NOT NULL,
      hour_value_left_color varchar(50) NOT NULL,
      hour_value_left_bg varchar(50) NOT NULL,
      modal_header_text_color varchar(50) NOT NULL,
      modal_header_close_color varchar(50) NOT NULL,
      modal_header_bg varchar(50) NOT NULL,
      default_wiev_to_show ENUM('month', 'agendaWeek') NOT NULL,
      use_api_colors ENUM('0', '1') NOT NULL,
      additional_info_month_duration ENUM('1', '0') NOT NULL,
      additional_info_month_seats ENUM('1', '0') NOT NULL,
      additional_info_week_duration ENUM('1', '0') NOT NULL,
      additional_info_week_seats ENUM('1', '0') NOT NULL,
      desktop_month_height_cell varchar(50) NOT NULL,
      desktop_week_height_cell varchar(50) NOT NULL,
      desktop_month_quantity_trainings varchar(50) NOT NULL,
      desktop_week_quantity_trainings varchar(50) NOT NULL,
      desktop_month_more_text varchar(100) NOT NULL,
      desktop_week_more_text varchar(100) NOT NULL,
      desktop_month_more_text_font_size varchar(100) NOT NULL,
      desktop_month_more_text_color varchar(100) NOT NULL,
      desktop_week_more_text_font_size varchar(100) NOT NULL,
      desktop_week_more_text_color varchar(100) NOT NULL,
      desktop_week_hide_empty_rows ENUM('1', '0') NOT NULL,
      desktop_filter_bg varchar(100) NOT NULL,
      desktop_filter_text_color varchar(100) NOT NULL,
      desktop_filter_train_show varchar(100) NOT NULL,
      desktop_filter_couch_show varchar(100) NOT NULL,
      mobile_default_color_switch_hall_btn varchar(50) NOT NULL,
      mobile_default_bg_switch_hall_btn varchar(50) NOT NULL,
      mobile_active_color_switch_hall_btn varchar(50) NOT NULL,
      mobile_active_bg_switch_hall_btn varchar(50) NOT NULL,
      mobile_hover_color_switch_hall_btn varchar(50) NOT NULL,
      mobile_hover_bg_switch_hall_btn varchar(50) NOT NULL,
      mobile_default_color_switch_wiev_btn varchar(50) NOT NULL,
      mobile_default_bg_switch_wiev_btn varchar(50) NOT NULL,
      mobile_active_color_switch_wiev_btn varchar(50) NOT NULL,
      mobile_active_bg_switch_wiev_btn varchar(50) NOT NULL,
      mobile_hover_color_switch_wiev_btn varchar(50) NOT NULL,
      mobile_hover_bg_switch_wiev_btn varchar(50) NOT NULL,
      mobile_default_color_arrows varchar(50) NOT NULL,
      mobile_hover_color_arrows varchar(50) NOT NULL,
      mobile_title_color varchar(50) NOT NULL,
      mobile_week_day_name_color varchar(50) NOT NULL,
      mobile_week_day_name_border_bottom_color varchar(50) NOT NULL,
      mobile_today_week_day_bg varchar(50) NOT NULL,
      mobile_dot_big_default_color varchar(50) NOT NULL,
      mobile_dot_big_default_bg varchar(50) NOT NULL,
      mobile_dot_big_active_color varchar(50) NOT NULL,
      mobile_dot_big_active_bg varchar(50) NOT NULL,
      mobile_dot_big_today_color varchar(50) NOT NULL,
      mobile_dot_big_today_bg varchar(50) NOT NULL,
      mobile_dot_big_choosen_color varchar(50) NOT NULL,
      mobile_dot_big_choosen_bg varchar(50) NOT NULL,
      mobile_dot_little_bg varchar(50) NOT NULL,
      mobile_day_number_default_color varchar(50) NOT NULL,
      mobile_day_number_active_color varchar(50) NOT NULL,
      mobile_day_number_today_color varchar(50) NOT NULL,
      mobile_day_number_choosen_color varchar(50) NOT NULL,
      mobile_hour_value_left_color varchar(50) NOT NULL,
      mobile_item_event_border_bottom_color varchar(50) NOT NULL,
      mobile_default_week_circle_bg varchar(50) NOT NULL,
      mobile_today_week_circle_bg varchar(50) NOT NULL,
      mobile_choosen_week_circle_bg varchar(50) NOT NULL,
      mobile_default_wiev_to_show ENUM('month', 'agendaWeek') NOT NULL,
      mobile_use_api_colors ENUM('0', '1') NOT NULL,
      mobile_additional_info_month_duration ENUM('1', '0') NOT NULL,
      mobile_additional_info_month_seats ENUM('1', '0') NOT NULL,
      mobile_additional_info_week_duration ENUM('1', '0') NOT NULL,
      mobile_additional_info_week_seats ENUM('1', '0') NOT NULL,
      mobile_modal_month_show ENUM('true', 'false') NOT NULL,
      mobile_modal_week_show ENUM('true', 'false') NOT NULL,
      mobile_show_dot ENUM('true', 'false') NOT NULL,
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
                'api_button_color_default' => '#000',
                'api_button_bg_default' => '#f1f1f1',
                'api_button_color_hover' => '#fff',
                'api_button_bg_hover' => '#ccc',
                'default_color_switch_hall_btn' => '#000',
                'default_bg_switch_hall_btn' => '#f1f1f1',
                'active_color_switch_hall_btn' => '#fff',
                'active_bg_switch_hall_btn' => '#000',
                'hover_color_switch_hall_btn' => '#fff',
                'hover_bg_switch_hall_btn' => '#ccc',
                'default_color_switch_wiev_btn' => '#000',
                'default_bg_switch_wiev_btn' => '#f1f1f1',
                'active_color_switch_wiev_btn' => '#fff',
                'active_bg_switch_wiev_btn' => '#000',
                'hover_color_switch_wiev_btn' => '#fff',
                'hover_bg_switch_wiev_btn' => '#ccc',
                'default_color_arrows' => '#666',
                'hover_color_arrows' => '#000',
                'title_color' => '#000',
                'week_day_name_color' => '#000',
                'week_day_name_border_bottom_color' => '#000',
                'number_date_color' => '#000',
                'item_event_odd_color' => '#000',
                'item_event_odd_bg' => '#fff',
                'item_event_even_color' => '#000',
                'item_event_even_bg' => '#f1f1f1',
                'item_event_today_color' => '#fff',
                'item_event_today_bg' => '#e69c0e',
                'item_event_border_bottom_color' => '#ccc',
                'hour_value_left_color' => '#000',
                'hour_value_left_bg' => '#fff',
                'modal_header_text_color' => '#fff',
                'modal_header_close_color' => '#fff',
                'modal_header_bg' => '#0ea2e6',
                'default_wiev_to_show' => 'month',
                'use_api_colors' => 0,
                'additional_info_month_duration' => '1',
                'additional_info_month_seats' => '1',
                'additional_info_week_duration' => '1',
                'additional_info_week_seats' => '1',
                'desktop_month_height_cell' => 'auto',
                'desktop_week_height_cell' => 'auto',
                'desktop_month_quantity_trainings' => '2',
                'desktop_week_quantity_trainings' => '2',
                'desktop_month_more_text' => ' ...',
                'desktop_week_more_text' => ' ...',
                'desktop_month_more_text_font_size' => '16px',
                'desktop_month_more_text_color' => 'black',
                'desktop_week_more_text_font_size' => '16px',
                'desktop_week_more_text_color' => 'black',
                'desktop_week_hide_empty_rows' => '1',
                'desktop_filter_bg' => '#f1f1f1',
                'desktop_filter_text_color' => 'black',
                'desktop_filter_train_show' => 'inline-block',
                'desktop_filter_couch_show' => 'inline-block',
                //MOBILE STYLES
                'mobile_default_color_switch_hall_btn' => '#000',
                'mobile_default_bg_switch_hall_btn' => '#f1f1f1',
                'mobile_active_color_switch_hall_btn' => '#fff',
                'mobile_active_bg_switch_hall_btn' => '#000',
                'mobile_hover_color_switch_hall_btn' => '#fff',
                'mobile_hover_bg_switch_hall_btn' => '#ccc',
                'mobile_default_color_switch_wiev_btn' => '#000',
                'mobile_default_bg_switch_wiev_btn' => '#f1f1f1',
                'mobile_active_color_switch_wiev_btn' => '#fff',
                'mobile_active_bg_switch_wiev_btn' => '#000',
                'mobile_hover_color_switch_wiev_btn' => '#fff',
                'mobile_hover_bg_switch_wiev_btn' => '#ccc',
                'mobile_default_color_arrows' => '#666',
                'mobile_hover_color_arrows' => '#000',
                'mobile_title_color' => '#000',
                'mobile_week_day_name_color' => '#000',
                'mobile_week_day_name_border_bottom_color' => '#000',
                'mobile_today_week_day_bg' => '#f1f1f1',
                'mobile_dot_big_default_color' => '#000',
                'mobile_dot_big_default_bg' => '#f1f1f1',
                'mobile_dot_big_active_color' => '#fff',
                'mobile_dot_big_active_bg' => '#098dca',
                'mobile_dot_big_today_color' => '#fff',
                'mobile_dot_big_today_bg' => '#09b60d',
                'mobile_dot_big_choosen_color' => '#fff',
                'mobile_dot_big_choosen_bg' => '#d0360c',
                'mobile_dot_little_bg' => '#f1f1f1',
                'mobile_day_number_default_color' => '#000',
                'mobile_day_number_active_color' => '#098dca',
                'mobile_day_number_today_color' => '#09b60d',
                'mobile_day_number_choosen_color' => '#d0360c',
                'mobile_hour_value_left_color' => '#000',
                'mobile_item_event_border_bottom_color' => '#ccc',   
                //'mobile_modal_header_text_color' => '#fff',
                //'mobile_modal_header_close_color' => '#fff',
                //'mobile_modal_header_bg' => '#0c76d0',
                'mobile_default_week_circle_bg' => 'gray',
                'mobile_today_week_circle_bg' => 'green',
                'mobile_choosen_week_circle_bg' => 'pink',
                'mobile_default_wiev_to_show' => 'month',
                'mobile_use_api_colors' => 0,
                'mobile_additional_info_month_duration' => '1',
                'mobile_additional_info_month_seats' => '1',
                'mobile_additional_info_week_duration' => '1',
                'mobile_additional_info_week_seats' => '1',
                'mobile_modal_month_show' => 'true',
                'mobile_modal_week_show' => 'true',
                'mobile_show_dot' => 'true',
            ) 
        );
    }



}