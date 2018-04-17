jQuery(document).ready(function($) {

	$("#api-top-login-email, #api-top-login, #api-top-register-email, #api-top-register, #api-top-code").keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      return false;
	    }
	});


	$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
	);


	$("#api-top-login-email").on("click", "button", function(e){
		if($("#api-top-login-email").valid()){
			$("#api-top-login-email").submit();
		}
	});

	
	//alert("validate");
	$("#api-top-login-email").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
		},
		messages: {
			email: {
				required: "Поле должно быть заполнено",
				email: "Введите корректный Email"
			},
			password: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 5 символов"
			},
		},
		submitHandler: function(form) {
		    //alert(100);
		}
	});





	$("#api-top-login").on("click", "button", function(e){
		if($("#api-top-login").valid()){
			$("#api-top-login").submit();
		}
	});


	$("#api-top-login").validate({
		rules: {
			phone: {
				required: true,
				regex: '^[+][3][8][0]{1}[0-9]{9}$'
			}
		},
		messages: {
			phone: {
				required: "Поле должно быть заполнено",
				regex: "Введите телефон в формате +380xxxxxxxxx"
			}
		}
	});






	$("#api-top-register-email").on("click", "button", function(e){
		if($("#api-top-register-email").valid()){
			$("#api-top-register-email").submit();
		}
	});


	$("#api-top-register-email").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			first_name: {
				required: true,
				minlength: 2
			},
			last_name: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			password_confirm: {
				required: true,
				equalTo: "#apiTopRegisterEmail-password"
			}
		},
		messages: {
			email: {
				required: "Поле должно быть заполнено",
				email: "Введите корректный Email"
			},
			first_name: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 2 символа"
			},
			last_name: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 2 символа"
			},
			password: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 5 символов"
			},
			password_confirm: {
				required: "Поле должно быть заполнено",
				equalTo: "Пароли не совпадают"
			}
		},
		submitHandler: function(form) {
		    //alert(100);
		}
	});







	$("#api-top-register").on("click", "button", function(e){
		if($("#api-top-register").valid()){
			$("#api-top-register").submit();
		}
	});


	$("#api-top-register").validate({
		rules: {
			phone: {
				required: true,
				regex: '^[+][3][8][0]{1}[0-9]{9}$'
			},
			first_name: {
				required: true,
				minlength: 2
			},
			last_name: {
				required: true,
				minlength: 2
			}
		},
		messages: {
			phone: {
				required: "Поле должно быть заполнено",
				regex: "Введите телефон в формате +380xxxxxxxxx"
			},
			first_name: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 2 символа"
			},
			last_name: {
				required: "Поле должно быть заполнено",
				minlength: "Минимум 2 символа"
			}
		},
		submitHandler: function(form) {
		    //alert(100);
		}
	});






	$("#api-top-code").on("click", "button", function(e){
		if($("#api-top-code").valid()){
			$("#api-top-code").submit();
		}
	});


	$("#api-top-code").validate({
		rules: {
			code: {
				required: true,
				regex: '^[0-9]{4}$'
			},
		},
		messages: {
			code: {
				required: "Поле должно быть заполнено",
				regex: "Код в формате xxxx"
			}
		}
	});

});