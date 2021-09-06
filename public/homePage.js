'use strict';

let logoutButton = new LogoutButton;

//Разлогинивание
logoutButton.action = () => {
	ApiConnector.logout((response) => {   // response ???
		if (response.success) {
			location.reload();
		} else {
			console.error(`${response.error}`);
		};
	};
};

//Профиль текущего пользователя
let current = ApiConnector.current((response) => {  // response ???
	if (response.success) {
		ProfileWidget.showProfile(response.data);  // это не поняла response.data
	} else {
		console.error('Ошибка вывода профиля');
	};
};



// Пока остановлюсь... Сдам что есть... 



//Получение курсов валют и построение таблицы
let ratesBoard = new RatesBoard;

function getCurrencyRate() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			rateBoard.clearTable();
			rateBoard.fillTable(response.data);
		} else {
			console.error("Ошибка получения курсов валют");
		};
	};
};

getCurrencyRate();

setInterval(getCurrencyRate(), 60000);



let moneyManager = MoneyManager;

moneyManager.addMoneyCallback = ((data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	};
};

moneyManager.conversionMoneyCallback = ((data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	};
};

moneyManager.sendMoneyCallback = ((data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	};
};

