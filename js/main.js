'use strict';
var TITLE = ['заголовок #1', 'заголовок #2', 'заголовок #3', 'заголовок #4'];
var TYPE = ['palace', 'flat', 'bungalo', 'house'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;

var map = document.querySelectorAll('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция гененрации случайного числа от и до
var makeRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция гененрации случайного элемента в масситве
var makeRandomElement = function (array) {
  var i = Math.floor(Math.random() * array.length);
  return array[i];
};

// Функция для создания массива
var createArray = function () {
  var location = {
    x: makeRandomNumber(0, map[0].offsetWidth - 50),
    y: makeRandomNumber(130, 630)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + makeRandomNumber(1, NUMBER_OF_PINS) + '.png'
    },
    offer: {
      title: makeRandomElement(TITLE),
      address: location.x + ',' + location.y,
      price: makeRandomNumber(1000, 50000),
      type: makeRandomElement(TYPE),
      rooms: makeRandomNumber(1, 3),
      guest: makeRandomNumber(0, 3),
      checkin: makeRandomElement(TIMES),
      checkout: makeRandomElement(TIMES),
      features: makeRandomElement(FEATURES),
      description: makeRandomElement(TITLE),
      photos: makeRandomElement(PHOTOS)
    },
    location: location
  };
};

// Функция для генерации меток на карте
var createMapPins = function () {
  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    var obj = createArray();
    var mapElement = pin.cloneNode(true);
    // модификация атрибутов
    mapElement.style.left = obj.location.x + 'px';
    mapElement.style.top = obj.location.y + 'px';
    mapElement.querySelector('img').src = obj.author.avatar;
    mapElement.querySelector('img').alt = obj.offer.title;
    // добавление метки в div
    map[0].appendChild(mapElement);
  }
};

// Заполняем блок элементами
createMapPins();
