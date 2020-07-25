'use strict';
(function () {
  // Находим элементты для активации

  var MAIN_PIN_W = 65;
  var map = document.querySelector('.map');
  var buttonPinMain = document.querySelector('.map__pin--main');

  var limitOfMap = {
    top: 130,
    right: map.offsetWidth - MAIN_PIN_W / 2,
    bottom: 630,
    left: 0 - MAIN_PIN_W / 2
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

      if (mainPinX < limitOfMap.left) {
        setCoords(limitOfMap.left, mainPinY);
      } else if (mainPinX > limitOfMap.right) {
        setCoords(limitOfMap.right, mainPinY);
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
