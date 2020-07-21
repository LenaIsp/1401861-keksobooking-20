'use strict';
(function () {
  // элементы
  var NUMBER_OF_PINS = 8;
  var map = document.querySelectorAll('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var card = document.querySelector('.map__filters-container');
  var cardInfo = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photos > img');

  var createMapPins = function (number) {
    // Функция для генерации меток и карточек на карте
    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      var mapElement = pin.cloneNode(true);
      var cardElement = cardInfo.cloneNode(true);
      // модификация атрибутов в шаблоне "pin"
      mapElement.style.left = number[i].location.x + 'px';
      mapElement.style.top = number[i].location.y + 'px';
      mapElement.querySelector('img').src = number[i].author.avatar;
      mapElement.querySelector('img').alt = number[i].offer.title;
      mapElement.style.display = 'none';
      // модификация атрибутов в шаблоне "card"
      cardElement.querySelector('.popup__title').innerHTML = number[i].offer.title;
      cardElement.querySelector('.popup__text--address').innerHTML = number[i].offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = number[i].offer.price + '₽/ночь';
      cardElement.querySelector('.popup__text--capacity').innerHTML = number[i].offer.rooms + ' комнаты для ' + number[i].offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + number[i].offer.checkin + ', выезд до ' + number[i].offer.checkout;
      cardElement.querySelector('.popup__description').innerHTML = number[i].offer.description;
      cardElement.querySelector('.popup__avatar').src = number[i].author.avatar;
      cardElement.style.display = 'none';
      // находим фото
      var blocks = cardElement.querySelectorAll('.popup__photos > img');
      // удаляем ненужное фото
      cardElement.querySelector('.popup__photos').removeChild(blocks[0]);
      // заполняем фотографиями из массива
      for (var j = 0; j < number[i].offer.photos.length; j++) {
        var cardPhoto = popupPhoto.cloneNode(true);
        cardPhoto.src = number[i].offer.photos[j];
        cardElement.querySelector('.popup__photos').appendChild(cardPhoto);
      }
      // добавление метки в блок "map__pins"
      map[0].appendChild(mapElement);
      // добавление карточи перед блоком "map__filters-container"
      card.before(cardElement);
    }
  };

  window.elements = {
    createMapPins: createMapPins
  };
})();
