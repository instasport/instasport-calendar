var intaCalendarMobileWeekClass = function(){
	// this.descWindowClass = ".description_window";
	// this.modalClass = ".inta_modal";
	this.initialized = false;

	this.init = function(){
		var _this = this;

		_this.load(); 
		_this.putHalls();
		_this.putDays();
		_this.putTitle();
		_this.putEvents();
		_this.hideDisabledFilters();
		_this.hideEmptyFilters();

		if(!_this.initialized){
			_this.hallClick();
			_this.go();
			_this.dayClick();
			_this.filterClick();
		}

		_this.initialized = true; 

		intaCalendar.currentInitCalendar = "mobile_week";

		// return false;

		// _this.putHalls();
		// _this.putDays();
		// _this.putEvents();
		// _this.putTitle();
		// _this.putFiltersData();

		// _this.putComplexities();
		// if(!_this.initialized){
		// 	console.log("New");
		// }else{
		// 	console.log("Old");
		// }

		// if(!_this.initialized){
		// 	_this.descWindow();
		// 	_this.moreButtonClick();
		// 	_this.filterClick();
		// 	_this.hallClick();
		// 	_this.go();
		// }

		// if(intaCalendar.initialized){
		// 	_this.scrollToCalendar();
		// }

		// _this.secondInit();

		// var interval = setInterval(function(){
		// 	var calendarEl = jQuery("#inta_calendar .dm-controls .dm-title_month");
		// 	var descriptionEl = jQuery("#description_window .description_window");
		// 	if (calendarEl.length > 0 && descriptionEl.length > 0) {
		// 		init();
		// 		clearInterval(interval); 
		// 	}
		// }, 10);

		// function init(){
		// 	_this.putHalls();
		// 	// components.drawDesktopMonthCalendar();
		// 	_this.putDays();
		// 	_this.putEvents();
		// }
		
		// _this.putData();
		// _this.initialized = true; 
		// console.log("Inta calendar desktop month initialized");
	}

	this.scrollToCalendar = function(){
		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-controls .dw-title_month a");
			if (calendarEl.length > 0) {
				scrollToCalendar();
				clearInterval(interval); 
			}
		}, 10);

		function scrollToCalendar(){
			var dwCalendarPosition = jQuery(intaCalendar.divId+" .dw-calendar").position();
			console.log(dwCalendarPosition);
			jQuery("html, body").animate({ scrollTop: dwCalendarPosition.top }, 0);
			// jQuery("body").scrollTop(dwCalendarPosition.top);
		}
	}

	this.hideDisabledFilters = function(){
		var _this = this; 


		if(!configData.mobileSettings.filters.train){
			var intervalTraining = setInterval(function(){
				var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_training");
				if (calendarEl.length > 0) {
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_training").hide();
					clearInterval(intervalTraining); 
				}
			}, 10);
		}

		if(!configData.mobileSettings.filters.couch){
			var intervalInstructor = setInterval(function(){
				var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_instructor");
				if (calendarEl.length > 0) {
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_instructor").hide();
					clearInterval(intervalInstructor); 
				}
			}, 10);
		}

		if(!configData.mobileSettings.filters.complexity){
			var intervalComplexity = setInterval(function(){
				var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_complexity");
				if (calendarEl.length > 0) {
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_complexity").hide();
					clearInterval(intervalComplexity); 
				}
			}, 10);
		}

		if(!configData.mobileSettings.filters.activity){
			var intervalActivity = setInterval(function(){
				var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_activity");
				if (calendarEl.length > 0) {
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_activity").hide();
					clearInterval(intervalActivity); 
				}
			}, 10); 
		}

	}

	this.hideEmptyFilters = function(){
		var _this = this;

		var intervalTraining = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_training");
			if (calendarEl.length > 0) {
				var trainings = null;
				if(intaCalendar.currentHall == null){
					trainings = intaCalendar.halls[0].eventtemplate;
				}else{
					trainings = intaCalendar.halls[intaCalendar.currentHall].eventtemplate;
				}
				if(trainings.length == 0){
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_training").hide();
				}
				// console.log(intaCalendar.currentHall);
				clearInterval(intervalTraining); 
			}
		}, 10);

		var intervalInstructor = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_instructor");
			if (calendarEl.length > 0) {
				var instructors = null;
				if(intaCalendar.currentHall == null){
					instructors = intaCalendar.halls[0].instructor;
				}else{
					instructors = intaCalendar.halls[intaCalendar.currentHall].instructor;
				}
				if(instructors.length == 0){
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_instructor").hide();
				}
				// console.log(intaCalendar.currentHall);
				clearInterval(intervalInstructor); 
			}
		}, 10);

		var intervalComplexity = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_complexity");
			if (calendarEl.length > 0) {
				if(intaCalendar.clubInfo[0].complexity.length == 0){
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_complexity").hide();
				}
				clearInterval(intervalComplexity); 
			}
		}, 10);

		var intervalActivity = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_activity");
			if (calendarEl.length > 0) {
				if(intaCalendar.clubInfo[0].activity.length == 0){
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters ul li.mw-filter_activity").hide();
				}
				clearInterval(intervalActivity); 
			}
		}, 10);
	}

	this.showMonthPreload = function(){
		jQuery(intaCalendar.divId+" .mw-calendar .mw-events").text("");
		jQuery(intaCalendar.divId+" .mw-calendar .mw-events").append("<div class='preloader-mobile_week'><div class='loader'></div></div>");  
	}

	this.putTitle = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-header .mw-header_title");
			if (calendarEl.length > 0) {
				putTitle();
				clearInterval(interval); 
			}
		}, 10);

		function putTitle(){
			var firstDate = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());
			var lastDate = new Date(intaCalendar.datesToPullEvents.lastDay.getTime());

			if(intaHelper.dateInRange(firstDate, lastDate, intaCalendar.dateToday)){
				var title = intaHelper.getMobileWeekTitle(intaCalendar.dateToday);
			}else{
				var title = intaHelper.getMobileWeekTitle(firstDate);
			}

			jQuery(intaCalendar.divId+" .mw-header .mw-header_title").html(title);
		}
	}

	this.go = function(){
		var _this = this;

		// var go = null;

		jQuery(intaCalendar.divId).on("click", ".mw-controls .mw-control a", function(e){
			e.preventDefault();
			var go = jQuery(this).attr("go");
			
			// console.log(go);
			// console.log(intaCalendar.calendarType);
			// console.log(intaCalendar.calendarView);
			// return false;

			// intaCalendar.datesToPullEventsProcessing = true;
			if(go == "right"){
				intaCalendar.goNext(); 
			}else if(go == "left"){
				intaCalendar.goPrevious();
			}else{
				return false;
			}

			// console.log(go);
			// return false;

			var interval_1 = setInterval(function(){
				if (!intaCalendar.datesToPullEventsProcessing) {
					intaCalendar.getEvents();
					clearInterval(interval_1); 
				}
			}, 10);

			var interval_2 = setInterval(function(){
				if (!intaCalendar.datesToPullEventsProcessing && intaCalendar.events.done) {
					_this.putDays();
					_this.putEvents();
					_this.putTitle();
					// console.log(intaCalendar.datesToPullEventsProcessing);
					clearInterval(interval_2); 
				}
			}, 10);
		});
	}

	this.resetFilterView = function(){
		// intaCalendar.filter = {
		// 	"type": null,
		// 	"value": null
		// }
		// console.log("Reset filter view"); 
		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter.choosed").removeClass("choosed");
		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter a div").html("&nbsp;");

	}

	// this.putFiltersData = function(){
	// 	var _this = this;

	// 	var interval = setInterval(function(){
	// 		var calendarEl = jQuery(intaCalendar.divId+" .dw-calendar .dw-controls");
	// 		// var descriptionEl = jQuery("#description_window .description_window");
	// 		if (calendarEl.length > 0) {
	// 			trackFiltersData();
	// 			putTrainings();
	// 			putInstructors();
	// 			putComplexities();
	// 			putActivities();
	// 			clearInterval(interval); 
	// 		}
	// 	}, 10); 

	// 	function trackFiltersData(){
	// 		intaCalendar.setFilter(null, null);
	// 		_this.resetFilterView();

	// 		// var choosedFilter = jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li.choosed");
	// 		// var filterType = null;

	// 		// if(choosedFilter.find(".dm-filter-item-training").length > 0){
	// 		// 	filterType = "event";
	// 		// }else if(choosedFilter.find(".dm-filter-item-instructor").length > 0){
	// 		// 	filterType = "instructor";
	// 		// }else if(choosedFilter.find(".dm-filter-item-complexity").length > 0){
	// 		// 	filterType = "complexity";
	// 		// }else if(choosedFilter.find(".dm-filter-item-activity").length > 0){
	// 		// 	filterType = "activity";
	// 		// }

	// 		// if(choosedFilter.length > 0){
	// 		// 	var filterText = choosedFilter.find("a.dm-filter-item div").text();
	// 		// 	if(filterText.length > 0){
	// 		// 		// console.log(filterText.trim());
	// 		// 		if(filterType == "event"){
	// 		// 			var eventtemplates = intaCalendar.halls[intaCalendar.currentHall].eventtemplate;
	// 		// 			var resetFilter = true;
	// 		// 			var newTemplateId = null;

	// 		// 			for(i=0; i<eventtemplates.length; i++){
	// 		// 				if(eventtemplates[i].title == filterText){
	// 		// 					resetFilter = false;
	// 		// 					newTemplateId = parseInt(eventtemplates[i].id);
	// 		// 					break;
	// 		// 				}
	// 		// 			}

	// 		// 			if(resetFilter){
	// 		// 				intaCalendar.setFilter(null, null);
	// 		// 				_this.resetFilterView();
	// 		// 			}else{
	// 		// 				if(filterType == null || newTemplateId == null){
	// 		// 					intaCalendar.setFilter(null, null);
	// 		// 					_this.resetFilterView();
	// 		// 				}else{
	// 		// 					console.log("Apply filter");
	// 		// 					intaCalendar.setFilter(filterType, newTemplateId);
	// 		// 				}
	// 		// 			}
	// 		// 		}else if(filterType == "instructor"){

	// 		// 		}else if(filterType == "complexity"){
						
	// 		// 		}else if(filterType == "activity"){
						
	// 		// 		}
	// 		// 	}
	// 		// }
	// 	}

	// 	function putTrainings(){
	// 		var hall = intaCalendar.halls[0];
	// 		if(intaCalendar.currentHall !== null){
	// 			hall = intaCalendar.halls[intaCalendar.currentHall];
	// 		}

	// 		if(hall.eventtemplate.length == 0){
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training").closest("li").hide();
	// 		} 

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").text("");

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").append(
	// 			'<div class="inta_filter_1-item">'
	// 				+'<div class="inta_table">'
	// 					+'<div class="inta_table-tr">'
	// 						+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
	// 						+'<div class="inta_table-td">'
	// 							+'<a href="#" type-filter="training" template-id="null">Все</a>' 
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			+'</div>'
	// 		);

	// 		for(i=0; i<hall.eventtemplate.length; i++){
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").append(
	// 				'<div class="inta_filter_1-item">'
	// 					+'<div class="inta_table">'
	// 						+'<div class="inta_table-tr">'
	// 							+'<div class="inta_table-td" style="background-color: '+hall.eventtemplate[i].background_color+';"></div>'
	// 							+'<div class="inta_table-td">'
	// 								+'<a href="#" type-filter="training" template-id="'+hall.eventtemplate[i].id+'">'+hall.eventtemplate[i].title+'</a>'
	// 								+'<span>(45 мин.)</span>'
	// 							+'</div>'
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			);
	// 		}
	// 	}

	// 	function putInstructors(){
	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-instructor").closest("li").hide();
	// 	}

	// 	function putComplexities(){
	// 		var complexities = intaCalendar.clubInfo[0].complexity;

	// 		if(complexities.length == 0){
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity").closest("li").hide();
	// 		}

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").text("");

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").append(
	// 			'<div class="inta_filter_1-item">'
	// 				+'<div class="inta_table">'
	// 					+'<div class="inta_table-tr">'
	// 						+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
	// 						+'<div class="inta_table-td">'
	// 							+'<a href="#" type-filter="complexity" title="null">Все</a>' 
	// 							+'<span>(45 мин.)</span>'
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			+'</div>'
	// 		);

	// 		for(i=0; i<complexities.length; i++){
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").append(
	// 				'<div class="inta_filter_1-item">'
	// 					+'<div class="inta_table">'
	// 						+'<div class="inta_table-tr">'
	// 							+'<div class="inta_table-td" style="background-color: '+complexities[i].color+';"></div>'
	// 							+'<div class="inta_table-td">'
	// 								+'<a href="#" type-filter="complexity" title="'+complexities[i].title+'">'+complexities[i].title+'</a>' 
	// 								+'<span>(45 мин.)</span>'
	// 							+'</div>'
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			);
	// 		}
	// 	}

	// 	function putActivities(item){
	// 		var activities = intaCalendar.clubInfo[0].activity;

	// 		if(activities.length == 0){
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity").closest("li").hide();
	// 		}

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").text("");

	// 		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").append(
	// 			'<div class="inta_filter_1-item">'
	// 				+'<div class="inta_table">'
	// 					+'<div class="inta_table-tr">'
	// 						+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
	// 						+'<div class="inta_table-td">'
	// 							+'<a href="#" type-filter="activity" title="null">Все</a>' 
	// 							+'<span>(45 мин.)</span>'
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			+'</div>'
	// 		);

	// 		for(i=0; i<activities.length; i++){ 
	// 			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").append(
	// 				'<div class="inta_filter_1-item">'
	// 					+'<div class="inta_table">'
	// 						+'<div class="inta_table-tr">'
	// 							+'<div class="inta_table-td" style="background-color: #ccc;"></div>'
	// 							+'<div class="inta_table-td">'
	// 								+'<a href="#" type-filter="activity" title="'+activities[i].title+'">'+activities[i].title+'</a>' 
	// 								+'<span>(45 мин.)</span>'
	// 							+'</div>'
	// 						+'</div>'
	// 					+'</div>'
	// 				+'</div>'
	// 			);
	// 		}
	// 	}
	// }

	this.load = function(){ 
		var _this = this;

		jQuery(intaCalendar.divId).text(""); 

		jQuery(intaCalendar.divId).load(configData.pluginUrl+"view/mobile_week.php");

		var interval = setInterval(function(){
			var calendarEl = jQuery(".mw-calendar");
			if (calendarEl.length > 0) {
				
				// if(jQuery(intaCalendar.divId+' .description_window').length == 0){
				// 	jQuery(intaCalendar.divId+' .dw-calendar').after(
				// 		'<div class="description_window"></div>'
				// 	);
				// 	jQuery(intaCalendar.divId+' .description_window').load(configData.pluginUrl+"view/description_window.php");
				// }

				_this.applyLocalization();
				
				if(jQuery(intaCalendar.divId+' .inta_modal').length == 0){
					jQuery(intaCalendar.divId+' .mw-calendar').after(
						'<div class="inta_modal"></div>'
					);
					jQuery(intaCalendar.divId+' .inta_modal').load(configData.pluginUrl+"view/inta_modal.php"); 
				}
				// jQuery('.dw-calendar').after(
				// 	'<div class="description_window"></div>'
				// 	+'<div class="inta_modal"></div>'
				// );
				// jQuery('.description_window').after('<div class="description_window"></div>');
				// jQuery('.description_window').load(configData.pluginUrl+"view/description_window.php");
				// jQuery('.inta_modal').load(configData.pluginUrl+"view/inta_modal.php"); 
				clearInterval(interval); 
			}
		}, 10);

		// jQuery('#inta_calendar').after('<div id="description_window"></div>');
		// jQuery('#description_window').load(configData.pluginUrl+"view/description_window.php");
	}

	this.applyLocalization = function(){
		var _this = this;

		console.log("applyLocalization");

		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(1)").text(intaLocale.tr.fullWeekDays.mon);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(2)").text(intaLocale.tr.fullWeekDays.tue);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(3)").text(intaLocale.tr.fullWeekDays.wed);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(4)").text(intaLocale.tr.fullWeekDays.thu);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(5)").text(intaLocale.tr.fullWeekDays.fri);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(6)").text(intaLocale.tr.fullWeekDays.sat);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(7)").text(intaLocale.tr.fullWeekDays.sun);

		// jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-training").text("My text");

		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters li.mw-filter_training span").text(intaLocale.tr.filterTitles.training);
		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters li.mw-filter_complexity span").text(intaLocale.tr.filterTitles.complexity);
		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters li.mw-filter_activity span").text(intaLocale.tr.filterTitles.activity);
		jQuery(intaCalendar.divId+" .mw-calendar .mw-filters li.mw-filter_instructor span").text(intaLocale.tr.filterTitles.instructor);
	
		// jQuery(intaCalendar.divId+" .dw-calendar .dw-view ul li:first-child a").text(intaLocale.tr.monthViewTitle);
		// jQuery(intaCalendar.divId+" .dw-calendar .dw-view ul li:last-child a").text(intaLocale.tr.weekViewTitle);
	}

	this.putHalls = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-halls");
			if (calendarEl.length > 0) {
				putHalls();
				clearInterval(interval); 
			}
		}, 10);
		
		function putHalls(){
			jQuery(intaCalendar.divId+" .mw-calendar .mw-halls ul").text("");

			for(i=0; i<intaCalendar.halls.length; i++){
				var active = "";
				if(i == 0){
					active = "class='active' ";
				}
				jQuery(intaCalendar.divId+" .mw-calendar .mw-halls ul").append(
					'<li '+active+'data-halls_key="'+i+'">' 
						+'<a href="#" data-id="'+intaCalendar.halls[i].id+'" data-title="'+intaCalendar.halls[i].title+'">'+intaCalendar.halls[i].title+'</a>' 
					+'</li>' 
				);
			}
		}
		
	}

	this.putDays = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-events");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putDays();
				clearInterval(interval); 
			}
		}, 10);

		function putDays(){
			jQuery(intaCalendar.divId+" .mw-calendar mw-events").text(""); 
			jQuery(intaCalendar.divId+" .mw-header .mw-switch_days .inta_table-td").removeClass("active"); 

			var hall = 0;
			if(intaCalendar.currentHall !== null){
				hall = intaCalendar.currentHall;
			}

			var date = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());
			var lastDate = new Date(intaCalendar.datesToPullEvents.lastDay.getTime());

			var weekDatesForHead = intaHelper.getWeekDates(date, lastDate, "mobile");
			var weekDatesForHead2 = intaHelper.getWeekDates(date, lastDate, "body");
			var weekDatesForTitle = intaHelper.getWeekDates(date, lastDate, "mobile_title"); 

			// console.log(weekDatesForTitle);
			// var weekDatesForTitle = intaHelper.getWeekDates(date, lastDate, "mobile-title");;

			// var title = intaHelper.getDayOfWeek(intaCalendar.dateToday)+"<br>"+intaCalendar.dateToday.getDate()+" "+intaHelper.monthTitles2[intaCalendar.dateToday.getMonth()];
			// jQuery(intaCalendar.divId+" .mw-header .mw-header_title").html(title);

			if(intaHelper.dateInRange(date, lastDate, intaCalendar.dateToday)){
				// var title = intaHelper.getMobileWeekTitle(intaCalendar.dateToday);
				var convertedDateToShow = intaHelper.convertDateForLink(intaCalendar.dateToday);
			}else{
				// var title = intaHelper.getMobileWeekTitle(firstDate);
				var convertedDateToShow = intaHelper.convertDateForLink(date);
			}

			// var convertedDateToday = intaHelper.convertDateForLink(intaCalendar.dateToday);

			console.log(weekDatesForHead);
			// console.log(weekDatesForHead2);

			var mwForDay = jQuery("#intaCallendar .mw-header .mw-switch_days .mw-for_day");

			for(i=0; i<mwForDay.length; i++){
				// jQuery(mwForDay[i]).find("a span").text(weekDatesForHead[i]);
				jQuery(mwForDay[i]).find("a").html(intaLocale.tr.shortWeekDaysArr[i]+"<br><span>"+weekDatesForHead[i]+"</span>");
				jQuery(mwForDay[i]).find("a").attr({
					"data-date": weekDatesForHead2[i],
					"data-week_title": weekDatesForTitle[i],
				});
				if(convertedDateToShow == weekDatesForHead2[i]){
					jQuery(mwForDay[i]).closest(".inta_table-td").addClass("active"); 
				}
			}
		}
	}

	// this.putEventsForDay = function(day){
	// 	var _this = this;

	// 	for(i=0; i<intaCalendar.events.length; i++){

	// 	}
	// }

	this.putEvents = function(){
		var _this = this;
		var calendarActiveDay = null;

		var interval = setInterval(function(){
			// var calendarEl = jQuery(intaCalendar.divId+" .mw-calendar .mw-events");
			calendarActiveDay = jQuery(intaCalendar.divId+" .mw-header .mw-switch_days .inta_table-td.active");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarActiveDay != undefined && calendarActiveDay.length > 0) {
				putEvents();
				clearInterval(interval); 
			}
		}, 10);

		function putEvents(){
			jQuery(intaCalendar.divId+" .mw-calendar .mw-events").text("");
			var activeDayDate = calendarActiveDay.find(".mw-for_day a").attr("data-date");

			console.log(activeDayDate);
			// _this.putEventsForDay(activeDayDate);
			
			var eventsExist = false;
			for(i=0; i<intaCalendar.events.length; i++){
				var dateApi = intaHelper.convertDateApiToDate(intaCalendar.events[i].date);

				// console.log(dateApi);
				// return false;

				if((dateApi.year+"-"+dateApi.month+"-"+dateApi.day) != activeDayDate){
					continue;
				}

				if(intaCalendar.filter.type !== null && intaCalendar.filter.value !== null){
					// intaCalendar.events[i].template != intaCalendar.filters.event){
					if(intaCalendar.filter.type == "event" &&
						intaCalendar.events[i].template != intaCalendar.filter.value){
							continue; 
					}

					if(intaCalendar.filter.type == "instructor"){
						if(intaCalendar.events[i].instructor.length == 0){
							continue;
						}
						if(intaCalendar.events[i].instructor[0].id != intaCalendar.filter.value){
							continue; 
						} 
					}

					if(intaCalendar.filter.type == "complexity" &&
						intaCalendar.events[i].complexity != intaCalendar.filter.value){
							continue; 
					}

					if(intaCalendar.filter.type == "activity" &&
						intaCalendar.events[i].activity != intaCalendar.filter.value){
							continue; 
					}
				}

				var seats = intaHelper.getSeatsMessage(intaCalendar.events[i].seats);
				if(!configData.mobileSettings.weekView.showSeats){
					seats = ""; 
				}
				
				var durApi = intaHelper.convertDurationApiToObj(intaCalendar.events[i].duration);

				var hour = intaHelper.convertDateApiToHour(intaCalendar.events[i].date);

				var begining = dateApi.hours+'.'+dateApi.minutes; 
				var duration = durApi.hours+'.'+durApi.minutes;
				var durationModal = intaHelper.getDurationFor(durApi, "modal");
				if(!configData.mobileSettings.weekView.showDuration){
					duration = "";
					durationModal = "";
				}

				var instructorName = "null";
				var instructorId = "null";
				if(intaCalendar.events[i].instructor.length > 0){
					var instructorName = intaCalendar.events[i].instructor[0].name;
					var instructorId = intaCalendar.events[i].instructor[0].id;
				}

				// var eventsPerHourCount = jQuery(intaCalendar.divId+" .dw-calendar .dw-day[data-date='"+dateApi.year+"-"+dateApi.month+"-"+dateApi.day+"'][data-hour='"+hour+"'] .dw-per_day .dw-event").length;
				
				if(!eventsExist){
					eventsExist = true;
				}

				var backgroundColor = "none";
				var color = "inherite";
				if(configData.mobileSettings.useApiColors){
					backgroundColor = intaCalendar.events[i].background;
					color = intaCalendar.events[i].color;
				}

				jQuery(intaCalendar.divId+" .mw-events").append(
					'<div class="mw-event" style="background-color: '+backgroundColor+'; color: '+color+';">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td">'
									+'<div class="mw-begining">'+begining+'</div>'
									+'<div class="mw-duration">'+duration+'</div>'
								+'</div>'
								+'<div class="inta_table-td">'
									+'<div class="mw-title"><a class="inta-profile-invoke" href="#" data-id="'+intaCalendar.events[i].id+'"'
										+' data-begining="'+begining+'"'
										+' data-instructor-name="'+instructorName+'"'
										+' data-instructor-id="'+instructorId+'"'
										+' data-duration="'+duration+'"'
										+' data-duration-modal="'+durationModal+'"' 
										+' data-title="'+intaCalendar.events[i].title+'"'
										+' data-hall="'+intaCalendar.events[i].hall+'"'
										+' data-price="'+intaCalendar.events[i].price+'"'
										+' data-template="'+intaCalendar.events[i].template+'"'
										+' data-api-date="'+intaCalendar.events[i].date+'"'
										+' data-date="'+dateApi.year+'-'+dateApi.month+'-'+dateApi.day+'"'
										+' data-seats="'+intaCalendar.events[i].seats+'"'
										+' data-description="null"'
										+'>'+intaCalendar.events[i].title+'</a></div>'
									+'<div class="mw-seats">'+seats+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<a class="to_check_in" href="#"  data-id="'+intaCalendar.events[i].id+'"'
										+' data-begining="'+begining+'"'
										+' data-instructor-name="'+instructorName+'"'
										+' data-instructor-id="'+instructorId+'"'
										+' data-duration="'+duration+'"'
										+' data-duration-modal="'+durationModal+'"' 
										+' data-title="'+intaCalendar.events[i].title+'"'
										+' data-hall="'+intaCalendar.events[i].hall+'"'
										+' data-price="'+intaCalendar.events[i].price+'"'
										+' data-template="'+intaCalendar.events[i].template+'"'
										+' data-api-date="'+intaCalendar.events[i].date+'"'
										+' data-date="'+dateApi.year+'-'+dateApi.month+'-'+dateApi.day+'"'
										+' data-seats="'+intaCalendar.events[i].seats+'"'
										+' data-description="null"'
										+'></a>'
					+'</div>'
				);
			}

			if(!eventsExist){
				jQuery(intaCalendar.divId+" .mw-events").html("<div class='mw-events_no'>0 "+intaLocale.tr.trainings+"</div>");
			}

			// _this.showMoreButtons();
		}
	}

	this.showModal = function(type){
		jQuery(intaCalendar.divId).find(".inta_modal .mde-body").text("");
		jQuery("body, html").css({"overflow": "hidden"});

		// return false;

		// console.log(type);
		switch(type){
			case"filter_training":
				jQuery(intaCalendar.divId+" .inta_modal .mde-header .mde-day").text(intaLocale.tr.filterTitles.training);

				var eventtemplates = null;
				if(intaCalendar.currentHall == null){
					eventtemplates = intaCalendar.halls[0].eventtemplate;
				}else{
					eventtemplates = intaCalendar.halls[intaCalendar.currentHall].eventtemplate;
				}

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").append('<div class="inta_filter_1"></div>');

				jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="training" template-id="null">'+intaLocale.tr.all+'</a>' 
								+'</div>'
							+'</div>'
						+'</div>'
						+'<a class="filter_link" href="#" type-filter="training" template-id="null" title="null"></a>' 
					+'</div>'
				);

				for(i=0; i<eventtemplates.length; i++){
					var durApi = intaHelper.convertDurationApiToObj(eventtemplates[i].duration);
					var durationModal = intaHelper.getDurationFor(durApi, "modal");
					var durationModalText = durationModal !== null?'('+durationModal+')':'';

					jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
						'<div class="inta_filter_1-item">'
							+'<div class="inta_table">'
								+'<div class="inta_table-tr">'
									+'<div class="inta_table-td" style="background-color: '+eventtemplates[i].background_color+';"></div>'
									+'<div class="inta_table-td">'
										+'<a href="#" type-filter="training" template-id="'+eventtemplates[i].id+'">'+eventtemplates[i].title+'</a>'
										+'<span>'+durationModalText+'</span>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<a class="filter_link" href="#" type-filter="training" template-id="'+eventtemplates[i].id+'" title="'+eventtemplates[i].title+'"></a>' 
						+'</div>'
					);
				}

				break;
			case"filter_instructor":
				jQuery(intaCalendar.divId+" .inta_modal .mde-header .mde-day").text(intaLocale.tr.filterTitles.instructor);

				var instructors = null;
				if(intaCalendar.currentHall == null){
					instructors = intaCalendar.halls[0].instructor;
				}else{
					instructors = intaCalendar.halls[intaCalendar.currentHall].instructor;
				}

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").append('<div class="inta_filter_1"></div>');

				jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="instructor" instructor-id="null">'+intaLocale.tr.all+'</a>' 
								+'</div>'
							+'</div>'
						+'</div>'
						+'<a class="filter_link" href="#" type-filter="instructor" instructor-id="null" instructor-name="null"></a>' 
					+'</div>'
				);

				for(i=0; i<instructors.length; i++){
					jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
						'<div class="inta_filter_1-item">'
							+'<div class="inta_table">'
								+'<div class="inta_table-tr">'
									+'<div class="inta_table-td" style="background-color: #ccc;"></div>'
									+'<div class="inta_table-td">'
										+'<a href="#" type-filter="instructor" instructor-id="'+instructors[i].id+'" instructor-name="'+instructors[i].name+'">'+instructors[i].name+'</a>'
										// +'<span>(45 мин.)</span>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<a class="filter_link" href="#" type-filter="instructor" instructor-id="'+instructors[i].id+'" instructor-name="'+instructors[i].name+'"></a>' 
						+'</div>'
					);
				}

				break;
			case"filter_complexity":
				jQuery(intaCalendar.divId+" .inta_modal .mde-header .mde-day").text(intaLocale.tr.filterTitles.complexity);

				var complexities = intaCalendar.clubInfo[0].complexity;

				// console.log(intaCalendar.clubInfo);
				// return false;

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").text("");

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").append('<div class="inta_filter_1"></div>');

				jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="complexity" title="null">'+intaLocale.tr.all+'</a>' 
									// +'<span>(45 мин.)</span>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<a class="filter_link" href="#" type-filter="complexity" title="null"></a>' 
					+'</div>'
				);

				for(i=0; i<complexities.length; i++){
					jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
						'<div class="inta_filter_1-item">'
							+'<div class="inta_table">'
								+'<div class="inta_table-tr">'
									+'<div class="inta_table-td" style="background-color: '+complexities[i].color+';"></div>'
									+'<div class="inta_table-td">'
										+'<a href="#" type-filter="complexity" title="'+complexities[i].title+'">'+complexities[i].title+'</a>'
										// +'<span>(45 мин.)</span>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<a class="filter_link" href="#" type-filter="complexity" title="'+complexities[i].title+'"></a>' 
						+'</div>'
					);
				}

				break;
			case"filter_activity":
				jQuery(intaCalendar.divId+" .inta_modal .mde-header .mde-day").text(intaLocale.tr.filterTitles.activity);

				var activities = intaCalendar.clubInfo[0].activity;

				// console.log(intaCalendar.clubInfo);
				// return false;

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").text("");

				jQuery(intaCalendar.divId+" .inta_modal .mde-body").append('<div class="inta_filter_1"></div>');

				jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="activity" title="null">'+intaLocale.tr.all+'</a>' 
									// +'<span>(45 мин.)</span>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<a class="filter_link" href="#" type-filter="activity" title="null"></a>' 
					+'</div>'
				);

				for(i=0; i<activities.length; i++){
					jQuery(intaCalendar.divId+" .inta_modal .mde-body .inta_filter_1").append(
						'<div class="inta_filter_1-item">'
							+'<div class="inta_table">'
								+'<div class="inta_table-tr">'
									+'<div class="inta_table-td" style="background-color: #ccc;"></div>'
									+'<div class="inta_table-td">'
										+'<a href="#" type-filter="activity" title="'+activities[i].title+'">'+activities[i].title+'</a>'
										// +'<span>(45 мин.)</span>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<a class="filter_link" href="#" type-filter="activity" title="'+activities[i].title+'"></a>'  
						+'</div>'
					);
				}

				break;
			case"filter-event":
				break;
		}

		jQuery(intaCalendar.divId+" .inta_modal").show(); 
		jQuery(intaCalendar.divId+" .inta_modal").find(".mde-body").scrollTop(0);
	}

	this.dayClick = function(){
		var _this = this;

		jQuery(intaCalendar.divId).on("click", ".mw-header .mw-switch_days .mw-for_day a", function(e){
			e.preventDefault();

			if(jQuery(this).closest(".inta_table-td.active").length > 0){ 
				return false;
			}

			var date = jQuery(this).attr("data-date");
			console.log(date);

			jQuery(intaCalendar.divId+" .mw-header .mw-switch_days .inta_table-td.active").removeClass("active");
			jQuery(this).closest(".inta_table-td").addClass("active");

			_this.putEvents();
			jQuery(intaCalendar.divId+" .mw-header .mw-header_title").html(jQuery(this).attr("data-week_title"));
		});
	}

	this.hallClick = function(){
		var _this = this;

		jQuery(intaCalendar.divId).on("click", ".mw-calendar .mw-halls ul li a", function(e){ 
			e.preventDefault();

			intaCalendar.setFilter(null, null);
			_this.resetFilterView();

			// _this.events = null;
			var _clickedHall = this;
			// _this.showPreloadDesktopMonth();
			
			_this.showMonthPreload(); 

			// intaCalendar.datesToPullEventsProcessing = true;
			intaCalendar.setDatesToPullEvents(intaCalendar.dateToday); 

			// return false;
			// jQuery("#inta_calendar .dm-calendar .dm-per_day").text("");
			// jQuery("#inta_calendar .dm-calendar .dm-more").hide();

			intaCalendar.currentHall = parseInt(jQuery(this).closest("li").attr("data-halls_key"));
			////_this.putFiltersData();

			// console.log(intaCalendar.currentHall);
			// return false;

			intaCalendar.events = [];
			intaCalendar.events.done = false;

			intaCalendar.getEvents(); 

			var interval = setInterval(function(){
				if (intaCalendar.events.done) {
					_this.putDays();
					_this.putEvents();
					_this.putTitle();
					// _this.putFiltersData();
					// _this.showMoreButtons();
					jQuery(intaCalendar.divId+" .mw-calendar .mw-halls ul li.active").removeClass("active");
					jQuery(_clickedHall).closest("li").addClass("active");
					////jQuery(intaCalendar.divId+" .preloader-desktop_month").remove();
					// console.log(_this.events);
					clearInterval(interval);
				}
			}, 10);

		});
	}

	this.filterClick = function(){
		var _this = this; 

		jQuery(intaCalendar.divId).on("click", ".mw-calendar .mw-filters ul li a", function(e){
			e.preventDefault();

			var filter = jQuery(this).closest("li").attr("filter");

			console.log("show list of filters");

			_this.showModal("filter_"+filter);
		}); 

		// jQuery("body").click(function(e){
		// 	if(jQuery(e.target).closest(".inta_dropdown").length == 0){
		// 		jQuery(intaCalendar.divId+" .inta_dropdown-window").hide();
		// 		jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li").removeClass("active");
		// 	}else{
		// 		var clickedliIndex = jQuery(e.target).closest("li").index();
		// 		var allLi = jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li");
		// 		// console.log(allLi);
		// 		for(i=0; i<allLi.length; i++){
		// 			if(i != clickedliIndex){
		// 				jQuery(allLi[i]).find(".inta_dropdown-window").hide();
		// 				jQuery(allLi[i]).removeClass("active");
		// 				// console.log(i);
		// 			}
		// 		}
		// 	}
		// });

		jQuery(intaCalendar.divId).on("click", ".inta_modal a.filter_link", function(e){
			e.preventDefault();

			var typeFilter = jQuery(this).attr("type-filter");
			console.log(typeFilter);

			// return false;

			 // class="filter_link"

			var typeFilter = jQuery(this).attr("type-filter");

			_this.resetFilterView();

			// jQuery(intaCalendar.divId+" .dm-calendar .dm-row_2 a.dm-filter-item div").html("&nbsp;");
			// jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter.choosed").removeClass("choosed");
			// jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter a div").html("&nbsp;");

			if(typeFilter == "training"){
				var templateid = jQuery(this).attr("template-id"); 
				if(templateid == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("event", parseInt(templateid));
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_training").addClass("choosed");
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_training a div").text(jQuery(this).attr("title"));
				}
			} 

			if(typeFilter == "instructor"){
				console.log("Set instructor filter");
				var instructorId = jQuery(this).attr("instructor-id"); 
				if(instructorId == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("instructor", instructorId);
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_instructor").addClass("choosed");
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_instructor a div").text(jQuery(this).attr("instructor-name"));
					// jQuery(this).closest("li").addClass("choosed");
					// jQuery(this).closest(".inta_dropdown-complexity").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "complexity"){
				console.log("Set complexity filter");
				var complexityTitle = jQuery(this).attr("title"); 
				if(complexityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("complexity", complexityTitle);
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_complexity").addClass("choosed");
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_complexity a div").text(jQuery(this).attr("title"));
					// jQuery(this).closest("li").addClass("choosed");
					// jQuery(this).closest(".inta_dropdown-complexity").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "activity"){
				console.log("Set activity filter");
				var activityTitle = jQuery(this).attr("title"); 
				if(activityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("activity", activityTitle);
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_activity").addClass("choosed");
					jQuery(intaCalendar.divId+" .mw-calendar .mw-filters .mw-filter_activity a div").text(jQuery(this).attr("title")); 
					// jQuery(this).closest("li").addClass("choosed");
					// jQuery(this).closest(".inta_dropdown-activity").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			// var allLi = jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li");
			// // console.log(allLi);
			// for(i=0; i<allLi.length; i++){
			// 	jQuery(allLi[i]).find(".inta_dropdown-window").hide();
			// 	jQuery(allLi[i]).removeClass("active");
			// }

			intaCalendar.closeIntaModal();

			_this.putEvents();

		});
	}
}