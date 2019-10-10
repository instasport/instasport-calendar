
<div class="ipm-wrapper">
    <div class="ipm-dialog">
        <div class="ipm-body">
            <a href="#" class="ipm-close">&#10006</a>
            
            <div class="ipm-enters ipm-show">
                <div class="ipm-switch_enter">
                    <ul>
                        <li><a class="button1 active ipm-to_enter_auth ipm-to_enter inta_locale-auth" href="#">Вход</a></li>
                        <li><a class="button1 ipm-to_enter_reg ipm-to_enter inta_locale-reg" href="#">Регистрация</a></li>
                    </ul>
                </div>
                <div class="ipm-clear"></div>
                <div class="ipm-enter_confirm ipm-enter">
                    <form id="ipmConfirm">
                        <div class="ipm-confirm_header">
                            Введите код присланный на телефон.<br>
                            Код подтверждения отправлен на телефон:<br>
                            <span class="el_to_confirm"></span>
                        </div>
                        <div class="ipm-form_group">
                            <input type="text" name="verify_code" type-confirmation="null" el-to-verify="null" placeholder="xxxx">
                        </div>
                        <div class="ipm-form_group">
                            <input type="button" name="confirm_send" value="Отправить">
                        </div>
                    </form>
                </div>
                <div class="ipm-enter_auth ipm-enter ipm-show">
                    <div class="ipm-switch_auth">
                        <ul>
                            <li><a class="button2 active ipm-to_auth_email ipm-to_auth" href="#">Email</a></li>
                            <li><a class="button2 ipm-to_auth_phone ipm-to_auth inta_locale-phone" href="#">Телефон</a></li>
                        </ul>
                    </div>
                    <div class="ipm-clear"></div>
                    <div class="ipm-auths">
                        <div class="ipm-auth_email ipm-auth ipm-show">
                            <form id="ipmAuthByEmail">
                                <div class="ipm-form_group">
                                    <input type="text" name="auth_email" placeholder="Email">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="password" name="auth_pass" placeholder="Пароль">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="button" name="auth_send" value="Войти">
                                </div>
                            </form>
                        </div>
                        <div class="ipm-auth_phone ipm-auth">
                            <form id="ipmAuthByPhone">
                                <div class="ipm-form_group">
                                    <input type="text" name="auth_phone" placeholder="Телефон">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="button" name="auth_send" value="Войти">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="ipm-enter_reg ipm-enter"> 
                    <div class="ipm-switch_reg">
                        <ul>
                            <li><a class="button2 active ipm-to_reg ipm-to_reg_email" href="#">Email</a></li>
                            <li><a class="button2 ipm-to_reg ipm-to_reg_phone inta_locale-phone" href="#">Телефон</a></li> 
                        </ul>
                    </div>
                    <div class="ipm-clear"></div>
                    <div class="ipm-regs">
                        <div class="ipm-reg_email ipm-show ipm-reg">
                            <form id="ipmRegByEmail">
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_email" placeholder="Email">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_first_name" placeholder="Имя">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_last_name" placeholder="Фамилия">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="password" name="reg_pass" placeholder="Пароль">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="password" name="reg_pass_confirm" placeholder="Подтверждение пароль">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="button" name="reg_send" value="Зарегистрироваться">
                                </div>
                            </form>
                        </div>
                        <div class="ipm-reg_phone ipm-reg"> 
                            <form id="ipmRegByPhone">
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_phone" placeholder="Телефон">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_first_name" placeholder="Имя">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="text" name="reg_last_name" placeholder="Фамилия">
                                </div>
                                <div class="ipm-form_group">
                                    <input type="button" name="reg_send" value="Зарегистрироваться">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ipm-account">
                
                <div class="ipm-acc_nav">
                    <ul>
                        <li><a class="ipm-acc_to ipm-acc_to_prof button_link inta_locale-profile" href="#">Профайл</a></li>
                        <li><a class="ipm-acc_to ipm-acc_to_visits button_link inta_locale-check_ins" href="#">Записи</a></li>
                        <li><a class="ipm-acc_to ipm-acc_to_event button_link inta_locale-check_in_training" href="#">Записаться на тренировку</a></li>
                        <li><a class="ipm-acc_to ipm-acc_to_exit" href="#"><span class="inta_locale-exit">Выход</span>
                            <span class="ipm-acc_nav_less">(<span class="ipm-prof_first_name"></span>)</span>
                        </a></li>
                    </ul>
                </div>
                <div class="ipm-acc_items">
                    <div class="ipm-acc_items_header">
                        <ul>
                            <li><a class="ipm-acc_to ipm-acc_to_menu button_nav inta_locale-menu" href="#">Меню</a></li>
                            <li><a class="ipm-acc_to ipm-acc_to_exit button_nav" href="#"><span class="inta_locale-exit">Выход</span> (<span class="ipm-prof_first_name"></span>)</a></li>  
                        </ul>
                    </div>
                    <div class="ipm-clear"></div>
                    <div class="ipm-acc_item ipm-prof">
                        <div class="ipm_table">
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td">ID:</div>
                                <div class="ipm_table-td"><div class="ipm-prof_id"></div></div>
                            </div>
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td inta_locale-first_name">Имя:</div>
                                <div class="ipm_table-td"><div class="ipm-prof_first_name"></div></div>
                            </div>
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td inta_locale-last_name">Фамилия:</div>
                                <div class="ipm_table-td"><div class="ipm-prof_last_name"></div></div>
                            </div>
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td">Email:</div>
                                <div class="ipm_table-td"><div class="ipm-prof_email"></div></div>
                            </div>
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td inta_locale-phone">Телефон:</div>
                                <div class="ipm_table-td"><div class="ipm-prof_phone"></div></div>
                            </div>
                            <div class="ipm_table-tr">
                                <div class="ipm_table-td inta_locale-created">Создан:</div>
                                <div class="ipm_table-td">2017-07-07</div>
                            </div>
                        </div>
                    </div>
                    <div class="ipm-acc_item ipm-visits">
                        <div class="ipm-visits_title"></div>
                        <div class="ipm-visits_cont">
                            
                            <!-- <div class="ipm_table">
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">1.</div>
                                    <div class="ipm_table-td">
                                        <div class="ipm-visit_title">Burn</div>
                                        <div>Дата: <span class="ipm-visit_id"></span></div>
                                        <div>Начало: <span class="ipm-visit_begining"></span></div>
                                        <div>Продолжительность: <span class="ipm-visit_duration"></span></div>
                                        <div>Зал: <span class="ipm-visit_hall"></span></div>
                                    </div>
                                    <div class="ipm_table-td">
                                        <a class="ipm-visit_disable" visit-id="null" href="#">Отменить</a>
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>
                    <div class="ipm-acc_item ipm-visit">
                        <div class="ipm-visit_title inta_locale-checking_in_training">Запись на тренировку: </div>
                        <div class="ipm-visit_alert ipm-alert"></div>
                        <div class="ipm-visit_cont"> 
                            
                            <!-- <div class="ipm_table">
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Название:</div>
                                    <div class="ipm_table-td"><span class="ipm-event_title"></span></div>
                                </div>
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Зал:</div> 
                                    <div class="ipm_table-td"><span class="ipm-event_hall"></span></div>
                                </div>
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Цена:</div>
                                    <div class="ipm_table-td"><span class="ipm-event_price"></span></div>
                                </div>
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Дата:</div>
                                    <div class="ipm_table-td"><span class="ipm-event_date"></span></div>
                                </div>
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Время:</div>
                                    <div class="ipm_table-td"><span class="ipm-event_time"></span></div>
                                </div>
                                <div class="ipm_table-tr">
                                    <div class="ipm_table-td">Продолжительность:</div>
                                    <div class="ipm_table-td"><span class="ipm-event_duration"></span></div>
                                </div>
                            </div> -->

                        </div>
                        <div class="ipm-visit_order">
                            <a class="button_suc ipm-add_visit inta_locale-check_in" href="#">Записаться</a>
                        </div>
                    </div>
                </div>

            </div>

            <div class="ipm-clear"></div>
        </div>
    </div>
</div>
