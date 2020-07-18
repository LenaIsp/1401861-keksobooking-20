'use strict';
(function () {
  // Элементы для закрытия и открытия карточек
  var cardThumbnails = document.querySelectorAll('.map__card');
  var popupClose = document.querySelectorAll('.popup__close');

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

  for (var i = 1; i < window.map.buttonThumbnails.length; i++) {
    openCard(window.map.buttonThumbnails[i], cardThumbnails[i - 1]);
  }

  for (var j = 0; j < popupClose.length; j++) {
    closeCard(popupClose[j], cardThumbnails[j]);
  }
})();
