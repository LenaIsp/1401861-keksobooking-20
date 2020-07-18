'use strict';
(function () {
  // Элементты для проверки формы
  var userForm = document.querySelector('.ad-form');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var timeinInputElement = userForm.querySelector('select[name="timein"]');
  var timeoutInputElement = userForm.querySelector('select[name="timeout"]');

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
      case '1':
        setDisabledValue(capacityInputSelect, ['0', '2', '3']);
        capacityInputSelect[2].selected = true;
        break;
      case '2':
        setDisabledValue(capacityInputSelect, ['0', '3']);
        capacityInputSelect[1].selected = true;
        break;
      case '3':
        setDisabledValue(capacityInputSelect, ['0']);
        capacityInputSelect[2].selected = true;
        break;
      case '100':
        setDisabledValue(capacityInputSelect, ['1', '2', '3']);
        capacityInputSelect[3].selected = true;
        break;
    }
  };

  // Изменение элементов в инпуте "количество комнат" при нажатии
  roomsInputElement.addEventListener('change', function () {
    calculateRoomsAndCapacity();
  });

  // Изменение элементов в инпуте "Время заезда и выезда" при нажатии
  var changeTime = function (timein, timeout) {
    var valueElement = timein.value;
    var timeOption = timeout.querySelectorAll('option');
    switch (valueElement) {
      case '12:00':
        timeOption[0].selected = true;
        break;
      case '13:00':
        timeOption[1].selected = true;
        break;
      case '14:00':
        timeOption[2].selected = true;
        break;
    }
  };

  timeinInputElement.addEventListener('change', function () {
    changeTime(timeinInputElement, timeoutInputElement);
  });

  timeoutInputElement.addEventListener('change', function () {
    changeTime(timeoutInputElement, timeinInputElement);
  });
})();
