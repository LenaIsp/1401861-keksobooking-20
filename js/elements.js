'use strict';
(function () {
  // элементы
  var MAX_PINS = 5;
  var map = document.querySelectorAll('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var card = document.querySelector('.map__filters-container');
  var cardInfo = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photos > img');

  var createMapPins = function (ads) {
    var numberElements = ads.length;
    if (numberElements > MAX_PINS) {
      numberElements = MAX_PINS;
    } else {
      numberElements = ads.length;
    }
    // Функция для генерации меток и карточек на карте
    for (var i = 0; i < numberElements; i++) {
      var mapElement = pin.cloneNode(true);
      var cardElement = cardInfo.cloneNode(true);
      // модификация атрибутов в шаблоне "pin"
      mapElement.style.left = ads[i].location.x + 'px';
      mapElement.style.top = ads[i].location.y + 'px';
      mapElement.querySelector('img').src = ads[i].author.avatar;
      mapElement.querySelector('img').alt = ads[i].offer.title;
      // модификация атрибутов в шаблоне "card"
      cardElement.querySelector('.popup__title').textContent = ads[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = ads[i].offer.address;
      cardElement.querySelector('.popup__text--price').textContent = ads[i].offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = ads[i].offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = ads[i].offer.rooms + ' комнаты для ' + ads[i].offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[i].offer.checkin + ', выезд до ' + ads[i].offer.checkout;
      cardElement.querySelector('.popup__description').textContent = ads[i].offer.description;
      cardElement.querySelector('.popup__avatar').src = ads[i].author.avatar;
      cardElement.style.display = 'none';

      // заполняем тип жилья
      var popupFeature = cardElement.querySelectorAll('.popup__feature');
      cardElement.querySelector('.popup__features').textContent = '';

      // заполняем фотографиями из массива
      for (var j = 0; j < ads[i].offer.features.length; j++) {
        var itemFeature = popupFeature[0].cloneNode(true);
        itemFeature.classList.remove();
        itemFeature.classList.add('popup__feature--' + ads[i].offer.features[j]);
        cardElement.querySelector('.popup__features').appendChild(itemFeature);
      }

      // находим фото
      var blocks = cardElement.querySelectorAll('.popup__photos > img');
      // удаляем ненужное фото
      cardElement.querySelector('.popup__photos').removeChild(blocks[0]);
      // заполняем фотографиями из массива
      for (var k = 0; k < ads[i].offer.photos.length; k++) {
        var cardPhoto = popupPhoto.cloneNode(true);
        cardPhoto.src = ads[i].offer.photos[k];
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
