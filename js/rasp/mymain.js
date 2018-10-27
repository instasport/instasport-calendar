jQuery(document).ready(function($) {
	
	//alert(777);
	
	var clubName = $("#club-name").text();
	//var clubName = "bright";
	var hallArr = [];
	//var hallUrl = "https://instasport.co/club/"+clubName+"/api/hall/?format=json";
	var hallUrl = "https://instasport.co/club/"+clubName+"/api/v1/hall/?format=json";
	var locale = 'ru';

	//var beginDate = '';
	//var endDate = '';
	//var divIdCalendar = '';

	//alert(100);

	

	
	
	function calendarApp (divIdCalendar, defaultView, myCalendar){
		//alert(divIdCalendar);
		this.beginDate = null;
		this.endDate = null;
		this.currentDate = null;
		this.divIdCal = divIdCalendar;
		this.divClassMyCal = myCalendar;
		this.defaultView = defaultView;
		this.useApiColors = 0;
		this.useMobileApiColors = 0;
		this.calendarListArr = [];
		this.calendarDaysNumber = [];
		this.calendarUrl = null;
		this.hall = null;
		this.hallOpen = null;
		this.hallClose = null;
		this.choosenTD = null;
		this.choosenTimeTD = null;
		//this.my = 'my';
		//FILTERS
		this.trains = [];
		this.choosenTrain = null;
		this.couches = [];
		this.choosenCouch = null;


		this.loadData = function(callback){
			var _this = this;
			//console.log(_this.useApiColors);

			//alert(100);

			//Getting parameter that determine must or not programm use Api Colors
			_this.useApiColors = $("#use-api-colors").text();
			_this.useMobileApiColors = $("#mobile-use-api-colors").text();

			//console.log(_this.useApiColors);

			if(_this.divIdCal == "#calendar-desktop"){
				_this.defaultView = $("#desktop-typecalendar").text();
			}else if(_this.divIdCal == "#calendar-mobile"){
				_this.defaultView = $("#mobile-typecalendar").text();
			}
			
			if(_this.getHalls()){
				if(_this.init(_this.divIdCal)){
					
					
					
					//console.log(hallArr.length);
					if(hallArr.length > 1){
						$.each(hallArr, function(key, val){
							if(key == 0){
								//$(_this.divClassMyCal).append('<div class="cld-tab current" data-hall-id="'+val.id+'">'+val.title+'</div>');
								$(_this.divClassMyCal).find(".switch-halls-mycalendar")
													  .append('<span class="switch-btn active" data-hall-id="'+val.id+'">'+val.title+'</span>');
							}else{
								$(_this.divClassMyCal).find(".switch-halls-mycalendar")
													  .append('<span class="switch-btn" data-hall-id="'+val.id+'">'+val.title+'</span>');
							}
						});
					}


						$(_this.divClassMyCal+' .switch-halls-mycalendar').on('click', '.switch-btn', function(){
							if(!$(this).hasClass('active')){
								
								$("#events-on-day").text("");
								_this.choosenCouch = null;
								_this.choosenTrain = null;
								$("#filterByCouch").text("Выбрать тренера");
								$("#filterByTraine").text("Выбрать тренировку");
								$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").removeClass("choosen");
								_this.choosenTD = null;
								_this.choosenTimeTD = null;

								$(this).closest(".switch-halls-mycalendar").find(".switch-btn").removeClass('active');
								_this.hall = $(this).attr('data-hall-id');
								//hallIndex = $(this).index();
								$(this).addClass('active');
								//console.log(_this.hall);
								//eventArr = _this.hallFilter(tabId);
								//buildingEvents = _this.rebuildEventsArr(eventArr);
								//staff.init(hallArr[hallIndex].instructor);
								_this.init(_this.divIdCal);
								//$('.cld-hall-img').prop('src', hallArr[hallIndex].image);
								//$('.cld-hall-img-name').text(hallArr[hallIndex].title+' ( '+hallArr[hallIndex].description+' ) ');
							}
						});

						$(_this.divClassMyCal).on('click', '#filterByTraine', function(e){
							//alert(_this.beginDate);
							/*if($(this).val() == "null"){
								_this.choosenTrain = null;
							}else{
								_this.choosenTrain = $(this).val();
							}*/
							//alert("train was changed! The choosen train is "+_this.choosenTrain);
							//_this.init(_this.divIdCal);
							/*_this.constructMyCalendar();*/
							var _thiss = $(this);

							console.log(_this.trains);


							e.preventDefault();
							$("#calendarModal .modal-body").text("");
							$("#calendarModal .modal-header .title").text("Тренировки");
							//alert(date);
							$("#calendarModal .modal-body").append("<table>"
								+"<tr>"
								+"<td style='width: 10px!important;'>"
								+"</td>"
								+"<td class='color-line'><div></div><div></div></td>"
								+"<td>"
								+"<a class='choose-train' href='null'>Все</a><br/>"
								+"</td>"
								+"</tr>"
								+"</table>");

							$.grep(_this.trains, function(e){
								
								var title = e.title;
								//var time = e.start.split("T")[1].split(":")[0];
								//var fullTime = e.start.split("T")[1].split("+")[0];



								var endTime1 = e.duration.split(":")[0];
								var endTime2 = e.duration.split(":")[1];
								if(endTime1 == "00"){
									endTime1 = "";
									endTime2 = endTime2+" мин.";
								}else{
									if(endTime2 == "00"){
										endTime2 = "";
										
									}else{
										endTime2 = parseInt(endTime2, 10);
										endTime2 = " "+endTime2+" мин.";
									}
									endTime1 = parseInt(endTime1, 10);
									if(endTime1 == 1){
										endTime1 = endTime1+" час";
									}else if(endTime1 > 1){
										endTime1 = endTime1+" часа";
									}
								}



								$("#calendarModal .modal-body").append("<table>"
									+"<tr>"
									+"<td style='width: 10px!important;'>"
									//+endTime1+endTime2 
									+"</td>"
									+"<td class='color-line'><div></div><div></div></td>"
									+"<td>"
									+"<a class='choose-train' href='"+title+"'>"+title+"</a> <span style='font-size: 0.8em;'> ("+endTime1+endTime2+")</span><br/>"
									+"</td>"
									+"</tr>"
									+"</table>");


							});	

							$("#calendarModal").css({"display":"block"});

							$("#calendarModal .modal-body .choose-train").click(function(e){
								e.preventDefault();
								var trainTitle = $(this).attr("href");
								//alert(trainTitle);
								if(trainTitle == "null"){
									_this.choosenTrain = null;
									$(_thiss).text("Выбрать тренировку");
								}else{
									_this.choosenTrain = trainTitle;
									$(_thiss).text(trainTitle);
								}
								$("#calendarModal").css({"display":"none"});
								//_this.constructMyCalendar();

								if(_this.defaultView == "month"){
									_this.constructMyCalendarMonth();
								}else{
									_this.constructMyCalendarWeek();
								}

							});

						});



						$(_this.divClassMyCal).on('click', '#filterByCouch', function(e){
							
							var _thiss = $(this);


							e.preventDefault();
							$("#calendarModal .modal-body").text("");
							$("#calendarModal .modal-header .title").text("Тренера");
							//alert(date);
							$("#calendarModal .modal-body").append("<table>"
								+"<tr>"
								+"<td>"
								+"</td>"
								+"<td class='color-line'><div></div><div></div></td>"
								+"<td>"
								+"<a class='choose-train' href='null'>Все</a><br/>"
								+"</td>"
								+"</tr>"
								+"</table>");

							$.grep(_this.couches, function(e){
								
								var id = e.id;
								var name = e.name;
								var avatar = e.avatar;
								//var time = e.start.split("T")[1].split(":")[0];
								//var fullTime = e.start.split("T")[1].split("+")[0];


								$("#calendarModal .modal-body").append("<table>"
									+"<tr>"
									+"<td>"
									+"<img src='"+avatar+"' width='100'>"
									+"</td>"
									+"<td class='color-line'><div></div><div></div></td>"
									+"<td>"
									+"<a class='choose-train' href='"+id+"'>"+name+"</a><br/>"
									+"</td>"
									+"</tr>"
									+"</table>");


							});	

							$("#calendarModal").css({"display":"block"});

							$("#calendarModal .modal-body .choose-train").click(function(e){
								e.preventDefault();
								var couchId = $(this).attr("href");
								var couchName = $(this).text();
								//alert(trainTitle);
								if(couchId == "null"){
									_this.choosenCouch = null;
									$(_thiss).text("Выбрать тренера");
								}else{
									_this.choosenCouch = couchId;
									$(_thiss).text(couchName);
								}
								$("#calendarModal").css({"display":"none"});
								//_this.constructMyCalendar();
								
								if(_this.defaultView == "month"){
									_this.constructMyCalendarMonth();
								}else{
									_this.constructMyCalendarWeek();
								}
								
							});

						});
						


						$(_this.divClassMyCal+' table thead .calendar-title').on('click', 'a.prev', function(e){
							e.preventDefault();
							$(_this.divIdCal).fullCalendar( 'prev' );
						});
						$(_this.divClassMyCal+' table thead .calendar-title').on('click', 'a.next', function(e){
							e.preventDefault();
							$(_this.divIdCal).fullCalendar( 'next' ); 
						});

						$(_this.divClassMyCal+' .switch-type-mycalendars').on('click', '.switch-btn', function(){
							//if(!$(this).hasClass('active')){
								
								$("#events-on-day").text("");
								$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").removeClass("choosen");
								_this.choosenTD = null;
								_this.choosenTimeTD = null;

								$(this).closest(".switch-type-mycalendars").find(".switch-btn").removeClass('active');
								_this.defaultView = $(this).attr('data-type-cal');
								//hallIndex = $(this).index();
								$(this).addClass('active');
								//console.log(_this.defaultView);
								//eventArr = _this.hallFilter(tabId);
								//buildingEvents = _this.rebuildEventsArr(eventArr);
								//staff.init(hallArr[hallIndex].instructor);
							//	_this.init(_this.divIdCal);
								$(_this.divIdCal).fullCalendar('changeView', _this.defaultView);


								//$('.cld-hall-img').prop('src', hallArr[hallIndex].image);
								//$('.cld-hall-img-name').text(hallArr[hallIndex].title+' ( '+hallArr[hallIndex].description+' ) ');
							//} 
						});


						if(_this.divIdCal == "#calendar-desktop"){
							
							/*
							$(_this.divClassMyCal+" table.item-event").on("hover",".item-event-title",function(){
								
								if($(this).find(".three-dot").is(':visible')){
									$(this).addClass("hover");
									var widthText = parseInt($(this).find(".textt").css("width"), 10);
									$(this).closest("td").css({"padding-top":"21px"});
									$(this).css({"position":"absolute",
													"margin-top":"-26px",
													"margin-left":"-6px",
													"height":"28px",
													"line-height":"28px",
													"display":"block",
													"background-color":"#f1f1f1",
													"text-align":"center",
													"border":"1px solid #999",
													"border-radius":"6px",
													"width":(widthText+10)+"px"});
									$(this).find(".three-dot").css({"display":"none"});
									$(this).find(".textt").css({"position":"absolute",
																"left":"5px",});
								} 
							}, function(){
								if($(this).hasClass("hover")){
									$(this).find(".three-dot").css({"display":"block"});
									$(this).closest("td").attr("style","");
									$(this).attr("style","");
									$(this).find(".textt").attr("style","");
									$(this).removeClass("hover");
								}
							});
							$(_this.divClassMyCal+" table.item-event").each(function(){
								var widthBlock = parseInt($(this).find(".item-event-title")
																	.css("width"), 10);
								var widthText = parseInt($(this).find(".item-event-title")
																.find(".textt")
																.css("width"), 10);
								//alert(widthBlock+" - "+widthText);
								if(widthBlock < widthText){
									$(this).find(".three-dot").show();
								}
								console.log(widthBlock+"-"+widthText);
							});*/


							$(_this.divClassMyCal).on("click",".more-items", function(e){
								e.preventDefault();
								$("#calendarModal .modal-body").text("");
								var typeCalendar = $(this).attr("data-type-calendar");
								//alert(123);

								var choosenDate = $(this).attr("data-date");
								var choosenTime = $(this).attr("data-time");
								//alert(date);
								$.grep(_this.calendarListArr, function(e){
									
									if(_this.choosenTrain != null && e.title != _this.choosenTrain){
										return false;
									}

									var flag = false;
									var date = e.date.split("T")[0];
									var time = e.date.split("T")[1].split(":")[0];
									var fullTime = e.date.split("T")[1].split("+")[0];

									var nameMonth = null;
									if(choosenDate.split("-")[1] == 1){nameMonth = "Января";}
									if(choosenDate.split("-")[1] == 2){nameMonth = "Февраля";}
									if(choosenDate.split("-")[1] == 3){nameMonth = "Марта";}
									if(choosenDate.split("-")[1] == 4){nameMonth = "Апреля";}
									if(choosenDate.split("-")[1] == 5){nameMonth = "Мая";}
									if(choosenDate.split("-")[1] == 6){nameMonth = "Июня";}
									if(choosenDate.split("-")[1] == 7){nameMonth = "Июля";}
									if(choosenDate.split("-")[1] == 8){nameMonth = "Августа";}
									if(choosenDate.split("-")[1] == 9){nameMonth = "Сентября";}
									if(choosenDate.split("-")[1] == 10){nameMonth = "Октября";}
									if(choosenDate.split("-")[1] == 11){nameMonth = "Ноября";}
									if(choosenDate.split("-")[1] == 12){nameMonth = "Декабря";}

									if(typeCalendar == 'week'){
										if(date == choosenDate && time == choosenTime){
											flag = true;
											$("#calendarModal .modal-header .title").html(choosenDate.split("-")[2]+" "
																							+nameMonth+" "
																							+choosenDate.split("-")[0]+" | "
																							+fullTime.split(":")[0]+"."
																							+fullTime.split(":")[1]);
										}
									}else if(typeCalendar == 'month'){
										if(date == choosenDate){
											flag = true;
											$("#calendarModal .modal-header .title").html(choosenDate.split("-")[2]+" "
																							+nameMonth+" "
																							+choosenDate.split("-")[0]);
										}
									}

									if(flag){
										//console.log(e);

										//var fullTime = e.start.split("T")[1].split("+")[0];
										var duration = e.duration;
										var seats = e.seats;
										var url = e.url;
										var title = e.title;

										var id = e.id;
										var hall = e.hall;
										var template = e.template;
										var timeBegin = e.date.split("T")[1].split("+")[0];
										var date = e.date.split("T")[0]; 

										var colorEvent = e.color;
										var backgroundColorEvent = e.background;

										var messageSeats = "";
										if(parseInt(seats, 10) == 0){messageSeats = "нет мест";}
										if(parseInt(seats, 10) == 1){messageSeats = "осталось 1 место";}
										if(parseInt(seats, 10) == 2){messageSeats = "осталось 2 места";}


										var endTime1 = duration.split(":")[0];
										var endTime2 = duration.split(":")[1];
										if(endTime1 == "00"){
											endTime1 = "";
											endTime2 = endTime2+" мин.";
										}else{
											if(endTime2 == "00"){
												endTime2 = "";
												
											}else{
												endTime2 = parseInt(endTime2, 10);
												endTime2 = " "+endTime2+" мин.";
											}
											endTime1 = parseInt(endTime1, 10);
											if(endTime1 == 1){
												endTime1 = endTime1+" час";
											}else if(endTime1 > 1){
												endTime1 = endTime1+" часа";
											}
										}

										var AIDuration = "";
										var AISeats = "";
										if(typeCalendar == 'week'){
											var addInfoDuration = $("#desktop-week-duration").text();
											var addInfoSeats = $("#desktop-week-seats").text();
										} else if (typeCalendar == 'month'){
											var addInfoDuration = $("#desktop-month-duration").text();
											var addInfoSeats = $("#desktop-month-seats").text();
										}

										if(addInfoDuration == 1){
											AIDuration = "<span>"+endTime1+endTime2+"</span>";
										}
										if(addInfoSeats == 1){
											AISeats = "<span>"+messageSeats+"</span>";
										}


										$("#calendarModal .modal-body").append("<table>"
											+"<tr>"
											+"<td>"
											+fullTime.split(":")[0]+"."+fullTime.split(":")[1]+"<br/>"
											//+"<span>"+endTime1+endTime2+"</span>" 
											+AIDuration
											+"</td>"
											+"<td class='color-line' style='background-color: "+backgroundColorEvent+";'><div></div><div></div></td>"
											+"<td>"
											+"<a class='eventItem' "
											+"data-time='"+timeBegin+"' "
											+"data-id='"+id+"' "
											+"data-title='"+title+"' "
											+"data-hall='"+hall+"' "
											+"data-date='"+date+"' "
											+"data-template='"+template+"' "
											+"href='"+url+"'>"+title+"</a>"
											//+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
											//+"<span>"+messageSeats+"</span>" 
											+AISeats
											+"</td>"
											+"</tr>"
											+"</table>");
										return true;
									}else{
										return false;
									}

								});
								$("#calendarModal").css({"display":"block"});
							});

							
							$(window).resize(function(){
								$(_this.divClassMyCal+" table.item-event").each(function(){
									var widthBlock = parseInt($(this).find(".item-event-title")
																		.css("width"), 10);
									var widthText = parseInt($(this).find(".item-event-title")
																	.find(".textt")
																	.css("width"), 10);
									//alert(widthBlock+" - "+widthText);
									if(widthBlock < widthText){
										$(this).find(".three-dot").show();
									}else{
										$(this).find(".three-dot").hide();
									}
								});
							});
						}

					//alert("init is done!");
					//alert(this.divIdClendar);

					//beginDate = $(_this.divIdCal).fullCalendar('getView').start.format("YYYY-MM-DD");
					//endDate = $(_this.divIdCal).fullCalendar('getView').end.format("YYYY-MM-DD");

					//console.log(_this.beginDate+" - "+_this.endDate);

				}else{
					//alert("init isn`t done!");
					//alert(_this.my);
				}
			}else{
				callback(false);
				$('.mycalendar-mobile .switch-halls-mycalendar').hide();
				$('#calendar-desktop').hide();
				$('#calendar-mobile').hide();
			}




			//_this.getHalls()
			//$(hallArr).each(function(i, v){
			//	console.log(v.id);
			//});

			//alert(divIdClendar);
			//callback(divIdClendar);
		}


		this.getHalls = function(){
				var len = 0;
				apiQuery(hallUrl, function(data){
					if(typeof data == "object"){
						len = data.length;
						if(len > 0){
							hallArr = data;
						}
					}
				});
				if(len == 0 || len == "undefined" ){
					// console.log(len);
					return false;
				}else{
					this.hall = hallArr[0].id;
					this.hallOpen = hallArr[0].time_open;
					this.hallClose = hallArr[0].time_close;
					 // console.log(len);
					return true;

				}
		}


		this.init = function(calendar){
			var _this = this;

			//alert(100);

			$(calendar).fullCalendar( 'destroy' );

			//console.log(_this.currentDate);

			var init = false;
			

			$(calendar).fullCalendar({
				locale: locale,
				timezone: true,
				_this: this,
				contentHeight: 'auto',
				defaultView: _this.defaultView,
				views: {
				    month: {
				        titleFormat: "MMMM YYYY",                  
				    },
				    week: {
				        columnFormat: "D.MM.YYYY",
				        titleFormat: "DD.MM.YYYY",            
				    },
				    day: {
				        titleFormat: "DD.MM.YYYY",
				        /*columnFormat: "dddd d", */          
				    }
				},
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				/*buttonText: {
					today: toDayBtnTxt,
					month: monthTxt,
					agendaWeek: agendaWeekTxt,
					agendaDay: agendaDayTxt
				},*/ 
				//minTime: open,
				//maxTime: close,
					//events: cldEvent,
					/*events: {
					        url: "https://instasport.co/club/"+club+"/api/schedule/dates",
					        data: function() { // a function that returns an object
					            return {
					                //date1: "2017-08-01",
					                format: "json"
					            };
					        }
					    },*/
					/*eventSources: [{
						//events: cldEvent,
						events: {
					        url: cldEvent,
					        data: function() { // a function that returns an object
					            return {
					                dynamic_value: 5
					            };
					        }
					    },
						color: bgColor,
						textColor: txtColor 
					}],*/
				eventAfterAllRender: function(event, element) {
				    
				    //calendarDATA();
				    //alert("second calendar is rendered!!!");
				    
				    _this.constructMyCalendar();
				    
				    //alert(100);
				    //console.log("change");
				    init = true;
				},
			});

			
			if(init){
 				// console.log(len);
				return true;
			}else{
				// console.log(len);
				return false;
			}
		
		}


		this.constructMyCalendar = function(){
			var _this = this;
			//if(_this.beginDate != null){
			//	$('#calendar').fullCalendar('gotoDate', _this.beginDate);
			//}
			//_this.getCalendarAllDaysNumber();
			_this.beginDate = $(_this.divIdCal).fullCalendar('getView').start.format("YYYY-MM-DD");
			_this.endDate = $(_this.divIdCal).fullCalendar('getView').end.format("YYYY-MM-DD");
			//_this.currentDate = $(_this.divIdCal).fullCalendar('getDate').format("YYYY-MM-DD");

			var currDateObj = new Date();
			var currDateDay = currDateObj.getDate();
			if(currDateDay < 10){currDateDay = "0"+currDateDay;}
			var currDateMonth = currDateObj.getMonth() + 1;
			if(currDateMonth < 10){currDateMonth = "0"+currDateMonth;}
			_this.currentDate = currDateObj.getFullYear()+"-"+currDateMonth+"-"+currDateDay;
			//console.log(_this.defaultView);
			
			/*$(".switch-type-mycalendars .switch-btn").removeClass("active");
			if(_this.defaultView == "agendaWeek"){
				$(".switch-type-mycalendars .switch-btn.week").addClass("active");
			}else if(_this.defaultView == "month"){
				$(".switch-type-mycalendars .switch-btn.month").addClass("active");
			}*/
			//var d = new Date();
			//alert(_this.beginDate+"|"+_this.endDate+"|"+hallArr.length);
			//alert(hallArr[0].id);
			//var activeHallButton = _this.divClassMyCal+" .switch-halls-mycalendar .switch-btn.active";
			if(_this.hall == null){ _this.hall = hallArr[0].id; }
			//console.log(_this.hall);
			
			//_this.calendarUrl = "https://instasport.co/club/"+clubName+"/api/schedule/dates/"+_this.beginDate+"/"+_this.endDate+"/hall/"+_this.hall+"/?format=json";
			_this.calendarUrl = "https://instasport.co/club/"+clubName+"/api/v1/event/?startdate="+_this.beginDate+"&enddate="+_this.endDate+"&hall="+_this.hall+"&format=json";
			//alert(_this.calendarUrl);

			//alert(_this.calendarUrl);
			_this.getCalendarList();
			//_this.getTrainsList();
			//_this.getCouchList();
			_this.getCalendarAllDaysNumber();
			//console.log(_this.calendarDaysNumber);
			
			$(_this.divClassMyCal+" .mycalendar").hide();
			if(_this.defaultView == "month"){
				//$(_this.divClassMyCal+" .mycalendar").hide();
				//$(_this.divClassMyCal+" .mycalendar.mymonthcalendar").show();
				_this.constructMyCalendarMonth();
			}else if(_this.defaultView == "agendaWeek"){
				//$(_this.divClassMyCal+" .mycalendar").hide();
				//$(_this.divClassMyCal+" .mycalendar.myweekcalendar").show();
				_this.constructMyCalendarWeek();
			}
		}



		this.constructMyCalendarMonth = function(){
			var _this = this;

			_this.getTrainsList();
			_this.getCouchList();

			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td .events").text("");

			var date = $(_this.divIdCal).fullCalendar('getDate');
  			var month_int = date.format("M");
  			var currentYear = date.format("YYYY");
  			//console.log(month_int);
  			var nameCurrentMonth = null;
  			if(month_int == 1){nameCurrentMonth = "январь";}
  			if(month_int == 2){nameCurrentMonth = "февраль";}
  			if(month_int == 3){nameCurrentMonth = "март";}
  			if(month_int == 4){nameCurrentMonth = "апрель";}
  			if(month_int == 5){nameCurrentMonth = "май";}
  			if(month_int == 6){nameCurrentMonth = "июнь";}
  			if(month_int == 7){nameCurrentMonth = "июль";}
  			if(month_int == 8){nameCurrentMonth = "август";}
  			if(month_int == 9){nameCurrentMonth = "сентябрь";}
  			if(month_int == 10){nameCurrentMonth = "октябрь";}
  			if(month_int == 11){nameCurrentMonth = "ноябрь";}
  			if(month_int == 12){nameCurrentMonth = "декабрь";}

  			var titleCalendar = nameCurrentMonth+" "+currentYear;
  			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table thead .calendar-title .today").text(titleCalendar);
  			//console.log(nameCurrentMonth+" "+currentYear);

			if(_this.divIdCal == "#calendar-desktop"){
				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td .events").text("");
				//$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table thead tr td.today").text(titleCalendar);
				
				var arrDate = "";
				arrDate = _this.calendarDaysNumber;
				//console.log(arrDate);

				$(_this.divClassMyCal+" .switch-type-mycalendars span").removeClass("active");
				$(_this.divClassMyCal+" .switch-type-mycalendars span.month").addClass("active");


				var i = 0;
				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr").each(function(){
					//console.log(data[i]['date']);
					$(this).find("td").each(function(){

						//var __thisTD = this;

						if(i >= arrDate.length){return false;}

						var _this2 = this;
						//console.log(arrDate[i][0].number);
						$(this).find(".day-number").text(parseInt(arrDate[i][0].number, 10)); 
						$(this).attr("data-date", arrDate[i][0].date);
						$(this).attr("data-day-number", arrDate[i][0].number);
						
						var result = $.grep(_this.calendarListArr, function(e){
							
							//var date = e.start.split("T")[0];
							var date = e.date.split("T")[0];
							if(date == arrDate[i][0].date){
								//console.log(e.start);
								return true;
							}else{
								return false;
							}

						});
						//console.log(result);
						var k = 1;
						var desktopMonthQuantityTrainings = $("#desktop-month-quantity-trainings").text();
						result.forEach(function(currentValue, index, arr){
							
							//$(_this2).css({"background-color":currentValue.background_color});
							/*if(_this.useApiColors == 1){
								var colorApi = "yellow"; //currentValue.color
								var backgroundColorApi = "pink"; //currentValue.background_color
								$(_this2).css({"background-color":backgroundColorApi});
								$(_this2).find(".day-number").css({"color":colorApi});
								$(_this2).find(".events").css({"color":colorApi});

								console.log($(_this2).find(".day-number").text()+" - "+$(_this2).find("div.three-dot").length+"\n");
								$(_this2).find("div.three-dot").each(function(){
									$(this).css({"background-color":backgroundColorApi})
											.css({"color":colorApi});
								});
							}*/
							
							//console.log(currentValue.color);
							/*
							var lengthEvents = $(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
											.find(".events")
											.find(".item-event")
											.length;*/
							
							//if(_this.choosenTrain != null && _this.choosenTrain != currentValue.title){
							//	return false;
							//}
							//console.log(currentValue.instructor[0]);
							if((_this.choosenTrain != null && _this.choosenTrain != currentValue.title)
								|| (_this.choosenCouch != null && _this.choosenCouch != currentValue.instructor[0])){
								return false;
							}
							
							if(k <= desktopMonthQuantityTrainings){
								//console.log(currentValue);
								var duration = currentValue.duration;
								var seats = currentValue.seats;
								//var seats = 2;
								var id = currentValue.id;
								var hall = currentValue.hall;
								var template = currentValue.template;
								var url = currentValue.url;
								var title = currentValue.title;
								//var timeBegin = currentValue.start.split("T")[1].split("+")[0];
								var timeBegin = currentValue.date.split("T")[1].split("+")[0];
								var date = currentValue.date.split("T")[0];

								var messageSeats = "";
								if(parseInt(seats, 10) == 0){messageSeats = "нет мест";}
								if(parseInt(seats, 10) == 1){messageSeats = "осталось 1 место";}
								if(parseInt(seats, 10) == 2){messageSeats = "осталось 2 места";}

								var endTime1 = duration.split(":")[0];
								var endTime2 = duration.split(":")[1];
								if(endTime1 == "00"){
									//endTime1 = "";
									endTime2 = ":"+endTime2;
								}else{
									if(endTime2 == "00"){
										endTime2 = ":00";
										
									}else{
										endTime2 = parseInt(endTime2, 10);
										endTime2 = ":"+endTime2;
									}
									endTime1 = parseInt(endTime1, 10);
									if(endTime1 == 1){
										//endTime1 = endTime1+" час";
									}else if(endTime1 > 1){
										//endTime1 = endTime1+" часа";
									}
								}

								var addDuration = "";
								var addSeats = "";
								var flagAddInfoDuration = $("#desktop-month-duration").text();
								var flagAddInfoSeats = $("#desktop-month-seats").text();
								if(flagAddInfoDuration == 1){
									addDuration = "<div class='item-event-duration'>"+endTime1+endTime2+"</div>";
									//addSeats = "<div class='item-event-seats'>"+messageSeats+"</div>";
								}
								if(flagAddInfoSeats == 1){
									//addDuration = "<div class='item-event-duration'>"+endTime1+endTime2+"</div>";
									addSeats = "<div class='item-event-seats'>"+messageSeats+"</div>";
								} 

								//if(_this.choosenTrain == null || _this.choosenTrain == title){
									$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
										.find(".events") 
										.append("<table class='item-event' data-time-begin='"+timeBegin+"'><tr>"
											+"<td>"
												+"<div>"+timeBegin.split(":")[0]+"."+timeBegin.split(":")[1]+"</div>"
												+addDuration
											+"</td>"
											+"<td>"
												+"<div class='item-event-title'>"
													+"<div class='textt'>"+title+"</div>"
													+"<div class='three-dot'>...</div>"
													+"<a class='eventItem' target='_blank' "
													+"data-time='"+timeBegin+"' "
													+"data-id='"+id+"' "
													+"data-title='"+title+"' "
													+"data-hall='"+hall+"' "
													+"data-date='"+date+"' "
													+"data-template='"+template+"' "
													+"href='"+url+"'></a>"
												+"</div>"
												+addSeats
											+"</td>"
											+"</tr></table>");


									if(_this.useApiColors == 1){
										//var colorApi = "yellow"; //currentValue.color
										var colorApi = currentValue.color;
										//var backgroundColorApi = "pink"; //currentValue.background_color
										var backgroundColorApi = currentValue.background;
										
										$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
											.find("table[data-time-begin='"+timeBegin+"']")
											.css({"background-color":backgroundColorApi})
											.css({"color":colorApi});

										$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
											.find("table[data-time-begin='"+timeBegin+"']")
											.find(".three-dot")
											.css({"background-color":backgroundColorApi})
											.css({"color":colorApi});
										//$(_this2).find(".day-number").css({"background-color":backgroundColorApi});
										//$(_this2).find(".day-number").css({"color":colorApi});
										//$(_this2).find(".events").css({"color":colorApi});

										//console.log($(_this2).find(".day-number").text()+" - "+$(_this2).find("div.three-dot").length+"\n");
										
									}

								//}
							}else{
								//console.log(1212);
								var lengthMoreEvents = $(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
										.find(".events")
										.find(".more-items").length;
								if(lengthMoreEvents == 0){
									var desktopMonthMoreText = $("#desktop-month-more-text").text();
									$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
										.find(".events")
										.append("<a data-date='"+arrDate[i][0].date+"' data-type-calendar='month' class='more-items' href='#'>"+desktopMonthMoreText+"</a>");
								}
							}

							k++;
							/*
							var dateEvent = currentValue.start.split("T")[0];
							var startEvent = (currentValue.start.split("T")[1]).split("+")[0];
							var endEvent = (currentValue.end.split("T")[1]).split("+")[0];
							$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
										.find(".hide-events")
										.append("<div class='hide-event' "
											+"data-id='"+currentValue.id+"' "
											+"data-hall='"+currentValue.hall+"' "
											+"data-seats='"+currentValue.seats+"' "
											+"data-start='"+startEvent+"' "
											+"data-end='"+endEvent+"' "
											+"data-date='"+dateEvent+"' "
											+"data-duration='"+currentValue.duration+"' "
											+"data-url='"+currentValue.url+"' "
											+">"
											+currentValue.title
											+"</div>");*/
							//console.log(currentValue.title);


							

						});
						
						
						i++;
					});
				});
						
						setTimeout(function(){ 
							//console.log("desktop month");
							$(_this.divClassMyCal+" table.item-event").each(function(){
									//$(this).css({"background-color": "red"});
									var widthBlock = parseInt($(this).find("div.item-event-title")
																		.css("width"), 10);
									var widthText = parseInt($(this).find(".item-event-title")
																	.find(".textt")
																	.css("width"), 10);
									//alert(widthBlock+" - "+widthText);
									if(widthBlock < widthText){
										$(this).find(".three-dot").show();
									}
									//console.log(widthBlock);
							});

							$(_this.divClassMyCal+" table.item-event .item-event-title").hover(function(){ 
								
								if($(this).find(".three-dot").is(':visible')){
									$(this).addClass("with-dots");
								}
								//if($(this).find(".three-dot").is(':visible')){
									$(this).addClass("hover");
									var widthText = parseInt($(this).find(".textt").css("width"), 10);
									$(this).closest("td").css({"padding-top":"21px"});
									$(this).css({"position":"absolute",
													"margin-top":"-26px",
													"margin-left":"-6px",
													"height":"28px",
													"line-height":"28px",
													"z-index":"100",
													"display":"block",
													"background-color":"#f1f1f1",
													"text-align":"center",
													"border":"1px solid #999",
													"border-radius":"6px",
													"width":(widthText+10)+"px",
													"min-width": "90px"});
									$(this).find(".three-dot").css({"display":"none"});
									$(this).find(".textt").css({"position":"absolute",
																"left":"5px"});
								//} 
							}, function(){
								if($(this).hasClass("hover")){
									if($(this).hasClass("with-dots")){
										$(this).find(".three-dot").css({"display":"block"});
									}
									$(this).closest("td").attr("style","");
									$(this).attr("style","");
									$(this).find(".textt").attr("style","");
									$(this).removeClass("hover");
								}
							});



						}, 300);


			}else if(_this.divIdCal == "#calendar-mobile"){
				
				var monthShowDot = $("#mobile-month-show-dot").text();
				if(monthShowDot == "true"){
					$(_this.divClassMyCal+" .mycalendar.mymonthcalendar").addClass("dot");
				}

				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td .hide-events").text("");
				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td").removeClass("active");
				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td").removeClass("choosen");
				//console.log(_this.choosenTD+" - "+_this.divClassMyCal);
				//if(_this.choosenTD){
				//$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+_this.choosenTD+"']").addClass("choosen");
				//}
				//$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table thead tr td.today").text(titleCalendar);

				var arrDate = _this.calendarDaysNumber;

				var i = 0;
				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr").each(function(){
					//console.log(data[i]['date']);
					$(this).find("td").each(function(){

						var _this2 = this;


						$(this).find(".day-number").text(parseInt(arrDate[i][0].number, 10)); 
						$(this).attr("data-date", arrDate[i][0].date);
						$(this).attr("data-day-number", arrDate[i][0].number);

						i++;
					});
				});

				this.calendarListArr.forEach(function(item, index){
					//console.log(item.start);
					var date = item.date.split("T")[0];
					//var time = item.start.split("T")[1].split(":")[0];
					if(!$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+date+"']").hasClass("active")){
						$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+date+"']").addClass("active");
						/*if(_this.useApiColors == 1){
							var colorApi = "yellow"; //currentValue.color
							var backgroundColorApi = "pink"; //currentValue.background_color
							$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+date+"']")
								.find(".day-number")
								.css({"background-color":backgroundColorApi});
							$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+date+"']")
								.find(".day-number")
								.css({"color":colorApi});
						}*/
					}
				});


				$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td").on("click",".day-number", function(e){
					e.preventDefault();
					//alert(777);
					var _thisClick = $(this);
					$("#events-on-day").text("");
					$("#calendarModal .modal-body").text("");
					//_thisClick.addClass("choosen");
					$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td").removeClass("choosen");
					_thisClick.closest("td.day").addClass("choosen");
					var inplace = $("#mobile-month-inplace").text();
					//var inplace = "true";
					var dateChoosen = $(this).closest("td.day").attr("data-date");
					_this.choosenTD = dateChoosen;
					//console.log(date);
					//alert(123123);
					//return false;
					_this.calendarListArr.forEach(function(item, index){
						//console.log(item.start);
						var date = item.date.split("T")[0];
						//var time = item.start.split("T")[1].split(":")[0];
						if(date == dateChoosen){

							var time = item.date.split("T")[1].split("+")[0];
							var duration = item.duration;
							var seats = item.seats;
							//var seats = 2;
							var url = item.url;
							var title = item.title;

							var id = item.id;
							var hall = item.hall;
							var template = item.template;
							var timeBegin = item.date.split("T")[1].split("+")[0];
							var date = item.date.split("T")[0];

							var backgroundColorEvent = item.background;

							var messageSeats = "";
							if(parseInt(seats, 10) == 0){messageSeats = "нет мест";}
							if(parseInt(seats, 10) == 1){messageSeats = "осталось 1 место";}
							if(parseInt(seats, 10) == 2){messageSeats = "осталось 2 места";}
							/*$("#calendarModal .modal-body").append("<table>"
								+"<tr>"
								+"<td>"
								+time.split(":")[0]+"."+time.split(":")[1] 
								+"</td>"
								+"<td>"
								+"<a target='_blank' href='"+url+"'>"+title+"</a>"
								+"</td>"
								+"</tr>"
								+"</table>");*/

							var endTime1 = duration.split(":")[0];
							var endTime2 = duration.split(":")[1];
							if(endTime1 == "00"){
								endTime1 = "";
								endTime2 = endTime2+" мин.";
							}else{
								if(endTime2 == "00"){
									endTime2 = "";
									
								}else{
									endTime2 = parseInt(endTime2, 10);
									endTime2 = " "+endTime2+" мин.";
								}
								endTime1 = parseInt(endTime1, 10);
								if(endTime1 == 1){
									endTime1 = endTime1+" час";
								}else if(endTime1 > 1){
									endTime1 = endTime1+" часа";
								}
							}



							var AIDuration = "";
							var AISeats = "";
							var addInfoDuration = $("#mobile-month-duration").text();
							var addInfoSeats = $("#mobile-month-seats").text();

							if(addInfoDuration == 1){
								AIDuration = "<span>"+endTime1+endTime2+"</span>";
							}
							if(addInfoSeats == 1){
								AISeats = "<span>"+messageSeats+"</span>";
							}



							if(inplace == "true"){
								//alert(1);
								var month_int = parseInt(dateChoosen.split("-")[1], 10);
								var nameCurrentMonth = null;
								if(month_int == 1){nameCurrentMonth = "январь";}
					  			if(month_int == 2){nameCurrentMonth = "февраль";}
					  			if(month_int == 3){nameCurrentMonth = "март";}
					  			if(month_int == 4){nameCurrentMonth = "апрель";}
					  			if(month_int == 5){nameCurrentMonth = "май";}
					  			if(month_int == 6){nameCurrentMonth = "июнь";}
					  			if(month_int == 7){nameCurrentMonth = "июль";}
					  			if(month_int == 8){nameCurrentMonth = "август";}
					  			if(month_int == 9){nameCurrentMonth = "сентябрь";}
					  			if(month_int == 10){nameCurrentMonth = "октябрь";}
					  			if(month_int == 11){nameCurrentMonth = "ноябрь";}
					  			if(month_int == 12){nameCurrentMonth = "декабрь";}
					  			var titleModal = dateChoosen.split("-")[2]+" "+nameCurrentMonth+" "+dateChoosen.split("-")[0]
								$("#calendarModal .modal-header .title").text(titleModal);
								$("#calendarModal .modal-body").append("<table>"
									+"<tr>"
									+"<td>"
									+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
									//+"<span>"+endTime1+endTime2+"</span>" 
									+AIDuration
									+"</td>"
									//+"<td class='color-line'><div></div><div></div></td>"
									+"<td class='color-line' style='background-color: "+backgroundColorEvent+";'><div></div><div></div></td>"
									+"<td>"
										+"<a class='eventItem' target='_blank' "
										+"data-time='"+timeBegin+"' "
										+"data-id='"+id+"' "
										+"data-title='"+title+"' "
										+"data-hall='"+hall+"' "
										+"data-date='"+date+"' "
										+"data-template='"+template+"' "
										+"href='"+url+"'>"+title+"</a><br/>"
									//+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
									//+"<span>"+messageSeats+"</span>"
									+AISeats
									+"</td>"
									+"</tr>"
									+"</table>");

								$("#calendarModal").css({"display":"block"});

							}else{
								$("#events-on-day").append("<table>"
									+"<tr>"
									+"<td>"
									+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
									//+"<span>"+endTime1+endTime2+"</span>" 
									+AIDuration 
									+"</td>"
									+"<td class='color-line' style='background-color: "+backgroundColorEvent+";'><div></div><div></div></td>"
									+"<td>"
										+"<a class='eventItem' target='_blank' "
										+"data-time='"+timeBegin+"' "
										+"data-id='"+id+"' "
										+"data-title='"+title+"' "
										+"data-hall='"+hall+"' "
										+"data-date='"+date+"' "
										+"data-template='"+template+"' "
										+"href='"+url+"'>"+title+"</a><br/>"
									//+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
									//+"<span>"+messageSeats+"</span>"
									+AISeats
									+"</td>"
									+"</tr>"
									+"</table>");
							}
						}
					});
				});
				//var beginTime = parseInt(this.hallOpen.split(":")[0], 10);
				//var endTime = parseInt(this.hallClose.split(":")[0], 10);

				//console.log(beginTime+" - "+endTime);

				/*
				this.calendarListArr.forEach(function(item, index){
					//console.log(item.start);
					var date = item.start.split("T")[0];
					//var time = item.start.split("T")[1].split(":")[0];
					$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+date+"']")
								.find(".hide-events")
								.append("<div class='item'>"+item.title+"</div>");
				});*/

				//console.log(this.calendarListArr);  

			}
			//_this.getCalendarAllDaysNumber(this.calendarListArr)
			var today = todayDate();
			//_this.choosenTD = todayDate();
			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td").removeClass("today"); 
			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+today+"']").addClass("today");
			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+_this.choosenTD+"']").addClass("choosen");
			$(_this.divClassMyCal+" .mycalendar.mymonthcalendar").show();
			/*
			$(".mycalendar table tbody tr td").removeClass("active");
			$(".mycalendar table tbody tr td").attr("data-date", "");
			$(".mycalendar table tbody tr td").find(".events-on-day").text("");
			//_this.defaultView

			_this.beginDate = $(_this.divIdCal).fullCalendar('getView').start.format("YYYY-MM-DD");
			_this.endDate = $(_this.divIdCal).fullCalendar('getView').end.format("YYYY-MM-DD");
			//alert(_this.beginDate+"|"+_this.endDate+"|"+hallArr.length);
			//alert(hallArr[0].id);
			//var activeHallButton = _this.divClassMyCal+" .switch-halls-mycalendar .switch-btn.active";
			if(_this.hall == null){ _this.hall = hallArr[0].id; }
			//console.log(_this.hall);
			_this.calendarUrl = "https://instasport.co/club/"+clubName+"/api/schedule/dates/"+_this.beginDate+"/"+_this.endDate+"/hall/"+_this.hall+"/?format=json";
			//alert(_this.calendarUrl);
			_this.getCalendarList();
			//console.log(_this.calendarListArr);
			
			var result = $.grep(_this.calendarListArr, function(e){
				//var patt = new RegExp("/[\d]{4}-[\d]{2}-[\d]{2}$/");
				//var res = patt.test(e.start);
				
				var date = e.start.split("T")[0];
				if(date == "2017-09-22"){
					return true;
				}else{
					return false;
				}
				
				//console.log(e.start);
				//console.log(res);
				//return res;
				//return e.hall == 95; 
			});
			console.log(result);
			//var str = "The best things in life are free";
			//var patt = new RegExp("/[\d]{4}-[\d]{2}-[\d]{2}/");
			//var res = patt.test(str);
			*/
			//alert(1);
		}



		this.constructMyCalendarWeek = function(){
			var _this = this;


			_this.getTrainsList();
			_this.getCouchList();
			//_this.beginDate
			//_this.endDate

			monthBeginDate = $(_this.divIdCal).fullCalendar('getView').start.format("M");
			monthEndDate = $(_this.divIdCal).fullCalendar('getView').end.format("M");

			dayBeginDate = $(_this.divIdCal).fullCalendar('getView').start.format("D");
			dayEndDate = $(_this.divIdCal).fullCalendar('getView').end.format("D");


			var nameMonthBeginDate = null;
			var nameMonthEndDate = null;

  			if(monthBeginDate == 1){nameMonthBeginDate = "январь";}
  			if(monthBeginDate == 2){nameMonthBeginDate = "февраль";}
  			if(monthBeginDate == 3){nameMonthBeginDate = "март";}
  			if(monthBeginDate == 4){nameMonthBeginDate = "апрель";}
  			if(monthBeginDate == 5){nameMonthBeginDate = "май";}
  			if(monthBeginDate == 6){nameMonthBeginDate = "июнь";}
  			if(monthBeginDate == 7){nameMonthBeginDate = "июль";}
  			if(monthBeginDate == 8){nameMonthBeginDate = "август";}
  			if(monthBeginDate == 9){nameMonthBeginDate = "сентябрь";}
  			if(monthBeginDate == 10){nameMonthBeginDate = "октябрь";}
  			if(monthBeginDate == 11){nameMonthBeginDate = "ноябрь";}
  			if(monthBeginDate == 12){nameMonthBeginDate = "декабрь";}

  			if(monthEndDate == 1){nameMonthEndDate = "январь";} 
  			if(monthEndDate == 2){nameMonthEndDate = "февраль";}
  			if(monthEndDate == 3){nameMonthEndDate = "март";}
  			if(monthEndDate == 4){nameMonthEndDate = "апрель";}
  			if(monthEndDate == 5){nameMonthEndDate = "май";}
  			if(monthEndDate == 6){nameMonthEndDate = "июнь";}
  			if(monthEndDate == 7){nameMonthEndDate = "июль";}
  			if(monthEndDate == 8){nameMonthEndDate = "август";}
  			if(monthEndDate == 9){nameMonthEndDate = "сентябрь";}
  			if(monthEndDate == 10){nameMonthEndDate = "октябрь";}
  			if(monthEndDate == 11){nameMonthEndDate = "ноябрь";}
  			if(monthEndDate == 12){nameMonthEndDate = "декабрь";}

			//var monthBeginDate = _this.beginDate.split("-")[1];
			//var monthEndDate = _this.endDate.split("-")[1];
			//console.log(monthBeginDate+" | "+monthEndDate);
			var titleCalendar = null;
			if(monthBeginDate == monthEndDate){
				titleCalendar = dayBeginDate+" - "+(dayEndDate-1)+" "+nameMonthBeginDate;
			}else{
				if(dayEndDate == 1){
					dayEndDate = parseInt(dayBeginDate, 10) + 6;
					titleCalendar = dayBeginDate+" - "+dayEndDate+" "+nameMonthBeginDate;
				}else{
					titleCalendar = dayBeginDate+" "+nameMonthBeginDate+" - "+(dayEndDate-1)+" "+nameMonthEndDate;
				}
			}

			//console.log(titleCalendar);
			//var titleCalendar = nameCurrentMonth+" "+currentYear;
  			$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .calendar-title .today").text(titleCalendar);


			$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody").text("");

			if(_this.divIdCal == "#calendar-desktop"){

				$(_this.divClassMyCal+" .switch-type-mycalendars span").removeClass("active");
				$(_this.divClassMyCal+" .switch-type-mycalendars span.week").addClass("active");

				
				var hallOpen = _this.hallOpen;
				var hallClose = _this.hallClose;

				//console.log(hallOpen+" - "+hallClose); 

				var beginTime = parseInt(hallOpen.split(":")[0], 10);
				var endTime = parseInt(hallClose.split(":")[0], 10);


				var bDate = _this.beginDate.split("-")[1]+"/"+_this.beginDate.split("-")[2]+"/"+_this.beginDate.split("-")[0];
				var eDate = _this.endDate.split("-")[1]+"/"+_this.endDate.split("-")[2]+"/"+_this.endDate.split("-")[0];

				var dateObjectBegin = new Date(bDate);
				var beginDayTimestamp =  dateObjectBegin.getTime();
				//alert(dateObjectEnd.getDate());

				//var dateObject = new Date(bDate);
				//alert(new Date(dateObject.getTime() + (10 * 24 * 60 * 60 * 1000))); 

				//monday
				var dateObjectMon = new Date(beginDayTimestamp);
				var mondayDateDay = dateObjectMon.getDate();
				if(mondayDateDay < 10){mondayDateDay = "0"+mondayDateDay;}
				var mondayDateMonth = dateObjectMon.getMonth() + 1;
				if(mondayDateMonth < 10){mondayDateMonth = "0"+mondayDateMonth;}
				var mondayDate = dateObjectMon.getFullYear()+"-"+mondayDateMonth+"-"+mondayDateDay;

				var dateObjectTue = new Date(beginDayTimestamp + (1 * 24 * 60 * 60 * 1000));
				var tuesdayDateDay = dateObjectTue.getDate();
				if(tuesdayDateDay < 10){tuesdayDateDay = "0"+tuesdayDateDay;}
				var tuesdayDateMonth = dateObjectTue.getMonth() + 1;
				if(tuesdayDateMonth < 10){tuesdayDateMonth = "0"+tuesdayDateMonth;}
				var tuesdayDate = dateObjectTue.getFullYear()+"-"+tuesdayDateMonth+"-"+tuesdayDateDay;
				
				var dateObjectWed = new Date(beginDayTimestamp + (2 * 24 * 60 * 60 * 1000));
				var wednesdayDateDay = dateObjectWed.getDate();
				if(wednesdayDateDay < 10){wednesdayDateDay = "0"+wednesdayDateDay;}
				var wednesdayDateMonth = dateObjectWed.getMonth() + 1;
				if(wednesdayDateMonth < 10){wednesdayDateMonth = "0"+wednesdayDateMonth;}
				var wednesdayDate = dateObjectWed.getFullYear()+"-"+wednesdayDateMonth+"-"+wednesdayDateDay;
				
				var dateObjectThur = new Date(beginDayTimestamp + (3 * 24 * 60 * 60 * 1000));
				var thursdayDateDay = dateObjectThur.getDate();
				if(thursdayDateDay < 10){thursdayDateDay = "0"+thursdayDateDay;}
				var thursdayDateMonth = dateObjectThur.getMonth() + 1;
				if(thursdayDateMonth < 10){thursdayDateMonth = "0"+thursdayDateMonth;}
				var thursdayDate = dateObjectThur.getFullYear()+"-"+thursdayDateMonth+"-"+thursdayDateDay;

				var dateObjectFri = new Date(beginDayTimestamp + (4 * 24 * 60 * 60 * 1000));
				var fridayDateDay = dateObjectFri.getDate();
				if(fridayDateDay < 10){fridayDateDay = "0"+fridayDateDay;}
				var fridayDateMonth = dateObjectFri.getMonth() + 1;
				if(fridayDateMonth < 10){fridayDateMonth = "0"+fridayDateMonth;}
				var fridayDate = dateObjectFri.getFullYear()+"-"+fridayDateMonth+"-"+fridayDateDay;

				var dateObjectSat = new Date(beginDayTimestamp + (5 * 24 * 60 * 60 * 1000));
				var saturdayDateDay = dateObjectSat.getDate();
				if(saturdayDateDay < 10){saturdayDateDay = "0"+saturdayDateDay;}
				var saturdayDateMonth = dateObjectSat.getMonth() + 1;
				if(saturdayDateMonth < 10){saturdayDateMonth = "0"+saturdayDateMonth;}
				var saturdayDate = dateObjectSat.getFullYear()+"-"+saturdayDateMonth+"-"+saturdayDateDay;

				var dateObjectSun = new Date(beginDayTimestamp + (6 * 24 * 60 * 60 * 1000));
				var sundayDateDay = dateObjectSun.getDate();
				if(sundayDateDay < 10){sundayDateDay = "0"+sundayDateDay;}
				var sundayDateMonth = dateObjectSun.getMonth() + 1;
				if(sundayDateMonth < 10){sundayDateMonth = "0"+sundayDateMonth;}
				var sundayDate = dateObjectSun.getFullYear()+"-"+sundayDateMonth+"-"+sundayDateDay;


				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .mondayName .date").text(parseInt(mondayDate.split("-")[2], 10)+"."+mondayDate.split("-")[1]+"."+mondayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .tuesdayName .date").text(parseInt(tuesdayDate.split("-")[2], 10)+"."+tuesdayDate.split("-")[1]+"."+tuesdayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .wednesdayName .date").text(parseInt(wednesdayDate.split("-")[2], 10)+"."+wednesdayDate.split("-")[1]+"."+wednesdayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .thursdayName .date").text(parseInt(thursdayDate.split("-")[2], 10)+"."+thursdayDate.split("-")[1]+"."+thursdayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .fridayName .date").text(parseInt(fridayDate.split("-")[2], 10)+"."+fridayDate.split("-")[1]+"."+fridayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .saturdayName .date").text(parseInt(saturdayDate.split("-")[2], 10)+"."+saturdayDate.split("-")[1]+"."+saturdayDate.split("-")[0]);
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table thead .sundayName .date").text(parseInt(sundayDate.split("-")[2], 10)+"."+sundayDate.split("-")[1]+"."+sundayDate.split("-")[0]);
				/*
				console.log("\n monday - "+mondayDate
								+"\n tuesday - "+tuesdayDate
								+"\n wednesday - "+wednesdayDate
								+"\n thursday - "+thursdayDate
								+"\n friday - "+fridayDate
								+"\n saturday - "+saturdayDate
								+"\n sunday - "+sundayDate); 
				return false;*/
				
				for(i=beginTime; i<=endTime; i++){
					var timeLine = i;

					if(i<10){var timeLine = "0"+i;}
					//console.log(timeLine);
					$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody").append('<tr class="time-line" data-time="'+timeLine+'">'
						+'<td class="time">'
						+timeLine
						+'</td>'
						+'<td class="monday" data-day-week="Понедельник" data-time-event="'+timeLine+'" data-date-event="'+mondayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="tuesday" data-day-week="Вторник" data-time-event="'+timeLine+'" data-date-event="'+tuesdayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="wednesday" data-day-week="Среда" data-time-event="'+timeLine+'" data-date-event="'+wednesdayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="thursday" data-day-week="Четверг" data-time-event="'+timeLine+'" data-date-event="'+thursdayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="friday" data-day-week="Пятница" data-time-event="'+timeLine+'" data-date-event="'+fridayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="saturday" data-day-week="Суббота" data-time-event="'+timeLine+'" data-date-event="'+saturdayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'<td class="sunday" data-day-week="Воскресенье" data-time-event="'+timeLine+'" data-date-event="'+sundayDate+'">'
							+'<div class="events"></div>'
						+'</td>'
						+'</tr>');
				}

				//console.log(_this.calendarListArr.length);
				//console.log(_this.calendarListArr);
				

				_this.calendarListArr.forEach(function(item, index){
					//console.log(item.start);
					//if(k > 2){return false;}
					//var time = $(this).attr("data-time");

					/*if(_this.choosenTrain != null && _this.choosenTrain != item.title){
						return false;
					}*/

					if((_this.choosenTrain != null && _this.choosenTrain != item.title)
						|| (_this.choosenCouch != null && _this.choosenCouch != item.instructor[0])){
						return false;
					}

					var duration = item.duration;
					var seats = item.seats;
					//var seats = 2;
					var url = item.url;
					var id = item.id;
					var hall = item.hall;
					var title = item.title;
					var template = item.template;
					var timeBegin = item.date.split("T")[1].split("+")[0];

					var colorApi = item.color; //currentValue.color
					var backgroundColorApi = item.background; //currentValue.background_color

					var messageSeats = "";
					if(parseInt(seats, 10) == 0){messageSeats = "нет мест";}
					if(parseInt(seats, 10) == 1){messageSeats = "осталось 1 место";}
					if(parseInt(seats, 10) == 2){messageSeats = "осталось 2 места";}

					var endTime1 = duration.split(":")[0];
					var endTime2 = duration.split(":")[1];
								if(endTime1 == "00"){
									//endTime1 = "";
									endTime2 = ":"+endTime2;
								}else{
									if(endTime2 == "00"){
										endTime2 = ":00";
										
									}else{
										endTime2 = parseInt(endTime2, 10);
										endTime2 = ":"+endTime2;
									}
									endTime1 = parseInt(endTime1, 10);
									if(endTime1 == 1){
										//endTime1 = endTime1+" час";
									}else if(endTime1 > 1){
										//endTime1 = endTime1+" часа";
									}
								}

					var date = item.date.split("T")[0];
					var time = item.date.split("T")[1].split(":")[0];
					var lengthEvents = $(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find(".events")
								.find(".item-event").length;

					var desktopWeekQuantityTrainings = $("#desktop-week-quantity-trainings").text();
					if(lengthEvents < desktopWeekQuantityTrainings){

						//code for checking if we need to show additional information
						//as DURATION and SEATS
						var addDuration = ""; 
						var addSeats = "";
						var flagAddInfoDuration = $("#desktop-week-duration").text();
						var flagAddInfoSeats = $("#desktop-week-seats").text();
						if(flagAddInfoDuration == 1){
							addDuration = "<div class='item-event-duration'>"+endTime1+endTime2+"</div>";
							//addSeats = "<div class='item-event-seats'>"+messageSeats+"</div>";
						}
						if(flagAddInfoSeats == 1){
							//addDuration = "<div class='item-event-duration'>"+endTime1+endTime2+"</div>";
							addSeats = "<div class='item-event-seats'>"+messageSeats+"</div>";
						}


						$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find(".events")
								.append("<table class='item-event' data-id='"+id+"'><tr>"
									+"<td>"
										+"<div>"+timeBegin.split(":")[0]+"."+timeBegin.split(":")[1]+"</div>"
										+addDuration
									+"</td>"
									+"<td>"
										+"<div class='item-event-title'>"
											+"<div class='textt'>"+item.title+"</div>"
											+"<div class='three-dot'>...</div>"
											+"<a class='eventItem' target='_blank' "
											+"data-time='"+timeBegin+"' "
											+"data-id='"+id+"' "
											+"data-title='"+title+"' "
											+"data-hall='"+hall+"' "
											+"data-date='"+date+"' "
											+"data-template='"+template+"' "
											+"href='"+url+"'></a>"
											//+"<a target='_blank' href='"+url+"'></a>"
										+"</div>"
										+addSeats
									+"</td>"
									+"</tr></table>");

						//Set colors from Api if useApiColors is enabled
						if(_this.useApiColors == 1){
							//var colorApi = "yellow"; //currentValue.color
							//var backgroundColorApi = "pink"; //currentValue.background_color

							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find("table[data-id='"+id+"']")
								.css({"background-color":backgroundColorApi})
								.css({"color":colorApi});

							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find("table[data-id='"+id+"']")
								.find("div.three-dot")
								.css({"background-color":backgroundColorApi})
								.css({"color":colorApi});

						}

					}else{
						var lengthMoreEvents = $(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find(".events")
								.find(".more-items").length;
						if(lengthMoreEvents == 0){
							var desktopWeekMoreText = $("#desktop-week-more-text").text();
							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find(".events")
								.append("<a data-date='"+date+"' data-time='"+time+"' data-type-calendar='week' class='more-items' href='#'>"+desktopWeekMoreText+"</a>");


						}
					}


					
				});


				if($("#desktop-week-hide-empty-rows").text() == 0){
					$(_this.divClassMyCal+" .mycalendar.myweekcalendar>table>tbody>tr").each(function(){
						var _thisss = $(this);
						//_thisss.css({"background-color":"red"});
						var flagWithEvents = "empty";
						$(this).find("td").each(function(){
							var events = $(this).find(".events").find("div");
							//console.log(events.length);
							if(events.length != 0){
								flagWithEvents = "notempty";
								return false;
							}
						});
						if(flagWithEvents == "empty"){
							_thisss.hide();
						}
					});
				}

				

				$(_this.divClassMyCal+" .mycalendar.myweekcalendar").show();

				
							$(_this.divClassMyCal+" table.item-event .item-event-title").hover(function(){ 
								

								if($(this).find(".three-dot").is(':visible')){
									$(this).addClass("with-dots");
								}

								//if($(this).find(".three-dot").is(':visible')){
									$(this).addClass("hover");
									var widthText = parseInt($(this).find(".textt").css("width"), 10);
									$(this).closest("td").css({"padding-top":"21px"});
									$(this).css({"position":"absolute",
													"margin-top":"-26px",
													"margin-left":"-6px",
													"height":"28px",
													"line-height":"28px",
													"display":"block",
													"background-color":"#f1f1f1",
													"z-index":"100",
													"text-align":"center",
													"border":"1px solid #999",
													"border-radius":"6px",
													"width":(widthText+10)+"px",
													"min-width": "80px"});
									$(this).find(".three-dot").css({"display":"none"});
									$(this).find(".textt").css({"position":"absolute",
																"left":"5px",});
								//} 
							}, function(){
								if($(this).hasClass("hover")){
									if($(this).hasClass("with-dots")){
										$(this).find(".three-dot").css({"display":"block"});
									}
									$(this).closest("td").attr("style","");
									$(this).attr("style","");
									$(this).find(".textt").attr("style","");
									$(this).removeClass("hover");
								}
							});
							

							var today = todayDate();
							//_this.choosenTD = todayDate();
							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").removeClass("today"); 
							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td[data-date-event='"+today+"']").addClass("today");


							$(_this.divClassMyCal+" table.item-event").each(function(){
								var widthBlock = parseInt($(this).find(".item-event-title")
																	.css("width"), 10);
								var widthText = parseInt($(this).find(".item-event-title")
																.find(".textt")
																.css("width"), 10);
								//alert(widthBlock+" - "+widthText);
								if(widthBlock < widthText){
									$(this).find(".three-dot").show();
								}
							});

				

			}else if(_this.divIdCal == "#calendar-mobile"){

				var hallOpen = _this.hallOpen;
				var hallClose = _this.hallClose;

				//console.log(hallOpen+" - "+hallClose); 

				var beginTime = parseInt(hallOpen.split(":")[0], 10);
				var endTime = parseInt(hallClose.split(":")[0], 10);


				var bDate = _this.beginDate.split("-")[1]+"/"+_this.beginDate.split("-")[2]+"/"+_this.beginDate.split("-")[0];
				var eDate = _this.endDate.split("-")[1]+"/"+_this.endDate.split("-")[2]+"/"+_this.endDate.split("-")[0];

				var dateObjectBegin = new Date(bDate);
				var beginDayTimestamp =  dateObjectBegin.getTime();
				//alert(dateObjectEnd.getDate());

				//var dateObject = new Date(bDate);
				//alert(new Date(dateObject.getTime() + (10 * 24 * 60 * 60 * 1000))); 

				//monday
				var dateObjectMon = new Date(beginDayTimestamp);
				var mondayDateDay = dateObjectMon.getDate();
				if(mondayDateDay < 10){mondayDateDay = "0"+mondayDateDay;}
				var mondayDateMonth = dateObjectMon.getMonth() + 1;
				if(mondayDateMonth < 10){mondayDateMonth = "0"+mondayDateMonth;}
				var mondayDate = dateObjectMon.getFullYear()+"-"+mondayDateMonth+"-"+mondayDateDay;

				var dateObjectTue = new Date(beginDayTimestamp + (1 * 24 * 60 * 60 * 1000));
				var tuesdayDateDay = dateObjectTue.getDate();
				if(tuesdayDateDay < 10){tuesdayDateDay = "0"+tuesdayDateDay;}
				var tuesdayDateMonth = dateObjectTue.getMonth() + 1;
				if(tuesdayDateMonth < 10){tuesdayDateMonth = "0"+tuesdayDateMonth;}
				var tuesdayDate = dateObjectTue.getFullYear()+"-"+tuesdayDateMonth+"-"+tuesdayDateDay;
				
				var dateObjectWed = new Date(beginDayTimestamp + (2 * 24 * 60 * 60 * 1000));
				var wednesdayDateDay = dateObjectWed.getDate();
				if(wednesdayDateDay < 10){wednesdayDateDay = "0"+wednesdayDateDay;}
				var wednesdayDateMonth = dateObjectWed.getMonth() + 1;
				if(wednesdayDateMonth < 10){wednesdayDateMonth = "0"+wednesdayDateMonth;}
				var wednesdayDate = dateObjectWed.getFullYear()+"-"+wednesdayDateMonth+"-"+wednesdayDateDay;
				
				var dateObjectThur = new Date(beginDayTimestamp + (3 * 24 * 60 * 60 * 1000));
				var thursdayDateDay = dateObjectThur.getDate();
				if(thursdayDateDay < 10){thursdayDateDay = "0"+thursdayDateDay;}
				var thursdayDateMonth = dateObjectThur.getMonth() + 1;
				if(thursdayDateMonth < 10){thursdayDateMonth = "0"+thursdayDateMonth;}
				var thursdayDate = dateObjectThur.getFullYear()+"-"+thursdayDateMonth+"-"+thursdayDateDay;

				var dateObjectFri = new Date(beginDayTimestamp + (4 * 24 * 60 * 60 * 1000));
				var fridayDateDay = dateObjectFri.getDate();
				if(fridayDateDay < 10){fridayDateDay = "0"+fridayDateDay;}
				var fridayDateMonth = dateObjectFri.getMonth() + 1;
				if(fridayDateMonth < 10){fridayDateMonth = "0"+fridayDateMonth;}
				var fridayDate = dateObjectFri.getFullYear()+"-"+fridayDateMonth+"-"+fridayDateDay;

				var dateObjectSat = new Date(beginDayTimestamp + (5 * 24 * 60 * 60 * 1000));
				var saturdayDateDay = dateObjectSat.getDate();
				if(saturdayDateDay < 10){saturdayDateDay = "0"+saturdayDateDay;}
				var saturdayDateMonth = dateObjectSat.getMonth() + 1;
				if(saturdayDateMonth < 10){saturdayDateMonth = "0"+saturdayDateMonth;}
				var saturdayDate = dateObjectSat.getFullYear()+"-"+saturdayDateMonth+"-"+saturdayDateDay;

				var dateObjectSun = new Date(beginDayTimestamp + (6 * 24 * 60 * 60 * 1000));
				var sundayDateDay = dateObjectSun.getDate();
				if(sundayDateDay < 10){sundayDateDay = "0"+sundayDateDay;}
				var sundayDateMonth = dateObjectSun.getMonth() + 1;
				if(sundayDateMonth < 10){sundayDateMonth = "0"+sundayDateMonth;}
				var sundayDate = dateObjectSun.getFullYear()+"-"+sundayDateMonth+"-"+sundayDateDay;

				/*
				console.log("\n monday - "+mondayDate
								+"\n tuesday - "+tuesdayDate
								+"\n wednesday - "+wednesdayDate
								+"\n thursday - "+thursdayDate
								+"\n friday - "+fridayDate
								+"\n saturday - "+saturdayDate
								+"\n sunday - "+sundayDate); 
				return false;*/
				
				for(i=beginTime; i<=endTime; i++){
					var timeLine = i;

					if(i<10){var timeLine = "0"+i;}
					//console.log(timeLine);
					$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody").append('<tr class="time-line" data-time="'+timeLine+'">'
						+'<td class="time">'
						+timeLine
						+'</td>'
						+'<td class="monday" data-day-week="Понедельник" data-time-event="'+timeLine+'" data-date-event="'+mondayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'<td class="tuesday" data-day-week="Вторник" data-time-event="'+timeLine+'" data-date-event="'+tuesdayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'<td class="wednesday" data-day-week="Среда" data-time-event="'+timeLine+'" data-date-event="'+wednesdayDate+'">'
							+'<a class="circle"></a>' 
						+'</td>'
						+'<td class="thursday" data-day-week="Четверг" data-time-event="'+timeLine+'" data-date-event="'+thursdayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'<td class="friday" data-day-week="Пятница" data-time-event="'+timeLine+'" data-date-event="'+fridayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'<td class="saturday" data-day-week="Суббота" data-time-event="'+timeLine+'" data-date-event="'+saturdayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'<td class="sunday" data-day-week="Воскресенье" data-time-event="'+timeLine+'" data-date-event="'+sundayDate+'">'
							+'<a class="circle"></a>'
						+'</td>'
						+'</tr>');
				}

				//$(_this.divClassMyCal+" .mycalendar.myweekcalendar").show();
				//return false;
				//console.log(_this.calendarListArr.length);
				//console.log(_this.calendarListArr);
				_this.calendarListArr.forEach(function(item, index){
					//console.log(item.start);
					var date = item.start.split("T")[0];
					var time = item.start.split("T")[1].split(":")[0];
					var backgroundColorApi = item.background;
					var colorApi = item.color;

					if(!$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
									.find("td[data-date-event='"+date+"']")
									.hasClass("active")){
						$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
										.find("td[data-date-event='"+date+"']")
										.addClass("active");

						if(_this.useMobileApiColors == 1){
							//var colorApi = "yellow"; //currentValue.color
							//var backgroundColorApi = "pink"; //currentValue.background_color

							$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']")
								.find("td[data-date-event='"+date+"']")
								.find(".circle")
								.css({"background-color":backgroundColorApi})
								.css({"color":colorApi});

						}
					}
				});









				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").on("click",".circle", function(e){
					e.preventDefault();
					$("#events-on-day").text("");
					$("#calendarModal .modal-body").text("");
					//var inplace = $(".inplace").text();
					$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").removeClass("choosen");
					$(this).closest("td").addClass("choosen");
					//var inplace = $(".inplace").text();
					//var inplace = "true";
					//var dateChoosen = $(this).closest("td.day").attr("data-date");
					//_this.choosenTD = dateChoosen;
					var inplace = $("#mobile-week-inplace").text();
					//var inplace = "false";
					var dateChoosen = $(this).closest("td").attr("data-date-event");
					_this.choosenTD = dateChoosen;
					var timeChoosen = $(this).closest("td").attr("data-time-event");
					_this.choosenTimeTD = timeChoosen;
					//console.log(date);
					//alert(123123);
					//return false;
					_this.calendarListArr.forEach(function(item, index){
						//console.log(item.start);
						var date = item.start.split("T")[0];
						var time = item.start.split("T")[1].split(":")[0];
						var backgroundColorApi = item.background;
						
						if(date == dateChoosen && time == timeChoosen){

							var time = item.start.split("T")[1].split("+")[0];
							var duration = item.duration;
							var seats = item.seats;
							//var seats = 2;
							var url = item.url;
							var title = item.title;


							var id = item.id;
							var hall = item.hall;
							var template = item.template;
							//var url = currentValue.url;
							//var title = currentValue.title;
							var timeBegin = item.start.split("T")[1].split("+")[0];
							var date = item.start.split("T")[0];


							var messageSeats = "";
							if(parseInt(seats, 10) == 0){messageSeats = "нет мест";}
							if(parseInt(seats, 10) == 1){messageSeats = "осталось 1 место";}
							if(parseInt(seats, 10) == 2){messageSeats = "осталось 2 места";}
							/*$("#calendarModal .modal-body").append("<table>"
								+"<tr>"
								+"<td>"
								+time.split(":")[0]+"."+time.split(":")[1] 
								+"</td>"
								+"<td>"
								+"<a target='_blank' href='"+url+"'>"+title+"</a>"
								+"</td>"
								+"</tr>"
								+"</table>");*/

							var endTime1 = duration.split(":")[0];
							var endTime2 = duration.split(":")[1];
							if(endTime1 == "00"){
								endTime1 = "";
								endTime2 = endTime2+" мин.";
							}else{
								if(endTime2 == "00"){
									endTime2 = "";
									
								}else{
									endTime2 = parseInt(endTime2, 10);
									endTime2 = " "+endTime2+" мин.";
								}
								endTime1 = parseInt(endTime1, 10);
								if(endTime1 == 1){
									endTime1 = endTime1+" час";
								}else if(endTime1 > 1){
									endTime1 = endTime1+" часа";
								}
							}


							var AIDuration = "";
							var AISeats = "";
							var addInfoDuration = $("#mobile-week-duration").text();
							var addInfoSeats = $("#mobile-week-seats").text();

							if(addInfoDuration == 1){
								AIDuration = "<span>"+endTime1+endTime2+"</span>";
							}
							if(addInfoSeats == 1){
								AISeats = "<span>"+messageSeats+"</span>";
							}


							if(inplace == "true"){
								//alert(1);
								var month_int = parseInt(dateChoosen.split("-")[1], 10);
								var nameCurrentMonth = null;
								if(month_int == 1){nameCurrentMonth = "январь";}
					  			if(month_int == 2){nameCurrentMonth = "февраль";}
					  			if(month_int == 3){nameCurrentMonth = "март";}
					  			if(month_int == 4){nameCurrentMonth = "апрель";}
					  			if(month_int == 5){nameCurrentMonth = "май";}
					  			if(month_int == 6){nameCurrentMonth = "июнь";}
					  			if(month_int == 7){nameCurrentMonth = "июль";}
					  			if(month_int == 8){nameCurrentMonth = "август";}
					  			if(month_int == 9){nameCurrentMonth = "сентябрь";}
					  			if(month_int == 10){nameCurrentMonth = "октябрь";}
					  			if(month_int == 11){nameCurrentMonth = "ноябрь";}
					  			if(month_int == 12){nameCurrentMonth = "декабрь";}
					  			var titleModal = dateChoosen.split("-")[2]+" "+nameCurrentMonth+" "+dateChoosen.split("-")[0]
								$("#calendarModal .modal-header .title").text(titleModal);
								$("#calendarModal .modal-body").append("<table>"
									+"<tr>"
									+"<td>"
									+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
									//+"<span>"+endTime1+endTime2+"</span>"
									+AIDuration 
									+"</td>"
									+"<td class='color-line' style='background-color: "+backgroundColorApi+";'><div></div><div></div></td>"
									+"<td>"
									+"<a class='eventItem' target='_blank' "
									+"data-time='"+timeBegin+"' "
									+"data-id='"+id+"' "
									+"data-title='"+title+"' "
									+"data-hall='"+hall+"' "
									+"data-date='"+date+"' "
									+"data-template='"+template+"' "
									+"href='"+url+"'>"+title+"</a><br/>"
									//+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
									//+"<span>"+messageSeats+"</span>"
									+AISeats
									+"</td>"
									+"</tr>"
									+"</table>");


								$("#calendarModal").css({"display":"block"});

							}else{
								$("#events-on-day").append("<table>"
									+"<tr>"
									+"<td>"
									+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
									//+"<span>"+endTime1+endTime2+"</span>" 
									+AIDuration 
									+"</td>"
									+"<td class='color-line' style='background-color: "+backgroundColorApi+";'><div></div><div></div></td>"
									+"<td>"
									+"<a class='eventItem' target='_blank' "
									+"data-time='"+timeBegin+"' "
									+"data-id='"+id+"' "
									+"data-title='"+title+"' "
									+"data-hall='"+hall+"' "
									+"data-date='"+date+"' "
									+"data-template='"+template+"' "
									+"href='"+url+"'>"+title+"</a><br/>"
									//+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
									//+"<span>"+messageSeats+"</span>"
									+AISeats
									+"</td>"
									+"</tr>"
									+"</table>");
							}
						}
					});
				});

				
				var today = todayDate();
				//_this.choosenTD = todayDate();
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td").removeClass("today"); 
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr td[data-date-event='"+today+"']").addClass("today");
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr[data-time='"+_this.choosenTimeTD+"']")
										.find("td[data-date-event='"+_this.choosenTD+"']")
										.addClass("choosen");


				$(_this.divClassMyCal+" .mycalendar.myweekcalendar").show();
				return false;

				var i = 0;
				$(_this.divClassMyCal+" .mycalendar.myweekcalendar table tbody tr").each(function(){
					//console.log(data[i]['date']);
					$(this).find("td").each(function(){

						//console.log(1);
						//return false;
						//var _this2 = this;

						//$(this).find(".day-number").text(parseInt(arrDate[i][0].number, 10)); 
						//$(this).attr("data-date", arrDate[i][0].date);
						//$(this).attr("data-day-number", arrDate[i][0].number);
						var dayDate = $(this).attr("data-date-event");
						var dayTime = $(this).attr("data-time-event");
						var result = $.grep(_this.calendarListArr, function(e){
							//var patt = new RegExp("/[\d]{4}-[\d]{2}-[\d]{2}$/");
							//var res = patt.test(e.start);
							
							var date = e.start.split("T")[0];
							if(date == arrDate[i][0].date){
								//console.log(e.start);
								return true;
							}else{
								return false;
							}
							
							//console.log(e.start);
							//console.log(res);
							//return res;
							//return e.hall == 95; 
						});

						//if(i == 0){
						
						result.forEach(function(currentValue, index, arr){
							//_this2.find(".events").append(currentValue.title);
							//_this2.css({"color":"red"});
							var dateEvent = currentValue.start.split("T")[0];
							var startEvent = (currentValue.start.split("T")[1]).split("+")[0];
							var endEvent = (currentValue.end.split("T")[1]).split("+")[0];
							$(_this.divClassMyCal+" .mycalendar.mymonthcalendar table tbody tr td[data-date='"+arrDate[i][0].date+"']")
										.find(".hide-events")
										.append("<div class='hide-event' "
											+"data-id='"+currentValue.id+"' "
											+"data-hall='"+currentValue.hall+"' "
											+"data-seats='"+currentValue.seats+"' "
											+"data-start='"+startEvent+"' "
											+"data-end='"+endEvent+"' "
											+"data-date='"+dateEvent+"' "
											+"data-duration='"+currentValue.duration+"' "
											+"data-url='"+currentValue.url+"' "
											+">"
											+currentValue.title
											+"</div>");
							//console.log(currentValue.title);
						});
						//}

						//console.log(result);
						 
						//var quantity = jQuery("#calendar-data div[data-date="+data[i]['date']+"][data-hall="+hallID+"]").length;
						/*if(quantity > 0){
							var date = data[i]['date'];
							
							jQuery(this).addClass("active").attr("data-date", date).attr("data-day-number", data[i]['day-number']);
							jQuery(this).find(".day-number").text(data[i]['day-number']);
							jQuery("#calendar-data div[data-date="+data[i]['date']+"][data-hall="+hallID+"]").each(function(){
								var time = jQuery(this).attr("data-time");
								var url = jQuery(this).attr("data-url");
								var title = jQuery(this).text();
								//var 
								
								//$(this).find(".day-number")

									jQuery(".mycalendar table tbody tr td[data-date="+date+"]").find(".events-on-day").append('<div class="event-on-day">'
										+'<a target="_blank" href="'+url+'">'
										+'<span class="time">'+time.split(":")[0]+'.'+time.split(":")[1]+'</span><br/>'
										+'<span class="title">'+title+'</span>'
										+'</a>'
										+'</div>');

								
							});
						}else{
							var date = data[i]['date'];
							jQuery(this).attr("data-date", date).find(".day-number").text(data[i]['day-number']);
						}*/
						
						
						i++;
					});
				});


			}
			$(_this.divClassMyCal+" .mycalendar.myweekcalendar").show();
			/*
			$(".mycalendar table tbody tr td").removeClass("active");
			$(".mycalendar table tbody tr td").attr("data-date", "");
			$(".mycalendar table tbody tr td").find(".events-on-day").text("");
			//_this.defaultView

			_this.beginDate = $(_this.divIdCal).fullCalendar('getView').start.format("YYYY-MM-DD");
			_this.endDate = $(_this.divIdCal).fullCalendar('getView').end.format("YYYY-MM-DD");
			//alert(_this.beginDate+"|"+_this.endDate+"|"+hallArr.length);
			//alert(hallArr[0].id);
			//var activeHallButton = _this.divClassMyCal+" .switch-halls-mycalendar .switch-btn.active";
			if(_this.hall == null){ _this.hall = hallArr[0].id; }
			//console.log(_this.hall);
			_this.calendarUrl = "https://instasport.co/club/"+clubName+"/api/schedule/dates/"+_this.beginDate+"/"+_this.endDate+"/hall/"+_this.hall+"/?format=json";
			//alert(_this.calendarUrl);
			_this.getCalendarList();
			//console.log(_this.calendarListArr);
			
			var result = $.grep(_this.calendarListArr, function(e){
				//var patt = new RegExp("/[\d]{4}-[\d]{2}-[\d]{2}$/");
				//var res = patt.test(e.start);
				
				var date = e.start.split("T")[0];
				if(date == "2017-09-22"){
					return true;
				}else{
					return false;
				}
				
				//console.log(e.start);
				//console.log(res);
				//return res;
				//return e.hall == 95; 
			});
			console.log(result);
			//var str = "The best things in life are free";
			//var patt = new RegExp("/[\d]{4}-[\d]{2}-[\d]{2}/");
			//var res = patt.test(str);
			*/
		}



		this.getCalendarAllDaysNumber = function(){
			var _this = this;
			_this.calendarDaysNumber = [];
			
			//_this.beginDate = $(_this.divIdCal).fullCalendar('getView').start.format("YYYY-MM-DD");
			//_this.endDate = $(_this.divIdCal).fullCalendar('getView').end.format("YYYY-MM-DD");

			var bDate = _this.beginDate.split("-")[1]+"/"+_this.beginDate.split("-")[2]+"/"+_this.beginDate.split("-")[0];
			var eDate = _this.endDate.split("-")[1]+"/"+_this.endDate.split("-")[2]+"/"+_this.endDate.split("-")[0];									Date.prototype.addDays = function(days) {		       var dat = new Date(this.valueOf())		       dat.setDate(dat.getDate() + days);		       return dat;		   }					var startDate = new Date(bDate);			var stopDate = new Date(eDate);			var dateArray = new Array();			var currentDate = startDate;			while (currentDate <= stopDate) {				dateArray.push(currentDate)				currentDate = currentDate.addDays(1);			}			//var dates = { start: start, end: end };			for (i = 0; i < dateArray.length; i ++ ) {				var theDate1 = dateArray[i].getDate();				if(theDate1 < 10){					var theDate2 = '0' + String(theDate1);				}else{					var theDate2 = theDate1;				}								var theMonth = parseInt(dateArray[i].getMonth()) + 1;				if(theMonth < 10){					theMonth = '0' + String(theMonth);				}								var theYear = dateArray[i].getFullYear();				var theD = theYear+"-"+theMonth+"-"+theDate2;//					console.log(theDate+" - "+theMonth+" - "+theYear);				_this.calendarDaysNumber[i] = [					{'number': theDate1,					'date': theD}				];			}//				console.log(dateArray);			//return false;

		}



		this.getCalendarList = function(list){
			var _this = this;
			var len = 0;
			_this.calendarListArr = [];
			//alert(hallUrl);
			//alert(_this.calendarUrl);

			//do{}
			/*apiQuery(_this.calendarUrl, function(data){
				//console.log(data);
				if(typeof data == "object"){
					len = data.length;
					//alert(len);
					if(len > 0){
						_this.calendarListArr = data;
						console.log(data);
					}
				}
			});*/
			//_this.calendarListArr = [];
			var toQuery = true;
			var toQuery_page = 1;
			do{
				var url = _this.calendarUrl+"&page="+toQuery_page;
				//console.log(url);
				apiQuery(url, function(data){
					//console.log(data);
					if(typeof data == "object"){
						len = data.results.length;
						//if(len )
						//alert(len+" - "+$url); 
						if(len > 0){
							//_this.calendarListArr = data.results;
							//console.log(data.next);
							for(i=0; i<len; i++){
								_this.calendarListArr.push(data.results[i]);
							}
							/*for(i=0; i<len; i++){
								_this.calendarListArr.push(data.results[i]);
							}*/
							//console.log(_this.calendarListArr);
							//console.log(data);
						}
					}else{
						toQuery = false;
					}
				});
				++toQuery_page;
			}while(toQuery == true);

			if(len == 0 || len == "undefined" ){
 				// console.log(len);
				return false;
			}else{
				// console.log(len);
				return true;
			}
		}



		this.getTrainsList = function(list){
			var _this = this;
			var len = 0;
			_this.trains = [];
			_this.calendarListArr.forEach(function(currentValue, index, arr){
				//console.log(currentValue.title);
				var arr = [];
				arr['title'] = currentValue.title;
				arr['duration'] = currentValue.duration;
				arr['order'] = currentValue.order;
				var title = currentValue.title;
				if(_this.trains.length > 0){
					//console.log(arr['title']+" - "+currentValue.title);
					var flag = false;
					_this.trains.forEach(function(currentVal, index, arr){
						//console.log(currentVal.title+" - "+title);
						if(currentVal.title == title){
							//console.log(currentVal.title);
							flag = true;
							return false;
						}
					});
					if(flag == false){
						_this.trains.push(arr);
					}
				}else{
					_this.trains.push(arr);
				}
			});
			//console.log(_this.trains);

			return false;
			$(".filter-by-traine select").text("");
			$(".filter-by-traine select").html("<option value='null'><a href='#'>Все</a></option>");
			_this.trains.forEach(function(currentValue, index, arr){
				console.log(currentValue);
				var selected = "";
				//if(currentValue != ""){
				if(currentValue == _this.choosenTrain){selected = "selected";}
					$(".filter-by-traine select").append(
						"<option value='"+currentValue+"' "+selected+"><a href='#'>"+currentValue+"</a></option>"
						//"<li><a href='#'>"+currentValue+"</a></li>"
					);
				//}
				
			});
		}





		this.getCouchList = function(list){
			
			//alert(this.hall);
			//return false;

			var _this = this;
			var len = 0;
			_this.couches = [];
			
			//var len = 0;
			var hall = null;
			var hallur = "https://instasport.co/club/"+clubName+"/api/v1/hall/"+_this.hall+"/?format=json";
			//alert(hallur);
			
			apiQuery(hallur, function(data){
				if(typeof data == "object"){
					//len = data.length;
					//if(len > 0){
						hall = data.instructor;
					//}
					//hall = 1;
					//console.log(data);
				}

			});
			//console.log(hall.instructor);
			//console.log(hallur);
			
			hall.forEach(function(currentValue, index, arr){
				var arr = [];
				arr['id'] = currentValue.id;
				arr['name'] = currentValue.name;
				arr['avatar'] = currentValue.avatar;
				//_this.couches[currentValue.id] = currentValue.name;
				_this.couches.push(arr);
			});

			//console.log(_this.couches);

			return false;
			$(".filter-by-couch select").text("");
			$(".filter-by-couch select").html("<option value='null'><a href='#'>Все</a></option>");
			_this.couches.forEach(function(currentValue, index, arr){
				//console.log(currentValue);
				var selected = "";
				//if(currentValue != ""){
				if(index == _this.choosenCouch){selected = "selected";}
					$(".filter-by-couch select").append(
						"<option value='"+index+"' "+selected+"><a href='#'>"+currentValue+"</a></option>"
						//"<li><a href='#'>"+currentValue+"</a></li>"
					);
				//}
				
			});
		}






		function todayDate(){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			if(dd<10){
			    dd='0'+dd;
			} 
			if(mm<10){
			    mm='0'+mm;
			} 
			var today = yyyy+'-'+mm+'-'+dd; //alert(today);
			return today;
		}


		function apiQuery (url, callback){
				$.ajax({
					async: false,
					type: 'GET',
					// url: proxy+url,
					url: url,
					success: function(data) {
						//console.log(response);
						try{
							// callback(JSON.parse(data));
							callback(data);
						}catch(e){
							callback('');
							//console.log('Invalid json string!');
							//console.log(data);
						}
					},
					error: function(){
						//console.log("error");
						var data = "error";
						try{
							// callback(JSON.parse(data));
							callback(data);
						}catch(e){
							callback('');
							//console.log('Invalid json string!');
							//console.log(data);
						}
					}
				});
		}


	}



		var desktopTypeCalendarView = $("#desktop-typecalendar").text();
		var desktopDefaultView = "";
		if(desktopTypeCalendarView == "month"){desktopDefaultView = "month";}
			else if(desktopTypeCalendarView == "week"){desktopDefaultView = "agendaWeek";}
		
		var mobileTypeCalendarView = $("#mobile-typecalendar").text();
		var mobileDefaultView = "";
		if(mobileTypeCalendarView == "month"){mobileDefaultView = "month";}
			else if(mobileTypeCalendarView == "week"){mobileDefaultView = "agendaWeek";}


			if(this.divIdCal == "#calendar-desktop"){
			this.divClassMyCal = ".mycalendar-desktop";
		}else if(this.divIdCal == "#calendar-mobile"){
			this.divClassMyCal = ".mycalendar-mobile";
		}

		//var callendarDesk = new calendarApp("#calendar-desktop", "month");
		var calendarDesk = new calendarApp("#calendar-desktop", "agendaWeek", ".mycalendar-desktop");
		var calendarMob = new calendarApp("#calendar-mobile", "agendaWeek", ".mycalendar-mobile");
		//var staff = new staffApp();

		calendarDesk.loadData(function(resp){
			//alert(resp);
		});

		
		calendarMob.loadData(function(resp){
			//alert(resp);
		});


		function calling(){
			alert("new data!");
		}


});