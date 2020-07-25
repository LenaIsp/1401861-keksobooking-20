'use strict';
(function () {
  // Элементты для проверки формы
  var userForm = document.querySelector('.ad-form');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var timeinInputElement = userForm.querySelector('select[name="timein"]');
  var timeoutInputElement = userForm.querySelector('select[name="timeout"]');
  var offerType = userForm.querySelector('select[name="type"]');
  var offerPrice = userForm.querySelector('input[name="price"]');

  var rooms = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var time = {
    TWELVE: '12:00',
    THIRTEEN: '13:00',
    FOURTEEN: '14:00'
  };

  var TYPES = {
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };

  var PriceNight = {
    ZERO: '0',
    ONE_THOUSAND: '1000',
    FIVE_THOUSAND: '5000',
    TEN_THOUSAND: '10000'
  };

  // проставляем disabled элемепнтам которые указаны в массиве
  var setDisabledValue = function (elements, values) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = values.indexOf(elements[i].value) > -1;
    }
  };

  // проверяем каким инпутам проставить disabled и выбор нужного инпута
  var calculateRoomsAndCapacity = function () {
    var capacityInputSelect = userForm.querySelectorAll('select[name="capacity"] option');
    var roomsInputValue = roomsInputElement.value;
    switch (roomsInputValue) {
      case rooms.ONE:
        setDisabledValue(capacityInputSelect, ['0', '2', '3']);
        capacityInputSelect[2].selected = true;
        break;
      case rooms.TWO:
        setDisabledValue(capacityInputSelect, ['0', '3']);
        capacityInputSelect[1].selected = true;
        break;
      case rooms.THREE:
        setDisabledValue(capacityInputSelect, ['0']);
        capacityInputSelect[2].selected = true;
        break;
      case rooms.HUNDRED:
        setDisabledValue(capacityInputSelect, ['1', '2', '3']);
        capacityInputSelect[3].selected = true;
        break;
    }
  };
  // Изменение элементов в инпуте "Время заезда и выезда" при нажатии
  var changeTime = function (timein, timeout) {
    var valueElement = timein.value;
    var timeOption = timeout.querySelectorAll('option');
    switch (valueElement) {
      case time.TWELVE:
        timeOption[0].selected = true;
        break;
      case time.THIRTEEN:
        timeOption[1].selected = true;
        break;
      case time.FOURTEEN:
        timeOption[2].selected = true;
        break;
    }
  };


  // Функция для обновления плейсхолдера и нижней границы стоимости проживания
  var updatePriceLmit = function () {
    var housingTypeValue = offerType.value;
    switch (housingTypeValue) {
      case TYPES.BUNGALO:
        offerPrice.placeholder = PriceNight.ZERO;
        offerPrice.min = PriceNight.ZERO;
        break;
      case TYPES.FLAT:
        offerPrice.placeholder = PriceNight.ONE_THOUSAND;
        offerPrice.min = PriceNight.ONE_THOUSAND;
        break;
      case TYPES.HOUSE:
        offerPrice.placeholder = PriceNight.FIVE_THOUSAND;
        offerPrice.min = PriceNight.FIVE_THOUSAND;
        break;
      case TYPES.PALACE:
        offerPrice.placeholder = PriceNight.TEN_THOUSAND;
        offerPrice.min = PriceNight.TEN_THOUSAND;
        break;
      default: break;
    }
  };

  // Изменение элементов в инпуте "количество комнат" при нажатии
  roomsInputElement.addEventListener('change', function () {
    calculateRoomsAndCapacity();
  });

  timeinInputElement.addEventListener('change', function () {
    changeTime(timeinInputElement, timeoutInputElement);
  });
  timeoutInputElement.addEventListener('change', function () {
    changeTime(timeoutInputElement, timeinInputElement);
  });
  offerType.addEventListener('change', function () {
    updatePriceLmit();
  });
})();
