var intaCalendarDesktopMonthClass = function(){
	
	// this.descWindowClass = ".description_window";
	// this.modalClass = ".inta_modal";
	this.initialized = false;

	this.init = function(){
		var _this = this;

		// _this.test(); 
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

		intaCalendar.currentInitCalendar = "desktop_month";
		// console.log("Inta calendar desktop month initialized");
	}

	this.test = function(){
		var _this = this;

		jQuery(document).mousemove(function(e){
			console.log(e.pageX+" - "+e.pageY);
		});

		// console.log("test loaded!");
	}

	this.scrollToCalendar = function(){
		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-controls .dm-title_month a");
			if (calendarEl.length > 0) {
				scrollToCalendar();
				clearInterval(interval); 
			}
		}, 10);

		function scrollToCalendar(){
			var dwCalendarPosition = jQuery(intaCalendar.divId+" .dm-calendar").position();
			// console.log(dwCalendarPosition);
			jQuery("html, body").animate({ scrollTop: dwCalendarPosition.top }, 0);
			// jQuery("body").scrollTop(dwCalendarPosition.top);
		}
	}

	this.showMonthPreload = function(){
		jQuery(intaCalendar.divId+" .dm-calendar .dm-per_day").text("");
		jQuery(intaCalendar.divId+" .dm-calendar .dm-more").hide();

		jQuery(intaCalendar.divId).append("<div class='preloader-desktop_month'><div class='loader'></div></div>"); 
		var dmEventsPosition = jQuery(intaCalendar.divId+" .dm-events").position();
		var dmEventsWidth = jQuery(intaCalendar.divId+" .dm-events").width();
		var dmEventsHeight = jQuery(intaCalendar.divId+" .dm-events").height();
		
		jQuery(intaCalendar.divId).find(".preloader-desktop_month").css({
			"width": dmEventsWidth,
			"height": dmEventsHeight - 2,
			"top": dmEventsPosition.top + 1,
			"left": dmEventsPosition.left,
		});

		// console.log(dmEventsPosition); 
	}

	this.putTitle = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-controls .dm-title_month a");
			if (calendarEl.length > 0) {
				putTitle();
				clearInterval(interval); 
			}
		}, 10);

		function putTitle(){
			var copyFirstDate = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());

			var firstMonthDay = null;

			if(copyFirstDate.getDate() != 1){
				var month = copyFirstDate.getMonth();
				var year = copyFirstDate.getFullYear();
				firstMonthDay = new Date(year, (month + 1), 1); 
			}else{
				var month = copyFirstDate.getMonth();
				var year = copyFirstDate.getFullYear();
				firstMonthDay = new Date(year, month, 1);
			}

			var title = intaHelper.monthTitles[firstMonthDay.getMonth()]+" "+firstMonthDay.getFullYear();

			// console.log("Title - "+yearTitle+" "+monthTitle);

			jQuery(intaCalendar.divId+" .dm-controls .dm-title_month a").text(title);
		}
	}

	this.go = function(){
		var _this = this;

		// var go = null;

		jQuery(intaCalendar.divId).on("click", ".dm-controls .dm-control a", function(e){
			e.preventDefault();
			var go = jQuery(this).attr("go");
			// console.log(go);
			// intaCalendar.datesToPullEventsProcessing = true;
			if(go == "right"){
				intaCalendar.goNext();
			}else if(go == "left"){
				intaCalendar.goPrevious();
			}else{
				return false;
			}

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
		
		jQuery(intaCalendar.divId+" .dm-calendar .dm-row_2 a.dm-filter-item div").html("&nbsp;");
		jQuery(intaCalendar.divId+" .dm-calendar .dm-row_2 li.choosed").removeClass("choosed");

	}

	this.putFiltersData = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-calendar .dm-controls");
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-training").closest("li").hide();
				return false;
			} 

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-training .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-training .inta_filter_1").append(
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

				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-training .inta_filter_1").append(
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-instructor").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-instructor .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-instructor .inta_filter_1").append(
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-instructor .inta_filter_1").append(
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

			// return false;

			if(complexities.length == 0 || !configData.desktopSettings.filters.complexity){
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-complexity").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-complexity .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-complexity .inta_filter_1").append(
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-complexity .inta_filter_1").append(
					'<div class="inta_filter_1-item">'
						+'<div class="inta_table">'
							+'<div class="inta_table-tr">'
								+'<div class="inta_table-td" style="background-color: '+complexities[i].color+';"></div>'
								+'<div class="inta_table-td">'
									+'<a href="#" type-filter="complexity" title="'+complexities[i].title+'">'+complexities[i].title+'</a>' 
									// +'<span>(5 мин.)</span>' 
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-activity").closest("li").hide();
				return false;
			}

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-activity .inta_filter_1").text("");

			jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-activity .inta_filter_1").append(
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
				jQuery(intaCalendar.divId+" .dm-calendar .dm-filters .inta_dropdown-activity .inta_filter_1").append(
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
		jQuery(intaCalendar.divId).load(configData.pluginUrl+"view/desktop_month.php");

		var interval = setInterval(function(){
			var calendarEl = jQuery(".dm-calendar");
			if (calendarEl.length > 0) {
				
				// if(jQuery('.description_window').length == 0){
				// 	jQuery('body').append(
				// 		'<div class="description_window desktop"></div>'
				// 	);
					
				// 	jQuery('.description_window.desktop').load(configData.pluginUrl+"view/description_window.php");
				// }  

				_this.applyLocalization();

				if(jQuery(intaCalendar.divId+' .inta_modal').length == 0){
					jQuery(intaCalendar.divId+' .dm-calendar').after(
						'<div class="inta_modal"></div>'
					);
					jQuery(intaCalendar.divId+' .inta_modal').load(configData.pluginUrl+"view/inta_modal.php"); 
				}
				// jQuery('.dm-calendar').after(
				// 	'<div class="description_window"></div>'
				// 	+'<div class="inta_modal"></div>'
				// );
				// // jQuery('.description_window').after('<div class="description_window"></div>');
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

		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(1)").text(intaLocale.tr.fullWeekDays.mon);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(2)").text(intaLocale.tr.fullWeekDays.tue);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(3)").text(intaLocale.tr.fullWeekDays.wed);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(4)").text(intaLocale.tr.fullWeekDays.thu);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(5)").text(intaLocale.tr.fullWeekDays.fri);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(6)").text(intaLocale.tr.fullWeekDays.sat);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-for_events table thead td:nth-child(7)").text(intaLocale.tr.fullWeekDays.sun);

		// jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-training").text("My text");

		jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-training").html(intaLocale.tr.filterTitles.training+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-complexity").html(intaLocale.tr.filterTitles.complexity+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-activity").html(intaLocale.tr.filterTitles.activity+"<div>&nbsp;</div>");
		jQuery(intaCalendar.divId+" .dm-calendar .dm-filters ul li a.dm-filter-item-instructor").html(intaLocale.tr.filterTitles.instructor+"<div>&nbsp;</div>");
	
		jQuery(intaCalendar.divId+" .dm-calendar .dm-view ul li:first-child a").text(intaLocale.tr.monthViewTitle);
		jQuery(intaCalendar.divId+" .dm-calendar .dm-view ul li:last-child a").text(intaLocale.tr.weekViewTitle);
	}

	this.putHalls = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-calendar .dm-controls");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putHalls();
				clearInterval(interval); 
			}
		}, 10);
		
		function putHalls(){
			jQuery(intaCalendar.divId+" .dm-calendar .dm-halls ul").text("");

			for(i=0; i<intaCalendar.halls.length; i++){
				var active = "";
				if(i == 0){
					active = "class='active' ";
				}
				jQuery(intaCalendar.divId+" .dm-calendar .dm-halls ul").append(
					'<li '+active+'data-halls_key="'+i+'">' 
						+'<a href="#" class="dm-filter-item" data-id="'+intaCalendar.halls[i].id+'" data-title="'+intaCalendar.halls[i].title+'">'+intaCalendar.halls[i].title+'</a>' 
					+'</li>'
				);
			}
		}
		
	}

	this.putDays = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-calendar tbody.dm-events");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putDays();
				clearInterval(interval); 
			}
		}, 10);

		function putDays(){
			jQuery(intaCalendar.divId+" .dm-calendar tbody.dm-events").text("");

			var date = new Date(intaCalendar.datesToPullEvents.firstDay.getTime());
			var lastDate = new Date(intaCalendar.datesToPullEvents.lastDay.getTime());

			do{
				
				if(date.getDay() == 1){
					jQuery(intaCalendar.divId+" .dm-calendar tbody.dm-events").append('<tr class="dm-week">');
				}

				// console.log(date);
				// console.log(intaCalendar.dateToday);
				var dmToday = "";
				// var backgroundColorToday = "inherit";
				// var colorToday = "inherit";
				if(date.getFullYear() == intaCalendar.dateToday.getFullYear() &&
					date.getMonth() == intaCalendar.dateToday.getMonth() &&
					date.getDate() == intaCalendar.dateToday.getDate()){
					dmToday = " dm-day_today";
					// if(configData.desktopSettings.useApiColors){
					// 	backgroundColorToday = intaCalendar.clubInfo[0].primary_color;
					// 	colorToday = intaCalendar.clubInfo[0].primary_text_color; 
					// }
				}

				jQuery(intaCalendar.divId+" .dm-calendar tbody.dm-events").append(
					'<td class="dm-for_day'+dmToday+'">'
						+'<div class="dm-day" data-date="'+intaHelper.convertDateForLink(date)+'" data-modal-date="'+intaHelper.convertDateForModal(date)+'">'
							+'<div class="dm-day_number">'+date.getDate()+'</div>' 
							+'<div class="dm-per_day"></div>' 
							+'<div class="dm-more"><a href="#">'+configData.desktopSettings.monthView.moreText+'</a></div>'  
						+'</div>'
					+'</td>'
				);

				if(date.getDay() == 0){
					jQuery(intaCalendar.divId+" .dm-calendar tbody.dm-events").append('</tr>');
				}

				date.setDate(date.getDate() + 1);
			}while(date <= lastDate);
		}
	}

	this.putEvents = function(){
		var _this = this;

		var interval = setInterval(function(){
			var calendarEl = jQuery(intaCalendar.divId+" .dm-calendar .dm-day .dm-per_day");
			// var descriptionEl = jQuery("#description_window .description_window");
			if (calendarEl.length > 0) {
				putEvents();
				clearInterval(interval); 
			}
		}, 10);

		function putEvents(){
			jQuery(intaCalendar.divId+" .dm-calendar .dm-day .dm-per_day").text("");
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
				if(!configData.desktopSettings.monthView.showSeats){
					seats = "";
				}

				var dateApi = intaHelper.convertDateApiToDate(intaCalendar.events[i].date);
				var durApi = intaHelper.convertDurationApiToObj(intaCalendar.events[i].duration);

				var begining = dateApi.hours+'.'+dateApi.minutes; 
				var duration = durApi.hours+'.'+durApi.minutes;
				var durationModal = intaHelper.getDurationFor(durApi, "modal");
				if(!configData.desktopSettings.monthView.showDuration){
					duration = "";
					durationModal = "";
				}

				var instructorName = "null";
				var instructorId = "null";
				if(intaCalendar.events[i].instructor.length > 0){
					var instructorName = intaCalendar.events[i].instructor[0].name;
					var instructorId = intaCalendar.events[i].instructor[0].id;
				}

				var backgroundColor = "inherit";
				var textColor = "inherit";
				if(configData.desktopSettings.useApiColors){
					backgroundColor = intaCalendar.events[i].background;
					textColor = intaCalendar.events[i].color;
				}

				var activity = intaCalendar.events[i].activity;
				if(activity == null){
					activity = "";
				}

				var eventsPerDayCount = jQuery(intaCalendar.divId+" .dm-calendar .dm-day[data-date='"+dateApi.year+"-"+dateApi.month+"-"+dateApi.day+"'] .dm-per_day .dm-event").length;
				var display = eventsPerDayCount < configData.desktopSettings.monthView.showEventsPerDay? "block":"none";
				jQuery(intaCalendar.divId+" .dm-calendar .dm-day[data-date='"+dateApi.year+"-"+dateApi.month+"-"+dateApi.day+"'] .dm-per_day").append(
					'<div class="dm-event" style="display: '+display+'; background-color: '+backgroundColor+';">'
						+'<div class="dm-table">'
							+'<div class="dm-table_tr">'
								+'<div class="dm-table_td">'
									+'<div class="dm-begin_time" style="color: '+textColor+';">'+begining+'</div>'
									+'<div class="dm-duration" style="color: '+textColor+';">'+duration+'</div>'
								+'</div>'
								+'<div class="dm-table_td">'
									+'<div class="dm-title"><a style="color: '+textColor+';" class="inta-event_description to_check_in" href="#" data-id="'+intaCalendar.events[i].id+'"'
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
										+'>'+intaCalendar.events[i].title+'</a></div>'
									+'<div style="color: '+textColor+';" class="dm-activity">'+activity+'</div>'
									+'<div style="color: '+textColor+';" class="dm-seats">'+seats+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				);

			} 

			_this.showMoreButtons();
		}
	}

	this.showMoreButtons = function(){
		var _this = this; 

		jQuery(intaCalendar.divId+" .dm-calendar .dm-day .dm-more").hide();
		var allDays = jQuery(intaCalendar.divId+" .dm-calendar .dm-day");
		for(i=0; i<allDays.length; i++){
			var countHiddenEvents = jQuery(allDays[i]).find(".dm-event:hidden").length;
			if(countHiddenEvents > 0){
				jQuery(allDays[i]).find(".dm-more").show();
			}
		}
	}

	this.moreButtonClick = function(){
		var _this = this;

		jQuery(intaCalendar.divId).on("click", ".dm-calendar .dm-day .dm-more a", function(e){
			e.preventDefault();
			_this.showModal("events", {
				"clickedMoreButton": this,
			});
		});
	}

	this.showModal = function(type, data){
		jQuery(intaCalendar.divId).find(".inta_modal .mde-body").text("");
		jQuery("body, html").css({"overflow": "hidden"});

		// console.log(jQuery(data.clickedMoreButton).closest(".dm-day").find(".dm-title a"));
		switch(type){
			case"events":
				var dayModalDate = jQuery(data.clickedMoreButton).closest(".dm-day").attr("data-modal-date");
				jQuery(intaCalendar.divId).find(".inta_modal .mde-header .mde-day").text(dayModalDate); 
				// console.log(data);
				var eventsPerDay = jQuery(data.clickedMoreButton).closest(".dm-day").find(".dm-title a");

				// console.log(eventsPerDay);

				for(i=0; i<eventsPerDay.length; i++){
					var backgroundColor = "inherit";
					if(configData.desktopSettings.useApiColors){
						backgroundColor = eventsPerDay[i].dataset.background;  
					}

					var seats = intaHelper.getSeatsMessage(eventsPerDay[i].dataset.seats);
					if(!configData.desktopSettings.monthView.showSeats){
						seats = "";  
					}

					var activity = eventsPerDay[i].dataset.activity;
					if(activity == "null"){
						activity = "";
					}

					duration = eventsPerDay[i].dataset.duration;
					durationModal = eventsPerDay[i].dataset.durationModal;
					if(!configData.desktopSettings.monthView.showDuration){
						duration = "";
						durationModal = "";
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
												+' data-duration="'+duration+'"'
												+' data-duration-modal="'+durationModal+'"'
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

		jQuery(intaCalendar.divId).on("click", ".dm-calendar .dm-row_1 .dm-halls li a.dm-filter-item", function(e){ 
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
					jQuery(intaCalendar.divId+" .dm-calendar .dm-row_1 .dm-halls li").removeClass("active");
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

		jQuery(intaCalendar.divId).on("click", ".dm-calendar .dm-row_2 a.dm-filter-item", function(e){
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
				jQuery(intaCalendar.divId).find(".dm-calendar .dm-row_2 li").removeClass("active");
			}else{
				var clickedliIndex = jQuery(e.target).closest("li").index();
				var allLi = jQuery(intaCalendar.divId).find(".dm-calendar .dm-row_2 li");
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

		jQuery(intaCalendar.divId).on("click", ".dm-row_2 .inta_dropdown-content a", function(e){
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
					jQuery(this).closest(".inta_dropdown-training").find(".dm-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "instructor"){
				var instructorId = jQuery(this).attr("instructor-id"); 
				if(instructorId == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("instructor", parseInt(instructorId));
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-instructor").find(".dm-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "complexity"){
				// console.log("Set complexity filter");
				var complexityTitle = jQuery(this).attr("title"); 
				if(complexityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("complexity", complexityTitle);
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-complexity").find(".dm-filter-item div").text(jQuery(this).text());
				}
			} 

			if(typeFilter == "activity"){
				// console.log("Set activity filter");
				var activityTitle = jQuery(this).attr("title"); 
				if(activityTitle == "null"){
					intaCalendar.setFilter(null, null);
				}else{
					intaCalendar.setFilter("activity", activityTitle); 
					jQuery(this).closest("li").addClass("choosed");
					jQuery(this).closest(".inta_dropdown-activity").find(".dm-filter-item div").text(jQuery(this).text());
				}
			} 

			var allLi = jQuery(intaCalendar.divId).find(".dm-calendar .dm-row_2 li");
			// console.log(allLi);
			for(i=0; i<allLi.length; i++){
				jQuery(allLi[i]).find(".inta_dropdown-window").hide();
				jQuery(allLi[i]).removeClass("active");
			}

			_this.putEvents();  

		});
	}

}


// var intaCalendarDesktopMonth = new intaCalendarDesktopMonthClass();
