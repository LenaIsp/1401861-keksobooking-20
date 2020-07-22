'use strict';
(function () {
  var buttonPinMain = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var buttonSubmit = document.querySelector('.ad-form__submit');

  // при загрузке добавляем атрибуты disabled и проставляем координаты центра метки в поле формы
  window.map.disabledForm('add');
  window.map.addCoordinates('center');

  // При нажатии "enter" подгружаем данные, обновляем координаты метки в поле формы, удаляем атрибут disabled
  buttonPinMain.addEventListener('keydown', function (evt) {
    if (blockMap.classList.contains('map--faded') && form.classList.contains('ad-form--disabled') && (evt.key === 'Enter')) {
      window.backend.load(window.load.successHandler, window.load.errorHandler);
      window.map.addCoordinates();
      window.map.disabledForm('remove');
    }
  });

  // При клике на метку подгружаем данные с сервера, удаляем атрибут disabled
  buttonPinMain.addEventListener('mousedown', function (evt) {
    if (blockMap.classList.contains('map--faded') && form.classList.contains('ad-form--disabled') && (evt.buttons === 1)) {
      window.backend.load(window.load.successHandler, window.load.errorHandler);
      window.map.disabledForm('remove');
    }
  });

  // При клике на кнопку "опубликовать" отправляем данные на сервер
  buttonSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), window.sendform.submitHandler, window.sendform.submitErrorHandler);
  });

  window.main = {
    buttonPinMain: buttonPinMain
  };
})();
