'use strict';
(function () {
  var buttonReset = document.querySelector('.ad-form__reset');
  var offerPrice = document.querySelector('#price');
  var offerTitle = document.querySelector('input[name="title"]');

  var diactivate = function (itemPin, itemCard) {
    window.map.disabledForm('add');
    window.map.blockMap.classList.add('map--faded');
    window.main.buttonPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    window.map.form.classList.add('ad-form--disabled');
    window.map.form.reset();
    window.filter.form.reset();
    window.map.addCoordinates('center');

    offerPrice.style.borderColor = '';
    offerTitle.style.borderColor = '';

    for (var i = 1; i < itemPin.length; i++) {
      itemPin[i].remove();
    }
    for (var j = 0; j < itemCard.length; j++) {
      itemCard[j].remove();
    }
  };

  // Функция отправки данных на сервер
  var submitHandler = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var cloneSuccess = success.cloneNode(true);
    var pinThumbnails = document.querySelectorAll('.map__pin');
    var cardThumbnails = document.querySelectorAll('.map__card');

    diactivate(pinThumbnails, cardThumbnails);

    document.body.appendChild(cloneSuccess);

    offerPrice.style.borderColor = '';
    offerTitle.style.borderColor = '';

    cloneSuccess.addEventListener('click', function () {
      cloneSuccess.remove();
      diactivate(pinThumbnails, cardThumbnails);
      document.removeEventListener('keydown', onSuccessEscPress);
    });

    var onSuccessEscPress = function (evt) {

      if (evt.key === 'Escape') {
        evt.preventDefault();
        cloneSuccess.remove();
        diactivate(pinThumbnails, cardThumbnails);
        document.removeEventListener('keydown', onSuccessEscPress);
      }
    };

    document.addEventListener('keydown', onSuccessEscPress);
  };

  // Обработка ошибки
  var submitErrorHandler = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var cloneError = error.cloneNode(true);
    var errorButton = cloneError.querySelector('.error__button');

    offerPrice.style.borderColor = '';
    offerTitle.style.borderColor = '';

    cloneError.querySelector('.error__message').textContent = message;
    document.body.appendChild(cloneError);
    window.map.disabledForm('add');
    errorButton.addEventListener('click', function () {
      cloneError.remove();
      window.map.disabledForm('remove');
    });
    cloneError.addEventListener('click', function () {
      cloneError.remove();
      window.map.disabledForm('remove');
      document.addEventListener('keydown', onSuccessEscPress);
    });

    var onSuccessEscPress = function (evt) {

      if (evt.key === 'Escape') {
        evt.preventDefault();
        cloneError.remove();
        window.map.disabledForm('remove');
        document.removeEventListener('keydown', onSuccessEscPress);
      }
    };

    document.addEventListener('keydown', onSuccessEscPress);
  };

  // При клике на кнопку "очистить" очищается форма
  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();

    var pinThumbnails = document.querySelectorAll('.map__pin');
    var cardThumbnails = document.querySelectorAll('.map__card');

    diactivate(pinThumbnails, cardThumbnails);
  });

  window.sendform = {
    submitHandler: submitHandler,
    submitErrorHandler: submitErrorHandler
  };
})();
