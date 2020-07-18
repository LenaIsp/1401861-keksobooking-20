'use strict';
(function () {
  var TITLE = ['Заголовок #1', 'Заголовок #2', 'Заголовок #3', 'Заголовок #4'];
  var DESCRIPTION = ['Описание #1', 'Описание #2', 'Описание #3', 'Описание #4'];
  var TYPE = ['palace', 'flat', 'bungalo', 'house'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Функция гененрации случайного числа от и до
  var makeRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Функция гененрации случайного элемента в масситве
  var makeRandomElement = function (array) {
    var i = Math.floor(Math.random() * array.length);
    return array[i];
  };

  // доступ к функции из любого файла
  window.data = {
    // Функция для создания массива
    createArray: function () {
      var location = {
        x: makeRandomNumber(0, document.querySelector('.map__pins').offsetWidth - 50),
        y: makeRandomNumber(130, 630)
      };
      var check = makeRandomElement(TIMES);
      return {
        author: {
          avatar: 'img/avatars/user0' + makeRandomNumber(1, window.main.NUMBER_OF_PINS) + '.png'
        },
        photos: PHOTOS,
        offer: {
          title: makeRandomElement(TITLE),
          address: location.x + ', ' + location.y,
          price: makeRandomNumber(1000, 5000),
          type: makeRandomElement(TYPE),
          rooms: makeRandomNumber(1, 3),
          guests: makeRandomNumber(0, 3),
          checkin: check,
          checkout: check,
          features: makeRandomElement(FEATURES),
          description: makeRandomElement(DESCRIPTION),
        },
        location: location
      };
    }
  };
})();
