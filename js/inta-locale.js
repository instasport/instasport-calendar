var intaLocaleClass = function(){

	this.lang = null;
	this.locale = null;

	this.initialized = false;

	this.langs = {
		en: "en",
		ru: "ru",
		ua: "ua"
	}

	this.init = function(){
		var _this = this; 

		var navigatorLang = navigator.language;

		var lang = _this.langs.ru;
		var locale = "ru-RU";
		var tr = null;

		switch(navigatorLang){
			case "ru":
			case "ru-RU":
			case "tt-RU":
			case "ba-RU":
			case "sah-RU":
			case "ru-MO":
				// lang = ru;
				// locale = navigatorLang
				break;
			case "uk":
			case "uk-UA":
				lang = _this.langs.ua;
				locale = navigatorLang;
				break;
			case "en-US":
			case "chr-US":
			case "haw-US":
				lang = _this.langs.en;
				locale = navigatorLang;
				break;
		}

		_this.lang = lang;
		_this.locale = locale;
		// _this.lang = navigator.language

		_this.tr = _this.getTranslates();

		// console.log(_this.tr);

		_this.initialized = true; 
	}

	this.getTranslates = function(){
		var _this = this;

		// _this.lang = _this.langs.en;

		switch(_this.lang){
			case _this.langs.ru:
				return _this.ru();
				break;
			case _this.langs.ua:
				return _this.ua();
				break;
			case _this.langs.en:
				return _this.en();
				break;
		}
	}

	this.ru = function(){
		return {
			fullWeekDays: { 
				mon: "Понедельник",
				tue: "Вторник",
				wed: "Середа",
				thu: "Четверг",
				fri: "Пятница",
				sat: "Суббота",
				sun: "Воскресенье",
			},
			shortWeekDays: {
				mon: "Пн",
				tue: "Вт",
				wed: "Ср",
				thu: "Чт",
				fri: "Пт",
				sat: "Сб",
				sun: "Вс",
			},
			shortWeekDaysArr: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
			monthTitles1: {
				jan: "Январь",
				feb: "Февраль",
				mar: "Март",
				apr: "Апрель",
				may: "Май",
				jun: "Июнь",
				jul: "Июль",
				aug: "Август",
				sep: "Сентябрь",
				oct: "Октябрь",
				nov: "Ноябрь",
				dec: "Декабрь",
			},
			monthTitles2: {
				jan: "Января",
				feb: "Февраля",
				mar: "Марта",
				apr: "Апреля",
				may: "Мая",
				jun: "Июня",
				jul: "Июля",
				aug: "Августа",
				sep: "Сентября",
				oct: "Октября",
				nov: "Ноября",
				dec: "Декабря", 
			},
			monthViewTitle: "Месяц",
			weekViewTitle: "Неделя",
			filterTitles: {
				training: "Тренировка",
				instructor: "Тренер",
				complexity: "Сложность",
				activity: "Направление",
			},
			all: "Все",
			profile: {
				menu: "Меню",
				exit: "Выход",
				check_in: "Записаться",
				check_in_training: "Записаться на тренировку",
				checking_in_training: "Запись на тренировку",
				profile: "Профайл",
				check_ins: "Записи",
				cancel: "Отменить",
				date: "Дата",
				beginning: "Начало",
				duration: "Продолжительность",
				hall: "Зал",
				price: "Цена",
				time: "Время",
				errs: {
					already_checked_in: "Вы уже записаны на тренировку",
					already_past: "Тренировка уже прошла",
					no_seats: "Нет мест",
				},
				title: "Название",
				first_name: "Имя",
				last_name: "Фамилия",
				phone: "Телефон",
				created: "Создан",
				auth: "Вход",
				reg: "Регистрация",
				send: "Отправить",
				password: "Пароль",
				enter: "Войти",
				password_confirm: "Подтверждение пароля",
				register: "Зарегистрироваться",
				not_set: "Не указана",
				sign_up_on_workouts: "Вы записаны на занятия:",
				you_do_not_have_workouts: "У Вас нету записей",
				// created: "",
				// created: "",
				// created: "",
			},
			min: "мин",
			hour: "час",
			hours: "часа",
			left_2_seats: "осталось 2 места",
			left_1_seats: "осталось 1 место",
			left_no_seats: "нет мест",
			trainings: "тренировок",
		}
	}

	this.ua = function(){
		return {
			fullWeekDays: { 
				mon: "Понедiлок",
				tue: "Вiвторок",
				wed: "Середа",
				thu: "Четверг",
				fri: "П`ятниця",
				sat: "Субота",
				sun: "Недiля",
			},
			shortWeekDays: {
				mon: "Пн",
				tue: "Вт",
				wed: "Ср",
				thu: "Чт",
				fri: "Пт",
				sat: "Сб",
				sun: "Нд",
			},
			shortWeekDaysArr: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
			monthTitles1: {
				jan: "Сiчень",
				feb: "Лютий",
				mar: "Березень",
				apr: "Квiтень",
				may: "Травень",
				jun: "Червень",
				jul: "Липень",
				aug: "Серпень",
				sep: "Вересень",
				oct: "Жовтень",
				nov: "Листопад",
				dec: "Грудень",
			},
			monthTitles2: {
				jan: "Сiченя",
				feb: "Лютого",
				mar: "Березня",
				apr: "Квiтня",
				may: "Травня",
				jun: "Червня",
				jul: "Липня",
				aug: "Серпня",
				sep: "Вересня",
				oct: "Жовтня",
				nov: "Листопада",
				dec: "Груденя", 
			},
			monthViewTitle: "Мiсяць",
			weekViewTitle: "Недiля",
			filterTitles: {
				training: "Тренування",
				instructor: "Тренер",
				complexity: "Складність",
				activity: "Направлення",
			},
			all: "Всi",
			profile: {
				menu: "Меню",
				exit: "Вихiд",
				check_in: "Записатися",
				check_in_training: "Записатися на тренування",
				checking_in_training: "Записування на тренування",
				profile: "Профайл",
				check_ins: "Записи",
				cancel: "Вiдмiнити",
				date: "Дата",
				beginning: "Початок",
				duration: "Тривалiсть",
				hall: "Зал",
				price: "Цiна",
				time: "Час",
				errs: {
					already_checked_in: "Вы вже записанi на тренування",
					already_past: "Тренування вже пройшло",
					no_seats: "Нема мiсць",
				},
				title: "Назва",
				first_name: "Iм`я",
				last_name: "Прiзвище",
				phone: "Телефон",
				created: "Створений",
				auth: "Вхiд",
				reg: "Реєстрація",
				send: "Надіслати",
				password: "Пароль",
				enter: "Увійти",
				password_confirm: "Підтвердження пароля",
				register: "Зареєструватися",
				not_set: "Не вказана",
				sign_up_on_workouts: "Вы записанi на заняття:",
				you_do_not_have_workouts: "У Вас нема записiв",
			},
			min: "мин",
			hour: "година",
			hours: "годин",
			left_2_seats: "залишилось 2 мiсця",
			left_1_seats: "залишилось 1 мiсце",
			left_no_seats: "нема мiсць",  
			trainings: "тренувань",
		}
	}

	this.en = function(){
		return {
			fullWeekDays: { 
				mon: "Monday",
				tue: "Tuesday",
				wed: "Wednesday",
				thu: "Thursday",
				fri: "Friday",
				sat: "Saturday",
				sun: "Sunday",
			},
			shortWeekDays: {
				mon: "Mon",
				tue: "Tue",
				wed: "Wed",
				thu: "Thu",
				fri: "Fri",
				sat: "Sat",
				sun: "Sun",
			},
			shortWeekDaysArr: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			monthTitles1: {
				jan: "January",
				feb: "February",
				mar: "March",
				apr: "April",
				may: "May",
				jun: "June",
				jul: "July",
				aug: "August",
				sep: "September",
				oct: "October",
				nov: "November",
				dec: "December",
			},
			monthTitles2: {
				jan: "January",
				feb: "February",
				mar: "March",
				apr: "April",
				may: "May",
				jun: "June",
				jul: "July",
				aug: "August",
				sep: "September",
				oct: "October",
				nov: "November",
				dec: "December",
			},
			monthViewTitle: "Month",
			weekViewTitle: "Week",
			filterTitles: {
				training: "Training",
				instructor: "Instructor",
				complexity: "Complexity",
				activity: "Activity",
			},
			all: "All",
			profile: {
				menu: "Menu",
				exit: "Exit",
				check_in: "Sign up",
				check_in_training: "Sign up for a workout",
				checking_in_training: "Sign up for a workout",
				profile: "Profile",
				check_ins: "Workouts",
				cancel: "Cancel",
				date: "Date",
				beginning: "Beginning",
				duration: "Duration",
				hall: "Hall",
				price: "Price",
				time: "Time",
				errs: {
					already_checked_in: "You already signed up",
					already_past: "Workout is already past",
					no_seats: "No seats",
				},
				title: "Title",
				first_name: "First Name",
				last_name: "Last Name",
				phone: "Phone",
				created: "Created",
				auth: "Log In",
				reg: "Registration",
				send: "Send",
				password: "Password",
				enter: "Log In",
				password_confirm: "Confirm password",
				register: "Sign Up",
				not_set: "Not set", 
				signed_up_on_workouts: "Your signed up workouts:",
				you_do_not_have_workouts: "You don`t have signed up workouts", 
			},
			min: "min",
			hour: "hour",
			hours: "hours",
			left_2_seats: "left 2 seats",
			left_1_seats: "left 1 seat",
			left_no_seats: "no seats",
			trainings: "workouts",
		}
	}

}

// console.log("before locale initialized");

var intaLocale = new intaLocaleClass();
intaLocale.init();

// var intaCalendarLocaleInterval = setInterval(function(){
// 	if (typeof configData !== 'undefined' &&
// 		typeof intaHelper !== 'undefined' && intaHelper !== null) {
// 		// console.log(777);
// 		intaCalendar = new intaCalendarClass();
// 		intaCalendar.init();
// 		clearInterval(intaCalendarInterval);
// 	}
// 	// console.log("Searching");
// }, 10); 
