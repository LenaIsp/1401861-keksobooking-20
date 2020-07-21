'use strict';
(function () {
  var buttonPinMain = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var blockAdForm = document.querySelector('.ad-form ');
  // Элементы для закрытия и открытия карточек
  var cardThumbnails = document.querySelectorAll('.map__card');
  var popupClose = document.querySelectorAll('.popup__close');

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.elements.createMapPins(data);

    // нахождение элементов для активации
    var buttonThumbnails = document.querySelectorAll('.map__pin');
    window.map.activePage(buttonThumbnails);

    // Открытие карточки
    var onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        for (var j = 0; j < cardThumbnails.length; j++) {
          cardThumbnails[j].style.display = 'none';
        }
      }
    };

    var openCard = function (button, cards) {
      button.addEventListener('click', function () {
        for (var i = 0; i < cardThumbnails.length; i++) {
          cardThumbnails[i].style.display = 'none';
        }
        cards.style.display = 'block';
        // закрытие по клавиши Esc
        document.addEventListener('keydown', onPopupEscPress);
      });
    };

    // Закрытие карточки
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

  // добавляем атрибуты disabled при загрузке страницы
  window.map.disabledForm('add');
  window.map.addCoordinates('center');

  // При нажатии "enter" активизируется карта
  buttonPinMain.addEventListener('keydown', function (evt) {
    if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.key === 'Enter')) {
      window.backend.load(onSuccess, onError);
      window.map.addCoordinates();
    }
  });

  buttonPinMain.addEventListener('mousedown', function (evt) {
    // подгружаем данные с сервера и запускаем функцию 'createMapPins' в случае положительного ответа от сервера
    if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.buttons === 1)) {
      window.backend.load(onSuccess, onError);
    }
  });
})();
