jQuery(document).ready(function(e){

	var intaProfileClass = function(){

		// this.divId = "#intaProfileModal";
		// this.formAuthByEmail = "#ipmAuthByEmail";
		// this.formAuthByPhone = "#ipmAuthByPhone";
		// this.formRegByEmail = "#ipmRegByEmail";
		// this.formRegByPhone = "#ipmRegByPhone";

		// this.formAuthByEmailValidation = null;
		// this.formAuthByPhoneValidation = null;
		// this.formRegByEmailValidation = null;
		// this.formRegByPhoneValidation = null;

		this.init = function(){
			// console.log("Profile initialized");
			var _this = this;

			// intaProfileHelper.removeIntaProfileToken();
			// intaProfileHelper.setIntaProfileToken(); 
			intaProfileHelper.checkAuthorized();
			intaProfileHelper.getVisits(); 
			intaProfileHelper.putVisits();
			intaProfileHelper.getProfile(); 
			intaProfileHelper.putProfile();
			// intaProfileHelper.setIntaProfileToken(); 
			// intaProfileHelper.removeIntaProfileToken();

			// _this.trackLoadHtml(); 
			_this.loadHtml();
			_this.formValidationRules();
			_this.formSubmitEvent();
			_this.setMasks();
			_this.modalFunctionality();
			
			_this.clickCheckInEvent();
			_this.clickAddVisit();
			_this.clickDisableVisit();

			_this.enterNavigation();
			_this.accNavigation();

			// // console.log(intaProfileHelper);
			// // intaProfileHelper.modalFunctionality();
			
			// if(intaProfileHelper.token != null){
			// 	intaProfileHelper.getVisits();
			// 	intaProfileHelper.getProfile();  
			// 	intaProfileHelper.putProfile();
			// 	intaProfileHelper.putVisits();
			// }

			// _this.load();
			// _this.formValidation(); 
			// _this.setMasks();
			// _this.ipmEnterNavigation();
			// _this.ipmAccNavigation();
			// // _this.regDeleteVisit();

			// intaProfileHelper.showModal();

		}

		// this.regDeleteVisit = function(){
		// 	var _this = this;

		// 	var interval = setInterval(function(){
		// 		if (intaProfileHelper.isAccountWindowsLoaded()) {
		// 			ipmAccNavigation();
		// 			clearInterval(interval); 
		// 		}
		// 	}, 10);
		// }

		// this.ipmAccNavigation = function(){

		// }

		this.clickDisableVisit = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) { 
					clickDisableVisit();
					clearInterval(interval); 
				}
			}, 10);

			function clickDisableVisit(){
				jQuery(intaProfileHelper.divId).on("click", ".ipm-visit_disable", function(e){
					e.preventDefault();

					intaProfileHelper.deleteVisit(parseInt(jQuery(this).attr("visit-id")));
				});
			}
		}

		this.clickAddVisit = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) { 
					clickAddVisit();
					clearInterval(interval); 
				}
			}, 10);

			function clickAddVisit(){
				jQuery(intaProfileHelper.divId+" a.ipm-add_visit").click(function(e){
					e.preventDefault();

					intaProfileHelper.orderVisitButtonVisibility(false);
					intaProfileHelper.showVisitAlert("preload"); 
					intaProfileHelper.addVisit();
				});
			}
		}

		this.clickCheckInEvent = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) { 
					clickCheckInEvent();
					clearInterval(interval); 
				}
			}, 10);

			function clickCheckInEvent(){
				jQuery(intaCalendar.divId).on("click", "."+intaProfileHelper.toCheckInClass, function(e){
					e.preventDefault();

					jQuery(intaCalendar.divId+" .description_window").hide();

					intaProfileHelper.checkedEvent = jQuery(this).context.dataset;

					if(intaProfileHelper.token == null){
						intaProfileHelper.resetEnterForms();
						intaProfileHelper.showAuthEmail();
						intaProfileHelper.showModal();
						return false;
					}

					intaProfileHelper.putEvent();
					// return false;

					// console.log(parseInt(intaProfileHelper.checkedEvent.seats));
					// _this.putProfile();
					// _this.putVisits();

					// intaProfileHelper.resetVisitAlert(); 
					// intaProfileHelper.putPreloadAccVisit();
					// intaProfileHelper.showAccVisit();
					// intaProfileHelper.showModal(); 


					// // jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
					// intaProfileHelper.orderVisitButtonVisibility(false);

					// if(intaProfileHelper.isEventInVisits(intaProfileHelper.checkedEvent.id)){
					// 	intaProfileHelper.showVisitAlert("info", "Вы уже записаны на тренировку");
					// 	intaProfileHelper.putEvent(); 
					// 	return false;
					// }

					// // if(parseInt(intaProfileHelper.checkedEvent.seats) == 0){
					// // 	intaProfileHelper.showVisitAlert("error", "Нет мест");
					// // 	intaProfileHelper.putEvent();
					// // 	return false;
					// // }

					// var eventDate = new Date(intaProfileHelper.checkedEvent.apiDate);
					// var currentDate = new Date();
					// if(eventDate < currentDate){ 
					// 	intaProfileHelper.showVisitAlert("error", "Тренировка уже прошла");
					// 	intaProfileHelper.putEvent(); 
					// 	return false;
					// }

					// intaProfileHelper.orderVisitButtonVisibility(true);
					// intaProfileHelper.putEvent();

					// var intervalShowModal = setInterval(function(){
					// 	if (intaProfileHelper.visits.done === true) {
					// 			if(intaProfileHelper.isEventInVisits(intaProfileHelper.checkedEvent.id)){
					// 				intaProfileHelper.showVisitAlert("info", "Вы уже записаны на тренировку");
					// 			}else{
					// 				intaProfileHelper.orderVisitButtonVisibility(true);
					// 			}

					// 			intaProfileHelper.putEvent();
					// 			clearInterval(intervalShowModal); 
					// 	}
					// }, 10);

				});
			}
		}

		// this.checkInEvent = function(){
		// 	var _this = this;

		// 	jQuery(intaCalendar.divId+" .description_window").hide();

		// 	intaProfileHelper.checkedEvent = jQuery(this).context.dataset;

		// 	if(intaProfileHelper.token == null){
		// 		intaProfileHelper.resetEnterForms();
		// 		intaProfileHelper.showAuthEmail();
		// 		intaProfileHelper.showModal();
		// 		return false;
		// 	}

			

		// 	// console.log(parseInt(intaProfileHelper.checkedEvent.seats));
		// 	// _this.putProfile();
		// 	// _this.putVisits();

		// 	intaProfileHelper.resetVisitAlert(); 
		// 	intaProfileHelper.putPreloadAccVisit();
		// 	intaProfileHelper.showAccVisit();
		// 	intaProfileHelper.showModal(); 


		// 	// jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
		// 	intaProfileHelper.orderVisitButtonVisibility(false);

		// 	if(intaProfileHelper.isEventInVisits(intaProfileHelper.checkedEvent.id)){
		// 		intaProfileHelper.showVisitAlert("info", "Вы уже записаны на тренировку");
		// 		intaProfileHelper.putEvent(); 
		// 		return false;
		// 	}

		// 	// if(parseInt(intaProfileHelper.checkedEvent.seats) == 0){
		// 	// 	intaProfileHelper.showVisitAlert("error", "Нет мест");
		// 	// 	intaProfileHelper.putEvent();
		// 	// 	return false;
		// 	// }

		// 	var eventDate = new Date(intaProfileHelper.checkedEvent.apiDate);
		// 	var currentDate = new Date();
		// 	if(eventDate < currentDate){ 
		// 		intaProfileHelper.showVisitAlert("error", "Тренировка уже прошла");
		// 		intaProfileHelper.putEvent(); 
		// 		return false;
		// 	}

		// 	intaProfileHelper.orderVisitButtonVisibility(true);
		// 	intaProfileHelper.putEvent();

		// 	// var intervalShowModal = setInterval(function(){
		// 	// 	if (intaProfileHelper.visits.done === true) {
		// 	// 			if(intaProfileHelper.isEventInVisits(intaProfileHelper.checkedEvent.id)){
		// 	// 				intaProfileHelper.showVisitAlert("info", "Вы уже записаны на тренировку");
		// 	// 			}else{
		// 	// 				intaProfileHelper.orderVisitButtonVisibility(true);
		// 	// 			}

		// 	// 			intaProfileHelper.putEvent();
		// 	// 			clearInterval(intervalShowModal); 
		// 	// 	}
		// 	// }, 10);

			
		// }

		this.modalFunctionality = function(){
			var _this = this;

			var closeModal = false;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) { 
					modalFunctionality();
					clearInterval(interval); 
				}
			}, 10);

			function modalFunctionality(){ 
				jQuery(intaProfileHelper.divId+" .ipm-close").click(function(e){
					e.preventDefault();
					intaProfileHelper.hideModal();
				});

				jQuery(intaProfileHelper.divId).mousedown(function(e){
					// e.preventDefault(); 
					// jQuery("body, html").css({"overflow": "auto"});
					// console.log(e.target);
					if(jQuery(e.target).hasClass("ipm-wrapper") ||
						jQuery(e.target).hasClass("ipm-dialog")){ 
							// jQuery(_this.divId+" .inta_modal").find(".mde-body").text("");
							// jQuery(_this.divId+" .inta_modal").hide();
							// intaProfileHelper.hideModal();
							closeModal = true;
					}else{
						closeModal = false;
					}
				});

				jQuery(intaProfileHelper.divId).mouseup(function(e){
					// e.preventDefault(); 
					if(closeModal &&
						(jQuery(e.target).hasClass("ipm-wrapper") || jQuery(e.target).hasClass("ipm-dialog"))){ 
							intaProfileHelper.hideModal();
					}
				});

				// jQuery(intaProfileHelper.divId).click(function(e){
				// 	e.preventDefault(); 
				// 	// jQuery("body, html").css({"overflow": "auto"});
				// 	// console.log(e.target);
				// 	if(jQuery(e.target).hasClass("ipm-wrapper") ||
				// 		jQuery(e.target).hasClass("ipm-dialog")){ 
				// 			// jQuery(_this.divId+" .inta_modal").find(".mde-body").text("");
				// 			// jQuery(_this.divId+" .inta_modal").hide();
				// 			intaProfileHelper.hideModal();
				// 	}
				// });
			}
		}

		this.accNavigation = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) {
					accNavigation();
					clearInterval(interval); 
				}
			}, 10);

			function accNavigation(){
				jQuery(intaProfileHelper.divId+" .ipm-account").on("click", ".ipm-acc_to", function(e){
					e.preventDefault();

					if(jQuery(this).hasClass("ipm-acc_to_menu")){ 
						intaProfileHelper.showAccMenu(); 
					}else if(jQuery(this).hasClass("ipm-acc_to_prof")){
						intaProfileHelper.showAccProf(); 
					}else if(jQuery(this).hasClass("ipm-acc_to_visits")){
						// if(intaProfileHelper.visits.length == 0){
						// 	jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("У Вас нету записей:");
						// }else{
						// 	jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("Вы записаны на занятия:");
						// }
						intaProfileHelper.showAccVisits(); 
					}else if(jQuery(this).hasClass("ipm-acc_to_exit")){
						if(confirm("Вы действительно хотите выйти из профайла?")){
							intaProfileHelper.logOut();
						}
					}else if(jQuery(this).hasClass("ipm-acc_to_visit")){
						intaProfileHelper.showAccVisit();
					}else if(jQuery(this).hasClass("ipm-acc_to_event")){
						intaProfileHelper.hideModal();
						// console.log(dwCalendarPosition);
						if(jQuery(intaCalendar.divId+" .dm-calendar").length > 0){
							var calendarPosition = jQuery(intaCalendar.divId+" .dm-calendar").position();
						}else if(jQuery(intaCalendar.divId+" .dw-calendar").length > 0){
							var calendarPosition = jQuery(intaCalendar.divId+" .dw-calendar").position();
						}else if(jQuery(intaCalendar.divId+" .mw-calendar").length > 0){
							var calendarPosition = jQuery(intaCalendar.divId+" .mw-calendar").position();
						}
						jQuery("html, body").animate({ scrollTop: calendarPosition.top }, 300); 
					}
				});

			}
		}

		this.enterNavigation = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) {
						enterNavigation();
						// intaProfileHelper.showConfirm("+380957853403");
						// _this.enterProfile();
						clearInterval(interval); 
				}
			}, 10);

			function enterNavigation(){

				//Switch between authorization and registration
				jQuery(intaProfileHelper.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter").click(function(e){
					e.preventDefault();

					if(jQuery(this).hasClass("active")){
						return false;
					}

					intaProfileHelper.resetEnterForms();

					if(jQuery(this).hasClass("ipm-to_enter_auth")){
						intaProfileHelper.showAuthEmail(); 
					}else if(jQuery(this).hasClass("ipm-to_enter_reg")){
						intaProfileHelper.showRegEmail();
					}
				});

				//Switch between authorization by email and authorization by phone
				jQuery(intaProfileHelper.divId+" .ipm-enters .ipm-switch_auth a.ipm-to_auth").click(function(e){
					e.preventDefault();

					if(jQuery(this).hasClass("active")){
						return false;
					}

					intaProfileHelper.resetEnterForms();

					if(jQuery(this).hasClass("ipm-to_auth_email")){
						intaProfileHelper.showAuthEmail(); 
					}else if(jQuery(this).hasClass("ipm-to_auth_phone")){
						intaProfileHelper.showAuthPhone();
					}
				});

				//Switch between registration by email and registration by phone
				jQuery(intaProfileHelper.divId+" .ipm-enters .ipm-switch_reg a.ipm-to_reg").click(function(e){
					e.preventDefault();

					if(jQuery(this).hasClass("active")){
						return false;
					}

					intaProfileHelper.resetEnterForms();

					if(jQuery(this).hasClass("ipm-to_reg_email")){
						intaProfileHelper.showRegEmail(); 
					}else if(jQuery(this).hasClass("ipm-to_reg_phone")){
						intaProfileHelper.showRegPhone();
					}
				});

			}
		}

		this.setMasks = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) {
					setMasks();
					clearInterval(interval); 
				}
			}, 10); 

			function setMasks(){
				jQuery(intaProfileHelper.formAuthByPhone+" input[name='auth_phone']").inputmask("datetime", {
			        mask: "+380999999999"
			    });

				jQuery(intaProfileHelper.formRegByPhone+" input[name='reg_phone']").inputmask("datetime", {
			        mask: "+380999999999"
			    });

			    jQuery(intaProfileHelper.formConfirm+" input[name='verify_code']").inputmask("datetime", {
			        mask: "9999"
			    });
			}
		}

		this.formValidationRules = function(){
			var _this = this;
			// console.log(intaCalendar);

			jQuery.validator.addMethod(
			    "regex",
			    function(value, element, regexp) {
			        var check = false;
			        return this.optional(element) || regexp.test(value);
			    },
			    "Please check your input." 
			);

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) {

						confirmRules();
						authByEmailRules();
						authByPhoneRules(); 
						regByEmailRules();
						regByPhoneRules();

						intaProfileHelper.formValidationRulesSet = true;

						clearInterval(interval); 
				}
			}, 10);

			function confirmRules(){
				intaProfileHelper.formConfirmValidation = jQuery(intaProfileHelper.formConfirm).validate({
					onfocusout: false,
					rules: {
						verify_code: {
							required: true,
							minlength: 4,
							maxlength: 4,
						},
					},
					messages: {
						verify_code: {
							required: "Поле должно быть заполнено",
							minlength: "Должно содержать 4 цифры",
							maxlength: "Должно содержать 4 цифры"
						},
					},
					// submitHandler: function(form) {}
				});
			}

			function authByEmailRules(){
				intaProfileHelper.formAuthByEmailValidation = jQuery(intaProfileHelper.formAuthByEmail).validate({
					onfocusout: false,
					rules: {
						auth_email: {
							required: true,
							email: true
						},
						auth_pass: {
							required: true,
							minlength: 5
						},
					},
					messages: {
						auth_email: {
							required: "Поле должно быть заполнено",
							email: "Введите корректный Email"
						},
						auth_pass: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 5 символов"
						},
					},
					// submitHandler: function(form) {}
				});
			}

			function authByPhoneRules(){
				intaProfileHelper.formAuthByPhoneValidation = jQuery(intaProfileHelper.formAuthByPhone).validate({
					onfocusout: false,
					rules: {
						auth_phone: {
							required: true,
							regex: /^[+]{1}[0-9]{12}$/
						},
					},
					messages: {
						auth_phone: {
							required: "Поле должно быть заполнено",
							regex: "Некоректный номер телефона"
						},
					},
					// submitHandler: function(form) {}
				});
			}

			function regByEmailRules(){
				intaProfileHelper.formRegByEmailValidation = jQuery(intaProfileHelper.formRegByEmail).validate({
					onfocusout: false,
					rules: {
						reg_email: {
							required: true,
							email: true
						},
						reg_first_name: {
							required: true,
							minlength: 3,
						},
						reg_last_name: {
							required: true,
							minlength: 3,
						},
						reg_pass: {
							required: true,
							minlength: 5
						},
						reg_pass_confirm: {
							required: true,
							minlength: 5,
							equalTo: intaProfileHelper.formRegByEmail+" input[name=reg_pass]"
							// equalTo: "#regPass"
						},
					},
					messages: {
						reg_email: {
							required: "Поле должно быть заполнено",
							email: "Введите корректный Email"
						},
						reg_first_name: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 3 символов"
						},
						reg_last_name: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 3 символов"
						},
						reg_pass: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 5 символов"
						},
						reg_pass_confirm: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 5 символов",
							equalTo: "Пароли не совпадают"
						},
					},
					// submitHandler: function(form) {}
				});
			}

			function regByPhoneRules(){
				intaProfileHelper.formRegByPhoneValidation = jQuery(intaProfileHelper.formRegByPhone).validate({
					onfocusout: false,
					rules: {
						reg_phone: {
							required: true,
							regex: /^[+]{1}[0-9]{12}$/
						},
						reg_first_name: {
							required: true,
							minlength: 3,
						},
						reg_last_name: {
							required: true,
							minlength: 3,
						},
					},
					messages: {
						reg_phone: {
							required: "Поле должно быть заполнено",
							regex: "Некоректный номер телефона"
						},
						reg_first_name: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 3 символов"
						},
						reg_last_name: {
							required: "Поле должно быть заполнено",
							minlength: "Минимум 3 символов"
						},
					},
					// submitHandler: function(form) {}
				});
			}

		}

		this.formSubmitEvent = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded() &&
					intaProfileHelper.formValidationRulesSet == true) {
						formSubmitEvent();
						clearInterval(interval); 
				}
			}, 10);

			function formSubmitEvent(){
				jQuery(intaProfileHelper.formConfirm+" input[type='button']").click(function(e){
					if(jQuery(intaProfileHelper.formConfirm).valid()){
						// console.log("Success confirm");
						// var type = jQuery(intaProfileHelper.formConfirm+" input[name='verify_code']").attr("type-confirmation");
						// var type = jQuery(intaProfileHelper.formConfirm+" input[name='verify_code']").attr("type-confirmation");
						intaProfileHelper.confirm();
						// _this.auth("phone");
					}
				});

				jQuery(intaProfileHelper.formAuthByEmail+" input[type='button']").click(function(e){
					if(jQuery(intaProfileHelper.formAuthByEmail).valid()){
						// console.log("Success auth by email");
						intaProfileHelper.auth("email");
					}
				});

				jQuery(intaProfileHelper.formAuthByPhone+" input[type='button']").click(function(e){
					if(jQuery(intaProfileHelper.formAuthByPhone).valid()){
						// console.log("Success auth by phone");
						intaProfileHelper.auth("phone");
					} 
				});

				jQuery(intaProfileHelper.formRegByEmail+" input[type='button']").click(function(e){
					if(jQuery(intaProfileHelper.formRegByEmail).valid()){
						// console.log("Success reg by email");
						intaProfileHelper.reg("email");
					} 
				});

				jQuery(intaProfileHelper.formRegByPhone+" input[type='button']").click(function(e){
					if(jQuery(intaProfileHelper.formRegByPhone).valid()){
						// console.log("Success reg by phone");
						intaProfileHelper.reg("phone"); 
					} 
				});
			}
		}

		// this.confirm = function(type){
		// 	var _this = this;

		// 	switch(type){
		// 		case "phone":
		// 			var phone = jQuery(intaProfileHelper.formConfirm+" input[name='verify_code']").attr("phone-to-verify");
		// 			var smsCode = jQuery(intaProfileHelper.formConfirm+" input[name='verify_code']").val();

		// 			// console.log(phone);
		// 			// console.log(smsCode);
		// 			// return false;

		// 			var url = intaProfileHelper.getUrl("phone-verify");

		// 			var data = {
		// 				phone: phone,
		// 				sms: smsCode,
		// 				code: configData.apiCode,
		// 				key: configData.apiKey,
		// 			};

		// 			var callback = function(data){
		// 				if(data == "error"){
		// 					intaProfileHelper.formConfirmValidation.showErrors({
		// 				        "verify_code": "Ошибка подтверждения кода"
		// 				    });
		// 					// alert("Bad Authentication");
		// 				}
		// 				intaProfileHelper.token = data.token;
		// 				_this.enterProfile(); 
		// 			}

		// 			intaProfileHelper.apiQuery(url, callback, "POST", data);

		// 			break;
		// 	}
		// }

		// this.enterProfile = function(){
		// 	var _this = this;

		// 	var interval = setInterval(function(){
		// 		if (intaProfileHelper.token !== null && intaProfileHelper.isHtmlLoaded()) {
		// 			enterProfile();
		// 			clearInterval(interval); 
		// 		}
		// 	}, 10);

		// 	function enterProfile(){
		// 		// intaProfileHelper.showAccMenu();
		// 		// intaProfileHelper.showAccProf();
		// 		// jQuery(intaProfileHelper.divId+" .ipm-enters").removeClass("ipm-show");
		// 		// jQuery(intaProfileHelper.divId+" .ipm-account").addClass("ipm-show");
		// 		console.log("enterProfile");
		// 	}
		// }; 

		// this.auth = function(type){ 
		// 	var _this = this;

		// 	// intaProfileHelper.showConfirm();
		// 	// return false;

		// 	switch(type){
		// 		case "email":

		// 			var email = jQuery(intaProfileHelper.formAuthByEmail+" input[name='auth_email']").val();
		// 			var password = jQuery(intaProfileHelper.formAuthByEmail+" input[name='auth_pass']").val();

		// 			var url = intaProfileHelper.getUrl("auth-email");
		// 			var data = {
		// 				email: email,
		// 				password: password,
		// 				code: configData.apiCode,
		// 				key: configData.apiKey,
		// 			};

		// 			var callback = function(data){
		// 				if(data == "error"){
		// 					intaProfileHelper.formAuthByEmailValidation.showErrors({
		// 				        "auth_email": "Некоректный email или пароль"
		// 				    });
		// 					// alert("Bad Authentication");
		// 				}
		// 				console.log(data);
		// 			}

		// 			intaProfileHelper.apiQuery(url, callback, "POST", data);

		// 			break;
		// 		case "phone":

		// 			var phone = jQuery(intaProfileHelper.formAuthByPhone+" input[name='auth_phone']").val();
		// 			// var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

		// 			var url = intaProfileHelper.getUrl("auth-phone");
		// 			var data = {
		// 				phone: phone,
		// 				code: configData.apiCode,
		// 				key: configData.apiKey,
		// 			};

		// 			var callback = function(data){
		// 				if(data == "error"){
		// 					alert("Bad Authentication");
		// 				}
		// 				// console.log(data);
		// 				intaProfileHelper.showConfirm(phone);
		// 			}

		// 			intaProfileHelper.apiQuery(url, callback, "POST", data);

		// 			break;
		// 	}
		// }

		// this.reg = function(type){

		// }

		// this.badAuthD = function(type){

		// }

		this.applyLocalization = function(){
			var _this = this;

			jQuery(intaProfileHelper.divId+" .inta_locale-profile").text(intaLocale.tr.profile.profile);
			jQuery(intaProfileHelper.divId+" .inta_locale-check_ins").text(intaLocale.tr.profile.check_ins);
			jQuery(intaProfileHelper.divId+" .inta_locale-check_in_training").text(intaLocale.tr.profile.check_in_training);
			jQuery(intaProfileHelper.divId+" .inta_locale-exit").text(intaLocale.tr.profile.exit);

			jQuery(intaProfileHelper.divId+" .inta_locale-menu").text(intaLocale.tr.profile.menu);
			jQuery(intaProfileHelper.divId+" .inta_locale-first_name").text(intaLocale.tr.profile.first_name);
			jQuery(intaProfileHelper.divId+" .inta_locale-last_name").text(intaLocale.tr.profile.last_name);
			jQuery(intaProfileHelper.divId+" .inta_locale-phone").text(intaLocale.tr.profile.phone);
			jQuery(intaProfileHelper.divId+" .inta_locale-created").text(intaLocale.tr.profile.created);

			jQuery(intaProfileHelper.divId+" .inta_locale-checking_in_training").text(intaLocale.tr.profile.checking_in_training);
			jQuery(intaProfileHelper.divId+" .inta_locale-check_in").text(intaLocale.tr.profile.check_in);
			jQuery(intaProfileHelper.divId+" .inta_locale-auth").text(intaLocale.tr.profile.auth);
			jQuery(intaProfileHelper.divId+" .inta_locale-reg").text(intaLocale.tr.profile.reg);


			jQuery(intaProfileHelper.divId+" .ipm-auth input[type='button']").val(intaLocale.tr.profile.enter);

			jQuery(intaProfileHelper.divId+" input[name='auth_pass']").attr("placeholder", intaLocale.tr.profile.password);
			jQuery(intaProfileHelper.divId+" input[name='auth_phone']").attr("placeholder", intaLocale.tr.profile.phone);
			
			jQuery(intaProfileHelper.divId+" input[name='reg_first_name']").attr("placeholder", intaLocale.tr.profile.first_name);
			jQuery(intaProfileHelper.divId+" input[name='reg_last_name']").attr("placeholder", intaLocale.tr.profile.last_name);
			jQuery(intaProfileHelper.divId+" input[name='reg_pass']").attr("placeholder", intaLocale.tr.profile.password);
			jQuery(intaProfileHelper.divId+" input[name='reg_pass_confirm']").attr("placeholder", intaLocale.tr.profile.password_confirm);

			jQuery(intaProfileHelper.divId+" input[name='reg_phone']").attr("placeholder", intaLocale.tr.profile.phone);

			jQuery(intaProfileHelper.divId+" .ipm-reg input[type='button']").val(intaLocale.tr.profile.register);

			// jQuery(intaProfileHelper.divId+" .inta_locale-profile").text(intaLocale.tr.profile.profile);
			// jQuery(intaProfileHelper.divId+" .inta_locale-profile").text(intaLocale.tr.profile.profile);
		}

		this.loadHtml = function(){ 
			var _this = this; 

			jQuery("body").append('<div id="intaProfileModal"></div>');
			jQuery(intaProfileHelper.divId).load(configData.pluginUrl+"view/inta_profile.php");

			// jQuery(intaProfileHelper.divId).removeClass("desktop");
			// jQuery(intaProfileHelper.divId).removeClass("mobile");
			if(intaCalendar.breakPointCalendarType > intaCalendar.browserWindowWidth){
				jQuery(intaCalendar.divId).addClass("mobile");
				jQuery(intaProfileHelper.divId).addClass("mobile");
			}else{
				jQuery(intaCalendar.divId).addClass("desktop");
				jQuery(intaProfileHelper.divId).addClass("desktop");
			}

			var interval = setInterval(function(){
				if (intaProfileHelper.isHtmlLoaded()) {
					jQuery(intaProfileHelper.divId).on("keydown", "form", function(event) { 
					    return event.key != "Enter";
					});

					_this.applyLocalization();

					clearInterval(interval); 
				}
			}, 10);
		}

		// this.getUrl = function(type){
		// 	var _this = this; 

		// 	var url = null;

		// 	var urlAuthByPhone = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/login/";
		// 	var urlAuthByEmail = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/login/";
		// 	var urlRegByPhone = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/signup/";
		// 	var urlRegByEmail = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/signup/";
		// 	var urlProfile = "https://instasport.co/club/"+configData.apiClub+"/api/v1/client/profile/";
		// 	var urlPhoneVerify = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/verify/";
		// 	var urlEmailVerify = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/verify/";
		// 	var urlVisit = "https://instasport.co/club/"+configData.apiClub+"/api/v1/client/visit/"; 

		// 	switch(type){
		// 		case "auth-phone":
		// 			url = urlAuthByPhone;
		// 			break;
		// 		case "auth-email":
		// 			url = urlAuthByEmail;
		// 			break;
		// 		case "reg-phone":
		// 			url = urlRegByPhone;
		// 			break;
		// 		case "reg-email":
		// 			url = urlRegByEmail; 
		// 			break;
		// 		case "profile":
		// 			url = urlProfile;
		// 			break;
		// 		case "phone-verify":
		// 			url = urlPhoneVerify;
		// 			break;
		// 		case "email-verify":
		// 			url = urlEmailVerify;
		// 			break;
		// 		case "visit":
		// 			url = urlVisit;
		// 			break;
		// 	}

		// 	return url;
		// }

		// this.apiQuery = function(url, callback, method = "GET", data = {}, headers = {}){ 

		// 	jQuery.ajax({
		// 		// async: false,
		// 		type: method, 
		// 		// beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
		// 		url: url,
		// 		data: data,
		// 		success: function(data) {
		// 			try{
		// 				callback(data);
		// 			}catch(e){
		// 				callback('');
		// 			}

		// 		},
		// 		error: function(){
		// 			var data = "error";
		// 			try{
		// 				callback(data);
		// 			}catch(e){
		// 				callback('');
		// 			}
		// 		}
		// 	});

		// }

	}


	var intaProfile = null;
	var profileInterval = setInterval(function(){
		if (typeof configData !== 'undefined' &&
			intaProfileHelper !== 'undefined' && intaProfileHelper !== null &&
			intaCalendar !== 'undefined' && intaCalendar !== null &&
			intaHelper !== 'undefined' && intaHelper !== null) {
				
				intaProfile = new intaProfileClass(); 
				intaProfile.init();  

				clearInterval(profileInterval);
		}
	}, 10);

});