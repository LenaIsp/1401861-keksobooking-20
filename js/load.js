'use strict';
(function () {
  // Функция для обработки при получении данных с сервера
  var successHandler = function (data) {
    //для фильтров
    var filterForm = document.querySelector('.map__filters');
    var pins = [];

    var onFilterChange = function () {
      pins = data;
      window.filter.clearMap();
      window.filter.filterPins(data);
    };
    
    filterForm.addEventListener('change', onFilterChange);

    window.elements.createMapPins(data);
    window.map.allClosedCard();
  };

  // Функция для обработки ошибки при получение данных
  var errorHandler = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var cloneError = error.cloneNode(true);
    cloneError.querySelector('.error__message').innerHTML = message;
    cloneError.querySelector('.error__button').remove();
    document.body.appendChild(cloneError);
  };

  window.load = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
