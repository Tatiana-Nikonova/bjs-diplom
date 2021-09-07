'use strict';

let logoutButton = new LogoutButton;

//Разлогинивание
logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		} else {
			console.error(`${response.error}`);
		};
	});
};

//Профиль текущего пользователя
let current = ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		console.error('Ошибка вывода профиля');
	};
});

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
	});
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
	});
});

moneyManager.conversionMoneyCallback = ((data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	});
});

moneyManager.sendMoneyCallback = ((data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	});
});

//Работа со списком избранного
let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	};
});

favoritesWidget.addUserCallback = ((data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь был успешно добавлен.');
		} else {
			favoritesWidget.setMessage(false, `Произошла ошибка ${response.error}`);

		};
	});
});

favoritesWidget.removeUserCallback = ((data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь был успешно добавлен.');
		} else {
			favoritesWidget.setMessage(false, `Произошла ошибка ${response.error}`);
		};
	});
});



