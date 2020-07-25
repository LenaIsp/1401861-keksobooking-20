'use strict';
(function () {
  // Находим элементты для активации
  var buttonPinMain = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  var elementsFieldset = document.querySelectorAll('fieldset');
  var elementsSelect = document.querySelectorAll('select');
  var elementsAddress = document.querySelector('#address');

  // функция удаления и добавлениия атрибута disabled
  var disabledForm = function (x) {
    if (x === 'add') {
      for (var i = 0; i < elementsFieldset.length; i++) {
        elementsFieldset[i].setAttribute('disabled', 'disabled');
      }
      for (var j = 0; j < elementsSelect.length; j++) {
        elementsFieldset[j].setAttribute('disabled', 'disabled');
      }
    } else if (x === 'remove') {
      for (var n = 0; n < elementsFieldset.length; n++) {
        elementsFieldset[n].removeAttribute('disabled');
      }
      for (var s = 0; s < elementsSelect.length; s++) {
        elementsFieldset[s].removeAttribute('disabled');
      }
    }
  };

  // функция определения координат метки
  var addCoordinates = function (maps) {
    // высота псевдоэлемента after
    var pathMap = 16;
    if (maps === 'center') {
      elementsAddress.value = Math.floor((buttonPinMain.offsetLeft + buttonPinMain.offsetWidth / 2)) + ', ' + Math.floor((buttonPinMain.offsetTop + buttonPinMain.offsetHeight / 2));
    } else {
      elementsAddress.value = Math.floor((buttonPinMain.offsetLeft + buttonPinMain.offsetWidth / 2)) + ', ' + Math.floor((buttonPinMain.offsetTop + buttonPinMain.offsetHeight + pathMap));
    }
  };

  // функция активации карты
  var activePage = function (elements) {
    blockMap.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    // Заполняем блок map элементами
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'block';
    }
  };
  // функция закрытия карточек
  var allClosedCard = function () {
    // элементы для закрытия и открытия карточек
    var buttonThumbnails = document.querySelectorAll('.map__pin');
    var cardThumbnails = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    // активация карты
    activePage(buttonThumbnails);

    // закрытие карточки при нажатии Escape
    var onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        for (var j = 0; j < cardThumbnails.length; j++) {
          cardThumbnails[j].style.display = 'none';
          buttonThumbnails[j+1].classList.remove('map__pin--active');
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
        button.classList.add('map__pin--active');
        // вызываем функцию закрытие при клике по клавише Esc
        document.addEventListener('keydown', onPopupEscPress);
      });
    };

    // закрытие карточки при нажатии на "крестик"
    var closeCard = function (buttonClose, cardClose, mapActive) {
      buttonClose.addEventListener('click', function () {
        cardClose.style.display = 'none';
        mapActive.classList.remove('map__pin--active');
        // удаление обработчика Esc
        document.removeEventListener('keydown', onPopupEscPress);
      });
    };

    for (var i = 1; i < buttonThumbnails.length; i++) {
      openCard(buttonThumbnails[i], cardThumbnails[i - 1]);
    }

    for (var j = 0; j < popupClose.length; j++) {
      closeCard(popupClose[j], cardThumbnails[j], buttonThumbnails[j+1]);
    }
  };

  window.map = {
    addCoordinates: addCoordinates,
    activePage: activePage,
    disabledForm: disabledForm,
    blockMap: blockMap,
    form: form,
    allClosedCard: allClosedCard
  };
})();
