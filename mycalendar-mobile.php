<div class="for-mycalendar-mobile">
<div class="mycalendar-mobile">
	<div class="switch-halls-mycalendar"></div>
	<div class="switch-type-mycalendars" style="display: none;">
		<span class="month switch-btn" data-type-cal="month">Месяц</span>
		<span class="week switch-btn" data-type-cal="agendaWeek">Неделя</span>
	</div>
	<div class="mycalendars">

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
					    <td class="mondayName">Пн.</td>
					    <td class="tuesdayName">Вт.</td>
					    <td class="wednesdayName">Ср.</td>
					    <td class="thursdayName">Чт.</td>
					    <td class="fridayName">Пт.</td>
					    <td class="saturdayName">Сб.</td>
					    <td class="sundayName">Вс.</td>
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
								<div class="show">
									<a href="#" class="day-number"></a>
									<div class="for-circle">
										<div class="circle"></div>
										<div class="for-little-circle">
											<div class="little-circle"></div>
										</div>
									</div>
								</div> 
							</td>
						<?php endfor;?>

					</tr><!--    /WEEK    -->
					<?php endfor;?>


				</tbody>
			</table>
		</div>

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
					    <td class="mondayName">пн</td>
					    <td class="tuesdayName">вт</td>
					    <td class="wednesdayName">ср</td>
					    <td class="thursdayName">чт</td>
					    <td class="fridayName">пт</td>
					    <td class="saturdayName">сб</td>
					    <td class="sundayName">вс</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>

		<div class="mycalendar mydaycalendar">
			<table>
				<thead>
					<tr>
					    <td class="prev"><a href="#">предыдуща</a></td>
					    <td class="today">август 2017</td>
					    <td class="next"><a href="#">следующая</a></td>
					</tr>
					<tr>
					    <td class="fortime"></td>
					    <td class="forevent day-week-today" colspan="2">вс</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>

		<!--
		<div class="preloader">
			<div class="preloader4"></div>
		</div>-->

	</div>
</div><!--	/CALENDAR MOBILE	-->
</div><!--	/FOR CALENDAR MOBILE	-->