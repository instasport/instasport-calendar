var intaProfileHelperClass = function(){

	// resetEnterForms
	// modalFunc
	// hideModal
	// showModal
	// putDataInModal
	// isAccountWindowsLoaded
	// isEnterFormsLoaded
	// showAcc
	// resetShowAcc
	// showAccMenu
	// showAccProf
	// showAccVisits
	// showAccVisit
	// showAuth
	// showAuthEmail
	// showAuthPhone
	// showReg
	// showConfirm
	// showRegPhone 
	// showRegEmail
	// getUrl
	// apiQuery
	// getProfile
	// getVisits

	this.cookieTokenName = "intaProfileToken";

	this.divId = "#intaProfileModal";
	this.formAuthByEmail = "#ipmAuthByEmail";
	this.formAuthByPhone = "#ipmAuthByPhone";
	this.formRegByEmail = "#ipmRegByEmail";
	this.formRegByPhone = "#ipmRegByPhone";
	this.formConfirm = "#ipmConfirm";

	this.toCheckInClass = "to_check_in";

	this.formAuthByEmailValidation = null;
	this.formAuthByPhoneValidation = null;
	this.formRegByEmailValidation = null;
	this.formRegByPhoneValidation = null;
	this.formConfirmValidation = null;

	this.formValidationRulesSet = false;

	
	// this.token = "879e35c96144cbd1731e739aa20ef90e2eafd64e";
	this.token = null;

	this.profile = null;
	this.visits = [];
	this.visits.done = true;

	this.checkedEvent = null; 

	// this.init = function(){
		// var _this = this;

		// _this.modalFunc();

		// jQuery.cookie('intaProfileToken');

		// _this.getProfile();
		// _this.getVisits();
		// _this.putDataInModal(true);
	// }

	
	this.checkAuthorized = function(){
		var _this = this;

		if(jQuery.cookie(_this.cookieTokenName)){
			_this.token = jQuery.cookie(_this.cookieTokenName);
			console.log("Authorized: "+_this.token);
		}else{
			console.log("Non authorized"); 
		}
	}

	this.setIntaProfileToken = function(){ 
		var _this = this;

		jQuery.cookie(_this.cookieTokenName, "879e35c96144cbd1731e739aa20ef90e2eafd64e", { expires : 10 });

		console.log(jQuery.cookie(_this.cookieTokenName)); 
		// if(jQuery.cookie('intaProfileToken')){
		// 	console.log("In cookie");
		// }else{
		// 	console.log("No cookie");
		// }
	}

	this.removeIntaProfileToken = function(){
		var _this = this;

		jQuery.cookie(_this.cookieTokenName, "", { expires : -1 });

		// console.log(jQuery.cookie('intaProfileToken'));
		// if(jQuery.cookie('intaProfileToken')){
		// 	console.log("In cookie");
		// }else{
		// 	console.log("No cookie");
		// }
	}

	this.resetEnterForms = function(){
		var _this = this;

		jQuery(_this.formAuthByEmail).trigger("reset");
		jQuery(_this.formAuthByPhone).trigger("reset");
		jQuery(_this.formRegByEmail).trigger("reset");
		jQuery(_this.formRegByPhone).trigger("reset");
		jQuery(_this.formConfirm).trigger("reset");

		if(_this.formAuthByEmailValidation !== null &&
			_this.formAuthByPhoneValidation !== null &&
			_this.formRegByEmailValidation !== null &&
			_this.formRegByPhoneValidation !== null &&
			_this.formConfirmValidation !== null){
				_this.formAuthByEmailValidation.resetForm();
				_this.formAuthByPhoneValidation.resetForm();
				_this.formRegByEmailValidation.resetForm();
				_this.formRegByPhoneValidation.resetForm(); 
				_this.formConfirmValidation.resetForm(); 
		}
	}

	// this.modalFunc = function(){
	// 	var _this = this;

	// 	var interval = setInterval(function(){
	// 		if (_this.isAccountWindowsLoaded() &&
	// 			_this.isEnterFormsLoaded() &&
	// 			intaCalendar !== undefined) { 
	// 				modalFunc();
	// 				clearInterval(interval); 
	// 		}
	// 	}, 10);

	// 	function modalFunc(){ 
	// 		jQuery(_this.divId+" .ipm-close").click(function(e){
	// 			_this.hideModal();
	// 		});

	// 		jQuery(_this.divId).click(function(e){
	// 			e.preventDefault();
	// 			// jQuery("body, html").css({"overflow": "auto"});
	// 			// console.log(e.target);
	// 			if(jQuery(e.target).hasClass("ipm-wrapper") ||
	// 				jQuery(e.target).hasClass("ipm-dialog")){ 
	// 					// jQuery(_this.divId+" .inta_modal").find(".mde-body").text("");
	// 					// jQuery(_this.divId+" .inta_modal").hide();
	// 					_this.hideModal();
	// 			}
	// 		});

	// 		jQuery(intaCalendar.divId).on("click", ".to_check_in", function(e){
	// 			e.preventDefault();

	// 			_this.checkedEvent = jQuery(this).context.dataset;

	// 			console.log(parseInt(_this.checkedEvent.seats));
	// 			// _this.putProfile();
	// 			// _this.putVisits();

	// 			_this.resetVisitAlert();
	// 			_this.putPreloadAccVisit();
	// 			_this.showAccVisit();
	// 			_this.showModal(); 


	// 			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();

	// 			if(parseInt(_this.checkedEvent.seats) == 0){
	// 				_this.showVisitAlert("error", "Нет мест");
	// 				_this.putEvent();
	// 				return false;
	// 			}

	// 			var eventDate = new Date(_this.checkedEvent.apiDate);
	// 			var currentDate = new Date();
	// 			if(eventDate < currentDate){ 
	// 				_this.showVisitAlert("error", "Тренировка уже прошла");
	// 				_this.putEvent(); 
	// 				return false;
	// 			}

	// 			var intervalShowModal = setInterval(function(){
	// 				if (_this.visits.done === true) {
	// 						if(_this.isEventInVisits(_this.checkedEvent.id)){
	// 							_this.showVisitAlert("info", "Вы уже записаны на тренировку");
	// 							// jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
	// 						}else{
	// 							jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").show();
	// 						}

	// 						_this.putEvent();
	// 						clearInterval(intervalShowModal); 
	// 				}
	// 			}, 10);

	// 		});

	// 		jQuery(_this.divId).on("click", ".ipm-visit_disable", function(e){
	// 			e.preventDefault();

	// 			var visitId = parseInt(jQuery(this).attr("visit-id")); 
	// 			_this.deleteVisit(visitId);
	// 		});
	// 	}
	// }

	this.logOut = function(){
		var _this = this;

		if(_this.token == null){ 
			return false;
		}

		_this.token = null;
		jQuery.cookie(_this.cookieTokenName, "", { expires : -1 });

		_this.resetHtmlEvent();
		_this.resetHtmlVisits();
		_this.resetHtmlProfile(); 

		_this.resetEnterForms();
		_this.showAuthEmail();

		console.log('logOut');
	}

	this.resetVisitAlert = function(){
		var _this = this;

		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").removeClass("ipm-alert_info");
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").removeClass("ipm-alert_error");
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").removeClass("ipm-alert_success");
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").removeClass("ipm-alert_preload");
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text("");
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").hide();
	}

	this.showVisitAlert = function(type, msg){
		var _this = this;

		_this.resetVisitAlert();

		if(type == "preload"){
			jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visit .ipm-visit_alert").html("<div class='for_loader'><div class='loader'></div></div>");
			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").addClass("ipm-alert_preload");
			jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show();
			return false;
		}

		var classAlert = null;
		switch(type){
			case "info":
				classAlert = "ipm-alert_info";
				break;
			case "error":
				classAlert = "ipm-alert_error";
				break;
			case "success":
				classAlert = "ipm-alert_success"; 
				break;
		}

		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text(msg);
		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show(); 

		if(classAlert != null){
			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").addClass(classAlert);
			// jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").addClass("");
		}
		// jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();

	}

	this.putPreloadAccVisit = function(){
		var _this = this; 

		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").html("<div class='for_loader'><div class='loader'></div></div>");
	}

	this.addVisit = function(){
		var _this = this;

		// console.log(_this.checkedEvent); 
		// return false;

		if(_this.token == null){ 
			return false;
		}

		// var eventHtml = jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").detach();

		var urlVisits = _this.getUrl('visits');

		_this.apiQuery(urlVisits, function(responseData){

			_this.resetVisitAlert();
			
			if(responseData.status == "error"){ 
				_this.showVisitAlert("error", _this.getResponseErrorMsg(responseData));
				_this.orderVisitButtonVisibility(false);
				return false;
			}

			_this.showVisitAlert("success", "Вы успешно записаны на тренировку.");  
			_this.getVisits();
			_this.putVisits();

			// if(responseData.status == "success"){ 
			// 	intaProfileHelper.showVisitAlert("success", "Вы успешно записаны на тренировку.");  
			// 	_this.getVisits();
			// 	_this.putVisits();
			// }else{
			// 	// console.log("Handle error");
			// 	_this.resetVisitAlert();
			// 	intaProfileHelper.orderVisitButtonVisibility(true);
			// }
		}, "POST", {
			event: _this.checkedEvent.id
		}, true); 

		// console.log(urlVisits);
	}

	this.getResponseErrorMsg = function(responseData){
		if(typeof responseData.data.responseJSON.non_field_errors !== 'undefined' &&
			responseData.data.responseJSON.non_field_errors.length > 0){
			return responseData.data.responseJSON.non_field_errors[0];
		}
	}

	this.orderVisitButtonVisibility = function(visibility){
		var _this = this;

		var orderVisitButtonVisibility = jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order");  
		if(visibility){
			orderVisitButtonVisibility.show();
		}else{
			orderVisitButtonVisibility.hide();
		}
	}

	this.deleteVisit = function(visiteId){
		var _this = this;

		if(_this.token == null){
			return false;
		}

		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td .for_loader[visit-id="+visiteId+"]").show();
		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td .ipm-visit_disable[visit-id="+visiteId+"]").hide();

		var urlVisits = _this.getUrl('visits', {
			visitId: visiteId
		});

		_this.apiQuery(urlVisits, function(data){
			// _this.profile = data[0];
			// _this.getVisits();
			// 
			if(data == "error"){
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td .for_loader[visit-id="+visiteId+"]").hide();
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td .ipm-visit_disable[visit-id="+visiteId+"]").show();
			}else{
				_this.updateVisitsInModal();
			}
		}, "DELETE", {}, true); 

		// console.log(urlVisits);
	}

	this.updateVisitsInModal = function(putDataCallback){
		var _this = this;

		_this.getVisits();
		var interval = setInterval(function(){
			if (_this.visits.done === true) { 
					_this.putVisits();
					clearInterval(interval); 
			}
		}, 10);
	}

	// this.putDataInModal = function(putDataCallback){
	// 	var _this = this;

	// 	_this.putProfile();
	// 	_this.putVisits();

	// 	var interval = setInterval(function(){
	// 		// console.log("putDataInModal");
	// 		if (_this.profile !== null &&
	// 			// _this.visits !== null &&
	// 			_this.visits.done === true) { 
	// 				// console.log("putDataInModal");
	// 				// ipmAccNavigation();
	// 				// putDataInModal();
	// 				clearInterval(interval); 
	// 		}
	// 	}, 10);

	// 	function putDataInModal(){
	// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").hide();

	// 		jQuery(_this.divId+" .ipm-prof_id").text(_this.profile.id);
	// 		jQuery(_this.divId+" .ipm-prof_first_name").text(_this.profile.first_name);
	// 		jQuery(_this.divId+" .ipm-prof_last_name").text(_this.profile.last_name);
	// 		jQuery(_this.divId+" .ipm-prof_email").text(_this.profile.email);
	// 		jQuery(_this.divId+" .ipm-prof_phone").text(_this.profile.phone);

	// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").text("");
	// 		if(typeof checkedEvent !== 'undefined' && checkedEvent !== null){
	// 			var eventDate = new Date(checkedEvent.apiDate);
	// 			var currentDate = new Date();
	// 			// console.log(eventDate); 

	// 			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").append(
	// 				'<div class="ipm_table">'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Название:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_title">'+checkedEvent.title+'</span></div>'
 //                        +'</div>'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Зал:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_hall">'+checkedEvent.hall+'</span></div>'
 //                        +'</div>'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Цена:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_price">'+checkedEvent.price+'</span></div>'
 //                        +'</div>'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Дата:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_date">'+checkedEvent.date+'</span></div>'
 //                        +'</div>'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Время:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_time">'+checkedEvent.time+'</span></div>'
 //                        +'</div>'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">Продолжительность:</div>'
 //                            +'<div class="ipm_table-td"><span class="ipm-event_duration">'+checkedEvent.duration+'</span></div>'
 //                        +'</div>'
 //                    +'</div>'
	// 			);

	// 			if(eventDate < currentDate){
	// 				jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text('Вы не можете записаться на прошедшую тренировку');
	// 				jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show();
	// 				jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
	// 			}else{
	// 				if(_this.isEventInVisits(checkedEvent.id)){
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text('Вы уже записаны на тренировку');
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show();
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
	// 				}else{
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order a").attr("data-event-id", checkedEvent.id);
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order a").attr("data-event-title", checkedEvent.title);
	// 					jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").show();
	// 				}
	// 			}
	// 		}

	// 		// console
	// 		console.log("putDataInModal"); 

	// 		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_cont").text("");

	// 		// console.log(_this.visits);

	// 		var visitsLength = _this.visits.length;

	// 		if(visitsLength == 0){
	// 			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("У Вас нету записей:");
	// 			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_cont").append(
	// 				'<div class="ipm-visits_zero"><a class="ipm-acc_to ipm-acc_to_event button_link" href="#">Записаться на тренировку</a></div>'
	// 			);
	// 		}else{
	// 			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("Вы записаны на занятия:");
	// 		}

	// 		// for(i=visitsLength-1; i>=0; i--){
	// 		for(i=0; i<visitsLength; i++){
	// 		// 	// var visitTitle = _this.visits[i].title
	// 			// var eventData = _this.getEventDataOfVisit(_this.visits[i].event);
	// 			// if(eventData !== null){
	// 			// 	console.log(eventData);
	// 			// }

	// 			// this.convertDurationApiToObj

	// 			// console.log(_this.visits[i]);

	// 			var eventDate = intaHelper.convertDateApiToDate(_this.visits[i].eventData.date);
	// 			var eventDuration = intaHelper.getDurationFor(intaHelper.convertDurationApiToObj(_this.visits[i].eventData.duration), "modal");
				
	// 			jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visits .ipm-visits_cont").append(
	// 				'<div class="ipm_table">'
 //                        +'<div class="ipm_table-tr">'
 //                            +'<div class="ipm_table-td">'+(i+1)+'.</div>'
 //                            +'<div class="ipm_table-td">'
 //                                +'<div class="ipm-visit_title">'+_this.visits[i].eventData.title+'</div>'
 //                                +'<div>Дата: <span class="ipm-visit_id">'+eventDate.year+'-'+eventDate.month+'-'+eventDate.day+'</span></div>'
 //                                +'<div>Начало: <span class="ipm-visit_begining">'+eventDate.hours+':'+eventDate.minutes+':'+eventDate.seconds+'</span></div>'
 //                                +'<div>Продолжительность: <span class="ipm-visit_duration">'+eventDuration+'</span></div>'
 //                                +'<div>Зал: <span class="ipm-visit_hall">'+_this.visits[i].eventData.hall+'</span></div>'
 //                            +'</div>'
 //                            +'<div class="ipm_table-td">'
 //                                +'<a class="ipm-visit_disable" visit-id="'+_this.visits[i].id+'" href="#">Отменить</a>'
 //                                +'<div class="for_loader" visit-id="'+_this.visits[i].id+'"><div class="loader"></div></div>'
 //                            +'</div>'
 //                        +'</div>'
 //                    +'</div>'
	// 			);

	// 		}
			
	// 		// jQuery(intaProfileHelper.divId+" .ipm-visit_title").text(_this.profile.phone);

	// 		// console.log(intaCalendar.halls);

	// 		putDataInModalCallback();
	// 		// if(show_modal){
	// 		// 	// _this.showAccMenu();
	// 		// 	// _this.showAccVisits();
	// 		// 	_this.showAccVisit();
	// 		// 	_this.showModal();
	// 		// }
	// 	}
	// }

	this.resetHtmlProfile = function(){ 
		var _this = this;

		jQuery(_this.divId+" .ipm-prof_id").text("");
		jQuery(_this.divId+" .ipm-prof_first_name").text("");
		jQuery(_this.divId+" .ipm-prof_last_name").text("");
		jQuery(_this.divId+" .ipm-prof_email").text("");
		jQuery(_this.divId+" .ipm-prof_phone").text(""); 
	}

	this.putProfile = function(){
		var _this = this;

		if(_this.token == null){
			return false;
		}
		// if(_this.profile === null)
		// 	_this.getProfile();

		// _this.getVisits();

		var interval = setInterval(function(){
			// console.log("putDataInModal");
			if (_this.profile !== null) { 
					// console.log("putDataInModal");
					// ipmAccNavigation();
					putProfile();
					clearInterval(interval); 
			}
		}, 10);

		function putProfile(){
			jQuery(_this.divId+" .ipm-prof_id").text(_this.profile.id);
			jQuery(_this.divId+" .ipm-prof_first_name").text(_this.profile.first_name);
			jQuery(_this.divId+" .ipm-prof_last_name").text(_this.profile.last_name);
			jQuery(_this.divId+" .ipm-prof_email").text(_this.profile.email);
			jQuery(_this.divId+" .ipm-prof_phone").text(_this.profile.phone);
		}
	}

	this.resetHtmlVisits = function(){ 
		var _this = this;

		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("");
		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("");
		jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visits .ipm-visits_cont").text("");
	}

	this.putVisits = function(){ 
		var _this = this;

		if(_this.token == null){
			return false;
		}
		// _this.getVisits(); 

		var interval = setInterval(function(){
			// console.log("putDataInModal");
			if (_this.visits.done === true) { 
					// console.log("putDataInModal");
					// ipmAccNavigation();
					putVisits();
					clearInterval(interval); 
			}
		}, 10);

		function putVisits(){
			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_cont").text("");

			var visitsLength = _this.visits.length;

			if(visitsLength == 0){
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text(intaLocale.tr.profile.you_do_not_have_workouts+":");
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_cont").append(
					'<div class="ipm-visits_zero"><a class="ipm-acc_to ipm-acc_to_event button_link" href="#">'+intaLocale.tr.profile.check_in_training+'</a></div>'
				);

				return false;
			}

			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text(intaLocale.tr.profile.signed_up_on_workouts+":");
			// jQuery(_this.divId+" .ipm-account .ipm-visits .ipm-visits_title").text("My:");
			console.log(intaLocale.tr.profile.signed_up_on_workouts);

			// for(i=visitsLength-1; i>=0; i--){
			for(i=0; i<visitsLength; i++){
				var eventDate = intaHelper.convertDateApiToDate(_this.visits[i].eventData.date);
				var eventDuration = intaHelper.getDurationFor(intaHelper.convertDurationApiToObj(_this.visits[i].eventData.duration), "modal");
				
				// var durationHtmlPart = '<div>Продолжительность: <span class="ipm-visit_duration">'+eventDuration+'</span></div>';
				// if(intaCalendar.calendarType == "desktop"){
				// 	if(intaCalendar.calendarView == "month" && !configData.desktopSettings.monthView.showDuration){
				// 		durationHtmlPart = "";
				// 	}else if(intaCalendar.calendarView == "week" && !configData.desktopSettings.weekView.showDuration){
				// 		durationHtmlPart = "";
				// 	}
				// }else if(intaCalendar.calendarType == "mobile" ){

				// }

				jQuery(intaProfileHelper.divId+" .ipm-account .ipm-visits .ipm-visits_cont").append(
					'<div class="ipm_table">'
                        +'<div class="ipm_table-tr">'
                            +'<div class="ipm_table-td">'+(i+1)+'.</div>'
                            +'<div class="ipm_table-td">'
                                +'<div class="ipm-visit_title">'+_this.visits[i].eventData.title+'</div>'
                                +'<div>'+intaLocale.tr.profile.date+': <span class="ipm-visit_id">'+eventDate.year+'-'+eventDate.month+'-'+eventDate.day+'</span></div>'
                                +'<div>'+intaLocale.tr.profile.beginning+': <span class="ipm-visit_begining">'+eventDate.hours+':'+eventDate.minutes+':'+eventDate.seconds+'</span></div>'
                                +'<div class="ipm-visits_cont_duration">'+intaLocale.tr.profile.duration+': <span class="ipm-visit_duration">'+eventDuration+'</span></div>'
                                +'<div>'+intaLocale.tr.profile.hall+': <span class="ipm-visit_hall">'+_this.visits[i].eventData.hall+'</span></div>'
                            +'</div>'
                            +'<div class="ipm_table-td">'
                                +'<a class="ipm-visit_disable" visit-id="'+_this.visits[i].id+'" href="#">'+intaLocale.tr.profile.cancel+'</a>'
                                +'<div class="for_loader" visit-id="'+_this.visits[i].id+'"><div class="loader"></div></div>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
				);
			}
		}
	}

	this.resetHtmlEvent = function(event){
		var _this = this;

		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").text(""); 
	}

	this.putEvent = function(event){  
		var _this = this; 

		var interval = setInterval(function(){
			// console.log("putDataInModal");
			if (_this.visits.done === true) { 
					// console.log("putDataInModal");
					// ipmAccNavigation();
					putEvent();
					clearInterval(interval); 
			}
		}, 10);

		function putEvent(){

			_this.resetVisitAlert(); 
			_this.putPreloadAccVisit();
			_this.showAccVisit();
			_this.showModal(); 


			// jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
			_this.orderVisitButtonVisibility(false);

			if(_this.isEventInVisits(_this.checkedEvent.id)){
				_this.showVisitAlert("info", intaLocale.tr.profile.errs.already_checked_in);
				putEventHtml(); 
				return false;
			}

			// if(parseInt(_this.checkedEvent.seats) == 0){
			// 	_this.showVisitAlert("error", "Нет мест");
			// 	putEventHtml();
			// 	return false;
			// }

			var eventDate = new Date(_this.checkedEvent.apiDate);
			var currentDate = new Date();
			if(eventDate < currentDate){ 
				_this.showVisitAlert("error", intaLocale.tr.profile.errs.already_past); 
				putEventHtml(); 
				return false;
			}

			_this.orderVisitButtonVisibility(true);
			putEventHtml();
		}

		function putEventHtml(){

			var dateEventObj = intaHelper.convertDateApiToDate(_this.checkedEvent.apiDate);

			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").text(""); 
			// if(typeof checkedEvent !== 'undefined' && checkedEvent !== null){
			// var eventDate = new Date(_this.checkedEvent.apiDate);
			// var currentDate = new Date();
			// console.log(eventDate); 

			var durationHtmlPart = '<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.duration+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_duration">'+_this.checkedEvent.durationModal+'</span></div>'
	                +'</div>';

			if(intaCalendar.calendarType == "desktop"){
				if(intaCalendar.calendarView == "month" && !configData.desktopSettings.monthView.showDuration){
					durationHtmlPart = "";
				}else if(intaCalendar.calendarView == "week" && !configData.desktopSettings.weekView.showDuration){
					durationHtmlPart = "";
				}
			}else if(intaCalendar.calendarType == "mobile" && !configData.mobileSettings.weekView.showDuration){ 
				durationHtmlPart = "";
			}

			jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_cont").append(
				'<div class="ipm_table">'
	                +'<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.title+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_title">'+_this.checkedEvent.title+'</span></div>'
	                +'</div>'
	                +'<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.hall+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_hall">'+_this.checkedEvent.hall+'</span></div>'
	                +'</div>'
	                +'<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.price+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_price">'+(_this.checkedEvent.price != "null"?_this.checkedEvent.price:intaLocale.tr.profile.not_set)+'</span></div>'
	                +'</div>'
	                +'<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.date+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_date">'+dateEventObj.year+"-"+dateEventObj.month+"-"+dateEventObj.day+'</span></div>'
	                +'</div>'
	                +'<div class="ipm_table-tr">'
	                    +'<div class="ipm_table-td">'+intaLocale.tr.profile.time+':</div>'
	                    +'<div class="ipm_table-td"><span class="ipm-event_time">'+dateEventObj.hours+":"+dateEventObj.minutes+":"+dateEventObj.seconds+'</span></div>'
	                +'</div>'
	                +durationHtmlPart
	            +'</div>'
			);

		}
		

		// if(eventDate < currentDate){
		// 	jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text('Вы не можете записаться на прошедшую тренировку');
		// 	jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show();
		// 	jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
		// }else{
		// 	if(_this.isEventInVisits(_this.checkedEvent.id)){
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").text('Вы уже записаны на тренировку');
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_alert").show();
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").hide();
		// 	}else{
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order a").attr("data-event-id", _this.checkedEvent.id);
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order a").attr("data-event-title", _this.checkedEvent.title);
		// 		jQuery(_this.divId+" .ipm-account .ipm-visit .ipm-visit_order").show();
		// 	}
		// } 
	}

	this.isEventInVisits = function(eventId){
		var _this = this;

		// console.log(_this.visits);
		// return true;

		var visitsLength = _this.visits.length;
		if(visitsLength == 0){
			return false;
		}

		for(i=0; i<visitsLength; i++){
			if(eventId == _this.visits[i].event){
				return true;
				break;
			}
		}

		return false;
	}

	this.getProfile = function(){
		var _this = this;

		if(_this.token == null){
			return false;
		}

		var url = _this.getUrl('profile');

		// console.log(jQuery.cookie());
		_this.apiQuery(url, function(responseData){
			// console.log(data);
			if(responseData.status == 'error'){
				return false;
			}
			_this.profile = responseData.data[0];
		}, "GET", {}, true); 
	}

	this.getVisits = function(){
		var _this = this;

		if(_this.token == null){
			return false;
		}

		_this.visits = [];
		_this.visits.done = false;

		var urlVisits = _this.getUrl('visits');

		var visits = [];
		var respVisits = [];

		// console.log(jQuery.cookie());
		_this.apiQuery(urlVisits, function(responseData){
			if(responseData.status == "error"){
				_this.visits = [];
				_this.visits.done = true;
				return false;
			}

			var respVisitsLength = responseData.data.results.length;
			if(respVisitsLength == 0){
				_this.visits = [];
				_this.visits.done = true; 
				return false;
			}

			_this.visits = responseData.data.results;
			_this.visits.done = false;

			getVisits();

		}, "GET", {}, true);  

		function getVisits(){
			var addedVisitsCount = 1;
			var visitsLength = _this.visits.length;
			for(i=0; i<visitsLength; i++){
				
				var urlEventInfo = intaHelper.getUrl('event_info', {
					id: _this.visits[i].event
				});

				intaHelper.apiQuery(urlEventInfo, function(responseData, i){ 
					
					if(responseData.status == "error"){
						_this.visits[i].eventData = null;
						return false;
					}

					_this.visits[i].eventData = responseData;

					if(visitsLength == addedVisitsCount){ 
						// console.log(_this.visits);
						_this.visits.done = true; 
						// console.log(_this.visits);
					}
					addedVisitsCount++; 

				}, i);
			}
		}
	}

	this.hideModal = function(){
		var _this = this;

		jQuery("body, html").css({"overflow": "auto"});
		jQuery(_this.divId).hide();
	}

	this.showModal = function(){
		var _this = this;
		
		jQuery("body, html").css({"overflow": "hidden"});
		jQuery(_this.divId).show();
	}

	// this.isAccountWindowsLoaded = function(){
	// 	var _this = this;

	// 	if (jQuery(_this.divId+" .ipm-account").length > 0) {
	// 			return true;
	// 	}else{
	// 		return false;
	// 	}
	// }

	this.isHtmlLoaded = function(){ 
		var _this = this;

		if (jQuery(_this.divId+' .ipm-wrapper').length > 0) {
			return true;
		}

		return false; 
	}

	this.showAcc = function(){
		var _this = this;

		jQuery(_this.divId+" .ipm-enters").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-account").addClass("ipm-show");
	}

	this.resetShowAcc = function(){
		var _this = this;

		jQuery(_this.divId+" .ipm-account .ipm-acc_nav").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-account .ipm-acc_items").removeClass("ipm-show");

		jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item").removeClass("ipm-show");
	}

	this.showAccMenu = function(){
		var _this = this;

		_this.showAcc();
		_this.resetShowAcc();

		jQuery(_this.divId+" .ipm-account .ipm-acc_nav").addClass("ipm-show");
		// jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item.ipm-prof").addClass("ipm-show");

		// jQuery(_this.divId+" .ipm-account .ipm-acc_nav").removeClass("ipm-show");
		// jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
	}

	this.showAccProf = function(){
		var _this = this;

		_this.showAcc();
		_this.resetShowAcc();

		jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
		jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item.ipm-prof").addClass("ipm-show");

		// jQuery(_this.divId+" .ipm-account .ipm-acc_nav").removeClass("ipm-show");
		// jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
	}

	this.showAccVisits = function(){
		var _this = this;

		_this.showAcc();
		_this.resetShowAcc();

		jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
		jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item.ipm-visits").addClass("ipm-show");

		jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td:nth-child(2) .ipm-visits_cont_duration").show();
		if(intaCalendar.calendarType == "desktop"){
			if(intaCalendar.calendarView == "month" && !configData.desktopSettings.monthView.showDuration){
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td:nth-child(2) .ipm-visits_cont_duration").hide();
			}else if(intaCalendar.calendarView == "week" && !configData.desktopSettings.weekView.showDuration){
				jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td:nth-child(2) .ipm-visits_cont_duration").hide();
			}
		}else if(intaCalendar.calendarType == "mobile" && !configData.mobileSettings.weekView.showDuration){
			jQuery(_this.divId+" .ipm-account .ipm-visits .ipm_table-td:nth-child(2) .ipm-visits_cont_duration").hide();
		}

		jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item.ipm-visits").scrollTop(0);

		// jQuery(_this.divId+" .ipm-account .ipm-acc_nav").removeClass("ipm-show");
		// jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
	}

	this.showAccVisit = function(){
		var _this = this;

		_this.showAcc();
		_this.resetShowAcc();

		jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
		jQuery(_this.divId+" .ipm-account .ipm-acc_items .ipm-acc_item.ipm-visit").addClass("ipm-show");

		// jQuery(_this.divId+" .ipm-account .ipm-acc_nav").removeClass("ipm-show");
		// jQuery(_this.divId+" .ipm-account .ipm-acc_items").addClass("ipm-show");
	}

	this.showAuth = function(){
		var _this = this;

		// console.log("showAuth");
		jQuery(_this.divId+" .ipm-account").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enters").addClass("ipm-show");

		jQuery(_this.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter").removeClass("active");
		jQuery(_this.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter_auth").addClass("active");

		jQuery(_this.divId+" .ipm-enter").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter.ipm-enter_auth").addClass("ipm-show");
	}

	this.showAuthEmail = function(){
		var _this = this;

		// console.log("showAuth");

		_this.showAuth();

		jQuery(_this.divId+" .ipm-enter_auth .ipm-switch_auth a.ipm-to_auth").removeClass("active");
		jQuery(_this.divId+" .ipm-enter_auth .ipm-switch_auth a.ipm-to_auth_email").addClass("active");

		jQuery(_this.divId+" .ipm-enter_auth .ipm-auth").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter_auth .ipm-auth_email").addClass("ipm-show");
	}

	this.showAuthPhone = function(){
		var _this = this;

		// console.log("showAuthPhone");

		_this.showAuth();

		jQuery(_this.divId+" .ipm-enter_auth .ipm-switch_auth a.ipm-to_auth").removeClass("active");
		jQuery(_this.divId+" .ipm-enter_auth .ipm-switch_auth a.ipm-to_auth_phone").addClass("active");

		jQuery(_this.divId+" .ipm-enter_auth .ipm-auth").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter_auth .ipm-auth_phone").addClass("ipm-show");
	}

	this.showReg = function(){
		var _this = this; 

		// console.log("showAuth");

		jQuery(_this.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter").removeClass("active");
		jQuery(_this.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter_reg").addClass("active");

		jQuery(_this.divId+" .ipm-enter").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter.ipm-enter_reg").addClass("ipm-show");
	}

	this.showConfirm = function(type, elToConfirm){
		var _this = this; 

		jQuery(_this.divId+" .ipm-enters .ipm-switch_enter a.ipm-to_enter").removeClass("active");

		jQuery(_this.divId+" .ipm-enter").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter.ipm-enter_confirm").addClass("ipm-show"); 

		jQuery(_this.divId+" .ipm-enter_confirm .ipm-confirm_header").text("");
		if(type == "phone"){
			jQuery(_this.divId+" .ipm-enter_confirm .ipm-confirm_header").append(
				'<div class="ipm-confirm_header">'
                    +'Введите код отправленный на телефон:<br>'
                    +'<span class="el_to_confirm">'+elToConfirm+'</span>'
                +'</div>'
			);
		}else if(type == "email"){
			jQuery(_this.divId+" .ipm-enter_confirm .ipm-confirm_header").append(
				'<div class="ipm-confirm_header">'
                    +'Введите код отправленный на Email:<br>'
                    +'<span class="el_to_confirm">'+elToConfirm+'</span>' 
                +'</div>'
			);
		}

		// jQuery(_this.divId+" .ipm-enter_confirm .el_to_confirm").text(elToConfirm);
		jQuery(_this.divId+" .ipm-enter_confirm input[name='verify_code']").attr("el-to-verify", elToConfirm); 
		jQuery(_this.divId+" .ipm-enter_confirm input[name='verify_code']").attr("type-confirmation", type); 
	}

	this.showRegPhone = function(){
		var _this = this;

		// console.log("showAuthPhone");

		_this.showReg();

		jQuery(_this.divId+" .ipm-enter_reg .ipm-switch_reg a.ipm-to_reg").removeClass("active");
		jQuery(_this.divId+" .ipm-enter_reg .ipm-switch_reg a.ipm-to_reg_phone").addClass("active");

		jQuery(_this.divId+" .ipm-enter_reg .ipm-reg").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter_reg .ipm-reg_phone").addClass("ipm-show");
	}

	this.showRegEmail = function(){
		var _this = this;

		// console.log("showAuthPhone");

		_this.showReg();

		jQuery(_this.divId+" .ipm-enter_reg .ipm-switch_reg a.ipm-to_reg").removeClass("active");
		jQuery(_this.divId+" .ipm-enter_reg .ipm-switch_reg a.ipm-to_reg_email").addClass("active");

		jQuery(_this.divId+" .ipm-enter_reg .ipm-reg").removeClass("ipm-show");
		jQuery(_this.divId+" .ipm-enter_reg .ipm-reg_email").addClass("ipm-show");
	}

	this.auth = function(type){ 
		var _this = this;

		// intaProfileHelper.showConfirm();
		// return false;

		switch(type){
			case "email":

				var email = jQuery(_this.formAuthByEmail+" input[name='auth_email']").val();
				var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

				var url = _this.getUrl("auth-email");
				var data = {
					email: email,
					password: password,
					code: configData.apiCode,
					key: configData.apiKey,
				};

				var callback = function(responseData){
					if(responseData.status == "error"){
						_this.formAuthByEmailValidation.showErrors({
					        "auth_email": _this.getResponseErrorMsg(responseData)
					    });
					    return false;
						// alert("Bad Authentication");
					}
					// console.log(responseData);
					_this.enterProfile(responseData.data.token); 
				}

				_this.apiQuery(url, callback, "POST", data);

				break;
			case "phone":

				var phone = jQuery(_this.formAuthByPhone+" input[name='auth_phone']").val();
				// var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

				var url = _this.getUrl("auth-phone");
				var data = {
					phone: phone,
					code: configData.apiCode,
					key: configData.apiKey,
				};

				var callback = function(responseData){
					if(responseData.status == "error"){
						// alert("Bad Authentication");
						_this.formAuthByPhoneValidation.showErrors({
					        "auth_phone": "Некоректный телефон"
					    });
					    return false;
					}
					// console.log(data);
					// _this.showConfirm(phone);
					_this.showConfirm("phone", phone); 
				}

				intaProfileHelper.apiQuery(url, callback, "POST", data);

				break;
		}
	}

	this.reg = function(type){
		var _this = this;

		// intaProfileHelper.showConfirm();
		// return false;

		switch(type){
			case "email":

				var elToConfirm = jQuery(_this.formRegByEmail+" input[name='reg_email']").val();
				var password = jQuery(_this.formRegByEmail+" input[name='reg_pass']").val();
				var firstName = jQuery(_this.formRegByEmail+" input[name='reg_first_name']").val();
				var lastName = jQuery(_this.formRegByEmail+" input[name='reg_last_name']").val(); 

				var url = _this.getUrl("reg-email");
				var data = {
					email: elToConfirm,
					first_name: firstName,
					last_name: lastName, 
					password: password,
					code: configData.apiCode,
					key: configData.apiKey,
				};

				// _this.showConfirm(type, elToConfirm);
				// return false;

				var callback = function(responseData){
					if(responseData.status == "error"){
						_this.formAuthByEmailValidation.showErrors({
					        "auth_email": _this.getResponseErrorMsg(responseData)
					    });
					    return false;
						// alert("Bad Authentication");
					}
					console.log(responseData); 
					_this.showConfirm(type, elToConfirm);  
					// _this.enterProfile(responseData.data.token); 
				}

				_this.apiQuery(url, callback, "POST", data);

				break;
			case "phone":

				var elToConfirm = jQuery(_this.formRegByPhone+" input[name='reg_phone']").val();
				var firstName = jQuery(_this.formRegByPhone+" input[name='reg_first_name']").val();
				var lastName = jQuery(_this.formRegByPhone+" input[name='reg_last_name']").val(); 
				// var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

				var url = _this.getUrl("reg-phone");
				var data = {
					phone: elToConfirm,
					first_name: firstName,
					last_name: lastName,
					code: configData.apiCode,
					key: configData.apiKey,
				};

				var callback = function(responseData){
					if(responseData.status == "error"){
						// alert("Bad Authentication");
						var error = _this.getResponseErrorMsg(responseData);
						if(error.includes("Нельзя создать нового клиента")){
							error = "Телефон уже занят";
						}
						_this.formRegByPhoneValidation.showErrors({
					        "reg_phone": error
					    });
					    return false; 
					}
					console.log("Reg phone OK!"); 
					console.log(responseData);
					// _this.showConfirm(phone);
					_this.showConfirm(type, elToConfirm); 
				}

				intaProfileHelper.apiQuery(url, callback, "POST", data);

				break;
		}
	}

	this.confirm = function(type){
		var _this = this;

		var type = jQuery(_this.formConfirm+" input[name='verify_code']").attr("type-confirmation");
		var elToConfirm = jQuery(_this.formConfirm+" input[name='verify_code']").attr("el-to-verify");
		var smsCode = jQuery(_this.formConfirm+" input[name='verify_code']").val();

		// console.log(phone);
		// console.log(smsCode);
		// return false;

		if(type == "email"){
			var url = _this.getUrl("email-verify");

			var data = {
				email: elToConfirm,
				sms: smsCode,
				code: configData.apiCode,
				key: configData.apiKey, 
			};
		}else if(type == "phone"){ 
			var url = _this.getUrl("phone-verify");

			var data = {
				phone: elToConfirm,
				sms: smsCode,
				code: configData.apiCode,
				key: configData.apiKey,
			};
		}

		var callback = function(responseData){
			if(responseData.status == "error"){
				_this.formConfirmValidation.showErrors({
			        "verify_code": "Ошибка подтверждения кода"
			    });
			    return false;
				// alert("Bad Authentication");
			}

			_this.enterProfile(responseData.data.token);
		}

		intaProfileHelper.apiQuery(url, callback, "POST", data);
	}

	this.enterProfile = function(token){ 
		var _this = this;

		jQuery.cookie(_this.cookieTokenName, token, { expires : 10 });
		_this.token = token; 
		
		_this.getVisits(); 
		_this.putVisits();
		_this.getProfile(); 
		_this.putProfile();

		// _this.showAccMenu(); 
		_this.putEvent(); 
	}

	// this.auth = function(type){ 
	// 	var _this = this;

	// 	switch(type){
	// 		case "email":

	// 			var email = jQuery(_this.formAuthByEmail+" input[name='auth_email']").val();
	// 			var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

	// 			var url = _this.getUrl("auth-email");
	// 			var data = {
	// 				email: email,
	// 				password: password,
	// 				code: configData.apiCode,
	// 				key: configData.apiKey,
	// 			};

	// 			var callback = function(data){
	// 				if(data == "error"){
	// 					_this.formAuthByEmailValidation.showErrors({
	// 				        "auth_email": "Некоректный email или пароль"
	// 				    });
	// 					// alert("Bad Authentication");
	// 				}
	// 				console.log(data);
	// 			}

	// 			_this.apiQuery(url, callback, "POST", data);

	// 			break;
	// 		case "phone":

	// 			// console.log("phone");
				
	// 			var phone = jQuery(_this.formAuthByPhone+" input[name='auth_phone']").val();
	// 			// var password = jQuery(_this.formAuthByEmail+" input[name='auth_pass']").val();

	// 			var url = _this.getUrl("auth-phone");
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
	// 				_this.showConfirm(phone); 
	// 			}

	// 			_this.apiQuery(url, callback, "POST", data);

	// 			break;
	// 	}
	// }

	// this.reg = function(type){

	// }

	this.getUrl = function(type, params){
		var _this = this; 

		var url = null;

		var urlAuthByPhone = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/login/";
		var urlAuthByEmail = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/login/";
		var urlRegByPhone = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/signup/";
		var urlRegByEmail = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/signup/";
		var urlProfile = "https://instasport.co/club/"+configData.apiClub+"/api/v1/client/profile/";
		var urlPhoneVerify = "https://instasport.co/club/"+configData.apiClub+"/api/v1/phone/verify/";
		var urlEmailVerify = "https://instasport.co/club/"+configData.apiClub+"/api/v1/email/verify/";
		var urlVisit = "https://instasport.co/club/"+configData.apiClub+"/api/v1/client/visit/"; 

		switch(type){
			case "auth-phone":
				url = urlAuthByPhone;
				break;
			case "auth-email":
				url = urlAuthByEmail;
				break;
			case "reg-phone":
				url = urlRegByPhone;
				break;
			case "reg-email":
				url = urlRegByEmail; 
				break;
			case "profile":
				url = urlProfile;
				break;
			case "phone-verify":
				url = urlPhoneVerify;
				break;
			case "email-verify":
				url = urlEmailVerify;
				break;
			case "visits":
				url = urlVisit;
				if(typeof params !== "undefined" &&
					typeof params.visitId !== "undefined"){
					url += params.visitId;
				}
				break;
		}

		return url;
	}

	// this.isResponseSuccess = function(data){
	// 	var _this = this; 

	// 	if(typeof data.responseJSON == 'undefined'){
	// 		return true
	// 	}
	// 	return false;
	// }

	this.apiQuery = function(url, callback, method = "GET", data = {}, headers = false){ 
		var _this = this; 

		var beforeSend = function(xhr){
			xhr.setRequestHeader('Accept-Language', intaLocale.locale);
			if(headers){
				xhr.setRequestHeader('Authorization', 'Token '+_this.token);
			}
		}

		jQuery.ajax({
			// async: false,
			type: method, 
			// beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+jQuery.cookie('intaToken'));},
			beforeSend: beforeSend,
			url: url,
			data: data,
			success: function(data, status, settings) {
				var responseData = {
					data: data,
					status: status,
					settings: settings,
				}

				try{
					callback(responseData);
				}catch(e){
					callback('');
				}
				// alert("done");
			},
			error: function(data, status, settings){
				var responseData = {
					data: data,
					status: status,
					settings: settings,
				}

				try{
					callback(responseData);
				}catch(e){
					callback('');
				}
			}
		});

	}

}


var intaProfileHelper = null; 
var profileInterval = setInterval(function(){
	if (typeof configData !== 'undefined' &&
		typeof intaCalendar !== 'undefined') { 
		intaProfileHelper = new intaProfileHelperClass();
		// intaProfileHelper.init();

		clearInterval(profileInterval); 
	}
}, 10);