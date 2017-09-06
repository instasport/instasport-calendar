$(document).ready(function() {
		

		////PADDING to preload while calendar is loading
		//var preloaderPaddingTop = ((parseInt($(".mycalendar").closest(".block").css("height"), 10))/2)-20;
		//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px");
		
		$(".switch-type-mycalendars button").click(function(){
			var typeCalendar = $(this).attr("data-type-cal");
			if(typeCalendar == "month"){
				$("#calendar .fc-right .fc-button-group button").eq(0).click();
			}else if(typeCalendar == "week"){
				$("#calendar .fc-right .fc-button-group button").eq(1).click();
			}else if(typeCalendar == "day"){
				$("#calendar .fc-right .fc-button-group button").eq(2).click();
			}
		});

		




		$(".mycalendars .mymonthcalendar table tr td.day .show .day-number").click(function(){
			//$("#calendarModal .modal-body").text("");  
			$("#events-on-day").text("");
			var disp = $(this).parent().find(".events-on-day").css("display");
			if(disp == "none" && $(this).closest("td.day").hasClass("active")){
				//alert(121);
				//$("#calendarModal .modal-body").modal("show");
				$(".mycalendars .mymonthcalendar table tr td.day").removeClass("choosen");
				$(this).closest("td.day").addClass("choosen");
				var date = $(this).closest("td.day").attr("data-date");
				$("#calendarModal .modal-header .title").text(date);
				$("#calendar-data div[data-date="+date+"]").each(function(){
					var time = $(this).attr("data-time");
					var timeEnd = $(this).attr("data-end-time");
					var seats = $(this).attr("data-seats");
					//var seats = 2;
					var url = $(this).attr("data-url");
					var title = $(this).text();

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

					var endTime1 = timeEnd.split(":")[0];
					var endTime2 = timeEnd.split(":")[1];
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
					//endTime1 = parseInt(endTime1, 10);
					//var endTime2 = timeEnd.split(":")[1];
					$("#events-on-day").append("<table>"
						+"<tr>"
						+"<td>"
						+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
						+"<span>"+endTime1+endTime2+"</span>" 
						+"</td>"
						+"<td class='color-line'><div></div><div></div></td>"
						+"<td>"
						+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
						+"<span>"+messageSeats+"</span>"
						+"</td>"
						+"</tr>"
						+"</table>");
				});
				//$("#calendarModal").css({"display":"block"});

			}
		});




		//// calling function for getting data for callendar
		//calendarDATA();
		
		/*
		$('#calendar').fullCalendar({
			editable: true,
			locale: 'ru',
			height: "auto",
			eventLimit: false, 
			views: {
		        month: {
		            titleFormat: "dd MMMM YYYY",                  
		        },
		        week: {
		            columnFormat: "ddd", 
		            titleFormat: "dd.MM.YYYY",            
		        },
		        day: {
		            titleFormat: "dddd d MMMM YYYY",
		            columnFormat: "dddd d",           
		        }
		    },
			header: {
		     left   : 'prev',
		     center : 'title',
		     right  : 'next',
		    },
			
		    events: "https://instasport.co/club/kayablum/api/calendar/",
		    //defaultView: 'agendaWeek',
		    eventAfterAllRender: function(event, element) {
		        calendarDATA();
		    },
		});*/



		////  FUNCTIONALITY BUTTONS OF CALLENDAR PREV AND NEXT MONTH
		$(".mycalendar table thead tr td.month-prev a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-prev-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
			puttingPreloaderIntoCenterOfBlock("show");
		});
		$(".mycalendar table thead tr td.month-next a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-next-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
			puttingPreloaderIntoCenterOfBlock("show");
		});





		////  FUNCTIONALITY BUTTONS OF CALLENDAR PREV AND NEXT WEEK
		$(".mycalendar table thead tr td.week-prev a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-prev-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
		});
		$(".mycalendar table thead tr td.week-next a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-next-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
		});




		////  FUNCTIONALITY BUTTONS OF CALLENDAR PREV AND NEXT WEEK
		$(".mycalendar table thead tr td.day-prev a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-prev-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
		});
		$(".mycalendar table thead tr td.day-next a").click(function(e){
			e.preventDefault();
			$("#calendar .fc-next-button").click();
			//$(".price-time .block .mycalendar").animate({"opacity":"0"}, 300);
			//var preloaderPaddingTop = ((parseInt($(this).closest(".block").css("height"), 10))/2)-20;
			//alert(preloaderPaddingTop);
			//$(".price-time .block .preloader").css("padding-top",preloaderPaddingTop+"px").show();
		});







		$(".mycalendar tbody td a").on("click", function(){
			if($(this).closest("td").hasClass("active")){
				$("#calendarModal .modal-body").text("");

				var i = 1;
				var date = $(this).closest("td").attr("data-date");
				$("#calendarModal .modal-header h4").text(date);
				$(this).closest("td").find(".events").children("div").each(function(){
					var time = $(this).attr("data-time");
					var url = $(this).attr("data-url");
					var title = $(this).text();
					$("#calendarModal .modal-body").append("<table><tr><td>"+i+". </td><td>"+time+"</td><td><a target='_blank' href='"+url+"'>"+title+"</a></td></tr></table>");
					i++;
				});
				$("#calendarModal").modal("show");

			}
		});





		
		/*
		$('#calendar').fullCalendar({
			defaultDate: '2017-05-12',
			editable: true,
			locale: 'ru',
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'Шахматный турнир 1',
					start: '2017-05-01',
					url: "competition.html"
				},
				{
					title: 'Шахматный турнир 2',
					start: '2017-05-07',
					end: '2017-05-10',
					url: "competition.html"
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-05-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-05-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2017-05-11',
					end: '2017-05-13'
				},
				{
					title: 'Meeting',
					start: '2017-05-12T10:30:00',
					end: '2017-05-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2017-05-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2017-05-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2017-05-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2017-05-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2017-05-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2017-05-28'
				}
			]
		});
		*/
		
		

		//apllyAprWievToCalendar();
		
	});






$(window).resize(function() {
	//apllyAprWievToCalendar();
});




function puttingPreloaderIntoCenterOfBlock(action){
	if(action == "show"){
		var preloaderPaddingTop = ((parseInt($(".mycalendars").css("height"), 10))/2)-20;
		//alert(preloaderPaddingTop);
		$(".mycalendars .preloader").css("padding-top",preloaderPaddingTop+"px").show();
	}else if(action == "hide"){
		$(".mycalendars .preloader").hide();
	}
}



/*
function apllyAprWievToCalendar(){
	var widthCalendar = parseInt($(".mycalendars").css("width"), 10);
	if( widthCalendar > 800 ){
		if($(".mycalendars .mymonthcalendar").hasClass("w800px")){
			$(".mycalendars .mymonthcalendar").removeClass("w800px");
		}
		if($(".mycalendars .mymonthcalendar").hasClass("w700px")){
			$(".mycalendars .mymonthcalendar").removeClass("w700px"); 
		}

		//for week calendar
		if($(".mycalendars .myweekcalendar").hasClass("w700px")){
			$(".mycalendars .myweekcalendar").removeClass("w700px"); 
		}
	}else if( widthCalendar <= 800 && widthCalendar > 700){
		if($(".mycalendars .mymonthcalendar").hasClass("w700px")){
			$(".mycalendars .mymonthcalendar").removeClass("w700px"); 
		}
		if(!$(".mycalendars .mymonthcalendar").hasClass("w800px")){
			$(".mycalendars .mymonthcalendar").addClass("w800px");
		}

		//for week calendar
		if($(".mycalendars .myweekcalendar").hasClass("w700px")){
			$(".mycalendars .myweekcalendar").removeClass("w700px"); 
		}
	}else if( widthCalendar <= 700 ){
		//for month calendar
		if(!$(".mycalendars .mymonthcalendar").hasClass("w700px")){
			$(".mycalendars .mymonthcalendar").addClass("w700px"); 
		}
		if($(".mycalendars .mymonthcalendar").hasClass("w800px")){
			$(".mycalendars .mymonthcalendar").removeClass("w800px");
		}
		
		//for week calendar
		if(!$(".mycalendars .myweekcalendar").hasClass("w700px")){
			$(".mycalendars .myweekcalendar").addClass("w700px"); 
		}
	}
}*/





//Functionality of buttons of type month
function funcTypeCalButtons(){
	$(".switch-type-mycalendars button").removeClass("active");
	var activeTypeCalendarButtonIndex = $("#calendar .fc-right .fc-button-group .fc-state-active").index();
	if(activeTypeCalendarButtonIndex == 0){$(".switch-type-mycalendars button.month").addClass("active");}
	if(activeTypeCalendarButtonIndex == 1){$(".switch-type-mycalendars button.week").addClass("active");}
	if(activeTypeCalendarButtonIndex == 2){$(".switch-type-mycalendars button.day").addClass("active");}
}





//Functionality of buttons of type month
function funcHallsCalButtons(){
	$(".switch-halls-mycalendar").text("");
	var quantityHalls = $(".calen-tab .cld-tab").length;
	if(quantityHalls > 0){
		$(".calen-tab .cld-tab").each(function(){
			var hall = $(this).attr("data-hall-id");
			var title = $(this).text();
			var active = "";
			if($(this).hasClass("current")){active="active";}
			$(".switch-halls-mycalendar").append("<span class='"+active+"' data-hall='"+hall+"'>"+title+"</span>");
		});
	}
	
	$(".switch-halls-mycalendar span").click(function(){
		var hall = $(this).attr("data-hall");
		$(".calen-tab .cld-tab[data-hall-id="+hall+"]").click();
	});

	if(quantityHalls == 1){$(".switch-halls-mycalendar").hide();}
}






//// FUNCtionallity of calendar
function custFullCallendar(){
	
	//// calling function for getting data for callendar
	//calendarDATA();


	$(".mycalendar table tbody tr td").removeClass("active");
	$(".mycalendar table tbody tr td").attr("data-date", "");
	$(".mycalendar table tbody tr td").find(".events-on-day").text("");
	var hallID = $(".calen-tab .cld-tabs .cld-tab.current").attr("data-hall-id");
	//$(".price-time .block .preloader").hide();
	//$(".price-time .block .mycalendar").animate({"opacity":"1"}, 300);

	var monthToday = $("#calendar .fc-center>h2").text();
	var monthCurrent = monthToday.split(" ")[0];
	var yearCurrent = monthToday.split(" ")[1];
	$(".mycalendar table thead tr td.month-today").text(monthCurrent+" "+yearCurrent);
	var justMonth = monthToday.split(" ")[0];
	//alert(justMonth[0]);
	
	/*
	var prevMonth = "";
	var nextMonth = "";
	if(justMonth == 'январь'){prevMonth = "дек"; nextMonth = "фев";}
	if(justMonth == 'февраль'){prevMonth = "янв"; nextMonth = "мар";}
	if(justMonth == 'март'){prevMonth = "фев"; nextMonth = "апр";}
	if(justMonth == 'апрель'){prevMonth = "мар"; nextMonth = "май";}
	if(justMonth == 'май'){prevMonth = "апр"; nextMonth = "июн";}
	if(justMonth == 'июнь'){prevMonth = "май"; nextMonth = "июль";}
	if(justMonth == 'июль'){prevMonth = "июн"; nextMonth = "авг";}
	if(justMonth == 'август'){prevMonth = "июль"; nextMonth = "сент";}
	if(justMonth == 'сентябрь'){prevMonth = "авг"; nextMonth = "окт";}
	if(justMonth == 'октябрь'){prevMonth = "сент"; nextMonth = "ноя";}
	if(justMonth == 'ноябрь'){prevMonth = "окт"; nextMonth = "дек";}
	if(justMonth == 'декабрь'){prevMonth = "ноя"; nextMonth = "янв";}

	$(".mycalendar table thead tr td.month-prev a").text(prevMonth);
	$(".mycalendar table thead tr td.month-next a").text(nextMonth);*/


	//alert(prevMonth+""+nextMonth);
	/*
	$.getJSON( "https://instasport.co/club/kayablum/api/calendar/", function( data ) {
	  	$.each(data, function(i, v) {
	        if (v.id == "22919") {
	            alert(v.duration);
	            return;
	        }
    	});
	});*/



	
	var i = 1;
	var data = new Array();
	$("#calendar .fc-day-grid>.fc-week").each(function(){
		//console.log(i);
		$(this).find(".fc-content-skeleton").find("table").find("thead").find("tr").find("td").each(function(){
			//$(this).find("td").each(function(){

				//console.log(i);
				var dataDate = $(this).attr("data-date");
				//var dataTime = $(this).attr("data-time");
				//var dataTimeEnd = $(this).attr("data-end-time");
				//var dataSeats = $(this).attr("data-seats");
				//var dataUrl = $(this).attr("data-url");
				//var dataTitle = $(this).attr("data-title");
				var numberDay = $(this).text();
				//var currentDay = false;
				//if($(this).hasClass("fc-today")){
				//	currentDay = true;
				//}
				
				data[i] = new Array();
				data[i]['date'] = dataDate;
				data[i]['day-number'] = numberDay;
				//data[i]['day-current'] = currentDay;
				//data[i]['time-begin'] = dataTime;
				//data[i]['time-end'] = dataTimeEnd;
				//data[i]['seats'] = dataSeats;
				//data[i]['url'] = dataUrl;
				//data[i]['title'] = dataTitle;
				//console.log(data[i]['date']+" - "+data[i]['day-number']);
				i++;
			//});
		});
	});

	var i = 1;
	//var dataCount = count(data);
	$(".mycalendar table tbody tr").each(function(){
		//console.log(data[i]['date']);
		$(this).find("td").each(function(){

			//console.log(data[i]['day-number']);
			 
			var quantity = $("#calendar-data div[data-date="+data[i]['date']+"][data-hall="+hallID+"]").length;
			if(quantity > 0){
				var date = data[i]['date'];
				//if(data[i]['day-current']){
					//$(this).addClass("today");
					
					/*var seats = data[i]['seats'];
					var timeBegin = data[i]['time-begin'];
					var timeEnd = data[i]['time-end'];
					var url = data[i]['time-url'];

					var messageSeats = "Все места заняты";
					if(parseInt(seats, 10) == 1){messageSeats = "1 место свободно";}
					if(parseInt(seats, 10) > 1 && parseInt(seats, 10) <= 4){messageSeats = seats+" места свободно";}
					if(parseInt(seats, 10) > 4){messageSeats = seats+" мест свободно";}
					
					$("#events-on-day").append("<table>"
						+"<tr>"
						+"<td>"
						+timeBegin.split(":")[0]+"."+timeBegin.split(":")[1]+"<br/>"
						+"<span>"+timeEnd.split(":")[0]+"."+timeEnd.split(":")[1]+"</span>" 
						+"</td>"
						+"<td class='color-line'><div></div><div></div></td>"
						+"<td>"
						+"<a target='_blank' href='"+url+"'>"+url+"</a><br/>"
						+"<span>"+messageSeats+"</span>"
						+"</td>"
						+"</tr>"
						+"</table>");*/
				//}
				$(this).addClass("active").attr("data-date", date).attr("data-day-number", data[i]['day-number']);
				$(this).find(".day-number").text(data[i]['day-number']);
				$("#calendar-data div[data-date="+data[i]['date']+"][data-hall="+hallID+"]").each(function(){
					var time = $(this).attr("data-time");
					var url = $(this).attr("data-url");
					var title = $(this).text();
					//var 
					
					//$(this).find(".day-number")
					$(".mycalendar table tbody tr td[data-date="+date+"]").find(".events-on-day").append('<div class="event-on-day">'
						+'<a target="_blank" href="'+url+'">'
						+'<span class="time">'+time.split(":")[0]+'.'+time.split(":")[1]+'</span><br/>'
						+'<span class="title">'+title+'</span>'
						+'</a>'
						+'</div>');

					/*$(".mycalendar table tbody tr td[data-date="+date+"]").find(".events").append('<div class="item" data-time="'+time+'" data-url="'+url+'">'
						+title
						+'</div>');*/
				});
			}else{
				var date = data[i]['date'];
				$(this).attr("data-date", date).find(".day-number").text(data[i]['day-number']);
			}
			
			
			/*
			if(data[i]['event'] != 'no'){
				$(this).find(".event").find(".time").find("span").text(data[i]['time']);
				$(this).find(".event").find(".title").text(data[i]['event']);
				$(this).find(".event").find("a").attr("href", data[i]['link'])
				$(this).addClass("active");
			}*/
			//data[i]['date'] = $(this).parent("tr").parent("tbody").parent("table").find("thead").find("tr").find("td").eq(eq).attr("data-date");
			//data[i]['day-number'] = $(this).parent("tr").parent("tbody").parent("table").find("thead").find("tr").find("td").eq(eq).find("span.fc-day-number").text();
			//if($(this).hasClass("fc-event-container")){
			//	data[i]['event'] = $(this).find("a.fc-day-grid-event").find(".fc-content").find(".fc-title").text();
			//	data[i]['time'] = $(this).find("a.fc-day-grid-event").find(".fc-content").find(".fc-time").text();
			//	data[i]['link'] = $(this).find("a.fc-day-grid-event").attr("href");
			//}else{
			//	data[i]['event'] = "no";
			//	data[i]['time'] = "no";
			//	data[i]['link'] = "no";
			//}
			//console.log(data[i]['day-number']);
			i++;
		});
	});
	
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
	$(".mycalendar table tbody tr td").removeClass("today");
	$(".mycalendar table tbody tr td[data-date="+today+"]").addClass("today");
	//$("").(function(){
	//	$(this).addClass("today");
	//});
	$(".mycalendars .mycalendar.mymonthcalendar").show();
	pastIntoEventsOnDayTODAY();
	puttingPreloaderIntoCenterOfBlock("hide");
}






//// FUNCtionallity of calendar
function custFullCallendarWeek(){
	
	//// calling function for getting data for callendar
	//calendarDATA();

	var hallID = $(".calen-tab .cld-tabs .cld-tab.current").attr("data-hall-id");
	$(".mycalendar.myweekcalendar table tbody").text("");
	//$(".mycalendar table tbody tr td").attr("data-date", "");
	//$(".mycalendar table tbody tr td").find(".events-on-day").text("");
	//$(".price-time .block .preloader").hide();
	//$(".price-time .block .mycalendar").animate({"opacity":"1"}, 300);

	var weekToday = $("#calendar .fc-center>h2").text();
	$(".mycalendar.myweekcalendar table thead tr td.week-today").text(weekToday);
	//weekToday = weekToday.replace(/\u2013|\u2014/g, "-");
	
	//var weekTodayBeginDay = weekToday.split("-")[0]; //alert(weekTodayBegin);
	//var weekTodayEndDay = weekToday.split("-")[1];

	//var weekTodayBeginDayDay = weekTodayBeginDay.split(".")[0];
	//alert(weekTodayBeginDay);
	//if(weekTodayBeginDay.split(".")[1] != undefined){
		//alert(weekTodayBeginDay.split(".")[1]);
	//}
	var mondayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(1).attr("data-date");
	var tuesdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(2).attr("data-date");
	var wednesdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(3).attr("data-date");
	var thursdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(4).attr("data-date");
	var fridayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(5).attr("data-date");
	var saturdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(6).attr("data-date");
	var sundayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(7).attr("data-date");

	//for create TABLE
	var times = new Array();
	var i = 1;
	$("#calendar-data div[data-date="+mondayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+tuesdayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+wednesdayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+thursdayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+fridayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+saturdayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});
	$("#calendar-data div[data-date="+sundayDate+"]").each(function(){
		var flag = true;
		var time = $(this).attr("data-time");
		times.forEach(function(currentValue, index, arr){
			if(currentValue == time){
				flag = false;
				return flag;
			}
		});
		if(flag){
			//console.log("true");
			times[i] = $(this).attr("data-time");
			i++;
		}
	});

	
	times.sort(function(a,b){
		 return (b < a) ? 1 : (b > a) ? -1 : 0;
	});

	times.forEach(function(currentValue, index, arr){
		//console.log(currentValue);
		$(".mycalendar.myweekcalendar table tbody").append('<tr class="time-line" data-time="'+currentValue+'">'
						+'<td class="time">'
						+currentValue.split(":")[0]+'.'+currentValue.split(":")[1]
						+'</td>'
						+'<td class="monday">'
						+'</td>'
						+'<td class="tuesday">'
						+'</td>'
						+'<td class="wednesday">'
						+'</td>'
						+'<td class="thursday">'
						+'</td>'
						+'<td class="friday">'
						+'</td>'
						+'<td class="saturday">'
						+'</td>'
						+'<td class="sunday">'
						+'</td>'
						+'</tr>');
	});


	//var events = new Array();
	//events['monday'] = new Array();
	//events['tuesday'] = new Array();
	//events['wednesday'] = new Array();
	//events['thursday'] = new Array();
	//events['friday'] = new Array();
	//events['saturday'] = new Array();
	//events['sunday'] = new Array();

	$("#calendar-data div[data-date="+mondayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.monday").append("<div>"
			+"<a target='_blank' href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+tuesdayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.tuesday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+wednesdayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.wednesday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+thursdayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.thursday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+fridayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.friday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+saturdayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.saturday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});

	$("#calendar-data div[data-date="+sundayDate+"][data-hall="+hallID+"]").each(function(){
		var id = $(this).attr("data-id");
		var date = $(this).attr("data-date");
		var time = $(this).attr("data-time");
		var url = $(this).attr("data-url");
		var title = $(this).text();
		//events['monday'][time] = new Array();
		$(".mycalendar.myweekcalendar table tbody tr[data-time='"+time+"']").find("td.sunday").append("<div>"
			+"<a href='"+url+"'>"
			+title
			+"</a>"
			+"<a target='_blank' class='hidden' href='"+url+"'></a>"
			+"</div>"); 
	});
	//console.log(events);
	//console.log("true");
	
	
}







//// FUNCtionallity of calendar
function custFullCallendarDay(){
	
	//// calling function for getting data for callendar
	//calendarDATA();

	var hallID = $(".calen-tab .cld-tabs .cld-tab.current").attr("data-hall-id");
	$(".mycalendar.mydaycalendar table tbody").text("");
	//$(".mycalendar table tbody tr td").attr("data-date", "");
	//$(".mycalendar table tbody tr td").find(".events-on-day").text("");
	//$(".price-time .block .preloader").hide();
	//$(".price-time .block .mycalendar").animate({"opacity":"1"}, 300);

	var dayToday = $("#calendar .fc-center>h2").text();
	$(".mycalendar.mydaycalendar table thead tr td.day-today").text(dayToday);

	var dayOfWeekToday = $("#calendar .fc-day-header").text();
	$(".mycalendar.mydaycalendar table thead tr td.day-week-today").text(dayOfWeekToday);
	
	var dayTodayForEvent = dayToday.split(".")[2]+"-"+dayToday.split(".")[1]+"-"+dayToday.split(".")[0];
	//console.log(dayTodayForEvent);
	//weekToday = weekToday.replace(/\u2013|\u2014/g, "-");
	
	//var weekTodayBeginDay = weekToday.split("-")[0]; //alert(weekTodayBegin);
	//var weekTodayEndDay = weekToday.split("-")[1];

	//var weekTodayBeginDayDay = weekTodayBeginDay.split(".")[0];
	//alert(weekTodayBeginDay);
	//if(weekTodayBeginDay.split(".")[1] != undefined){
		//alert(weekTodayBeginDay.split(".")[1]);
	//}
	//var mondayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(1).attr("data-date");
	//var tuesdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(2).attr("data-date");
	//var wednesdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(3).attr("data-date");
	//var thursdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(4).attr("data-date");
	//var fridayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(5).attr("data-date");
	//var saturdayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(6).attr("data-date");
	//var sundayDate = $("#calendar .fc-view-container .fc-widget-header table tr th").eq(7).attr("data-date");

	//for create TABLE
	var times = new Array();
	var i = 1;
	$("#calendar-data div[data-date="+dayTodayForEvent+"][data-hall="+hallID+"]").each(function(){
		times[i] = new Array();
		times[i]['time'] = $(this).attr("data-time");
		times[i]['url'] = $(this).attr("data-url");
		times[i]['title'] = $(this).text();
		i++;
	});
	
	
	times.sort(function(a,b){
		 return (b.time < a.time) ? 1 : (b.time > a.time) ? -1 : 0;
	}); 

	//console.log(times);
	
	times.forEach(function(currentValue, index, arr){
		//console.log(currentValue);
		if($(".mycalendar.mydaycalendar table tbody tr[data-time='"+times[index]['time']+"']").attr("data-time") != undefined){
			console.log('isset');	
			$(".mycalendar.mydaycalendar table tbody tr[data-time='"+times[index]['time']+"'] td.events")
					.append("<div class='event'><a target='_blank' href='"+times[index]['url']+"'>"+times[index]['title']+"</a></div>");
		}else{
			console.log('noisset');
			$(".mycalendar.mydaycalendar table tbody").append('<tr class="time-line" data-time="'+times[index]['time']+'">'
						+'<td class="time">'
						+times[index]['time'].split(":")[0]+"."+times[index]['time'].split(":")[1]
						+'</td>'
						+'<td class="events" colspan="2">'
						+'<div class="event">'
						+'<a target="_blank" href="'+times[index]['url']+'">'
						+times[index]['title']
						+'</a>'
						+'</div>'
						+'</td>'
						+'</tr>');
		}
	});
		

	//var events = new Array();
	//events['monday'] = new Array();
	//events['tuesday'] = new Array();
	//events['wednesday'] = new Array();
	//events['thursday'] = new Array();
	//events['friday'] = new Array();
	//events['saturday'] = new Array();
	//events['sunday'] = new Array();

	
	//console.log(events);
	//console.log("true");
	
	
}





function setBeginEndDateValues(){

	var activeTypeCalendarButtonIndex = $("#calendar .fc-right .fc-button-group .fc-state-active").index();
	var typeCalendar = "";
	if(activeTypeCalendarButtonIndex == 0){
		typeCalendar = "month";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}
	if(activeTypeCalendarButtonIndex == 1){
		typeCalendar = "week";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}
	if(activeTypeCalendarButtonIndex == 2){
		typeCalendar = "day";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}


	if(typeCalendar == "month"){
		var beginDate = $("#calendar .fc-day-grid>.fc-week").first().find(".fc-content-skeleton")
						.find("table")
						.find("thead")
						.find("tr")
						.find("td").first().attr("data-date");
		var endDate = $("#calendar .fc-day-grid>.fc-week").last().find(".fc-content-skeleton")
						.find("table")
						.find("thead")
						.find("tr")
						.find("td").last().attr("data-date");
	}else if(typeCalendar == "week"){
		var weekToday = $("#calendar .fc-center>h2").text();

		weekToday = weekToday.replace(/\u2013|\u2014/g, "-");
		
		var weekTodayBeginDay = weekToday.split("-"); //alert(weekTodayBegin);

		//alert(weekTodayBeginDay[2]);
		var beginDate = "";
		
		if(weekTodayBeginDay[0].split(".")[2] != undefined){
			beginDate = beginDate + weekTodayBeginDay[0].split(".")[2].trim();
		}else{
			beginDate = beginDate + weekTodayBeginDay[1].split(".")[2].trim();
		}

		if(weekTodayBeginDay[0].split(".")[1] != undefined){
			beginDate = beginDate + "-" + weekTodayBeginDay[0].split(".")[1].trim();
		}else{
			beginDate = beginDate + "-" + weekTodayBeginDay[1].split(".")[1].trim();
		}

		if(weekTodayBeginDay[0].split(".")[0] != undefined){
			beginDate = beginDate + "-" + weekTodayBeginDay[0].split(".")[0].trim();
		}else{
			beginDate = beginDate + "-" + weekTodayBeginDay[1].split(".")[0].trim();
		}

		
		//var weekTodayEndDay = weekToday.split("-")[1];
		var endDate = weekTodayBeginDay[1].trim().split(".")[2]+"-"
						+weekTodayBeginDay[1].trim().split(".")[1]+"-"
						+weekTodayBeginDay[1].trim().split(".")[0];
		//alert(beginDate+"-"+endDate);

	}else if(typeCalendar == "day"){
		var today = $("#calendar .fc-center>h2").text();
		var beginDate = today.trim().split(".")[2]+"-"
						+today.trim().split(".")[1]+"-"
						+today.trim().split(".")[0];
		var endDate = today.trim().split(".")[2]+"-"
						+today.trim().split(".")[1]+"-"
						+today.trim().split(".")[0];
		//var weekToday = $("#calendar .fc-center>h2").text();
		//alert(beginDate+" - "+endDate);
	}

	$(".date-interval .date-begin").text(beginDate);
	$(".date-interval .date-end").text(endDate);

}






function pastIntoEventsOnDayTODAY(){

	var todayDate = $(".mycalendars .mymonthcalendar table tr td.day.active.today").attr("data-date");
	//alert(todayDate);
			if(todayDate != ""){
				$("#calendar-data div[data-date="+todayDate+"]").each(function(){
					var time = $(this).attr("data-time");
					var timeEnd = $(this).attr("data-end-time");
					var seats = $(this).attr("data-seats");
					//var seats = 2;
					var url = $(this).attr("data-url");
					var title = $(this).text();

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


					var endTime1 = timeEnd.split(":")[0];
					var endTime2 = timeEnd.split(":")[1];
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

					$("#events-on-day").append("<table>"
						+"<tr>"
						+"<td>"
						+time.split(":")[0]+"."+time.split(":")[1]+"<br/>"
						+"<span>"+endTime1+endTime2+"</span>" 
						+"</td>"
						+"<td class='color-line'><div></div><div></div></td>"
						+"<td>"
						+"<a target='_blank' href='"+url+"'>"+title+"</a><br/>"
						+"<span>"+messageSeats+"</span>"
						+"</td>"
						+"</tr>"
						+"</table>");
				});
			}
}







//// FUNCtionallity of calendar
function calendarDATA(){
	puttingPreloaderIntoCenterOfBlock("show");
	$("#calendar-data").text("");
	$("#events-on-day").text("");
	funcTypeCalButtons();
	funcHallsCalButtons();
	setBeginEndDateValues();

	var beginDate = $(".date-interval .date-begin").text();
	var endDate = $(".date-interval .date-end").text();
	
	var hallID = $(".calen-tab .cld-tabs .cld-tab.current").attr("data-hall-id");
	var club = $(".intaclub").text();
	var activeTypeCalendarButtonIndex = $("#calendar .fc-right .fc-button-group .fc-state-active").index();
	var typeCalendar = "";
	var link = "";
	if(activeTypeCalendarButtonIndex == 0){
		typeCalendar = "month";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}
	if(activeTypeCalendarButtonIndex == 1){
		typeCalendar = "week";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}
	if(activeTypeCalendarButtonIndex == 2){
		typeCalendar = "day";
		//link = "https://instasport.co/club/"+club+"/api/schedule/dates/YYYY-MM-DD/YYYY-MM-DD";
	}
	//alert(typeCalendar);

	//if($("#calendar-data").attr("data-full") == "notfull"){
		//$.getJSON( "https://instasport.co/club/acro/api/calendar/", function( data ) {
		$.getJSON( "https://instasport.co/club/"+club+"/api/schedule/dates/"+beginDate+"/"+endDate+"/?format=json", function( data ) {
		  	$("#calendar-data").attr("data-full", "full");
		  	$.each(data, function(i, v) {
		        var id = v.id;
		        var startAll = v.start
		        //var endAll = v.end duration
		        var startDate = startAll.split("T")[0];
		        var startTime = (startAll.split("T")[1]).split("+")[0];
		        //var endTime = (endAll.split("T")[1]).split("+")[0];
		        var endTime = v.duration;
		        var url = v.url;
		        var title = v.title;
		        var hall = v.hall;
		        var seats = v.seats;
		        //console.log(startTime);
		        //var start = "2017-07-31T11:00:00+03:00",
		        if(hallID == undefined){
		        	$("#calendar-data").append("<div data-seats='"+seats+"' data-end-time='"+endTime+"' data-id='"+id+"' data-date='"+startDate+"' data-time='"+startTime+"' data-url='"+url+"'>"+title+"</div>");
		        }else{
		        	//if(hall == hallID){
		        		$("#calendar-data").append("<div data-seats='"+seats+"' data-end-time='"+endTime+"' data-id='"+id+"' data-date='"+startDate+"' data-hall='"+hall+"' data-time='"+startTime+"' data-url='"+url+"'>"+title+"</div>");
		        		//console.log(hall);
		        	//}
		        }
		        /*if (v.id == "22919") {
		            alert(v.duration);
		            return;
		        }*/
	    	});

	    	if(typeCalendar == "month"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.mymonthcalendar").hide();
	    		custFullCallendar();
	    	}else if(typeCalendar == "week"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.myweekcalendar").show();
	    		custFullCallendarWeek();
	    	}else if(typeCalendar == "day"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.mydaycalendar").show();
	    		custFullCallendarDay();
	    	}

		});
	/*}else{
			if(typeCalendar == "month"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.mymonthcalendar").show();
	    		custFullCallendar();
	    	}else if(typeCalendar == "week"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.myweekcalendar").show();
	    		custFullCallendarWeek();
	    	}else if(typeCalendar == "day"){
	    		$(".mycalendars .mycalendar").hide();
	    		$(".mycalendars .mycalendar.mydaycalendar").show();
	    		custFullCallendarDay();
	    	}
	}*/


	//alert("Calendar is rendered!");

}