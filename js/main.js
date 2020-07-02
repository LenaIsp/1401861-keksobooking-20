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
    mapElement.style.opacity = 0;
    mapElement.style.zIndex = '-1';

    // модификация атрибутов в шаблоне "card"
    cardElement.querySelector('.popup__title').innerHTML = obj.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = obj.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = obj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').innerHTML = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardElement.querySelector('.popup__description').innerHTML = obj.offer.description;
    cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
    cardElement.style.opacity = 0;
    cardElement.style.zIndex = '-1';
    // находим фото 
    var blocks = cardElement.querySelectorAll('.popup__photos > img');
    // удаляем ненужное фото
    cardElement.querySelector('.popup__photos').removeChild(blocks[0]);
    // заполняем фотографиями из массива
    for (var j = 0; j < obj.photos.length; j++) {
      var cardPhoto = popupPhoto.cloneNode(true);
      cardPhoto.src = obj.photos[j];
      cardElement.querySelector('.popup__photos').appendChild(cardPhoto);
    }
    // добавление метки в блок "map__pins"
    map[0].appendChild(mapElement);

    // создание 8 карточек перед блоком "map__filters-container"
    card.before(cardElement);
  }
};
// создаем элементы при загрузке страницы атрибуты disabled при загрузке страницы
createMapPins(NUMBER_OF_PINS);

// Находим элементты для активации
var buttonPinMain = document.querySelector('.map__pin--main');
var buttonThumbnails = document.querySelectorAll('.map__pin');
var blockMap = document.querySelector('.map');
var blockAdForm = document.querySelector('.ad-form ');
var elementsFieldset = document.querySelectorAll('fieldset');
var elementsSelect = document.querySelectorAll('select');
var elementsAddress = document.querySelector('#address');
// Элементты для проверки формы
var userForm = document.querySelector('.ad-form');
var roomsInputElement = userForm.querySelector('select[name="rooms"]');

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
    buttonThumbnails[i].style.opacity = 1;
    buttonThumbnails[i].style.zIndex = 1;
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

// проставляем disabled элемепнтам которые указаны в массиве
var setDisabledValue = function (elements, values) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = values.indexOf(elements[i].value) > -1;
  }
};

// проверяем каким инпутам проставить disabled и выбор нужного инпута
var calculateRoomsAndCapacity = function () {
  var capacityInputSelect = userForm.querySelectorAll('select[name="capacity"] option');
  var roomsInputValue = roomsInputElement.value;
  
  switch (roomsInputValue) {
    case '1':
      setDisabledValue(capacityInputSelect, ['0', '2', '3']);
      capacityInputSelect[2].selected = true;
      break;
    case '2':
      setDisabledValue(capacityInputSelect, ['0', '3']);
      capacityInputSelect[1].selected = true;
      break;
    case '3':
      setDisabledValue(capacityInputSelect, ['0']);
      capacityInputSelect[2].selected = true;
      break;
    case '100':
      setDisabledValue(capacityInputSelect, ['1', '2', '3']);
      capacityInputSelect[3].selected = true;
      break;
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

// Изменение элементов в инпуте "количество комнат" при нажатии
roomsInputElement.addEventListener('change', function () {
  calculateRoomsAndCapacity();
});


// Открытие карточки любого элемента
var buttonThumbnails = document.querySelectorAll('.map__pin');
var cardThumbnails = document.querySelectorAll('.map__card');
//Замыкания
var openCard = function (button, card) {
  button.addEventListener('click', function () {
    card.style.opacity = 1;
    card.style.zIndex = 1;
  });
};

for (var i = 1; i < buttonThumbnails.length; i++) {
  openCard(buttonThumbnails[i], cardThumbnails[i-1]);
}