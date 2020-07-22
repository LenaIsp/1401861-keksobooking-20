'use strict';
(function () {
  // Функция для обработки при получении данных с сервера
  var successHandler = function (data) {
    window.elements.createMapPins(data);
    // элементы для активации
    var buttonThumbnails = document.querySelectorAll('.map__pin');
    // активация карты
    window.map.activePage(buttonThumbnails);

    // элементы для закрытия и открытия карточек
    var cardThumbnails = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    // закрытие карточки при нажатии Escape
    var onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        for (var j = 0; j < cardThumbnails.length; j++) {
          cardThumbnails[j].style.display = 'none';
        }
      }
    };

    // открытие карточки при нажатии на метку
    var openCard = function (button, cards) {
      button.addEventListener('click', function () {
        for (var i = 0; i < cardThumbnails.length; i++) {
          cardThumbnails[i].style.display = 'none';
        }
        cards.style.display = 'block';
        // вызываем функцию закрытие при клике по клавише Esc
        document.addEventListener('keydown', onPopupEscPress);
      });
    };

    // закрытие карточки при нажатии на "крестик"
    var closeCard = function (buttonClose, cardClose) {
      buttonClose.addEventListener('click', function () {
        cardClose.style.display = 'none';
        // удаление обработчика Esc
        document.removeEventListener('keydown', onPopupEscPress);
      });
    };

    for (var i = 1; i < buttonThumbnails.length; i++) {
      openCard(buttonThumbnails[i], cardThumbnails[i - 1]);
    }

    for (var j = 0; j < popupClose.length; j++) {
      closeCard(popupClose[j], cardThumbnails[j]);
    }
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
