'use strict';
(function () {
  // Находим элементты для активации
  var buttonPinMain = document.querySelector('.map__pin--main');
  var buttonThumbnails = document.querySelectorAll('.map__pin');
  var blockMap = document.querySelector('.map');
  var blockAdForm = document.querySelector('.ad-form ');
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

  // функция активации карты
  var activePage = function () {
    blockMap.classList.remove('map--faded');
    blockAdForm.classList.remove('ad-form--disabled');
    // удаляем атрибуты disabled
    disabledForm('remove');
    // Заполняем блок map элементами
    for (var i = 0; i < buttonThumbnails.length; i++) {
      buttonThumbnails[i].style.display = 'block';
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
  // добавляем атрибуты disabled при загрузке страницы
  disabledForm('add');
  addCoordinates('center');

  // При клике активизируется карта
  buttonPinMain.addEventListener('mousedown', function (evt) {
    if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.buttons === 1)) {
      activePage();
      addCoordinates();
    }
  });

  // При нажатии "enter" активизируется карта
  buttonPinMain.addEventListener('keydown', function (evt) {
    if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.key === 'Enter')) {
      activePage();
      addCoordinates();
    }
  });
  window.map = {
    buttonThumbnails: buttonThumbnails
  };
})();
