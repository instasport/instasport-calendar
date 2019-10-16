jQuery(document).ready(function($){

	var intaCalendarClass = function(){

		this.divId = "#intaCallendar"; 
		// this.deskDescPopUpId = "#deskDescPopUp"; 

		this.browserWindowWidth = null;
		this.browserWindowHeight = null;
		this.calendarType = null;
		this.calendarView = null;
		this.breakPointCalendarType = 800;
		this.dateToday = null;

		// this.lang = null;
		// this.locale = null; 

		this.datesToPullEvents = null;
		this.datesToPullEventsProcessing = false;

		this.events = [];
		this.events.done = false;
		this.halls = null;
		this.clubInfo = null;

		this.currentHall = null;

		this.intaCalendarDesktopMonthInstance = null;
		this.intaCalendarDesktopWeekInstance = null;
		this.intaCalendarMobileWeekInstance = null;
		this.currentInitCalendar = null;

		this.initialized = false;

		// this.filters = {
		// 	"hall": null,
		// 	"instructor": null,
		// 	"event": null,
		// 	"activity": null,
		// 	"complexity": null,
		// };

		this.filter = {
			"type": null,
			"value": null
		};

		this.init = function(){
			var _this = this;

			// console.log(intaLocale.tr);

			// console.log(configData);

			_this.dateToday = new Date(); 
			// _this.locale = intaLocale.getTranslates();
			// _this.setLocale(); 

			if(this.calendarType === null &&
				this.calendarView === null){
				_this.putPreloader();
			}
			
			_this.switchDesktopView();
			_this.desktopDescriptionPopUp();

			// return false;

			_this.setBrowserWindowWidthHeight();
			_this.browserWindowResize();
			_this.setDatesToPullEvents(_this.dateToday); 
			_this.setCalendarType();
			_this.setCalendarView();
			_this.getClubInfo();

			_this.applyCustomCss();

			_this.getHalls();
			_this.getEvents();

			_this.registerModalFunc();

			_this.initializeCalendar();

			// console.log(new Date("2019-09-30T07:15:00+03:00"));
			// console.log(new Date("2019-09-30T07:15:00+03:00").getTimezoneOffset());
			
			// _this.lang = lang;
			// _this.locale = locale;
			// _this.initialized = true;
		}

		this.applyCustomCss = function(){
			var _this = this;

			var interval = setInterval(function(){
				if (_this.clubInfo !== null) {
					applyCustomCss();

					clearInterval(interval);
				}
			}, 10); 

			function applyCustomCss(){
				// console.log(_this.clubInfo);
				// return false;

				if(configData.desktopSettings.useApiColors){
					var sheet = document.createElement('style')
					sheet.innerHTML = `
						/******************    Desktop Month   **********************/
						#intaCallendar .dm-calendar .dm-filters ul li.active a.dm-filter-item,
						#intaCallendar .dm-calendar .dm-filters ul li.choosed a.dm-filter-item{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}



						#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dm-calendar .dm-filters ul li a.dm-filter-item:hover div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dm-calendar .dm-filters ul li.active a.dm-filter-item div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dm-calendar .dm-filters ul li.choosed a.dm-filter-item div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today .dm-day_number{
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						}
						#intaCallendar .dm-calendar .dm-events .dm-for_day.dm-day_today .dm-more a{
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						}



						/**************************    Desktop Week    ******************************/

						#intaCallendar .dw-calendar .dw-filters ul li.active a.dw-filter-item,
						#intaCallendar .dw-calendar .dw-filters ul li.choosed a.dw-filter-item{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dw-calendar .dw-filters ul li a.dw-filter-item:hover{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dw-calendar .dw-filters ul li a.dw-filter-item:hover div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dw-calendar .dw-filters ul li.active a.dw-filter-item div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaCallendar .dw-calendar .dw-filters ul li.choosed a.dw-filter-item div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .dw-calendar .dw-events .dw-for_day.dw-day_today{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .dw-calendar .dw-day_today .dw-day .dw-more a{
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						}


						/**************************    Desktop Modal    ******************************/
						#intaCallendar.desktop .inta_modal .mde-header{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar.desktop .inta_modal .mde-header a.mde-close div{
						    background-color: ${_this.clubInfo[0].primary_text_color}!important;
						}
						#intaCallendar.desktop .inta_modal .mde-header div,
						#intaCallendar.desktop .inta_modal .mde-header a{
						    color: ${_this.clubInfo[0].primary_text_color}!important; 
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
						    color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.desktop .button2.active{
						    color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaProfileModal.desktop .button_nav{
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.desktop .button_nav:hover{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.desktop .button1{
						    color: black;
						}

						#intaProfileModal.desktop .button1:hover{
						    color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.desktop .button1.active{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						}

						#intaProfileModal.desktop input[type='button'] {
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.desktop .ipm-body .ipm-close {
						    color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.desktop .button_suc{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.desktop .button_suc:hover{
						    background-color: ${_this.clubInfo[0].primary_color}!important; 
						}

						#intaProfileModal.desktop .ipm-visit_disable{
						    color: black!important;
						}
						#intaProfileModal.desktop .ipm-visit_disable:hover{
						    color: ${_this.clubInfo[0].primary_color}!important;
						    text-decoration: underline;
						}


						#intaProfileModal.desktop .button_link:hover{
						    color: ${_this.clubInfo[0].primary_color}!important; 
						}
					`;
					document.body.appendChild(sheet);
				}

				if(configData.mobileSettings.useApiColors){
					var sheet2 = document.createElement('style')
					sheet2.innerHTML = `
						
						/**************************    Halls    ******************************/
						#intaCallendar .mw-calendar .mw-halls ul li:hover{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .mw-calendar .mw-halls ul li.active,
						#intaCallendar .mw-calendar .mw-filters ul li.active{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .mw-calendar .mw-filters ul li a:hover div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar .mw-calendar .mw-filters ul li.choosed a div{
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}


						/**************************    Mobile Modal    ******************************/
						#intaCallendar.mobile .inta_modal .mde-header{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaCallendar.mobile .inta_modal .mde-header a.mde-close div{
						    background-color: ${_this.clubInfo[0].primary_text_color}!important; 
						}
						#intaCallendar.mobile .inta_modal .mde-header div,
						#intaCallendar.mobile .inta_modal .mde-header a{
						    color: ${_this.clubInfo[0].primary_text_color}!important;
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
						    color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.mobile .button2.active{
						    color: ${_this.clubInfo[0].primary_color}!important;
						}

						#intaProfileModal.mobile .button_nav{
						    color: <?=$clubInfo[0]["primary_text_color"]?>!important;
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.mobile .button_nav:hover{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.mobile .button1{ 
						    color: black;
						}

						#intaProfileModal.mobile .button1:hover{
						    color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.mobile .button1.active{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						}

						#intaProfileModal.mobile input[type='button'] {
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						    color: ${_this.clubInfo[0].primary_text_color}!important;
						    border-color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.mobile .ipm-body .ipm-close {
						    color: ${_this.clubInfo[0].primary_color}!important;
						}


						#intaProfileModal.mobile .button_suc{
						    background-color: ${_this.clubInfo[0].primary_color}!important;
						}
						#intaProfileModal.mobile .button_suc:hover{
						    background-color: ${_this.clubInfo[0].primary_color}!important; 
						}

						#intaProfileModal.mobile .ipm-visit_disable{
						    color: black!important;
						}
						#intaProfileModal.mobile .ipm-visit_disable:hover{
						    color: ${_this.clubInfo[0].primary_color}!important;
						    text-decoration: underline;
						}


						#intaProfileModal.mobile .button_link:hover{
						    color: ${_this.clubInfo[0].primary_color}!important;
						}



						/**************************    Mobile Calendar    ******************************/
						#intaCallendar .mw-header{
						    background-color: ${_this.clubInfo[0].secondary_color}!important;
						}
						#intaCallendar .mw-header .mw-switch_days .mw-for_day{
						    background-color: ${_this.clubInfo[0].secondary_color}!important;
						}
						#intaCallendar .mw-header .mw-switch_days .mw-for_day a{
						    color: ${_this.clubInfo[0].secondary_text_color}!important;
						}
						#intaCallendar .mw-header .mw-header_title{
						    color: ${_this.clubInfo[0].secondary_text_color}!important;
						}
						#intaCallendar .mw-header .mw-switch_days .inta_table-td.active a{
						    color: ${_this.clubInfo[0].primary_color}!important;  
						}

					`;
					document.body.appendChild(sheet2);
				}
			}
		}

		this.desktopDescriptionPopUp = function(){
			var _this = this; 

			// console.log("desktopDescriptionPopUp");
			if(jQuery('#deskDescPopUp').length == 0){
				jQuery('body').append(
					'<div id="deskDescPopUp">'
						+'<div class="description_pop_up"></div>'
					+'</div>'
				);
				
				jQuery('#deskDescPopUp .description_pop_up').load(configData.pluginUrl+"view/description_window.php");

				// var interval = setInterval(function(){
				// 	var el = jQuery(_this.deskDescPopUpId+" .description_pop_up .for_description_window");
				// 	if (el.length > 0) {
				// 		scrollToCalendar();
				// 		clearInterval(interval); 
				// 	}
				// }, 10);

				desktopDescriptionPopUp();
			}

			function desktopDescriptionPopUp(){

				var _hoverEl = null;

				jQuery("body").click(function(e){
					jQuery("#deskDescPopUp .description_pop_up").hide();
				});

				jQuery(document).on("hover", ".inta-event_description", function(e){
					if(e.type == 'mouseenter'){
						
						// console.log("Enter");
						// return false;

						reset();

						_hoverEl = this;

						show();

						var dataDescription = jQuery(_hoverEl).attr("data-description");

						if(dataDescription !== "null"){
							putData();
						}else{
							// var event_id = jQuery(_hoverEl).attr("data-id");

							var url = intaHelper.getUrl("event_info", {
								"id": jQuery(_hoverEl).attr("data-id")
							});

							intaHelper.apiQuery(url, function(data){
								// var durApi = intaHelper.convertDurationApiToObj(data.duration);

								if(data.description.length > 0){
									jQuery(_hoverEl).attr("data-description", data.description[0].text);
								}

								putData();
							});
						}

					}
					if(e.type == 'mouseleave'){
						
						// console.log("Leave");
						// return false;
						// return false;

						jQuery("#deskDescPopUp .description_pop_up").hide();
						_hoverEl = null;
						reset();

					} 
				});

				function show(){
					jQuery("#deskDescPopUp .description_pop_up").removeClass("left_arrow_box right_arrow_box");

					var positionHoverEl = jQuery(_hoverEl).offset();
					var widthHoverEl = jQuery(_hoverEl).width();

					// var rect = _hoverEl.getBoundingClientRect();
					// console.log(rect);
					// console.log(positionHoverEl.top);
					// return false;

					var descWindowPosition = {
						"top": positionHoverEl.top - 20 
					};

					// if(jQuery(_hoverEl).closest(".inta_modal").length > 0){
					// 	descWindowPosition.top += jQuery(document).scrollTop() - 6;
					// 	// descWindowPosition.top += positionHoverEl.top + 6;
					// 	// console.log(jQuery(window).scrollTop());
					// }

					if(positionHoverEl.left < 250){
						descWindowPosition.left = positionHoverEl.left + widthHoverEl + 10;
						jQuery("#deskDescPopUp .description_pop_up").addClass("left_arrow_box");
					}else{
						descWindowPosition.left = positionHoverEl.left - 220;
						jQuery("#deskDescPopUp .description_pop_up").addClass("right_arrow_box");
					}

					jQuery("#deskDescPopUp .description_pop_up").css({
						"left": descWindowPosition.left,
						"top": descWindowPosition.top,
					});

					jQuery("#deskDescPopUp .description_pop_up").show();
				}

				function putData(){
					if(_hoverEl === null){
						return false;
					}

					reset();

					var eventDescription = jQuery(_hoverEl).attr("data-description");
					
					var eventActivity = jQuery(_hoverEl).attr("data-activity");
					if(eventActivity == "null"){
						eventActivity = "";
					}

					var eventTitle = jQuery(_hoverEl).attr("data-title");
					var eventDuration = jQuery(_hoverEl).attr("data-duration");
					var eventId = jQuery(_hoverEl).attr("data-id");
					var eventBegining = jQuery(_hoverEl).attr("data-begining");

					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-title .description_title").text(eventTitle); 
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-title .description_activity").text(eventActivity);
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-beginning").text(eventBegining);
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-text").text(eventDescription !== "null"?eventDescription:"No description");
					
					// jQuery(intaCalendar.divId+" .description_window .description_window-bottom").text("");
					if(configData.desktopSettings.monthView.showDuration &&
						_this.calendarType == "desktop" &&
						_this.calendarView == "month"){
						jQuery("#deskDescPopUp .description_pop_up .description_pop_up-bottom").text(intaLocale.tr.profile.duration+" - "+eventDuration);
					}

					if(configData.desktopSettings.weekView.showDuration &&
						_this.calendarType == "desktop" &&
						_this.calendarView == "week"){
						jQuery("#deskDescPopUp .description_pop_up .description_pop_up-bottom").text(intaLocale.tr.profile.duration+" - "+eventDuration);
					}

					jQuery("#deskDescPopUp .description_pop_up").addClass("loaded"); 
				}

				//}

				function reset(){
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-title .description_title").text("");
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-title .description_activity").text("");
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-beginning").text("");
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-text").text("");
					jQuery("#deskDescPopUp .description_pop_up .description_pop_up-bottom").text("");
					jQuery("#deskDescPopUp .description_pop_up").removeClass("loaded");
				}
			}

		}

		this.switchDesktopView = function(){
			var _this = this;

			jQuery(_this.divId).on("click", ".dm-calendar .dm-filters .dm-row_1 .dm-view a.dm-filter-item", function(e){
				e.preventDefault();
				var toView = jQuery(this).attr("view");
				// console.log("Change view to "+view);

				switchDesktopView(toView);
			});

			jQuery(_this.divId).on("click", ".dw-calendar .dw-filters .dw-row_1 .dw-view a.dw-filter-item", function(e){
				e.preventDefault();
				var toView = jQuery(this).attr("view");
				// console.log("Change view to "+view);

				switchDesktopView(toView);
			});

			function switchDesktopView(toView){
				if(_this.calendarType == "desktop"){
					if(_this.calendarView == "month" && toView == "week"){
						_this.calendarView = toView;

						_this.setFilter(null, null);
						// _this.getEvents()
						// _this.setDatesToPullEvents(_this.dateToday); 
						// _this.getEvents();

						_this.setDatesToPullEvents(_this.dateToday); 
						_this.currentHall = 0;

						_this.events = [];
						_this.events.done = false;

						_this.getEvents(); 

						var interval = setInterval(function(){
							if (intaCalendar.events.done) {
								if(_this.intaCalendarDesktopWeekInstance == null){
									_this.intaCalendarDesktopWeekInstance = new intaCalendarDesktopWeekClass();
								}
								_this.intaCalendarDesktopWeekInstance.init();

								clearInterval(interval);
							}
						}, 10);

					}else if(_this.calendarView == "week" && toView == "month"){
						_this.calendarView = toView;

						_this.setFilter(null, null);
						// _this.getEvents()

						_this.setDatesToPullEvents(_this.dateToday); 
						_this.currentHall = 0;

						_this.events = [];
						_this.events.done = false;

						_this.getEvents(); 
						
						var interval = setInterval(function(){
							if (intaCalendar.events.done) {
								if(_this.intaCalendarDesktopMonthInstance == null){
									_this.intaCalendarDesktopMonthInstance = new intaCalendarDesktopMonthClass();
								}
								_this.intaCalendarDesktopMonthInstance.init();

								clearInterval(interval);
							}
						}, 10);

						
					}
				}else{
					// calendar = new intaCalendarMobileWeekClass();
					// console.log("mobile-week");
				}
			}
		}

		this.putPreloader = function(){
			jQuery(this.divId).html(
				'<div class="main_preloader">'
					+'<div class="loader"></div>'
				+'</div>'
			);
		}

		this.setFilter = function(type, value){
			intaCalendar.filter = {
				"type": type,
				"value": value
			}
		}

		this.initializeCalendar = function(){
			var _this = this;

			// return false;
			

			var interval = setInterval(function(){
				
				if (_this.halls !== null &&
					_this.datesToPullEvents !== null &&
					_this.clubInfo !== null &&

					_this.calendarType !== null &&
					_this.calendarView !== null &&
					_this.dateToday !== null &&
					// !_this.datesToPullEventsProcessing &&
					_this.events.done &&
					
					_this.browserWindowWidth !== null &&
					_this.browserWindowHeight !== null &&
					intaCalendarDesktopMonthClass !== undefined &&
					intaCalendarDesktopWeekClass !== undefined &&
					intaCalendarMobileWeekClass !== undefined){

						// var calendar;
						// _this.calendarView = "week";

						if(_this.calendarType == "desktop"){
							if(_this.calendarView == "month"){
								_this.intaCalendarDesktopMonthInstance = new intaCalendarDesktopMonthClass();
								_this.intaCalendarDesktopMonthInstance.init();
								// setDatesToPullEventsMonth(dateToday.getFullYear(), dateToday.getMonth());
								// console.log("desktop-month");
							}else{
								// calendar = new intaCalendarDesktopWeekClass();
								_this.intaCalendarDesktopWeekInstance = new intaCalendarDesktopWeekClass();
								_this.intaCalendarDesktopWeekInstance.init();
								// console.log("desktop-week");
							}
						}else{
							// calendar = new intaCalendarMobileWeekClass();
							// console.log("mobile-week");
							_this.intaCalendarMobileWeekInstance = new intaCalendarMobileWeekClass();
							_this.intaCalendarMobileWeekInstance.init();
						}

						_this.initialized = true;

						// calendar.init();
						// console.log("Initialized");
						clearInterval(interval);
				}
			}, 10);
		}

		this.getEvents = function(){
			var _this = this;

			_this.events = [];
			_this.events.done = false;

			var page = 1;
			var page_size = 1000;
			var hall = null;

			var events = [];
			events.done = false;

			var interval_1 = setInterval(function(){
				if (_this.halls !== null &&
					_this.datesToPullEvents !== null){
					

					// var page = 1;
					// var page_size = 1000;
					
					if(_this.currentHall == null){
						hall = _this.halls[0].id; 
					}else{
						hall = _this.halls[_this.currentHall].id; 
					}

					// console.log(hall);					

					var url = intaHelper.getUrl("events", {
						"beginDate": intaHelper.convertDateForLink(_this.datesToPullEvents.firstDay),
						"endDate": intaHelper.convertDateForLink(_this.datesToPullEvents.lastDay),
						"hall": hall,
						"page": page,
						"page_size": page_size,
					});

					var callback = function(data){
						// events[page] = data;
						_this.events = _this.events.concat(data.results);
						// putEventObjectIntoArrayEvents(data, page);
						if(data.next !== null){
							var url = components.getUrl("events", {
								"beginDate": components.convertDateForLink(components.datesToPullEvents.firstDay),
								"endDate": components.convertDateForLink(components.datesToPullEvents.lastDay),
								"hall": hall,
								"page": ++page,
								"page_size": page_size,
							});
							intaHelper.apiQuery(url, callback);
						}else{
							// console.log(events);
							// events.done = true;
							_this.events.done = true;

						}
					};

					intaHelper.apiQuery(url, callback);
					clearInterval(interval_1);
				}
			}, 10);
			
		}

		this.goPrevious = function(){
			var _this = this;

			if(_this.datesToPullEventsProcessing)
				return false;

			this.datesToPullEventsProcessing = true;

			var interval = setInterval(function(){
				if (_this.datesToPullEvents !== null &&
					_this.calendarType !== null) {
					
					if(_this.calendarType == "desktop"){
						if(_this.calendarView == "month"){
							goPreviousMonth();
							// setDatesToPullEventsMonth(dateToday.getFullYear(), dateToday.getMonth());
							// console.log("desktop-month");
						}else{
							goPreviousWeek(); 
							// console.log("desktop-week");
						}
					}else{
						goPreviousWeek();
						// console.log("mobile-week");
					}
					// goPrevious();
					clearInterval(interval);
				}
			}, 10);

			function goPreviousMonth(){
				
				var copyFirstDate = new Date(_this.datesToPullEvents.firstDay.getTime());
				var firstMonthDay = null;

				if(copyFirstDate.getDate() != 1){
					// console.log("find first day of month");
					// var day = copyFirstDate.getDate();
					var month = copyFirstDate.getMonth();
					var year = copyFirstDate.getFullYear();
					firstMonthDay = new Date(year, month, 1); 

					// console.log(firstMonthDay);
				}else{
					// console.log("We have first day of month");
					// var day = copyFirstDate.getDate();
					var month = copyFirstDate.getMonth();
					var year = copyFirstDate.getFullYear();
					firstMonthDay = new Date(year, (month -1), 1);
				}

				_this.setDatesToPullEvents(firstMonthDay);  

				// console.log(_this.datesToPullEvents);
			}

			function goPreviousWeek(){
				var copyFirstDate = new Date(_this.datesToPullEvents.firstDay.getTime());
				var firstDayPreviousWeek = new Date(copyFirstDate.setDate(copyFirstDate.getDate() - 7));
				// var lastDayPreviousWeek = new Date(copyFirstDate.setDate(copyFirstDate.getDate() - 1));

				_this.setDatesToPullEvents(firstDayPreviousWeek);
				// console.log(firstDayPreviousWeek);
			}
		}

		this.goNext = function(){
			var _this = this;

			if(_this.datesToPullEventsProcessing)
				return false;

			this.datesToPullEventsProcessing = true;

			var interval = setInterval(function(){
				if (_this.datesToPullEvents !== null &&
					_this.calendarType !== null) {
					
					if(_this.calendarType == "desktop"){
						if(_this.calendarView == "month"){
							goNextMonth();
							// setDatesToPullEventsMonth(dateToday.getFullYear(), dateToday.getMonth());
							// console.log("desktop-month");
						}else{
							goNextWeek(); 
							// console.log("desktop-week");
						}
					}else{
						goNextWeek();
						// console.log("mobile-week");
					}
					// goPrevious();
					clearInterval(interval);
				}
			}, 10);

			function goNextMonth(){
				
				var copyFirstDate = new Date(_this.datesToPullEvents.firstDay.getTime());
				var firstMonthDay = null;

				if(copyFirstDate.getDate() != 1){
					// console.log("find first day of month"); 
					// var day = copyFirstDate.getDate();
					var month = copyFirstDate.getMonth();
					var year = copyFirstDate.getFullYear();
					firstMonthDay = new Date(year, month + 2, 1); 

					// console.log(firstMonthDay);
				}else{
					// console.log("We have first day of month");
					// var day = copyFirstDate.getDate();
					var month = copyFirstDate.getMonth();
					var year = copyFirstDate.getFullYear();
					firstMonthDay = new Date(year, (month + 1), 1);
				}

				_this.setDatesToPullEvents(firstMonthDay);  

				// console.log(_this.datesToPullEvents);
			}

			function goNextWeek(){
				var copyFirstDate = new Date(_this.datesToPullEvents.firstDay.getTime());
				var firstDayNextWeek = new Date(copyFirstDate.setDate(copyFirstDate.getDate() + 7));
				// var lastDayPreviousWeek = new Date(copyFirstDate.setDate(copyFirstDate.getDate() - 1));

				// console.log("firstDayNextWeek"+firstDayNextWeek);

				_this.setDatesToPullEvents(firstDayNextWeek);
				
			}
		}

		this.getHalls = function(){
			var _this = this;

			var url = intaHelper.getUrl("halls");
			intaHelper.apiQuery(url, function(data){
				_this.halls = data;
				// console.log(_this.halls);
			});
		}

		this.getClubInfo = function(){
			var _this = this;
			
			var url = intaHelper.getUrl("club_info");
			intaHelper.apiQuery(url, function(data){
				_this.clubInfo = data;
				// console.log(_this.clubInfo);
			});
		}

		this.browserWindowResize = function(){
			var _this = this;

			console.log(777);

			if(_this.breakPointCalendarType > _this.browserWindowWidth){
				jQuery("#intaProfileModal").removeClass("desktop");
				jQuery(_this.divId).removeClass("desktop");
				jQuery(_this.divId).addClass("mobile");
				jQuery("#intaProfileModal").addClass("mobile");
			}else{
				jQuery("#intaProfileModal").removeClass("mobile");
				jQuery(_this.divId).removeClass("mobile");
				jQuery(_this.divId).addClass("desktop");
				jQuery("#intaProfileModal").addClass("desktop");
			}

			$(window).resize(function(){
				_this.setBrowserWindowWidthHeight();

				// return false;
				// console.log("Switch to mobile. Current view "+initCalendar);

				// return false;
				if(_this.breakPointCalendarType > _this.browserWindowWidth){
					
					if(jQuery("#intaProfileModal").hasClass("desktop")){
						jQuery("#intaProfileModal").removeClass("desktop");
						jQuery("#intaProfileModal").addClass("mobile");
					}

					if(jQuery(_this.divId).hasClass("desktop")){
						jQuery(_this.divId).removeClass("desktop");
						jQuery(_this.divId).addClass("mobile");
					}

					if(_this.currentInitCalendar == "desktop_month" || _this.currentInitCalendar == "desktop_week"){

							_this.currentInitCalendar = "mobile_week"; 

							// console.log("Switch to mobile. Current view "+_this.currentInitCalendar);
							// console.log("switch to mobile");
							_this.calendarType = "mobile"
							_this.setFilter(null, null);

							_this.setDatesToPullEvents(_this.dateToday);
							_this.currentHall = 0; 

							_this.events = [];
							_this.events.done = false;

							_this.getEvents();

							var interval = setInterval(function(){
								if (_this.events.done) {
									if(_this.intaCalendarMobileWeekInstance == null){
										_this.intaCalendarMobileWeekInstance = new intaCalendarMobileWeekClass();
									}
									_this.intaCalendarMobileWeekInstance.init(); 

									// console.log(777);

									clearInterval(interval);
								}
							}, 10);
					}
					// if(_this.calendarType == "mobile"){
					// 	_this.calendarType == "desktop"

					// 	if(_this.calendarView == "week"){
					// 		_this.setFilter(null, null);

					// 		_this.setDatesToPullEvents(_this.dateToday); 
					// 		_this.currentHall = 0;

					// 		_this.events = [];
					// 		_this.events.done = false;

					// 		_this.getEvents(); 

					// 		var interval = setInterval(function(){
					// 			if (intaCalendar.events.done) {
					// 				if(_this.intaCalendarDesktopWeekInstance == null){
					// 					_this.intaCalendarDesktopWeekInstance = new intaCalendarDesktopWeekClass();
					// 				}
					// 				_this.intaCalendarDesktopWeekInstance.init();

					// 				clearInterval(interval);
					// 			}
					// 		}, 10);
					// 	}else if(_this.calendarView == "month"){
					// 		_this.setFilter(null, null);

					// 		_this.setDatesToPullEvents(_this.dateToday); 
					// 		_this.currentHall = 0;

					// 		_this.events = [];
					// 		_this.events.done = false;

					// 		_this.getEvents();

					// 		var interval = setInterval(function(){
					// 			if (intaCalendar.events.done) {
					// 				if(_this.intaCalendarDesktopMonthInstance == null){
					// 					_this.intaCalendarDesktopMonthInstance = new intaCalendarDesktopMonthClass();
					// 				}
					// 				_this.intaCalendarDesktopMonthInstance.init();

					// 				clearInterval(interval);
					// 			}
					// 		}, 10);
					// 	}
					// }
				}else{
					
					if(jQuery("#intaProfileModal").hasClass("mobile")){
						jQuery("#intaProfileModal").removeClass("mobile");
						jQuery("#intaProfileModal").addClass("desktop"); 
					}

					if(jQuery(_this.divId).hasClass("mobile")){
						jQuery(_this.divId).removeClass("mobile");
						jQuery(_this.divId).addClass("desktop");
					}

					if(_this.currentInitCalendar == "mobile_week"){
						if(_this.calendarView == "month"){
							_this.currentInitCalendar = "desktop_month";
						}else if(_this.calendarView == "week"){
							_this.currentInitCalendar = "desktop_week";
						}

						// console.log("Switch to desktop. Current view "+_this.currentInitCalendar);
						// console.log("switch to mobile");
						_this.calendarType = "desktop";
						_this.setFilter(null, null);

						_this.setDatesToPullEvents(_this.dateToday);
						_this.currentHall = 0;

						_this.events = [];
						_this.events.done = false;

						_this.getEvents();

						var interval = setInterval(function(){
							if (_this.events.done) {
								if(_this.calendarView == "month"){
									if(_this.intaCalendarDesktopMonthInstance == null){
										_this.intaCalendarDesktopMonthInstance = new intaCalendarDesktopMonthClass();
									}
									_this.intaCalendarDesktopMonthInstance.init();
								}else if(_this.calendarView == "week"){
									if(_this.intaCalendarDesktopWeekInstance == null){
										_this.intaCalendarDesktopWeekInstance = new intaCalendarDesktopWeekClass();
									}
									_this.intaCalendarDesktopWeekInstance.init();
								}
								// console.log(777);

								clearInterval(interval);
							}
						}, 10);
					}
				}
			});
		}

		this.setBrowserWindowWidthHeight = function(){
			var _this = this;

			_this.browserWindowWidth = jQuery(window).width();
			_this.browserWindowHeight = jQuery(window).height();

			// console.log(_this.browserWindowWidth);
		}

		this.setCalendarType = function(){
			var _this = this;

			if(_this.calendarType !== null){
				return false;
			}
			// _this.calendarType =  "mobile";

			var Interval = setInterval(function(){
				if(_this.browserWindowWidth !== null){
					if(_this.browserWindowWidth > _this.breakPointCalendarType){ 
						_this.calendarType = "desktop";
					}else{
						_this.calendarType =  "mobile";
					}
					clearInterval(Interval);
				}
			}, 10);
		}

		this.setCalendarView = function(){
			var _this = this;

			// _this.calendarView = "week";
			// return false;

			if(_this.calendarView !== null){
				return false;
			}

			var Interval = setInterval(function(){
				if(_this.calendarType !== null){
					if(_this.calendarType == "desktop"){  
						_this.calendarView = configData.desktopSettings.defaultView;
					}else if(_this.calendarType == "mobile"){
						_this.calendarView = "week";
					}
					clearInterval(Interval);
				}
			}, 10);
		}

		this.registerModalFunc = function(){
			var _this = this;

			jQuery(_this.divId).on("click", ".inta_modal .mde-close", function(e){
				e.preventDefault();
				
				_this.closeIntaModal();
			});

			jQuery(_this.divId).on("click", ".inta_modal", function(e){
				e.preventDefault();
				// jQuery("body, html").css({"overflow": "auto"});
				// console.log(e.target);
				if(jQuery(e.target).hasClass("mde-close") ||
					jQuery(e.target).hasClass("mde-wrapper")){
						// jQuery(_this.divId+" .inta_modal").find(".mde-body").text("");
						// jQuery(_this.divId+" .inta_modal").hide();
						_this.closeIntaModal();
				}
			});
		}

		this.closeIntaModal = function(){
			var _this = this;

			jQuery(_this.divId+" .inta_modal").find(".mde-body").text("");
			jQuery(_this.divId+" .inta_modal").hide();
			jQuery("body, html").css({"overflow": "auto"}); 
		}

		this.setDatesToPullEvents = function(date){
			var _this = this;

			this.datesToPullEventsProcessing = true;

			var dateTodayCopy = new Date(date.getTime());
			// var dateToday = new Date(dateTodayCopy.setDate(dateTodayCopy.getDate() - 12));
			var dateToday = new Date(dateTodayCopy.getTime());

			// console.log(dateTodayCopy);
			// console.log(dateToday); 

			var Interval = setInterval(function(){
				if (_this.calendarType !== null) {
					// console.log(777);
					setDatesToPullEvents();
					// console.log(_this.datesToPullEvents);
					clearInterval(Interval);
				}
				// console.log("Searching");
			}, 10); 

			function setDatesToPullEvents(){
				// _this.calendarType = "mobile";
				// configData.desktopSettings.defaultView = "week";

				if(_this.calendarType == "desktop"){
					if(_this.calendarView == "month"){
						setDatesToPullEventsMonth(dateToday.getFullYear(), dateToday.getMonth());
						// console.log("desktop-month");
					}else{
						setDatesToPullEventsWeek(); 
						// console.log("desktop-week");
					}
				}else{
					setDatesToPullEventsWeek();
					// console.log("mobile-week");
				}

				// console.log(_this.datesToPullEvents);
			}

			function setDatesToPullEventsMonth(year, month){
				var firstMonthDay = new Date(year, month, 1);
				var weekDay = firstMonthDay.getDay();

				var firstCalendarDay = null;
				var firstCalendarDayNumber = null;

				if(!weekDay){
					// firstCalendarDay = firstMonthWeekDay - 6;
					firstCalendarDayNumber = -5;
				}else if(weekDay == 1){
					firstCalendarDayNumber = 1;
				}else{
					firstCalendarDayNumber =  - (weekDay - 2);
				}

				firstCalendarDay = new Date(year, month, firstCalendarDayNumber);
				var firstCalendarDayCopy = new Date(firstCalendarDay);
				var lastCalendarDay = new Date(firstCalendarDayCopy.setDate(firstCalendarDayCopy.getDate() + 41));

				_this.datesToPullEvents = {
					"firstDay": firstCalendarDay,
					"lastDay": lastCalendarDay,  
				}

				_this.datesToPullEventsProcessing = false;
			}

			function setDatesToPullEventsWeek(){
				if(!dateToday.getDay()){
					var first = dateToday.getDate() - 6;
				}else{
					var first = dateToday.getDate() - (dateToday.getDay() - 1);
				}

				var firstDate = new Date(dateToday.setDate(first));

				var firstDateCopy = new Date(firstDate);
				var lastDate = new Date(firstDateCopy.setDate(firstDateCopy.getDate() + 6));

				_this.datesToPullEvents = {
					"firstDay": firstDate,
					"lastDay": lastDate, 
				}

				_this.datesToPullEventsProcessing = false;
			}
		}

	}
	

	var intaCalendarInterval = setInterval(function(){
		console.log(111);
		if (typeof configData !== 'undefined' &&
			typeof intaHelper !== 'undefined' && intaHelper !== null &&
				typeof intaLocale !== 'undefined' &&
				typeof intaLocale.initialized !== 'undefined' &&
				intaLocale.initialized) { 
			// console.log(777);
			intaCalendar = new intaCalendarClass();
			intaCalendar.init();
			clearInterval(intaCalendarInterval);
		}
		// console.log("Searching");
	}, 10); 

});