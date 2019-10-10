var intaHelperClass = function(){

	this.monthTitles = [
		intaLocale.tr.monthTitles1.jan,
		intaLocale.tr.monthTitles1.feb,
		intaLocale.tr.monthTitles1.mar,
		intaLocale.tr.monthTitles1.apr,
		intaLocale.tr.monthTitles1.may,
		intaLocale.tr.monthTitles1.jun,
		intaLocale.tr.monthTitles1.jul,
		intaLocale.tr.monthTitles1.aug,
		intaLocale.tr.monthTitles1.sep,
		intaLocale.tr.monthTitles1.oct,
		intaLocale.tr.monthTitles1.nov,
		intaLocale.tr.monthTitles1.dec
	];

	this.monthTitles2 = [
		intaLocale.tr.monthTitles2.jan,
		intaLocale.tr.monthTitles2.feb,
		intaLocale.tr.monthTitles2.mar,
		intaLocale.tr.monthTitles2.apr,
		intaLocale.tr.monthTitles2.may,
		intaLocale.tr.monthTitles2.jun,
		intaLocale.tr.monthTitles2.jul,
		intaLocale.tr.monthTitles2.aug,
		intaLocale.tr.monthTitles2.sep,
		intaLocale.tr.monthTitles2.oct,
		intaLocale.tr.monthTitles2.nov,
		intaLocale.tr.monthTitles2.dec
	];

	this.weekTitles = [
		intaLocale.tr.fullWeekDays.mon,
		intaLocale.tr.fullWeekDays.tue,
		intaLocale.tr.fullWeekDays.wed,
		intaLocale.tr.fullWeekDays.thu,
		intaLocale.tr.fullWeekDays.fri,
		intaLocale.tr.fullWeekDays.sat,
		intaLocale.tr.fullWeekDays.sun
	];

	this.getUrl = function(type, params){
		var _this = this;

		var url_event = "https://instasport.co/club/"+configData.apiClub+"/api/v1/event/";
		var url_hall = "https://instasport.co/club/"+configData.apiClub+"/api/v1/hall/?format=json";
		var url_club_info = "https://instasport.co/club/"+configData.apiClub+"/api/v1/info/?format=json";
		var url_event_info = "https://instasport.co/club/"+configData.apiClub+"/api/v1/event/"; 

		var url = null;

		// https://instasport.co/club/hiitworks/api/v1/event/?startdate=2019-08-26&enddate=2019-10-07&hall=78&page_size=1000&page=1

		var params_exists = false;
		switch(type){
			case"events":
				url = url_event;
				if(typeof params.page !== "undefined"){
					if(!params_exists)
						url += "?";
					if(params_exists)
						url += "&";
					url += "page=" + params.page;
					if(!params_exists)
						params_exists = true;
				}
				if(typeof params.beginDate !== "undefined"){
					if(!params_exists)
						url += "?";
					if(params_exists)
						url += "&";
					url += "startdate=" + params.beginDate;
					if(!params_exists)
						params_exists = true;
				}
				if(typeof params.endDate !== "undefined"){
					if(!params_exists)
						url += "?";
					if(params_exists)
						url += "&";
					url += "enddate=" + params.endDate;
					if(!params_exists)
						params_exists = true;
				}
				if(typeof params.hall !== "undefined"){
					if(!params_exists)
						url += "?";
					if(params_exists)
						url += "&";
					url += "hall=" + params.hall;
					if(!params_exists)
						params_exists = true;
				}
				if(typeof params.page_size !== "undefined"){
					if(!params_exists)
						url += "?";
					if(params_exists)
						url += "&";
					url += "page_size=" + params.page_size;
					if(!params_exists)
						params_exists = true;
				}
				
				if(!params_exists)
					url += "?";
				if(params_exists)
					url += "&";
				url += "format=json";
				
				break;
			case"halls":
				url = url_hall;
				break;
			case"club_info":
				url = url_club_info;
				break; 
			case"event_info":
				url = url_event_info;
				if(typeof params.id !== "undefined"){
					url += params.id;
				}
				url += "?format=json";
				// url += "format=json";
				break; 
		}
		
		return url;

	}

	this.dateInRange = function(firstDate, lastDate, date){ 
		var firstDateCopy = new Date(firstDate.getTime()); 

		// console.log(date);

		var inRange = false;

		do{
			if(firstDateCopy.getMonth() == date.getMonth() &&
				firstDateCopy.getDate() == date.getDate()){
				inRange = true;
				break;
			}
			firstDateCopy.setDate(firstDateCopy.getDate() + 1);
		}while(firstDateCopy <= lastDate);

		// console.log(firstDateCopy);

		return inRange;
	}

	this.getSeatsMessage = function(seats){
		var messageSeats = "";
		
		if(parseInt(seats, 10) == 0){
			messageSeats = "нет мест";
		}else if(parseInt(seats, 10) == 1){
			messageSeats = "осталось 1 место";
		}else if(parseInt(seats, 10) == 2){
			messageSeats = "осталось 2 места";
		}

		return messageSeats;
	}

	this.getAmountDaysInMonth = function(month, year){
		return new Date(year, month, 0).getDate();
	}

	this.convertDateForLink = function(dateObj){
		var fullYear = String(dateObj.getFullYear());

		var monthNumber = dateObj.getMonth() + 1;
		if(monthNumber < 10){
			var month = "0" + String(monthNumber);
		}else{
			var month = String(monthNumber);
		}	

		var day = String(dateObj.getDate());
		if(day < 10){
			day = "0" + String(day);
		}else{
			day = String(day);
		}

		return fullYear+"-"+month+"-"+day;
	}

	this.convertDateApiToHour = function(dateApi){
		var date = new Date(dateApi);
		return date.getHours();	
	}

	this.getHoursOfWork = function(time_open, time_close){
		var hoursOfWork = [];
		var hour = parseInt(time_open.split(":")[0]);
		var hourEnd = parseInt(time_close.split(":")[0]);
		
		do{
			if(hour < 10){
				hoursOfWork.push("0"+hour);
			}else{
				hoursOfWork.push(""+hour);
			}
			hour++
		}while(hour <= hourEnd);
		
		return hoursOfWork;
	}

	this.getDayOfWeek = function(date){
		// date.setDate(date.getDate() - 2);
		// console.log(date);
		var weekDayNumber = date.getDay();
		if(weekDayNumber == 0){
			weekDayNumber = 6;
		}else{
			weekDayNumber--;
		}
		return this.weekTitles[weekDayNumber];
	}

	this.getMobileWeekTitle = function(date){
		return this.getDayOfWeek(date)+"<br>"+date.getDate()+" "+this.monthTitles2[date.getMonth()];
	}

	this.getWeekDates = function(firstDay, lastDay, type){
		var copyFirstDay = new Date(firstDay.getTime());

		var weekDates = [];
		// var weekDate;
		do{
			var convertedDay = this.convertDateForLink(copyFirstDay);

			if(type == "body"){
				weekDates.push(convertedDay);
			}else if(type == "head"){
				weekDates.push(convertedDay.split("-")[2]+"."+convertedDay.split("-")[1]+"."+convertedDay.split("-")[0]);
			}else if(type == "modal"){
				weekDates.push(this.convertDateForModal(copyFirstDay)); 
			}else if(type == "mobile"){
				weekDates.push(copyFirstDay.getDate()); 
			}else if(type == "mobile_title"){
				weekDates.push(this.getMobileWeekTitle(copyFirstDay)); 
			}

			copyFirstDay.setDate(copyFirstDay.getDate() + 1);
		}while(copyFirstDay <= lastDay);
		
		return weekDates;
	}

	this.convertDateForModal = function(dateObj){
		var fullYear = String(dateObj.getFullYear());
		
		var monthTitle = this.monthTitles2[dateObj.getMonth()];	

		var day = String(dateObj.getDate());
		if(day < 10){
			day = "0" + String(day);
		}else{
			day = String(day);
		}

		return day+" "+monthTitle+" "+fullYear;
	}

	this.convertDurationApiToObj = function(durationApi){
		var arr = durationApi.split(":"); 
		return {
			"hours": arr[0],
			"minutes": arr[1],
			"seconds": arr[2]
		};
	}

	this.getDurationFor = function(convertedDuration, type){
		var duration = null;

		// convertedDuration.hours = "01";
		// convertedDuration.minutes = "00";

		if(type == "modal"){
			var durHoursModal = null;
			var durMinutesModal = null;
			
			if(parseInt(convertedDuration.hours, 10) == 0){
				durHoursModal = "";
			}else if(parseInt(convertedDuration.hours, 10) == 1){
				durHoursModal = "1 "+intaLocale.tr.hour+" ";
			}else if(parseInt(convertedDuration.hours, 10) > 1){
				durHoursModal = parseInt(convertedDuration.hours, 10)+" "+intaLocale.tr.hours+" ";
			}

			if(parseInt(convertedDuration.minutes, 10) == 0){
				durHoursModal = durHoursModal.trim();
				durMinutesModal = "";
			}else if(parseInt(convertedDuration.minutes, 10) > 0){
				durMinutesModal = parseInt(convertedDuration.minutes, 10)+" "+intaLocale.tr.min+"."; 
			}

			duration = durHoursModal+durMinutesModal;

			if(duration == "")
				duration = null;
		}

		// console.log(duration);

		return duration;
	}

	this.convertDateApiToDate = function(dateApi){
		
		var dateApi = new Date(dateApi);
		// console.log(dateApi);

		var year = "" + parseInt(dateApi.getFullYear());
		var month = dateApi.getMonth() + 1;
		var day = dateApi.getDate();
		var hours = dateApi.getHours();
		var minutes = dateApi.getMinutes();
		var seconds = dateApi.getSeconds();

		if(month < 10){
			month = "0" + parseInt(month);
		}else{
			month = "" + parseInt(month);
		}

		if(day < 10){
			day = "0" + parseInt(day);
		}else{
			day = "" + parseInt(day);
		}

		if(hours < 10){
			hours = "0" + parseInt(hours); 
		}else{
			hours = "" + parseInt(hours); 
		}

		if(minutes < 10){
			minutes = "0" + parseInt(minutes); 
		}else{
			minutes = "" + parseInt(minutes); 
		}

		if(seconds < 10){
			seconds = "0" + parseInt(seconds); 
		}else{
			seconds = "" + parseInt(seconds); 
		}

		// var dateArr = dateApi.split("T");
		var date = {
			"year": year,
			"month": month,
			"day": day,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds, 
		};

		return date;
		// var _this = this;

		// var date = _this.convertDateForLink(dateObj)+'T'+;
	}

	this.apiQuery = function(url, callback, i){

		var beforeSend = function(xhr){
			xhr.setRequestHeader('Accept-Language', intaLocale.locale); 
		}

		jQuery.ajax({
			// async: false,
			type: 'GET',
			beforeSend: beforeSend,
			url: url,
			// i:typeof i !== 'undefined'?i:0,
			indexValue: typeof i !== 'undefined'?i:0,
			success: function(data) {
				try{
					callback(data, this.indexValue);
				}catch(e){
					callback('');
				}

			},
			error: function(){
				var data = "error";
				try{
					callback(data);
				}catch(e){
					callback('');
				}
			}
		});

	}

}


var intaHelper = null;
var helperInterval = setInterval(function(){
	if (typeof configData !== 'undefined' &&
			typeof intaLocale !== 'undefined' &&
			typeof intaLocale.initialized !== 'undefined' &&
			intaLocale.initialized) { 
		intaHelper = new intaHelperClass();
		// intaCalendar = new intaCalendarClass();
		// intaCalendar.init();
		clearInterval(helperInterval);
	}
	// console.log("Searching");
}, 10);
