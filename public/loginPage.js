'use strict';

let userForm = new UserForm();

userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (response) => {       // Не понимаю откуда берутся именно  response,   response.date и другие аргументы 
		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);      // не до конца понимаю, что делает setLoginErrorMessage
		};
	});

};

userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (response) => {
		if (response.success) {
			location.reload();
		}
		else {
			userForm.setRegisterErrorMessage(`Произошла ошибка регистрации пользователя ${data.login}: ${response.error}`);     // ${data.login}: ${response.error}  это не понимаю
		};
	});

};


