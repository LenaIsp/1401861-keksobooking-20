'use strict';
(function () {
  // Находим элементты для активации
  var PIN_TIP_SIZE = 16;
  var PIN_TOP_LIMIT = 130;
  var PIN_BOTTOM_LIMIT = 630;
  var PIN_SIZE_DIVIDER = 2;
  var MAP_START_POINT = 0;

  var map = document.querySelector('.map__overlay');
  var buttonPinMain = document.querySelector('.map__pin--main');

  var mainPinProperties = {
    width: 65,
    height: Math.floor(buttonPinMain.offsetHeight / PIN_SIZE_DIVIDER + PIN_TIP_SIZE)
  };

  var limitOfMap = {
    top: PIN_TOP_LIMIT - mainPinProperties.height,
    right: map.offsetWidth - mainPinProperties.width / PIN_SIZE_DIVIDER,
    bottom: PIN_BOTTOM_LIMIT - mainPinProperties.height,
    left: MAP_START_POINT - mainPinProperties.width / PIN_SIZE_DIVIDER
  };

  var setCoords = function (x, y) {
    buttonPinMain.style.left = x + 'px';
    buttonPinMain.style.top = y + 'px';
  };

  // Перетаскивание
  buttonPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // стартовые координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // перемещение курсора (событие)
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // считаем разницу (передвижение курсора по сетке)
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // переписываем стартовые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // перезаписываем стили
      var mainPinX = buttonPinMain.offsetLeft - shift.x;
      var mainPinY = buttonPinMain.offsetTop - shift.y;

      // условия огранечения метки
      if (mainPinX < limitOfMap.left) {
        setCoords(limitOfMap.left, mainPinY);
        if (mainPinY > limitOfMap.bottom) {
          setCoords(limitOfMap.left, limitOfMap.bottom);
        }
      } else if (mainPinX > limitOfMap.right) {
        setCoords(limitOfMap.right, mainPinY);
        if (mainPinY > limitOfMap.bottom) {
          setCoords(limitOfMap.right, limitOfMap.bottom);
        } else if (mainPinY < limitOfMap.top) {
          setCoords(limitOfMap.right, limitOfMap.top);
        }
      } else if (mainPinY < limitOfMap.top) {
        setCoords(mainPinX, limitOfMap.top);
      } else if (mainPinY > limitOfMap.bottom) {
        setCoords(mainPinX, limitOfMap.bottom);
      } else {
        setCoords(mainPinX, mainPinY);
      }
    };

    // отпускание кнопки мыши(событие)
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.addCoordinates();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    PIN_TIP_SIZE: PIN_TIP_SIZE
  };

})();
