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

  window.map = {
    addCoordinates: addCoordinates,
    activePage: activePage,
    disabledForm: disabledForm,
    blockMap: blockMap,
    form: form
  };
})();
