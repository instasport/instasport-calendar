<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width">

    <title>Calendar</title>

	<link rel="stylesheet" href="css/bootstrap-grid-12.css"/>
	<link rel="stylesheet" href="js/rasp/css/style.css"/>
	<link rel="stylesheet" href="css/fonts.css"/>
	<link rel="stylesheet" type="text/css" href="js/rasp/libs/fullcalendar/fullcalendar.min.css">

	<!-- 		   		-->
	<link rel="stylesheet" type="text/css" href="css/mycalendars.css">

	<style type="text/css">
		@import url("css/flaticon.css");
		.flaticon-angle-pointing-to-left:before {font-size: 14px; margin-left: 0; margin-right: 5px;}
		body{
			background: #fff;
			min-height: 600px;
			font-family: 'MyriadProRegular', Arial, Helvetica;
			text-align: justify;
			letter-spacing: 1px;
			color: #424242;
		}
		#map h1 {padding:0;}
		.img-club {width: 100%; text-align: center;}
		.img-club img {width: 100%; max-width: 1170px;}
		.header .head-link {position: absolute; top: 0; left: 0;}
		.header .head-name {width: 100%;}
		.container-fluid {background: #4c1e46; padding: 0; position: relative;}

		.fc-toolbar button {font-family: 'Roboto Condensed', sans-serif;}
		.fc button {height: auto; background: #4c1e46;     color: #fff;  text-shadow: none;}
		.fc button.fc-state-active {background: #9c4d92;}
		.fc button.fc-state-hover {background: #73568c;}
		.fc-unthemed .fc-today {
			background: hsla(30, 100%, 57%, 0.25);}

			.cld-tabs .cld-tab {
				padding: 10px;
				margin-bottom: -2px;
				background: #fff;
				border-right: 1px solid #4d346b;
				border-top: 1px solid #4d346b;
				border-left: 1px solid #4d346b;
				border-bottom: 1px solid #4d346b;
				font-size: 18px;
				color: #979797;
				box-sizing: border-box;
				min-height: 30px;
				display: inline-block;
				transition: all .3s ease;
			}
			.cld-tabs .cld-tab:nth-child(2){ margin-left:5px;}

			.cld-tabs .cld-tab:hover{
				background: #CCCCCC;
				color: #868686;
				cursor: pointer;
			}

			.cld-tabs .current{
				background: #ffffff;
				color: #4d346b;
				cursor: pointer;
				font-weight: bold;
				border-bottom: 0;
				padding-bottom: 12px;
			}

			#calendar{
				border: 1px solid #4d346b;
				border-top-right-radius:5px;
				padding: 15px 5px 5px;
				box-sizing: border-box;
				background: rgba(255, 255, 255, 0.77);
			}

			.cld-btn-wrap{
				position: absolute;
				top:50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 165px;
			}

			.cld-btn-wrap .cld-btn{
				background: #e2dbe1;
				color: #868686;
				border: none;
				cursor: pointer;
				padding: 8px 6px 8px 6px;
				text-decoration: none;
				display: block;
				font-size: 14px;
				width: 165px;
				margin-bottom: 5px;
				box-sizing: border-box;
			}

			.cld-btn-wrap .cld-btn:focus{
				outline: none;
			}

			.cld-hall-img-wrap{
				background: #fff;
				border-top: 0;
				border-left: 0;
				float: left;
				position: relative;
				text-align: center;
			}

			.cld-hall-img-wrap .cld-hall-img{
				display: inline-block;
				vertical-align: middle;
			}

			.cld-hall-img-wrap .cld-hall-img-name{
				position: absolute;
				display: block;
				background: rgba(0,0,0,.6);
				bottom: 0;
				left: 0;
				right: 0;
				color: #fff;
				line-height: 30px;
			}


			.cld-instruct-wrap{
				background: #fff;
				border-top:0;
				position: relative;
				margin-bottom: 10px;
				display: none;
				text-align: center;
			}

			.cld-instruct-wrap .cld-instuct-title{
				margin: 8px 0 8px 0;
				color: #868686;
			}

			.cld-instruct-wrap .cld-instruct{
				position: relative;
				display: inline-block;
				margin-right: 32px;
				margin-bottom: 25px;
			}

			.cld-instruct-wrap .cld-instruct-no-img{
				background: #ECECEC;
				border: 1px solid #868686;
				box-sizing: border-box;
				padding: 5px;
			}

			.cld-instruct-wrap .cld-instruct-name{
				position: absolute;
				display: block;
				height: 30px;
				background: rgba(0,0,0,.6);
				bottom: 3px;
				left: 0;
				right: 0;
				color: #fff;
				line-height: 30px;
				font-size: 12px;
				padding: 0 5px 0 5px;
				box-sizing: border-box;
				text-align: center;
			}


			.cld-manager-wrap{
				position: relative;
				margin-bottom: 10px;
				display: none;
			}

			.cld-manager-wrap .cld-manager-title{
				margin: 8px 0 8px 0;
				color: #868686;
			}

			.cld-manager-wrap .cld-manager{
				position: relative;
				display: inline-block;
				margin-right: 10px;
			}

			.cld-manager-wrap .cld-manager .cld-manager-no-img{
				background: #ECECEC;
				box-sizing: border-box;
				padding: 5px;
			}

			.cld-manager-wrap .cld-manager .cld-manager-name{
				position: absolute;
				display: block;
				height: 53px;
				background: rgba(0,0,0,.6);
				bottom: 3px;
				left: 0;
				right: 0;
				color: #fff;
				line-height: 17px;
				font-size: 12px;
				padding: 0 5px 0 5px;
				box-sizing: border-box;
				text-align: center;
			}

			.content h2{
				margin: 20px 0 20px 0;
				padding: 0px;
				
			}

			.header{
				position: relative;
			}

			.header .back-link{
				display: inline-block;
				background: rgb(119, 66, 112);
				color: #fff;
				padding: 10px;
				margin: 0;
				text-decoration: none;
				font-family: 'MyriadProRegular', Arial, Helvetica;
				font-size: 16px;
			}

			.header .club-name{
				color: #fff;
				font-size: 22px;
				font-weight: bold;
				text-shadow: 2px 2px 10px rgba(0,0,0,.6);
				text-align: center;
				padding: 6px; 
				margin-top: 0;
			}

			@media screen and (max-width: 518px){
				body{
					font-size: 16px;
				}

				body h2{
					font-size: 20px;
				}

				.cld-tabs .cld-tab{
					font-size: 14px;
				}
			}

			@media screen and (max-width: 373px){

				body{
					font-size: 14px;
				}

				body h2{
					font-size: 18px;
				}

				.cld-tabs .cld-tab{
					padding: 3px;
					font-size: 14px;
				}
			}

			.header .overlay{
				position: absolute;
				left: 0px;
				top: 0px;
				right: 0px;
				bottom: 0px;
				background: rgba(0,0,0,.2);
			}
		</style>
</head>

	<body>

		<!--<div class="container content">
			<div class="row">
				<div class="col-md-12">-->

					<?php include("mycalendar.php");?>

					<div class="calen-tab">
						<div class="cld-tabs"></div>
					</div>
					<div id="calendar"></div>
					
		<!--		</div>
			</div>
		</div>-->

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

        <script type="text/javascript">
        	function getUrlVars() {
                var vars = {};
                var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
                function(m,key,value) {
                    vars[key] = value;
                });
            return vars;
        }
        </script>

		<script>
			function getParam(name) {
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
				return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}
			var clubName = getParam('title');

			//console.log('club slug ' + clubName);

		</script>

		<script type="text/javascript" src="js/rasp/libs/moment-with-locales.min.js"></script>
		<script type="text/javascript" src="js/rasp/libs/fullcalendar/fullcalendar.min.js"></script>
		<script type="text/javascript" src="js/rasp/libs/fullcalendar/lang/ru.js"></script>
		<script type="text/javascript" src="js/rasp/main.js"></script>
		<script type="text/javascript" src="js/profile.js"></script>

			
	</body>

</html>
