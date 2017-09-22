<!--	MYCALENDAR DESKTOP		-->
<div class="for-mycalendar-desktop">
<div class="mycalendar-desktop">
	
	<!--	SWITCH HALLS OF MYCALENDAR	-->
	<div class="switch-halls-mycalendar"></div><!--	/SWITCH HALLS OF MYCALENDAR	-->
	
	<!--	SWITCH TYPE OF MYCALENDAR	-->
	<div class="switch-type-mycalendars">
		<span class="active month switch-btn" data-type-cal="month">Месяц</span>
		<span class="week switch-btn" data-type-cal="agendaWeek">Неделя</span>
		<!--<button class="day" data-type-cal="day">День</button>-->
	</div><!--	/SWITCH TYPE OF MYCALENDAR	-->



	<!--	ALL MYCALENDARS	-->
	<div class="mycalendars">

		<!--	MONTH TYPE MYCALENDAR	-->
		<div class="mycalendar mymonthcalendar">
			<table>
				<thead>
					<tr>
					    <td colspan="8">
							<div class="calendar-title">
								<a class="prev" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
								<a class="next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
								<div class="today"></div>
							</div>
						</td>
					</tr>
					<tr>
					    <td class="mondayName">
					    	<div class="tinyName">Пн.</div>
					    	<div class="fullName">Понедельник</div>
					    </td>
					    <td class="tuesdayName">
					    	<div class="tinyName">Вт.</div>
					    	<div class="fullName">Вторник</div>
					    </td>
					    <td class="wednesdayName">
					    	<div class="tinyName">Ср.</div>
					    	<div class="fullName">Среда</div>
					    </td>
					    <td class="thursdayName">
					    	<div class="tinyName">Чт.</div>
					    	<div class="fullName">Четверг</div>
					    </td>
					    <td class="fridayName">
					    	<div class="tinyName">Пт.</div>
					    	<div class="fullName">Пятница</div>
					    </td>
					    <td class="saturdayName">
					    	<div class="tinyName">Сб.</div>
					    	<div class="fullName">Суббота</div>
					    </td>
					    <td class="sundayName">
					    	<div class="tinyName">Вс.</div>
					    	<div class="fullName">Воскресенье</div>
					    </td>
					</tr>
				</thead>
				<tbody>
					
					<?php
						$weekDays = array('1'=>'monday',
											'2'=>'tuesday',
											'3'=>'wednesday',
											'4'=>'thursday',
											'5'=>'friday',
											'6'=>'saturday',
											'7'=>'sunday');
					?>
					<?php for($i=1; $i<=6; $i++):?>
					<!--    WEEK    -->
					<tr>

						<?php for($k=1; $k<=7; $k++):?>
							<td class="day" data-date="" data-day-number="" data-day-week="<?=$weekDays[$k]?>">
								<div class="day-number"></div>
								<div class="events"></div>
							</td>
						<?php endfor;?>

					</tr><!--    /WEEK    -->
					<?php endfor;?>
					
				</tbody>
			</table>
		</div><!--	/MONTH TYPE MYCALENDAR	-->

		<!--	WEEK TYPE MYCALENDAR	-->
		<div class="mycalendar myweekcalendar">
			<table>
				<thead>
					<tr>
						<td colspan="8">
							<div class="calendar-title">
								<a class="prev" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
								<a class="next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
								<div class="today"></div>
							</div>
						</td>
					</tr>
					<tr>
					    <td class="fortime"></td>
					    <td class="mondayName">
					    	<div class="tinyName">Пн.</div>
					    	<div class="fullName">Понедельник</div>
					    	<div class="date"></div>
					    </td>
					    <td class="tuesdayName">
					    	<div class="tinyName">Вт.</div>
					    	<div class="fullName">Вторник</div>
					    	<div class="date"></div>
					    </td>
					    <td class="wednesdayName">
					    	<div class="tinyName">Ср.</div>
					    	<div class="fullName">Среда</div>
					    	<div class="date"></div>
					    </td>
					    <td class="thursdayName">
					    	<div class="tinyName">Чт.</div>
					    	<div class="fullName">Четверг</div>
					    	<div class="date"></div>
					    </td>
					    <td class="fridayName">
					    	<div class="tinyName">Пт.</div>
					    	<div class="fullName">Пятница</div>
					    	<div class="date"></div>
					    </td>
					    <td class="saturdayName">
					    	<div class="tinyName">Сб.</div>
					    	<div class="fullName">Суббота</div>
					    	<div class="date"></div>
					    </td>
					    <td class="sundayName">
					    	<div class="tinyName">Вс.</div>
					    	<div class="fullName">Воскресенье</div>
					    	<div class="date"></div>
					    </td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div><!--	/WEEK TYPE MYCALENDAR	-->

		<!--
		<div class="mycalendar mydaycalendar">
			<table>
				<thead>
					<tr>
					    <td class="day-prev"><a href="#">предыдуща</a></td>
					    <td class="day-today">август 2017</td>
					    <td class="day-next"><a href="#">следующая</a></td>
					</tr>
					<tr>
					    <td class="fortime"></td>
					    <td class="forevent day-week-today" colspan="2">вс</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>-->

		<!--
		<div class="preloader">
			<div class="preloader4"></div>
		</div>-->

	</div><!--	/ALL MYCALENDARS	-->

</div><!--	/MYCALENDAR DESKTOP		-->
</div><!--	/FOR MYCALENDAR DESKTOP		-->