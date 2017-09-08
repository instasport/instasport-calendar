jQuery(document).ready(function($) {
	var club = $(".intaclub").text();
	//var hallUrl = "https://instasport.co/club/"+clubName+"/api/hall/?format=json",
	//	calendarUrl = "https://instasport.co/club/"+clubName+"/api/calendar/?format=json",
	//var hallUrl = "https://instasport.co/club/"+club+"/api/hall/?format=json",
	//	calendarUrl = "https://instasport.co/club/"+club+"/api/calendar/?format=json", 
	var hallUrl = "https://instasport.co/club/"+club+"/api/hall/?format=json",
		calendarUrl = "https://instasport.co/club/"+club+"/api/schedule/dates/2017-09-01/2017-10-01/?format=json",
		// proxy = "proxy.php?url=",
		proxy = "",
		eventArr = [],
		hallArr = [],
		calendarListArr = [],
		calendarTabsTpl = [],
		tabId = null,
		oldEvents = false,
		hallIndex = 0;
		//-------------------> Изменить цвета событий и текст кнопок можно тут
		bgColor = '#4d346b',
		txtColor = '#fff',
		toDayBtnTxt = 'Текущий день',
		monthTxt = 'Месяц',
		agendaWeekTxt = 'Неделя',
		agendaDayTxt = 'День',
		lang = 'ru',
		reloadBtn = 'Перезагрузить',
		redirectBtnText = 'Показать расписание',
		redirectUrl = '/index.html';


		function calendarApp (){
			this.loadData = function(callback){
				var _this = this;
				if(this.getHalls()){
					// console.log(this.getHalls());
					if(this.getCalendarList()){
						callback(true);
						tabId = hallArr[0].id;
						$.each(hallArr, function(key, val){
							if(key == 0){
								calendarTabsTpl.push('<span class="cld-tab current" data-hall-id="'+val.id+'">'+val.title+'</span>');
							}else{
								calendarTabsTpl.push('<span class="cld-tab" data-hall-id="'+val.id+'">'+val.title+'</span>');
							}
						});

						$('.cld-tabs').html(calendarTabsTpl.join(''));
						$('.cld-tabs').show();
						eventArr = _this.hallFilter(tabId);

						buildingEvents = _this.rebuildEventsArr(eventArr);
						//staff.init(hallArr[hallIndex].instructor);
						_this.init(buildingEvents, hallArr[hallIndex].time_open, hallArr[hallIndex].time_close);

						$('.cld-hall-img').prop('src', hallArr[hallIndex].image).attr('width','100%');
						$('.cld-hall-img-name').text(hallArr[hallIndex].title+' ( '+hallArr[hallIndex].description+' ) ');
						$('.cld-hall-img-wrap').show();

						$('.cld-tab').on('click', function(){
							if(!$(this).hasClass('current')){
								$('.cld-tabs .current').removeClass('current');
								tabId = $(this).data('hall-id');
								hallIndex = $(this).index();
								$(this).addClass('current');
								eventArr = _this.hallFilter(tabId);
								buildingEvents = _this.rebuildEventsArr(eventArr);
								//staff.init(hallArr[hallIndex].instructor);
								_this.init(buildingEvents, hallArr[hallIndex].time_open, hallArr[hallIndex].time_close);
								$('.cld-hall-img').prop('src', hallArr[hallIndex].image);
								$('.cld-hall-img-name').text(hallArr[hallIndex].title+' ( '+hallArr[hallIndex].description+' ) ');
							}
						});
					}else{
						callback(false);
						$('.cld-hall-img-wrap').hide();
					$('h2').hide();
					$('.calen-tab').hide();
					$('#calendar').hide();
					$('.cld-btn-wrap').hide();
					}
				}else{
					callback(false);
					$('.cld-hall-img-wrap').hide();
					$('h2').hide();
					$('.calen-tab').hide();
					$('#calendar').hide();
					$('.cld-btn-wrap').hide();
				}
			}

			this.init = function(cldEvent, open, close){
				if(oldEvents){
					$('#calendar').fullCalendar( 'destroy' );
					oldEvents = false;
				}
				$('#calendar').fullCalendar({
					lang: lang,
					timezone: true,
					contentHeight: 'auto',
					//defaultView: 'agendaWeek',
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
					buttonText: {
						today: toDayBtnTxt,
						month: monthTxt,
						agendaWeek: agendaWeekTxt,
						agendaDay: agendaDayTxt
					},
					minTime: open,
					maxTime: close,
					//events: cldEvent,
					events: {
					        url: "https://instasport.co/club/"+club+"/api/schedule/dates",
					        data: function() { // a function that returns an object
					            return {
					                //date1: "2017-08-01",
					                format: "json"
					            };
					        }
					    },
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
				        calendarDATA();
				    },
				});	
				oldEvents = true;			
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
					 
					 // console.log(len);
					return true;

				}
			}

			this.getCalendarList = function(list){
				var len = 0;
				apiQuery(calendarUrl, function(data){
					if(typeof data == "object"){
						len = data.length;
						if(len > 0){
							calendarListArr = data;
						}
					}
				});
				if(len == 0 || len == "undefined" ){
 				// console.log(len);
					return false;
				}else{
					 // console.log(len);
					return true;
				}
			}

			this.hallFilter = function(hallId){
				var tmp = null;
				tmp = $(calendarListArr).filter(function (i,n){
					return n.hall === hallId;
				});
				return tmp;
			}

			this.rebuildEventsArr = function(arr){
				var tmp = $.map(eventArr, function(item) {
					return {
						id: item.event,
						title: item.title,
						start: item.start,
						end: item.end,
						url: item.url
					};
				});

				return tmp;
			}

			this.setReload = function(){
				var div = $('#calendar');
				var _this = this;
				var btnTpl = $(
					[
					'<div class="cld-btn-wrap">',
					'<button class="cld-btn cld-reload">',
					reloadBtn,
					'</button>',
					'<a href="'+redirectUrl+'" class="cld-btn cld-redirect">'+redirectBtnText+'</a>',
					'</div>'
					].join('')
					);

				div.html(btnTpl);

				var cldReloadBtn = btnTpl.find('.cld-reload');

				cldReloadBtn.on('click', function(){
					_this.loadData(function(resp){
						if(!resp){
							_this.setReload();
						}
					});
				});

			}

			function apiQuery (url, callback){
				$.ajax({
					async: false,
					type: 'GET',
					// url: proxy+url,
					url: url,
					success: function(data) {
						try{
							// callback(JSON.parse(data));
							callback(data);
						}catch(e){
							callback('');
							console.log('Invalid json string!');
							console.log(data);
						}
					}
				});
			}

		}

		var app = new calendarApp();
		//var staff = new staffApp();

		app.loadData(function(resp){
			if(!resp){
				app.setReload();
			}
		});


	});