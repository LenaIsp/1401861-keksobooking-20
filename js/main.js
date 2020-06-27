'use strict';
var TITLE = ['Заголовок #1', 'Заголовок #2', 'Заголовок #3', 'Заголовок #4'];
var DESCRIPTION = ['Описание #1', 'Описание #2', 'Описание #3', 'Описание #4'];
var TYPE = ['palace', 'flat', 'bungalo', 'house'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;

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
  var check = makeRandomElement(TIMES);
  return {
    author: {
      avatar: 'img/avatars/user0' + makeRandomNumber(1, NUMBER_OF_PINS) + '.png'
    },
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
      photos: makeRandomElement(PHOTOS)
    },
    location: location
  };
};


var map = document.querySelectorAll('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var card = document.querySelector('.map__filters-container');
var cardInfo = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photos > img');
// Функция для генерации меток на карте
var createMapPins = function (number) {
  for (var i = 0; i < number; i++) {
    var obj = createArray();
    var mapElement = pin.cloneNode(true);
    var cardElement = cardInfo.cloneNode(true);

    // модификация атрибутов в шаблоне "pin"
    mapElement.style.left = obj.location.x + 'px';
    mapElement.style.top = obj.location.y + 'px';
    mapElement.querySelector('img').src = obj.author.avatar;
    mapElement.querySelector('img').alt = obj.offer.title;

    // модификация атрибутов в шаблоне "card"
    /*cardInfo.querySelector('.popup__title').innerHTML = obj.offer.title;
    cardInfo.querySelector('.popup__text--address').innerHTML = obj.offer.address;
    cardInfo.querySelector('.popup__text--price').innerHTML = obj.offer.price + '₽/ночь';
    cardInfo.querySelector('.popup__text--capacity').innerHTML = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardInfo.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardInfo.querySelector('.popup__description').innerHTML = obj.offer.description;
    cardInfo.querySelector('.popup__avatar').src = obj.author.avatar;*/

    // добавление метки в блок "map__pins"
    map[0].appendChild(mapElement);
  }

  /*// создание одного элемента перед блоком "map__filters-container"
  card.before(cardElement);

  // добавление изображений в шаблоне "card"
  var blocks = document.querySelectorAll('.popup__photos > img');
  document.querySelector('.popup__photos').removeChild(blocks[0]);
  for (var j = 0; j < PHOTOS.length; j++) {
    var cardPhoto = popupPhoto.cloneNode(true);
    cardPhoto.src = PHOTOS[j];
    document.querySelector('.popup__photos').appendChild(cardPhoto);
  }*/
};

// Находим элементты для активации
var buttonPinMain = document.querySelector('.map__pin--main');
var blockMap = document.querySelector('.map');
var blockAdForm = document.querySelector('.ad-form ');
var elementsFieldset = document.querySelectorAll('fieldset');
var elementsSelect = document.querySelectorAll('select');
var elementsAddress = document.querySelector('#address');

//функция удаления и добавлениия атрибута disabled
var disabledForm = function (x) {
  if (x == 'add') {
    for (var i = 0; i < elementsFieldset.length; i++) {
      elementsFieldset[i].setAttribute('disabled', 'disabled');
    }
    for (var i = 0; i < elementsSelect.length; i++) {
      elementsFieldset[i].setAttribute('disabled', 'disabled');
    }
  } if (x == 'remove') {
    for (var i = 0; i < elementsFieldset.length; i++) {
      elementsFieldset[i].removeAttribute('disabled');
    }
    for (var i = 0; i < elementsSelect.length; i++) {
      elementsFieldset[i].removeAttribute('disabled');
    }
  } else {
    return false
  }
}

//функция активации карты
var activePage = function() {
  blockMap.classList.remove('map--faded');
  blockAdForm.classList.remove('ad-form--disabled');
  //удаляем атрибуты disabled
  disabledForm('remove');
  //Заполняем блок map элементами
  createMapPins(NUMBER_OF_PINS);
}

//функция определения координат метки
var addСoordinates = function(map) {
  //высота псевдоэлемента after
  var pathMap = 16;
  if (map == 'center') {
    elementsAddress.value = Math.floor((buttonPinMain.offsetLeft + buttonPinMain.offsetWidth/2)) + ', ' + Math.floor((buttonPinMain.offsetTop + buttonPinMain.offsetHeight/2));
  } else {
    elementsAddress.value = Math.floor((buttonPinMain.offsetLeft + buttonPinMain.offsetWidth/2)) + ', ' +  Math.floor((buttonPinMain.offsetTop + buttonPinMain.offsetHeight + pathMap));
  }
}

//добавляем атрибуты disabled при загрузке страницы
disabledForm('add');
addСoordinates('center');

//При клике активизируется карта
buttonPinMain.addEventListener('mousedown', function (evt) {
  if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.buttons == 1)) {
    activePage();
    addСoordinates();
  }
});

//При нажатии "enter" активизируется карта
buttonPinMain.addEventListener('keydown', function (evt) {
  if (blockMap.classList.contains('map--faded') && blockAdForm.classList.contains('ad-form--disabled') && (evt.key === 'Enter')) {
    activePage();
    addСoordinates();
  }
});