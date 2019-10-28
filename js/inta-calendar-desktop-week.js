var intaCalendarDesktopWeekClass = function(){
	// this.descWindowClass = ".description_window";
	// this.modalClass = ".inta_modal";
	this.initialized = false;

	this.init = function(){
		var _this = this;

		_this.load(); 
		_this.putHalls();
		_this.putDays();
		_this.putEvents();
		_this.putTitle();
		_this.putFiltersData();

		// _this.putComplexities();
		// if(!_this.initialized){
		// 	console.log("New");
		// }else{
		// 	console.log("Old");
		// }

		intaCalendar.desktopWeekCalendarStyles();

		if(!_this.initialized){
			_this.moreButtonClick();
			_this.filterClick();
			_this.hallClick();
			_this.go();
		}

		if(intaCalendar.initialized){
			_this.scrollToCalendar(); 
		}

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
		_this.initialized = true; 

		intaCalendar.currentInitCalendar = "desktop_week";
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
			// var dwCalendarPosition = jQuery(intaCalendar.divId+" .dw-calendar").position();
			var dwCalendarPosition = jQuery(intaCalendar.divId).position();
			console.log(dwCalendarPosition);
			jQuery("html, body").animate({ scrollTop: dwCalendarPosition.top }, 0);
			// jQuery("body").scrollTop(dwCalendarPosition.top);
		}
	}

	this.showMonthPreload = function(){
		jQuery(intaCalendar.divId+" .dw-calendar .dw-per_day").text("");
		jQuery(intaCalendar.divId+" .dw-calendar .dw-more").hide();

		jQuery(intaCalendar.divId).append("<div class='preloader-desktop_month'><div class='loader'></div></div>"); 
		var dwEventsPosition = jQuery(intaCalendar.divId+" .dw-events").position();
		var dwEventsWidth = jQuery(intaCalendar.divId+" .dw-events").width();
		var dwEventsHeight = jQuery(intaCalendar.divId+" .dw-events").height();
		
		jQuery(intaCalendar.divId).find(".preloader-desktop_month").css({
			"width": dwEventsWidth,
			"height": dwEventsHeight - 2,
			"top": dwEventsPosition.top + 1,
			"left": dwEventsPosition.left,
		});

		// console.log(dmEventsPosition); 
	}

	this.putTitle = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-controls .dw-title_month a");
			if (calendarEl.length > 0) {
				putTitle();
				clearInterval(interval); 
			}
		}, 10);

		function putTitle(){
			var copyFirstDate = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());
			var copyLastDate = new Date(intaCalendar.datesToPullEvents.lastDay.getTime());

			var monthFirstDate = copyFirstDate.getMonth();
			var monthLastDate = copyLastDate.getMonth();

			// console.log(monthFirstDate, monthLastDate);
			// return false;

			if(monthFirstDate == monthLastDate){
				var title = copyFirstDate.getDate()+" - "+copyLastDate.getDate()+" "+intaHelper.monthTitles2[monthFirstDate]; 
			}else{
				var title = copyFirstDate.getDate()+" "+intaHelper.monthTitles2[monthFirstDate]+" - "+copyLastDate.getDate()+" "+intaHelper.monthTitles2[monthLastDate];
			} 

			jQuery(intaCalendar.divId+" .dw-controls .dw-title_month a").text(title);
		}
	}

	this.go = function(){
		var _this = this;

		// var go = null;

		jQuery(intaCalendar.divId).on("click", ".dw-controls .dw-control a", function(e){
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

			// setTimeout(function(){ 
			// 	var interval = setInterval(function(){
			// 		if (!intaCalendar.datesToPullEventsProcessing) {
			// 			_this.putDays();
			// 			console.log(intaCalendar.datesToPullEventsProcessing);
			// 			clearInterval(interval); 
			// 		}
			// 	}, 10); 
			// }, 100);
			// console.log(intaCalendar.datesToPullEventsProcessing);
			// _this.putDays();
		});
	}

	this.resetFilterView = function(){
		// intaCalendar.filter = {
		// 	"type": null,
		// 	"value": null
		// }
		// console.log("Reset filter view"); 
		
		jQuery(intaCalendar.divId+" .dw-calendar .dw-row_2 a.dw-filter-item div").html("&nbsp;");
		jQuery(intaCalendar.divId+" .dw-calendar .dw-row_2 li.choosed").removeClass("choosed");

	}

	this.putFiltersData = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-calendar .dw-controls");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				trackFiltersData();
				putTrainings();
				putInstructors();
				putComplexities();
				putActivities();
				clearInterval(interval); 
			}
		}, 10); 

		function trackFiltersData(){
			intaCalendar.setFilter(null, null);
			_this.resetFilterView();

			// var choosedFilter = jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li.choosed");
			// var filterType = null;

			// if(choosedFilter.find(".dm-filter-item-training").length > 0){
			// 	filterType = "event";
			// }else if(choosedFilter.find(".dm-filter-item-instructor").length > 0){
			// 	filterType = "instructor";
			// }else if(choosedFilter.find(".dm-filter-item-complexity").length > 0){
			// 	filterType = "complexity";
			// }else if(choosedFilter.find(".dm-filter-item-activity").length > 0){
			// 	filterType = "activity";
			// }

			// if(choosedFilter.length > 0){
			// 	var filterText = choosedFilter.find("a.dm-filter-item div").text();
			// 	if(filterText.length > 0){
			// 		// console.log(filterText.trim());
			// 		if(filterType == "event"){
			// 			var eventtemplates = intaCalendar.halls[intaCalendar.currentHall].eventtemplate;
			// 			var resetFilter = true;
			// 			var newTemplateId = null;

			// 			for(i=0; i<eventtemplates.length; i++){
			// 				if(eventtemplates[i].title == filterText){
			// 					resetFilter = false;
			// 					newTemplateId = parseInt(eventtemplates[i].id);
			// 					break;
			// 				}
			// 			}

			// 			if(resetFilter){
			// 				intaCalendar.setFilter(null, null);
			// 				_this.resetFilterView();
			// 			}else{
			// 				if(filterType == null || newTemplateId == null){
			// 					intaCalendar.setFilter(null, null);
			// 					_this.resetFilterView();
			// 				}else{
			// 					console.log("Apply filter");
			// 					intaCalendar.setFilter(filterType, newTemplateId);
			// 				}
			// 			}
			// 		}else if(filterType == "instructor"){

			// 		}else if(filterType == "complexity"){
						
			// 		}else if(filterType == "activity"){
						
			// 		}
			// 	}
			// }
		}

		function putTrainings(){
			var hall = intaCalendar.halls[0];
			if(intaCalendar.currentHall !== null){
				hall = intaCalendar.halls[intaCalendar.currentHall];
			}

			if(hall.eventtemplate.length == 0 || !configData.desktopSettings.filters.train){
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training").closest("li").hide();
				return false;
			} 

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").append(
				'<div class="inta_filter_1-item">'
					+'<div class="inta_table">'
						+'<div class="inta_table-tr">'
							+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
							+'<div class="inta_table-td">'
								+'<a href="#" type-filter="training" template-id="null">'+intaLocale.tr.all+'</a>' 
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			);

			for(i=0; i<hall.eventtemplate.length; i++){
				var durApi = intaHelper.convertDurationApiToObj(hall.eventtemplate[i].duration);
				var durationFilter = intaHelper.getDurationFor(durApi, "modal");
				var durationFilterText = durationFilter !== null?'('+durationFilter+')':'';

				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-training .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: '+hall.eventtemplate[i].background_color+';"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="training" template-id="'+hall.eventtemplate[i].id+'">'+hall.eventtemplate[i].title+'</a>'
									+'<span>'+durationFilterText+'</span>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				);
			}
		}

		function putInstructors(){
			// jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-instructor").closest("li").hide();

			var hall = intaCalendar.halls[0];
			if(intaCalendar.currentHall !== null){
				hall = intaCalendar.halls[intaCalendar.currentHall];
			}

			if(hall.instructor.length == 0 || !configData.desktopSettings.filters.couch){
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-instructor").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-instructor .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-instructor .inta_filter_1").append(
				'<div class="inta_filter_1-item">'
					+'<div class="inta_table">' 
						+'<div class="inta_table-tr">'
							+'<div class="inta_table-td" style="background-color: #61dc35;"></div>'
							+'<div class="inta_table-td">'
								+'<a href="#" type-filter="instructor" instructor-id="null">'+intaLocale.tr.all+'</a>'  
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			);

			for(i=0; i<hall.instructor.length; i++){ 
				// var durApi = intaHelper.convertDurationApiToObj(hall.eventtemplate[i].duration)
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-instructor .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: #ccc;"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="instructor" instructor-id="'+hall.instructor[i].id+'" instructor-name="'+hall.instructor[i].name+'">'+hall.instructor[i].name+'</a>'
									// +'<span>('+intaHelper.getDurationFor(durApi, "modal")+')</span>'
								+'</div>' 
							+'</div>'
						+'</div>'
					+'</div>'
				);
			}
		}

		function putComplexities(){
			var complexities = intaCalendar.clubInfo[0].complexity;

			if(complexities.length == 0 || !configData.desktopSettings.filters.complexity){
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").append(
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
				+'</div>'
			);

			for(i=0; i<complexities.length; i++){
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-complexity .inta_filter_1").append(
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
					+'</div>'
				);
			}
		}

		function putActivities(item){
			var activities = intaCalendar.clubInfo[0].activity;

			if(activities.length == 0 || !configData.desktopSettings.filters.activity){
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").append(
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
				+'</div>'
			);

			for(i=0; i<activities.length; i++){ 
				jQuery(intaCalendar.divId+" .dw-calendar .dw-filters .inta_dropdown-activity .inta_filter_1").append(
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
					+'</div>'
				);
			}
		}
	}

	this.load = function(){ 
		var _this = this;

		jQuery(intaCalendar.divId).text(""); 

		jQuery(intaCalendar.divId).load(configData.pluginUrl+"view/desktop_week.php");

		var interval = setInterval(function(){
			var calendarEl = jQuery(".dw-calendar");
			if (calendarEl.length > 0) {
				
				// if(jQuery(intaCalendar.divId+' .description_window').length == 0){
				// 	jQuery(intaCalendar.divId+' .dw-calendar').after(
				// 		'<div class="description_window"></div>'
				// 	);
				// 	jQuery(intaCalendar.divId+' .description_window').load(configData.pluginUrl+"view/description_window.php");
				// }

				_this.applyLocalization();
				
				if(jQuery(intaCalendar.divId+' .inta_modal').length == 0){
					jQuery(intaCalendar.divId+' .dw-calendar').after(
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

		// console.log("applyLocalization");

		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(1)").text(intaLocale.tr.fullWeekDays.mon);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(2)").text(intaLocale.tr.fullWeekDays.tue);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(3)").text(intaLocale.tr.fullWeekDays.wed);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(4)").text(intaLocale.tr.fullWeekDays.thu);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(5)").text(intaLocale.tr.fullWeekDays.fri);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(6)").text(intaLocale.tr.fullWeekDays.sat);
		// jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(7)").text(intaLocale.tr.fullWeekDays.sun);

		// jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-training").text("My text");

		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters ul li a.dw-filter-item-training").html(intaLocale.tr.filterTitles.training+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters ul li a.dw-filter-item-complexity").html(intaLocale.tr.filterTitles.complexity+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters ul li a.dw-filter-item-activity").html(intaLocale.tr.filterTitles.activity+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dw-calendar .dw-filters ul li a.dw-filter-item-instructor").html(intaLocale.tr.filterTitles.instructor+"<div>&nbsp;</div>");
	
		jQuery(intaCalendar.divId+" .dw-calendar .dw-view ul li:first-child a").text(intaLocale.tr.monthViewTitle);
		jQuery(intaCalendar.divId+" .dw-calendar .dw-view ul li:last-child a").text(intaLocale.tr.weekViewTitle);
	}

	this.putHalls = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-calendar .dw-controls");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putHalls();
				clearInterval(interval); 
			}
		}, 10);
		
		function putHalls(){
			jQuery(intaCalendar.divId+" .dw-calendar .dw-halls ul").text("");

			for(i=0; i<intaCalendar.halls.length; i++){
				var active = "";
				if(i == 0){
					active = "class='active' ";
				}
				jQuery(intaCalendar.divId+" .dw-calendar .dw-halls ul").append(
					'<li '+active+'data-halls_key="'+i+'">' 
						+'<a href="#" class="dw-filter-item" data-id="'+intaCalendar.halls[i].id+'" data-title="'+intaCalendar.halls[i].title+'">'+intaCalendar.halls[i].title+'</a>' 
					+'</li>'
				);
			}
		}
		
	}

	this.putDays = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-calendar tbody.dw-events");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) { 
				putDays();
				clearInterval(interval); 
			}
		}, 10);

		function putDays(){
			jQuery(intaCalendar.divId+" .dw-calendar tbody.dw-events").text(""); 

			var hall = 0;
			if(intaCalendar.currentHall !== null){
				hall = intaCalendar.currentHall;
			}

			var date = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());
			var lastDate = new Date(intaCalendar.datesToPullEvents.lastDay.getTime());

			// console.log("In range");
			// var inRange = intaHelper.todayInRange(date, lastDate);
			// console.log(inRange);
			var today = ["", "", "", "", "", "", ""];

			if(intaHelper.dateInRange(date, lastDate, intaCalendar.dateToday)){
				// console.log("In range");
				var ind = intaCalendar.dateToday.getDay();
				if(ind == 0){
					today[6] = " dw-day_today";
				}else{
					today[ind - 1] = " dw-day_today";
				} 
				// console.log(intaCalendar.dateToday.getDay()); 
			}

			var time_open = intaCalendar.halls[hall].time_open;
			var time_close = intaCalendar.halls[hall].time_close;

			var hoursOfWork = intaHelper.getHoursOfWork(time_open, time_close);

			var weekDatesForHead = intaHelper.getWeekDates(date, lastDate, "head");
			var weekDatesForbody = intaHelper.getWeekDates(date, lastDate, "body");
			var weekDatesForModal = intaHelper.getWeekDates(date, lastDate, "modal");

			var headTds = jQuery(intaCalendar.divId+" .dw-calendar .dw-for_events table td");
			// console.log(weekDatesForHead);
			for(i=1; i<headTds.length; i++){
				// jQuery(headTds[i]).find("div").text(weekDatesForHead[i-1]);
				jQuery(headTds[i]).html(intaHelper.weekTitles[i-1]+"<div>"+weekDatesForHead[i-1]+"</div>"); 
			}

			for(i=0; i<hoursOfWork.length; i++){
				jQuery(intaCalendar.divId+" .dw-calendar tbody.dw-events").append(
					'<tr class="dw-hour">'
						+'<td class="dw-for_day_hour">'
							+'<div class="dw-day-hour" data-date="'+intaHelper.convertDateForLink(date)+'" data-modal-date="'+intaHelper.convertDateForModal(date)+'">'
								+hoursOfWork[i]  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[0]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[0]+'" data-modal-date="'+weekDatesForModal[0]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[1]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[1]+'" data-modal-date="'+weekDatesForModal[1]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[2]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[2]+'" data-modal-date="'+weekDatesForModal[2]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[3]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[3]+'" data-modal-date="'+weekDatesForModal[3]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[4]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[4]+'" data-modal-date="'+weekDatesForModal[4]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[5]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[5]+'" data-modal-date="'+weekDatesForModal[5]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
						+'<td class="dw-for_day'+today[6]+'">'
							+'<div class="dw-day" data-date="'+weekDatesForbody[6]+'" data-modal-date="'+weekDatesForModal[6]+'" data-hour="'+parseInt(hoursOfWork[i])+'">'
								+'<div class="dw-per_day"></div>'
								+'<div class="dw-more"><a href="#">'+configData.desktopSettings.weekView.moreText+'</a></div>'  
							+'</div>'
						+'</td>'
					+'</tr>'
				);
			}

		}
	}

	this.putEvents = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dw-calendar .dw-day .dw-per_day");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putEvents();
				clearInterval(interval); 
			}
		}, 10);

		function putEvents(){
			jQuery(intaCalendar.divId+" .dw-calendar .dw-day .dw-per_day").text("");
			// console.log("done");

			for(i=0; i<intaCalendar.events.length; i++){

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
				if(!configData.desktopSettings.weekView.showSeats){
					seats = "";   
				}

				var dateApi = intaHelper.convertDateApiToDate(intaCalendar.events[i].date);
				var durApi = intaHelper.convertDurationApiToObj(intaCalendar.events[i].duration);

				var hour = intaHelper.convertDateApiToHour(intaCalendar.events[i].date);

				var begining = dateApi.hours+'.'+dateApi.minutes; 
				var duration = durApi.hours+'.'+durApi.minutes;
				var durationModal = intaHelper.getDurationFor(durApi, "modal");
				if(!configData.desktopSettings.weekView.showDuration){
					duration = "";
					durationModal = ""; 
				}

				var instructorName = "null";
				var instructorId = "null";
				if(intaCalendar.events[i].instructor.length > 0){
					var instructorName = intaCalendar.events[i].instructor[0].name;
					var instructorId = intaCalendar.events[i].instructor[0].id;
				}

				var backgroundColor = "none";
				var color = "inherit";
				if(configData.desktopSettings.useApiColors){
					backgroundColor = intaCalendar.events[i].background;
					color = intaCalendar.events[i].color;
				}

				// var activity = intaCalendar.events[i].activity;
				// if(activity == null){
				// 	activity = "";
				// }

				if(intaCalendar.events[i].activity == null){
					var activityHtml = "";
				}else{ 
					var activityHtml = '<div style="color: '+color+';" class="dm-activity">'+intaCalendar.events[i].activity+'</div>';
				}

				var eventsPerHourCount = jQuery(intaCalendar.divId+" .dw-calendar .dw-day[data-date='"+dateApi.year+"-"+dateApi.month+"-"+dateApi.day+"'][data-hour='"+hour+"'] .dw-per_day .dw-event").length;
				var display = eventsPerHourCount < configData.desktopSettings.weekView.showEventsPerHour? "block":"none";
				jQuery(intaCalendar.divId+" .dw-calendar .dw-day[data-date='"+dateApi.year+"-"+dateApi.month+"-"+dateApi.day+"'][data-hour='"+hour+"'] .dw-per_day").append(
					'<div class="dw-event" style="display: '+display+'; background-color: '+backgroundColor+';">'
						+'<div class="dw-table">'
							+'<div class="dw-table_tr">'
								+'<div class="dw-table_td">'
									+'<div class="dw-begin_time" style="color: '+color+';">'+begining+'</div>'
									+'<div class="dw-duration" style="color: '+color+';">'+durationModal+'</div>' 
								+'</div>'
								+'<div class="dw-table_td">'
									+'<div class="dw-title"><a style="color: '+color+';" class="inta-event_description to_check_in" href="#" data-id="'+intaCalendar.events[i].id+'"'
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
										+' data-seats="'+intaCalendar.events[i].seats+'"'
										+' data-activity="'+intaCalendar.events[i].activity+'"' 
										+' data-color="'+intaCalendar.events[i].color+'"'
										+' data-background="'+intaCalendar.events[i].background+'"' 
										+' data-description="null"'
										+'>'+intaCalendar.events[i].title+'</a><div style="display: '+display+'; background-color: '+(backgroundColor=="inherit"?"white":backgroundColor)+'!important;" class="three-dots">...</div></div>'
									// +'<div style="color: '+color+';" class="dm-activity">'+activity+'</div>'
									+activityHtml
									+'<div style="color: '+color+';" class="dw-seats">'+seats+'</div>' 
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>' 
				);

			} 

			_this.showMoreButtons();

			if(configData.desktopSettings.weekView.hideEmptyRows){
				_this.hideEmptyRows();
			}
		}
	}

	this.hideEmptyRows = function(){
		var _this = this; 

		var hours = jQuery("#intaCallendar .dw-calendar .dw-for_events .dw-hour");

		var hoursLength = hours.length;

		for(i=0; i<hoursLength; i++){
			if(jQuery(hours[i]).find(".dw-event").length == 0){
				jQuery(hours[i]).hide();
			}
		}
	}

	this.showMoreButtons = function(){
		var _this = this; 

		jQuery(intaCalendar.divId+" .dw-calendar .dw-day .dw-more").hide();
		var allDays = jQuery(intaCalendar.divId+" .dw-calendar .dw-day");
		for(i=0; i<allDays.length; i++){
			var countHiddenEvents = jQuery(allDays[i]).find(".dw-event:hidden").length;
			if(countHiddenEvents > 0){
				jQuery(allDays[i]).find(".dw-more").show();
			}
		}
	}

	this.moreButtonClick = function(){
		var _this = this;

		jQuery(intaCalendar.divId).on("click", ".dw-calendar .dw-day .dw-more a", function(e){
			e.preventDefault();
			_this.showModal("events", {
				"clickedMoreButton": this,
			});
		});
	}

	this.showModal = function(type, data){
		jQuery(intaCalendar.divId).find(".inta_modal .mde-body").text("");
		jQuery("body, html").css({"overflow": "hidden"});

		// console.log(data);
		switch(type){
			case"events":
				var dayModalDate = jQuery(data.clickedMoreButton).closest(".dw-day").attr("data-modal-date");
				jQuery(intaCalendar.divId).find(".inta_modal .mde-header .mde-day").text(dayModalDate); 
				// console.log(data);
				var eventsPerDay = jQuery(data.clickedMoreButton).closest(".dw-day").find(".dw-title a");

				// console.log(eventsPerDay);

				for(i=0; i<eventsPerDay.length; i++){
					var backgroundColor = "inherite";
					if(configData.desktopSettings.useApiColors){
						backgroundColor = eventsPerDay[i].dataset.background;  
					}

					var seats = intaHelper.getSeatsMessage(eventsPerDay[i].dataset.seats);
					if(!configData.desktopSettings.weekView.showSeats){
						seats = "";  
					}

					var activity = eventsPerDay[i].dataset.activity;
					if(activity == "null"){
						activity = "";
					} 

					jQuery(intaCalendar.divId+" .inta_modal .mde-body").append(
						'<div class="mde-event">'
	                        +'<div class="mde-event_table">'
	                            +'<div class="mde-event_tr">'
	                                +'<div class="mde-event_td">'
	                                    +'<div class="mde-event_begining">'+eventsPerDay[i].dataset.begining+'</div>'
	                                    +'<div class="mde-event_duration">'+eventsPerDay[i].dataset.durationModal+'</div>'
	                                +'</div>'
	                                +'<div class="mde-event_td" style="background-color: '+backgroundColor+';">'
	                                    +'<div class="mde-event_color"></div>'
	                                +'</div>'
	                                +'<div class="mde-event_td">'
	                                    +'<div class="mde-event_title">'
	                                        +'<a class="inta-event_description to_check_in" href="#" '
	                                        	+'data-id="'+eventsPerDay[i].dataset.id+'"'
												+' data-begining="'+eventsPerDay[i].dataset.begining+'"'
												+' data-instructor-name="'+eventsPerDay[i].dataset.instructorName+'"'
												+' data-instructor-id="'+eventsPerDay[i].dataset.instructorId+'"'
												+' data-duration="'+eventsPerDay[i].dataset.duration+'"'
												+' data-duration-modal="'+eventsPerDay[i].dataset.durationModal+'"'
												+' data-title="'+eventsPerDay[i].dataset.title+'"'
												+' data-hall="'+eventsPerDay[i].dataset.hall+'"'
												+' data-price="'+eventsPerDay[i].dataset.price+'"'
												+' data-template="'+eventsPerDay[i].dataset.template+'"'
												+' data-api-date="'+eventsPerDay[i].dataset.apiDate+'"'
												+' data-seats="'+eventsPerDay[i].dataset.seats+'"'
												+' data-color="'+eventsPerDay[i].dataset.color+'"'
												+' data-background="'+eventsPerDay[i].dataset.background+'"'  
												+' data-description="'+eventsPerDay[i].dataset.description+'">'
	                                            	+eventsPerDay[i].dataset.title 
	                                        +'</a>'
	                                    +'</div>'
	                                    +'<div class="mde-event_activity">'+activity+'</div>'
	                                    +'<div class="mde-event_seats">'+seats+'</div>'
	                                +'</div>'
	                            +'</div>'
	                        +'</div>'
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

	this.hallClick = function(){
		var _this = this;

		jQuery(intaCalendar.divId).on("click", ".dw-calendar .dw-row_1 .dw-halls li a.dw-filter-item", function(e){ 
			e.preventDefault();
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
			_this.putFiltersData();

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
					jQuery(intaCalendar.divId+" .dw-calendar .dw-row_1 .dw-halls li").removeClass("active");
					jQuery(_clickedHall).closest("li").addClass("active");
					jQuery(intaCalendar.divId+" .preloader-desktop_month").remove();
					// console.log(_this.events);
					clearInterval(interval);
				}
			}, 10);

		});
	}

	this.filterClick = function(){
		var _this = this; 

		jQuery(intaCalendar.divId).on("click", ".dw-calendar .dw-row_2 a.dw-filter-item", function(e){
			e.preventDefault();

			if(!jQuery(this).closest("li").hasClass("active")){
				jQuery(this).closest("li").addClass("active");
				jQuery(this).closest("li").find(".inta_dropdown-window").fadeIn(300);
				jQuery(this).closest("li").find(".inta_dropdown-content").scrollTop(0);
			}else{
				jQuery(this).closest("li").removeClass("active");
				jQuery(this).closest("li").find(".inta_dropdown-window").hide();
			}

		}); 

		jQuery("body").click(function(e){
			if(jQuery(e.target).closest(".inta_dropdown").length == 0){
				jQuery(intaCalendar.divId+" .inta_dropdown-window").hide();
				jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li").removeClass("active");
			}else{
				var clickedliIndex = jQuery(e.target).closest("li").index();
				var allLi = jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li");
				// console.log(allLi);
				for(i=0; i<allLi.length; i++){
					if(i != clickedliIndex){
						jQuery(allLi[i]).find(".inta_dropdown-window").hide();
						jQuery(allLi[i]).removeClass("active");
						// console.log(i);
					}
				}
			}
		});

		jQuery(intaCalendar.divId).on("click", ".dw-row_2 .inta_dropdown-content a", function(e){
			e.preventDefault();

			var typeFilter = jQuery(this).attr("type-filter");

			_this.resetFilterView();

			// jQuery(intaCalendar.divId+" .dm-calendar .dm-row_2 a.dm-filter-item div").html("&nbsp;");
			// jQuery(intaCalendar.divId+" .dm-calendar .dm-row_2 li.choosed").removeClass("choosed");

			if(typeFilter == "training"){
				var templateid = jQuery(this).attr("template-id"); 
				if(templateid == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("event", parseInt(templateid));
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-training").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "instructor"){
				var instructorId = jQuery(this).attr("instructor-id"); 
				if(instructorId == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("instructor", parseInt(instructorId));
					jQuery(this).closest("li").addClass("choosed"); 
					jQuery(this).closest(".inta_dropdown-instructor").find(".dw-filter-item div").text(jQuery(this).text());
				}
			}

			if(typeFilter == "complexity"){
				console.log("Set complexity filter");
				var complexityTitle = jQuery(this).attr("title"); 
				if(complexityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("complexity", complexityTitle);
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-complexity").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "activity"){
				console.log("Set activity filter");
				var activityTitle = jQuery(this).attr("title"); 
				if(activityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("activity", activityTitle); 
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-activity").find(".dw-filter-item div").text(jQuery(this).text());
				}
			} 

			var allLi = jQuery(intaCalendar.divId).find(".dw-calendar .dw-row_2 li");
			// console.log(allLi);
			for(i=0; i<allLi.length; i++){
				jQuery(allLi[i]).find(".inta_dropdown-window").hide();
				jQuery(allLi[i]).removeClass("active");
			}

			_this.putEvents();

		});
	}
}