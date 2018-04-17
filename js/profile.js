jQuery(document).ready(function($) {

	//console.log("profile");
	//alert(100);
	//alert(apiKey); 
	if($.cookie("intaToken")){
		//alert($.cookie("intaToken"));
	}else{
		//alert("cookie is not set!");
	}
	
	var accountClass = function(){
		var _this = this;
		
		this.profileFirstName = null;
		this.profilePhone = null;
		this.profileEmail = null;
		this.profileLastName = null;
		this.profileId = null;
		this.profileRegistered = null;
		
		this.visits = new Array();
		
		//initiation function
		this.init = function(){
			//console.log("profile");
			
			//var temp = _this.getTemplate();
			//console.log(temp);
			//return false;
			
			//_this.whatToShow();
			_this.enterExit();
			_this.chooseEvent();
			
			_this.login();
			_this.register();
			_this.codeConfirmation();
			
			
			//_this.getProfile();
			_this.modalNav();
			//_this.getVisits();
			//_this.chooseEvent();
			_this.addVisit();

			if($.cookie("intaToken")){
				//alert(777);
				$("#intaAuthTop").text($.cookie('intaName'));
				_this.getProfile();
				_this.getVisits();
			}
			
			/*if(!$.cookie("intaToken")){
				//_this.login();
				//_this.register();
				//_this.codeConfirmation();
				//_this.modalNav();
			}else{
				_this.getProfile();
				_this.modalNav();
				_this.getVisits();
				//_this.chooseEvent();
				_this.addVisit();
			}*/
			//_this.modalNav();
			
		}
		
		
		this.addVisit = function(){
			$('#btnTopCheckIn').click(function(e){
				e.preventDefault();
				$("#intaAuthTopModal .modal-preload").show();
				
				var event = $(this).attr("data-id");
				//alert(123);
				if($.cookie('intaToken')){
					
					  var urlApiVisit = "https://instasport.co/club/"+apiClub+"/api/v1/client/visit/";
		  			  
		  			  
		  			  $.ajax({
				    	  type: "POST",
				    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
				    	  url: urlApiVisit,
				    	  data: {event: event},
				    	  success: function(dataVisit,status,xhr){
				    		  
				    		  /*if(dataLog.token){
			  	  				  //var urlApiLog = "https://instasport.co/club/test/api/v1/account/login/";
			  	  				  console.log(dataLog.token);
			  	  				  $.cookie('intaToken', dataLog.token);
			  	  			  }*/
				    		  
				    		  _this.getVisits();
				    		  
				    		  $("#btnTopCheckOut").attr("data-id", dataVisit.id);
				    		  
				    		  $("#intaAuthTopModal .cm-item").hide();
				    		  $("#intaAuthTopModal .modal-choose-event").hide();
		    				  $("#intaAuthTopModal .cm-check-in-success").show();
		    				  $("#intaAuthTopModal .modal-nav").hide();
		    				  $("#intaAuthTopModal .modal-body").show();
		    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
				    		  
				    	  },
				    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		    				  //alert("some error");
		    				  
				    		  /*$(".form-group.field-apilogin-phone").addClass("has-error")
		    				  	.find(".help-block").text("Номер не зарегистрирован"); */
		    				  
		    				  //$(".form-group .field-apiregister-phone").addClass("has-error");
				    		  $("#intaAuthTopModal .cm-item").hide();
				    		  $("#intaAuthTopModal .modal-choose-event").hide();
		    				  $("#intaAuthTopModal .cm-check-in-error").show();
		    				  $("#intaAuthTopModal .modal-nav").hide();
		    				  $("#intaAuthTopModal .modal-body").show();
		    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
				    	  }
				    	  //dataType: dataType
				      });
					
				}
			});
			
			$('#intaAuthTopModal').on('click', '#btnTopCheckOut', function(e){
				e.preventDefault();
				var id = $(this).attr("data-id");
				//alert(id);
				_this.removeVisit(id, 'close');
			});
		}
		
		
		this.chooseEvent = function(){
			
			$(".mycalendar table tr td, #calendarModal .modal-body, #events-on-day, .myweekcalendar").on("click", ".eventItem", function(e){
			//$(".eventItem").on("click", function(e){ 
				e.preventDefault();
				
				if(!$.cookie('intaToken')){
					$("#intaAuthTopModal .modal-choose-event").hide();
					$("#intaAuthTopModal").modal("show");
					return false;
				}
				
				var today = new Date();
				//console.log(today);
				
				var dayToday = today.getDate();
				if(dayToday == 1 ||
						dayToday == 2 ||
						dayToday == 3 ||
						dayToday == 4 ||
						dayToday == 5 ||
						dayToday == 6 ||
						dayToday == 7 ||
						dayToday == 8 ||
						dayToday == 9){
					dayToday = "0"+dayToday;
				}
				
				var monthToday = today.getMonth();
				monthToday = parseInt(monthToday) + 1;
				if(monthToday == 1 ||
						monthToday == 2 ||
						monthToday == 3 ||
						monthToday == 4 ||
						monthToday == 5 ||
						monthToday == 6 ||
						monthToday == 7 ||
						monthToday == 8 ||
						monthToday == 9){
					monthToday = "0" + String(monthToday);
				}
				
				var yearToday = today.getFullYear();
				
				var dateToday = monthToday+"/"+dayToday+"/"+yearToday;
				//console.log(dateToday);
				
				
				var eventDate = $(this).attr("data-date");
				var eventTime = $(this).attr("data-time");
				//var myDate="26-02-2012";
				eventDate = eventDate.split("-");
				var newDate = eventDate[1]+"/"+eventDate[2]+"/"+eventDate[0];
				//var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
				var timestampNewDate = new Date(newDate+" "+eventTime).getTime();
				var timestampTodayDate = new Date(dateToday).getTime();
				//alert(new Date(newDate).getTime()+"\n"+new Date(dateToday).getTime());
				//console.log(new Date("02/26/2012").getTime()+"\n"+new Date("02/26/2012 20:00:00").getTime());
				//var date = Date.now();
				//alert(date);
				
				var timestampNow = Date.now();
				
				if(timestampNewDate < timestampNow){
					alert("Вы не можете записаться на прошедшую тренировку!");
					return false;
				}
				
				
				$("#intaAuthTopModal .modal-content").removeAttr("style");
				$("#intaAuthTopModal .modal-preload").show();
				$("#intaAuthTopModal .modal-nav").hide();
				$("#intaAuthTopModal .modal-body").hide();
				//$("#intaAuthTopModal .modal-content").removeAttr("style");
				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-title span").text("");
  				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-hall span").text("");
  				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-price span").text("");
  				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-date span").text("");
  				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-time span").text("");
  				$("#intaAuthTopModal .modal-choose-event .temp").find(".cm-duration span").text("");
  				
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-title span").text("");
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-hall span").text("");
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-price span").text("");
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-date span").text("");
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-time span").text("");
  				$("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-duration span").text("");
  				
				$("#intaAuthTopModal .modal-choose-event").show();
				
				var _this = this;
				var id = $(_this).attr("data-id");
				$('#btnTopCheckIn').attr("data-id", id);
				
				var template = $(_this).attr("data-template");
				//console.log(hallTitle);
				//return false;
				
				//alert($.cookie('intaToken'));
				//if($.cookie('intaToken')){
					//alert(777);
					var urlApiTemp = "https://instasport.co/club/"+apiClub+"/api/v1/eventtemplates/?id="+template;
					$.ajax({
				    	  type: "GET",
				    	  url: urlApiTemp,
				    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
				    	  //data: {key: obj.key, code: obj.code, username: phone},
				    	  success: function(dataTemp,status,xhr){
				    		  
				    		  
				    		  
				    		    var title = $(_this).attr("data-title");
				    			var hallNum = $(_this).attr("data-hall");
				    			var date = $(_this).attr("data-date");
				    			var time = $(_this).attr("data-time");
				    			var price = dataTemp[0].price;
				    			var duration = dataTemp[0].duration;
				    			var hallTitle = "";
				    			
				    			$.ajax({
				    		    	  type: "GET",
				    		    	  //async: false,
				    		    	  url: "https://instasport.co/club/"+apiClub+"/api/v1/hall/"+hallNum,
				    		    	  //data: {key: obj.key, code: obj.code, username: phone},
				    		    	  success: function(dataHalls,status,xhr){
				    		    		  
				    		    		  //var obj = JSON.parse(data);
				    		    		  //console.log(dataHalls.title);
				    		    		  //hallTitle = dataHalls.title;
				    		    		  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-title span").text(title);
				    		  			  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-hall span").text(dataHalls.title);
				    		  			  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-price span").text(price+" грн.");
				    		  			  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-date span").text(date);
				    		  			  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-time span").text(time);
				    		  			  $("#intaAuthTopModal .modal-body .cm-check-in-success .temp").find(".cm-duration span").text(duration);
				    		  				
				    		  				
				    		    		  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-title span").text(title);
					  	  				  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-hall span").text(dataHalls.title);
					  	  				  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-price span").text(price+" грн.");
					  	  				  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-date span").text(date);
					  	  				  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-time span").text(time);
					  	  				  $("#intaAuthTopModal .modal-choose-event .temp").find(".cm-duration span").text(duration);
					  	  				  
					  	  				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
					  	  				  
					  	  				  
				    		    		  
				    		    	  }
				    		    });
				    		  //var obj = dataTemp;
				    		  //if(dataLog.token){
			  	  				  //var urlApiLog = "https://instasport.co/club/test/api/v1/account/login/";
			  	  				  //console.log(dataTemp[0]);
			  	  				  //$("#calendarModal22 .cm-check-in .temp").find(".title span").text(dataTemp[0].title);
			  	  				  //$("#calendarModal22 .cm-check-in .temp").find(".price span").text(dataTemp[0].price);
			  	  				  //$("#calendarModal22 .cm-check-in .temp").find(".duration span").text(dataTemp[0].duration);
			  	  				  //$.cookie('intaToken', dataLog.token);
			  	  			  //}
				    		  
				    	  },
				    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		  				  //alert("some error");
			  				  //$(".form-group.field-apilogin-phone").addClass("has-error")
			  				  	//.find(".help-block").text("Номер не зарегистрирован"); 
		  				  
		  				  //$(".form-group .field-apiregister-phone").addClass("has-error");
						  }
				    	  //dataType: dataType
				    });
					//$("#calendarModal22 .cm-check-in")
				//}
				$("#intaAuthTopModal").modal("show");
			});
			
			
			
		}
		
		
		this.modalClearInputs = function(){
			$("#apiTopLogin").val("");
			$("#apiTopLoginEmail-email").val("");
			$("#apiTopLoginEmail-password").val("");
			
			$("#apiTopRegisterEmail-email").val("");
			$("#apiTopRegisterEmail-first_name").val("");
			$("#apiTopRegisterEmail-last_name").val("");
			$("#apiTopRegisterEmail-password").val("");
			$("#apiTopRegisterEmail-password_confirm").val("");

			$("#apiTopRegister").val("");
			$("#apiTopFirstName").val("");
			$("#apiTopLastName").val("");

			$("#apiTopCode").val("");
			
			
			$("#intaAuthTopModal .field-apiTopLogin").removeClass("has-error").find(".help-block").text("");
			$("#intaAuthTopModal .field-apiTopRegister").removeClass("has-error").find(".help-block").text("");
			$("#intaAuthTopModal .field-apiTopFirstName").removeClass("has-error").find(".help-block").text("");
			$("#intaAuthTopModal .field-apiTopLastName").removeClass("has-error").find(".help-block").text("");
			
			$("#intaAuthTopModal .modal-auth .nav-1 li").removeClass("active").eq(0).addClass("active");
			$("#intaAuthTopModal .modal-auth .tab-content-1>div")
				.removeClass("active")
				.removeClass("in")
				.eq(0)
				.addClass("active")
				.addClass("in");
		}
		
		
		this.modalNav = function(){
			
			//Event CLICK on CM-NAVBAR-TOGGLE
			$("#intaAuthTopModal").on("click", ".cm-navbar-toggle", function(e){
				e.preventDefault();
				//alert(111);
				$("#intaAuthTopModal .modal-nav").fadeIn(400);
				$("#intaAuthTopModal .modal-content").css({"height":"200px"});
			});

			$("#intaAuthTopModal").on("click", ".cm-navbar-toggle-2", function(e){
				e.preventDefault();
				//alert(111);
				$("#intaAuthTopModal .modal-choose-event").hide();
				$("#intaAuthTopModal .modal-body").show();
				$("#intaAuthTopModal .modal-nav").fadeIn(400);
				$("#intaAuthTopModal .modal-content").css({"height":"200px"});
			});
			
			//Event CLICK on MODAL-NAV-CLOSE
			$("#intaAuthTopModal .modal-nav").on("click", ".modal-nav-close", function(e){
				//alert(111);
				e.preventDefault();
				$("#intaAuthTopModal .modal-nav").fadeOut(400);
				$("#intaAuthTopModal .modal-content").removeAttr("style");
			});
			
			//Event CLICK on MODAL-NAV-PROFILE
			$("#intaAuthTopModal .modal-nav").on("click", ".modal-nav-profile", function(e){
				e.preventDefault();
				$("#intaAuthTopModal .modal-content").removeAttr("style");
				//alert("modal-nav-profile");
				$("#intaAuthTopModal .cm-item").hide();
				$("#intaAuthTopModal .cm-profile").show();
				$("#intaAuthTopModal .modal-nav").fadeOut(400);
				//$("#intaAuthTopModal .modal-nav").fadeOut(400);
			});
			
			//Event CLICK on MODAL-NAV-ORDER-VISIT
			$("#intaAuthTopModal .modal-nav").on("click", ".modal-nav-order-visit", function(e){
				e.preventDefault();
				//$("#intaAuthTopModal .modal-content").removeAttr("style");
				_this.orderVisitButton();
				//alert("modal-nav-order-visit");
				//$("#intaAuthTopModal .modal-nav").fadeOut(400);
			});
			
			//Event CLICK on MODAL-NAV-LOGOUT
			$("#intaAuthTopModal .modal-nav, #intaAuthTopModal .modal-choose-event").on("click", ".modal-nav-logout", function(e){
				e.preventDefault();
				//$("#intaAuthTopModal .modal-content").removeAttr("style");
				if(confirm("Вы действительно хотите выйти?")){
					_this.logout();
				}
				//alert("modal-nav-order-visit");
				//$("#intaAuthTopModal .modal-nav").fadeOut(400);
			});
			
			//Event CLICK on MODAL-NAV-VISIT
			$("#intaAuthTopModal .modal-nav").on("click", ".modal-nav-visit", function(e){
				e.preventDefault();
				$("#intaAuthTopModal .modal-content").removeAttr("style");
				//alert("modal-nav-visit");
				//$("#intaAuthTopModal .modal-nav").fadeOut(400);
				
				//alert(_this.profileId);
				//return false;
				//_this.getVisits();
				//console.log(_this.visits.length);
				//console.log(_this.visits);
				$("#intaAuthTopModal .cm-visit").text("");
				_this.drawVisits();
				//var k = null;
				/*$("#intaAuthTopModal .cm-visit").append("<table><tr>"
						+"<td></td>"
						+"<td>Название</td>"
						+"<td>Длитель.</td>"
						+"<td>Цена</td><td></td>"
						+"</tr></table>");
				for(var i = 0; i < _this.visits.length; i++){
					var k = i;
					k++;
					$("#intaAuthTopModal .cm-visit").append("<table><tr>"
							+"<td>"+k+".</td>"
							+"<td>"+_this.visits[i].title+"</td>"
							+"<td>"+_this.visits[i].duration+"</td>"
							+"<td>"+_this.visits[i].price+" грн.</td>"
							+"<td><a class='visit-disable' data-visit-id='"+_this.visits[i].id+"' href='#'>Отменить</a></td>"
							+"</tr></table>");
				}*/
				
				$("#intaAuthTopModal .cm-item").hide();
				$("#intaAuthTopModal .cm-visit").show();
				$("#intaAuthTopModal .modal-nav").fadeOut(400);
				
				/*
				$("#intaAuthTopModal .cm-visit table td").on("click", "a.visit-disable", function(e){
					e.preventDefault();
					var visitId = $(this).attr("data-visit-id");
					
					_this.removeVisit(visitId)
				});*/
				//alert(_this.profileId);
				//return false;
	  			  
	  			
			});
		}
		
		
		this.drawVisits = function(){
			
			console.log(_this.visits);
			
			if(_this.visits.length > 0){
				$("#intaAuthTopModal .cm-visit").text("");
				//var k = null;
				$("#intaAuthTopModal .cm-visit").append("<table><tr>"
						+"<td></td>"
						+"<td>Название</td>"
						//+"<td>Длитель.</td>"
						+"<td></td><td></td>"
						+"</tr></table>");
				for(var i = 0; i < _this.visits.length; i++){
					var k = i;
					k++;
					$("#intaAuthTopModal .cm-visit").append("<div class='cm-visit-item'><table><tr>"
							+"<td>"+k+".</td>"
							+"<td>"+_this.visits[i].title+"</td>"
							//+"<td>"+_this.visits[i].duration+"</td>"
							//+"<td>"+_this.visits[i].price+" грн.</td>"
							+"<td><a class='visit-disable' data-visit-id='"+_this.visits[i].id+"' href='#'>Отменить</a></td>"
							+"<td><a class='visit-more' data-visit-arr-index='"+i+"' href='#'>Подробнее</a></td>"
							+"</tr>"
							+"<tr>"
							+"<td colspan='4'>"
							+"<div>Цена: <span>"+_this.visits[i].price+" грн.</span></div>"
							+"<div>Дата: <span>"+_this.visits[i].date.split("T")[0]+"</span></div>"
							+"<div>Начало: <span>"+_this.visits[i].date.split("T")[1].split("+")[0]+"</span></div>"
							+"<div>Продолжительность: <span>"+_this.visits[i].duration+"</span></div>"
							+"<div>Зал: <span>"+_this.visits[i].hall+"</span></div>"
							+"</td>"
							+"</tr>"
							+"</table></div>");
				}
				
				$("#intaAuthTopModal .cm-visit table td").on("click", "a.visit-disable", function(e){
					e.preventDefault();
					var visitId = $(this).attr("data-visit-id");
					
					if(confirm("Вы действительно хотите отменить тренировку?")){
						_this.removeVisit(visitId);
					}
				});
				
				$("#intaAuthTopModal .cm-visit table td").on("click", "a.visit-more", function(e){
					e.preventDefault();
					$("#intaAuthTopModal .cm-visit .cm-visit-item").removeClass("show-more");
					$(this).closest(".cm-visit-item").addClass("show-more");
				});
				
				$("#intaAuthTopModal .modal-preload").fadeOut(200);
			}else{
				$("#intaAuthTopModal .cm-visit").html("Вы не записаны ни на одну тренировку!<br><a class='order-visit' href='#'>Записаться на тренировку</a>");
				$("#intaAuthTopModal .modal-preload").hide();
				$("#intaAuthTopModal .cm-visit").on("click", "a.order-visit", function(e){
					e.preventDefault();
					_this.orderVisitButton();
				});
				
			}
			
		}
		
		
		this.logout = function(){
			if($.removeCookie('intaToken')){
				_this.modalClearInputs();
				$("#intaAuthTop").text("Регистрация & Войти");
				$("#intaAuthTopModal .cm-item").hide();
				$("#intaAuthTopModal .modal-nav").hide();
				$("#intaAuthTopModal .modal-body").hide();
				$("#intaAuthTopModal .modal-choose-event").hide();
				$("#intaAuthTopModal .modal-auth").show();
				$("#intaAuthTopModal .modal-content").removeAttr("style");
				//_this.login();
				//_this.register();
				//_this.codeConfirmation();
			}
		}
		
		
		this.orderVisitButton = function(){
			$("#intaAuthTopModal").modal("hide");
			var target_offset = $(".mycalendar").offset();
	        var target_top = (target_offset.top - 100);
	        
	        //console.log(target_top);

	        //goto that anchor by setting the body scroll top to anchor top
	        //$('html, body').animate({scrollTop:target_top}, 1500, 'easeInSine');
	        $('html, body').animate({
		        scrollTop: target_top
		    }, 500);
		}
		
		
		this.removeVisit = function(id, action=null){
			//console.log(id);
			$("#intaAuthTopModal .modal-preload").fadeIn(200);
			
			var urlApiEventDelete = "https://instasport.co/club/"+apiClub+"/api/v1/client/visit/"+id+"/";
			$.ajax({
		    	  type: "DELETE",
		    	  //indexValue: i,
		    	  url: urlApiEventDelete,
		    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
		    	  //data: {key: obj.key, code: obj.code, username: phone},
		    	  success: function(dataEvent,status,xhr){
		    		  
		    		  _this.getVisits();
		    		  //console.log(_this.visits[(_this.visits.length - 1)]);
		    		  
		    		  
		    		  setTimeout(function(){
    					  _this.drawVisits();
    				  }, 2000);
		    		  
		    		  /*
			    		  var intervalForVisits = setInterval(function(){
			    			  if(_this.visits.length < 1){
			    				  clearInterval(intervalForVisits);
			    				  if(action == null){
			    					  $("#intaAuthTopModal .modal-preload").hide();
			    					  //_this.drawVisits();
			    				  }
			    			  }
			    			  //console.log(_this.visits[(_this.visits.length - 1)]); 
			    			  if(_this.visits[(_this.visits.length - 1)] == undefined){
			    				  //_this.drawVisits(); 
			    				  //console.log(_this.visits[(_this.visits.length - 1)]);
			    				  console.log("bad");  
			    				  //clearInterval(intervalForVisits);
			    			  }else{
			    				  console.log("good!");
			    				  console.log(_this.visits); 
			    				  //console.log(_this.visits[(_this.visits.length - 1)]);
			    				  
			    				  setTimeout(function(){
			    					  _this.drawVisits(); 
			    				  }, 2000);
			    				  //_this.drawVisits();
			    				  
			    				  clearInterval(intervalForVisits);
			    				  
			    			  }
			    			  //console.log(_this.visits[(_this.visits.length - 1)]);
			    		  }, 100);
		    		  	*/
		    		  
		    		  if(action == 'close'){
		    			  $("#intaAuthTopModal").modal("hide");
		    			  $("#intaAuthTopModal .modal-preload").hide();
		    		  }
		    			
		    	  },
		    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		    		  
		    		  alert("Ошибка отмены!");
		    		  $("#intaAuthTopModal .modal-preload").hide();
		    		  //return "error";
	  				  //$(".form-group.field-apilogin-phone").addClass("has-error")
	  				  //	.find(".help-block").text("Номер не зарегистрирован"); 
				  
				  }
			 });
		}
		
		
		this.getVisits = function(){
			
			//var getVisitsThis = this;
			_this.visits = new Array();
			
			var urlApiVisit = "https://instasport.co/club/"+apiClub+"/api/v1/client/visit/?user="+_this.profileId;
			$.ajax({
		    	  type: "GET",
		    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
		    	  url: urlApiVisit,
		    	  //data: {event: event},
		    	  success: function(dataVisit,status,xhr){
		    		  
		    		  var visits = dataVisit.results;
		    		  //console.log("length: "+visits.length);
		    		  //console.log(dataVisit.results.length);
		    		  for(var i=0; i<visits.length; i++){ 
		    			  //console.log(_this.getTemplate(49636));
		    			  //$("#intaAuthTopModal .cm-visit").append("<>");
		    			  _this.visits[i] = {};
		    			  _this.visits[i].id = visits[i].id;
		    			  //var dataVisitId = dataVisit.id;
		    			  //callbackTemp(i);
		    			  //var curI = i;
		    			  
		    			  var urlApiEvent = "https://instasport.co/club/"+apiClub+"/api/v1/admin/events/?id="+visits[i].event;
		    			  $.ajax({
	    			    	  type: "GET",
	    			    	  indexValue: i,
	    			    	  url: urlApiEvent,
	    			    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
	    			    	  //data: {key: obj.key, code: obj.code, username: phone},
	    			    	  success: function(dataEvent,status,xhr){
	    			    		  
	    			    		  //var ind = this.indexValue;
	    			    		  _this.visits[this.indexValue].date = dataEvent[0].date;
	    			    		  //_this.visits[this.indexValue].hall = dataEvent[0].hall;//
	    			    		  
	    			    		  /*$(".shedule .cld-tabs .cld-tab").each(function(ind){
	    			    			  if($(this).attr("data-hall-id") == dataEvent[0].hall){
	    			    				  _this.visits[ind].hall = $(this).text();
	    			    				  return false
	    			    			  }
	    			    		  });*/
	    			    		  
	    			    		  //callbackTemp(i);
	    			    		  var urlApiTemp = "https://instasport.co/club/"+apiClub+"/api/v1/eventtemplates/?id="+dataEvent[0].template;
	    		    			  $.ajax({
	    	    			    	  type: "GET",
	    	    			    	  indexValue2: this.indexValue,
	    	    			    	  url: urlApiTemp,
	    	    			    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
	    	    			    	  //data: {key: obj.key, code: obj.code, username: phone},
	    	    			    	  success: function(dataTemp,status,xhr){
	    	    			    		  
	    	    			    		  //console.log(dataTemp);
	    	    			    		  //console.log(dataTemp[0].title+" | "+dataTemp[0].duration+" | "+dataTemp[0].price);
	    	    			    		  //_this.visits[i] = new Array();
	    	    			    		  //console.log(this.indexValue);
	    	    			    		  /*_this.visits[this.indexValue2] = {
	    	    			    			  'title': dataTemp[0].title,
	    	    			    			  'duration': dataTemp[0].duration,
	    	    			    			  'price': dataTemp[0].price
	    	    			    		  };*/
	    	    			    		  _this.visits[this.indexValue2].title = dataTemp[0].title;
	    	    			    		  _this.visits[this.indexValue2].duration = dataTemp[0].duration;
	    	    			    		  _this.visits[this.indexValue2].price = dataTemp[0].price;
	    	    			    		  _this.visits[this.indexValue2].hall = $(".switch-halls-mycalendar .switch-btn[data-hall-id="+dataTemp[0].hall+"]").text();
	    	    			    		  //callbackTemp(this.indexValue2);
	    	    			    		  //console.log(dataTemp[0].duration);
	    	    			    		  //console.log(dataTemp[0].duration);
	    	    			    		  //return false;
	    	    			    			
	    	    			    	  },
	    	    			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    			    		  
	    	    			    		  //return "error";
	    	    		  				  //$(".form-group.field-apilogin-phone").addClass("has-error")
	    	    		  				  //	.find(".help-block").text("Номер не зарегистрирован"); 
	    	    	  				  
	    	    					  }
	    		    			  });
	    			    		  
	    			    			
	    			    	  },
	    			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    			    		  
	    			    		  //return "error";
	    		  				  //$(".form-group.field-apilogin-phone").addClass("has-error")
	    		  				  //	.find(".help-block").text("Номер не зарегистрирован"); 
	    	  				  
	    					  }
		    			  });
		    			  
		    		  }
		    		  //$("#calendarModal22 .cm-item").hide();
  				  //$("#calendarModal22 .cm-check-in-success").show();
		    		  
		    	  },
		    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
  				  //alert("some error");
  				  
		    		  /*$(".form-group.field-apilogin-phone").addClass("has-error")
  				  	.find(".help-block").text("Номер не зарегистрирован"); */
  				  
  				  //$(".form-group .field-apiregister-phone").addClass("has-error");
		    		  //$("#calendarModal22 .cm-item").hide();
  				  //$("#calendarModal22 .cm-check-in-error").show();
		    	  }
		    	  //dataType: dataType
		    });
			
			
			//return false;
			
		}
		
		
		this.getProfile = function(){
			
			  var urlApiProfile = "https://instasport.co/club/"+apiClub+"/api/v1/client/profile/";
			  
			  $.ajax({
		    	  type: "GET",
		    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
		    	  url: urlApiProfile,
		    	  //data: {event: event},
		    	  success: function(dataProfile,status,xhr){
		    		  
		    		  _this.profileFirstName = dataProfile[0].first_name;
		    		  _this.profilePhone = dataProfile[0].phone;
		    		  _this.profileEmail = dataProfile[0].email;
		    		  _this.profileLastName = dataProfile[0].last_name;
		    		  _this.profileId = dataProfile[0].id;
		    		  _this.profileRegistered = (dataProfile[0].date_joined).split("T")[0];
		    		  
		    		  //console.log(dataProfile[0].id);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-first-name").text(dataProfile[0].first_name);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-phone").text(dataProfile[0].phone);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-email").text(dataProfile[0].email);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-last-name").text(dataProfile[0].last_name);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-id").text(dataProfile[0].id);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-registered").text((dataProfile[0].date_joined).split("T")[0]);
		    		  
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-first-name-small").text(dataProfile[0].first_name);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-phone-small").text(dataProfile[0].phone);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-email-small").text(dataProfile[0].email);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-last-name-small").text(dataProfile[0].last_name);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-id-small").text(dataProfile[0].id);
		    		  $("#intaAuthTopModal .cm-profile .cm-profile-registered-small").text((dataProfile[0].date_joined).split("T")[0]);
		    		  
		    		  
		    		  $("#intaAuthTopModal .modal-choose-event h4 span").text(dataProfile[0].first_name);
		    		  
		    		  //$("#intaAuthTopModal .modal-nav")
		    		  /*if(dataLog.token){
	  	  				  //var urlApiLog = "https://instasport.co/club/test/api/v1/account/login/";
	  	  				  console.log(dataLog.token);
	  	  				  $.cookie('intaToken', dataLog.token);
	  	  			  }*/
		    		  
		    		  //$("#calendarModal22 .cm-item").hide();
		    		  //$("#calendarModal22 .cm-check-in-success").show();
		    		  
		    	  },
		    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
  				  //alert("some error");
  				  
		    		  /*$(".form-group.field-apilogin-phone").addClass("has-error")
  				  	.find(".help-block").text("Номер не зарегистрирован"); */
  				  
  				  //$(".form-group .field-apiregister-phone").addClass("has-error");
		    		  $("#calendarModal22 .cm-item").hide();
		    		  $("#calendarModal22 .cm-check-in-error").show();
		    	  }
		    	  //dataType: dataType
		      });
			
		}
		
		this.enterExit = function(){
			//console.log("profile");
			
			$("#intaAuthTop").click(function(e){
				e.preventDefault();
				console.log("click");
				$("#intaAuthTopModal .modal-choose-event").hide();
				if($.cookie("intaToken")){
					//$("#calendarModal22 .cm-item").hide();
					$("#intaAuthTopModal .modal-content").css({"height":"200px"});
					$("#intaAuthTopModal .modal-body").show();
				}else{
					
				}
				$("#intaAuthTopModal").modal("show");
			});
			
			$("#intaAuthTopModal .modal-header").on("click", ".modal-close", function(e){
				e.preventDefault();
				$("#intaAuthTopModal").modal("hide");
			});
			
			
			$("#intaAuthTopModal").on('show.bs.modal', function () {
	            //alert('The modal is now hidden.');
				$("#calendarModal22 .cm-item").hide();
				//$("#intaAuthTopModal .modal-choose-event").hide();
				if($.cookie("intaToken")){
					//$("#calendarModal22 .cm-item").hide();
					//$("#intaAuthTopModal .modal-content").css({"height":"200px"});
					$("#intaAuthTopModal .cm-navbar-toggle").show();
					$("#intaAuthTopModal .modal-nav").show();
				}else{
					_this.modalClearInputs();
					//$("#calendarModal22 .cm-item").hide();
					$("#intaAuthTopModal .modal-auth").show();
					$("#intaAuthTopModal .modal-content").removeAttr("style");
					$("#intaAuthTopModal .cm-navbar-toggle").hide();
					$("#intaAuthTopModal .modal-nav").hide();
					$("#intaAuthTopModal .modal-body .cm-auth").show();
					$(".modal-code-confirm").hide();
				}
				
		    });
			
			
			$("#intaAuthTopModal .cm-check-in-success").on("click", ".btn-close", function(e){
				e.preventDefault();
				$("#intaAuthTopModal").modal("hide");
			});
			
			
		}
		
		
		this.whatToShow = function(){
			if($.cookie("intaToken")){
				alert($.cookie("intaToken"));
			}else{
				alert("cookie is not set!");
			}
		}
		
		
		this.register = function(){
			
			$('#api-top-register').on('submit', function (e) {
				e.preventDefault();
				
				$("#intaAuthTopModal .modal-preload").fadeIn(200);
				//var url = "http://"+document.location.host+"/site/api";
				var phone = $("#apiTopRegister").val();
				var firstName = $('#apiTopFirstName').val();
				var lastName = $('#apiTopLastName').val(); 
			    //console.log(phone+" | "+url);
			    
			    //return false;
			    
			    
	    		  //var obj = JSON.parse(result);
	    		  //var urlApiLog = "https://instasport.co/club/acro/api/v1/phone/login/";
	    		  var urlApiReg = "https://instasport.co/club/"+apiClub+"/api/v1/phone/signup/";
	  			  
	  			  $.ajax({
			    	  type: "POST",
			    	  url: urlApiReg,
			    	  //contentType: 'application/json',
			    	  //dataType: "json",
			    	  //data: {key: obj.key, code: obj.code, phone: phone},
			    	  data: {key: apiKey, code: apiCode, phone: phone, first_name: firstName, last_name: lastName},
			    	  success: function(dataLog,status,xhr){
			    		  
			    		  
			    		  //console.log(dataLog.non_field_errors);
			    		  $("form#api-top-code").attr("data-action", "reg");
			    		  $("#intaAuthTopModal .modal-auth").hide();
			    		  $("#intaAuthTopModal .modal-body").hide();
			    		  $("#intaAuthTopModal .modal-code-confirm .control-label").html("Код подтверждения<br>отправлен на телефон<br>"+phone);
	    				  $("#intaAuthTopModal .modal-code-confirm").show();
	    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
			    		  
			    	  },
			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    				 
			    		  var obj22 = JSON.parse(XMLHttpRequest.responseText);
			    		  //console.log(obj22.non_field_errors[0]);
			    		  var textError = obj22.non_field_errors[0];
			    		  $("#apiTopRegister-error").text(textError); 
			    		  $("#intaAuthTopModal .modal-preload").fadeOut(200);
	    				  
    				  }
			    	  
			      });
			    
			});
			
			
			
			$('#api-top-register-email').on('submit', function (e) {
				e.preventDefault();
				
				
				$("#intaAuthTopModal .modal-preload").fadeIn(200);
				//var url = "http://"+document.location.host+"/site/api";
				var email = $("#apiTopRegisterEmail-email").val();
				var firstName = $('#apiTopRegisterEmail-first_name').val();
				var lastName = $('#apiTopRegisterEmail-last_name').val(); 
				var password = $('#apiTopRegisterEmail-password').val();
			    


	    		  var urlApiReg = "https://instasport.co/club/"+apiClub+"/api/v1/email/signup/";
	  			  
	  			  $.ajax({
			    	  type: "POST",
			    	  url: urlApiReg,
			    	  contentType: 'application/json',
			    	  data: '{ "key" : "'+apiKey+'", "code" : "'+apiCode+'", "email" : "'+email+'", "first_name" : "'+firstName+'", "last_name" : "'+lastName+'", "password" : "'+password+'" }',
			    	  //data: {key: apiKey, code: apiCode, email: email, first_name: firstName, last_name: lastName, password: password},
			    	  success: function(dataLog,status,xhr){
			    		  
			    		  //$("#intaAuthTopModal").modal("hide");
			    		  
			    		  //console.log(dataLog.non_field_errors);
			    		  $("form#api-top-code").attr("data-action", "reg-email");
			    		  $("form#api-top-code .field-apiTopCode label.control-label").text("Код подтверждения отправлен на "+email);
			    		  $("#intaAuthTopModal .modal-auth").hide();
			    		  $("#intaAuthTopModal .modal-body").hide();
	    				  $("#intaAuthTopModal .modal-code-confirm").show();
	    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
	    				  
	    				  //alert("Вы успешно зарегистрировались, для продолжения введите код отправленный на ваш email - "+email);
			    		  
			    	  },
			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    				 
			    		  var obj22 = JSON.parse(XMLHttpRequest.responseText);
			    		  //console.log(obj22.non_field_errors[0]);
			    		  var textError = obj22.non_field_errors[0];
			    		  $("#apiTopRegisterEmail-password-error").text(textError); 
			    		  $("#intaAuthTopModal .modal-preload").fadeOut(200);
	    				  
    				  }
			    	  
			      });
			    		  
			    			    
			});
			
			
			
		}
		
		
		this.login = function(){
			/*$("#api-top-login").submit(function(e){
				e.preventDefault();
				var phone = $("#apiTopLogin").val();
				//console.log(phone);
				
			});*/
			
			
			$('#api-top-login').on('submit', function (e) {
			    e.preventDefault();
			    /*if (!confirm("Everything is correct. Submit?")) {
			        return false;
			    }
			    return true;*/
				$("#intaAuthTopModal .modal-preload").fadeIn(200);
				//var url = "http://"+document.location.host+"/site/api";
				var phone = $("#apiTopLogin").val();
			    //console.log(phone+" | "+url);
			    
			    //return false;
			    
			    
			    
	    		  var urlApiLog = "https://instasport.co/club/"+apiClub+"/api/v1/phone/login/";
	  			  
	  			  $.ajax({
			    	  type: "POST",
			    	  url: urlApiLog,
			    	  data: {key: apiKey, code: apiCode, phone: phone},
			    	  //dataType: "json",
			    	  success: function(dataLog,status,xhr){
			    		  
						  var phone = $('#apiTopLogin').val();
			    		  //console.log(dataLog.non_field_errors);
			    		  $("form#api-top-code").attr("data-action", "log");
			    		  $("#intaAuthTopModal .modal-auth").hide();
			    		  $("#intaAuthTopModal .modal-body").hide();
			    		  $("#intaAuthTopModal .modal-code-confirm .control-label").html("Код подтверждения<br>отправлен на телефон<br>"+phone);
	    				  $("#intaAuthTopModal .modal-code-confirm").show();
	    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
			    		  
			    	  },
			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    				 
			    		  var obj22 = JSON.parse(XMLHttpRequest.responseText);
			    		  //console.log(obj22.non_field_errors[0]);
			    		  var textError = obj22.non_field_errors[0];
			    		  $("#apiTopLogin-error").text(textError); 
			    		  $("#intaAuthTopModal .modal-preload").fadeOut(200);
	    				  
    				  }
			    	  
			      });
			    		  
			    		
			    
			});
			
			
			
			
			$('#api-top-login-email').on('submit', function (e) {
			    e.preventDefault();
			    //return false;
			    /*if (!confirm("Everything is correct. Submit?")) {
			        return false;
			    }
			    return true;*/
				$("#intaAuthTopModal .modal-preload").fadeIn(200);
				//var url = "http://"+document.location.host+"/site/api";
				var email = $("#apiTopLoginEmail-email").val();
				var password = $("#apiTopLoginEmail-password").val();
			    //console.log(email+" | "+url);
			    
			    var dataSend = {email: email, password: password};
			    //return false;
			    
			    
			    
	    		  var urlApiLog = "https://instasport.co/club/"+apiClub+"/api/v1/email/login/";
	  			  
	    		  dataSend.key = apiKey;
	    		  dataSend.code = apiCode;
	    		  
	  			  $.ajax({
			    	  type: "POST",
			    	  url: urlApiLog,
			    	  //dataType: "json",
			    	  data: dataSend,
			    	  //contentType: 'application/json',
			    	  //data: '{"key" : "'+apiKey+'", "code" : "epYhT\/vrV4ywU6rJT2qJ+niGvuGcv6Xf4CEuQXW\/e\/s=", "email" : "'+email+'", "password" : "'+password+'"}',
			    	  success: function(dataLog,status,xhr){
			    		  
			    		  
			    		  
			    		  
			    		  $.cookie('intaToken', dataLog.token);
	    				  
	    				  var urlProfile = "https://instasport.co/club/"+apiClub+"/api/v1/client/profile/";
	    				  $.ajax({
	    			    	  type: "GET",
	    			    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
	    			    	  url: urlProfile,
	    			    	  //data: {event: event},
	    			    	  success: function(dataProf,status,xhr){
	    			    		  
	    			    		  $.cookie('intaName', dataProf[0].first_name);
	    			    		  //$("#intaAuthTopModal h4.cm-name-client").text(dataProf[0].first_name); 
			    				  $("#intaAuthTopModal .modal-header .modal-title-name").text(dataProf[0].first_name);
			    				  
			    				  //$("#intaAuthTop").text("Тренировки");
			    				  $("#intaAuthTop").text($.cookie('intaName'));
			    				  $("#intaAuthTopModal .cm-navbar-toggle").removeAttr("style");
			    				  
			    				  _this.getProfile();
			    				  _this.getVisits();
			    				  /*_this.getProfile();
			    				  _this.modalNav();
			    				  _this.getVisits();
			    				  _this.chooseEvent();
			    				  //_this.chooseEvent();
			    				  _this.addVisit();*/
			    				  
			    				  $("#intaAuthTopModal .cm-item").hide();
			    				  $("#intaAuthTopModal .modal-code-confirm").hide();
			    				  $("#intaAuthTopModal .modal-content").css({"height":"200px"});
			    				  $("#intaAuthTopModal .modal-body").show();
			    				  $("#intaAuthTopModal .modal-nav").show();
			    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
			    				  $("#intaAuthTopModal .modal-auth").hide();
	    			    		  
	    			    	  },
	    			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    	    				  
	    			    		  
	    			    		  
	    			    	  }
	    			    	  
	    			      });
			    		  
			    		  
			    		  
			    		  
			    		  //console.log(dataLog.non_field_errors);
			    		  //$("form#api-top-code .field-apiTopCode label").text("Код подтверждения отправлен на "+email);
			    		  //$("form#api-top-code").attr("data-action", "log-email");
			    		  //$("#intaAuthTopModal .modal-auth").hide();
			    		  //$("#intaAuthTopModal .modal-body").hide();
	    				  //$("#intaAuthTopModal .modal-code-confirm").show();
	    				  //$("#intaAuthTopModal .modal-preload").fadeOut(200);
			    		  
			    	  },
			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    				 
			    		  var obj22 = JSON.parse(XMLHttpRequest.responseText);
			    		  //console.log(obj22.non_field_errors[0]);
			    		  var textError = obj22.non_field_errors[0]
			    		  $("#apiTopLoginEmail-email-error").text(textError);
			    		  
			    		  $("#intaAuthTopModal .modal-preload").fadeOut(200);
	    				  
    				  }
			    	  
			      });
			    		  
			    		  
			    	  
			    
			});
			
			
			
			
		}
		
		
		
		this.codeConfirmation = function(){
			
			$('#api-top-code').on('submit', function (e){
				e.preventDefault();

				$("#intaAuthTopModal .modal-preload").fadeIn(200);
				
				var action = $("form#api-top-code").attr("data-action");
				//var url = "http://"+document.location.host+"/site/api";
				var code = $('#apiTopCode').val();
				
				if(action == "reg"){
					var phone = $('#apiTopRegister').val();
					var dataSend = {phone: phone, sms: code};
				}else if(action == "log"){
					var phone = $('#apiTopLogin').val();
					var dataSend = {phone: phone, sms: code};
				}else if(action == "reg-email"){
					var email = $('#apiTopRegisterEmail-email').val();
					var dataSend = {email: email, sms: code};
				}else if(action == "log-email"){
					var email = $('#apiTopLoginEmail-email').val();
					var dataSend = {email: email, sms: code};
				}
				
				
			    
			    		  
			    		  dataSend.key = apiKey;
			    		  dataSend.code = apiCode;
			    		  
			    		  if(action == "reg" || action == "log"){
			    			  var urlApiVerify = "https://instasport.co/club/"+apiClub+"/api/v1/phone/verify/";
			    		  }else{
			    			  var urlApiVerify = "https://instasport.co/club/"+apiClub+"/api/v1/email/verify/";
			    		  }
			    		  
			    		  //var urlApiVerify = "https://instasport.co/club/acro/api/v1/phone/verify/";
			    		  $.ajax({
			    			  type: "POST",
			    			  url: urlApiVerify,
			    			  //data: {key: obj.key, code: obj.code, phone: phone, sms: code},
			    			  data: dataSend,
			    			  success: function(data){
			    				  //if(data.status == "user created"){
			    				  //if(data.token){}
			    					  
			    					  
			    					  //console.log(data.token);
				    				  $.cookie('intaToken', data.token);
			    				  
				    				  var urlProfile = "https://instasport.co/club/"+apiClub+"/api/v1/client/profile/";
				    				  $.ajax({
				    			    	  type: "GET",
				    			    	  beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+$.cookie('intaToken'));},
				    			    	  url: urlProfile,
				    			    	  //data: {event: event},
				    			    	  success: function(dataProf,status,xhr){
				    			    		  
				    			    		  $.cookie('intaName', dataProf[0].first_name);
				    			    		  //$("#intaAuthTopModal h4.cm-name-client").text(dataProf[0].first_name); 
						    				  $("#intaAuthTopModal .modal-header .modal-title-name").text(dataProf[0].first_name);
						    				  
						    				  $("#intaAuthTop").text($.cookie('intaName'));
						    				  $("#intaAuthTopModal .cm-navbar-toggle").removeAttr("style");
						    				  
						    				  /*_this.getProfile();
						    				  _this.modalNav();
						    				  _this.getVisits();
						    				  _this.chooseEvent();
						    				  //_this.chooseEvent();
						    				  _this.addVisit();*/
						    				  _this.getProfile();
						    				  _this.getVisits();
						    				  
						    				  $("#intaAuthTopModal .cm-item").hide();
						    				  $("#intaAuthTopModal .modal-code-confirm").hide();
						    				  $("#intaAuthTopModal .modal-content").css({"height":"200px"});
						    				  $("#intaAuthTopModal .modal-body").show();
						    				  $("#intaAuthTopModal .modal-nav").show();
						    				  $("#intaAuthTopModal .modal-preload").fadeOut(200);
				    			    		  
				    			    	  },
				    			    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    				  
				    			    		  
				    			    		  
				    			    	  }
				    			    	  
				    			      });
				    			      
			    			  },
			    			  error: function(XMLHttpRequest, textStatus, errorThrown) {
			    				  //alert("some error");
			    				  $(".form-group.field-apiregister-phone").addClass("has-error")
			    				  	.find(".help-block").text("Номер не подтвержден"); 
			    				  
			    				  //$(".form-group .field-apiregister-phone").addClass("has-error");
		    				  }
			    		  });
			    		  
			    
			});
			
		}
		
		
		
	};
	
	var appAccount = new accountClass();
	appAccount.init();
	
});