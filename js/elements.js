'use strict';
(function () {
  // элементы
  var MAX_PINS = 5;
  var map = document.querySelectorAll('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var card = document.querySelector('.map__filters-container');
  var cardInfo = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photos > img');

  var createMapPins = function (pins) {
    var pinsCount = pins.length;

    if (pinsCount > MAX_PINS) {
      pinsCount = MAX_PINS;
    }

    // Функция для генерации меток и карточек на карте
    for (var i = 0; i < pinsCount; i++) {
      var mapElement = pin.cloneNode(true);
      var cardElement = cardInfo.cloneNode(true);
      // модификация атрибутов в шаблоне "pin"
      mapElement.style.left = pins[i].location.x + 'px';
      mapElement.style.top = pins[i].location.y + 'px';
      mapElement.querySelector('img').src = pins[i].author.avatar;
      mapElement.querySelector('img').alt = pins[i].offer.title;
      // модификация атрибутов в шаблоне "card"
      cardElement.querySelector('.popup__title').textContent = pins[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = pins[i].offer.address;
      cardElement.querySelector('.popup__text--price').textContent = pins[i].offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = pins[i].offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = pins[i].offer.rooms + ' комнаты для ' + pins[i].offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[i].offer.checkin + ', выезд до ' + pins[i].offer.checkout;
      cardElement.querySelector('.popup__description').textContent = pins[i].offer.description;
      cardElement.querySelector('.popup__avatar').src = pins[i].author.avatar;
      cardElement.style.display = 'none';

      // заполняем тип жилья
      var popupFeature = cardElement.querySelectorAll('.popup__feature');
      var fragment = new DocumentFragment();

      cardElement.querySelector('.popup__features').textContent = '';

      // заполняем фотографиями из массива
      for (var j = 0; j < pins[i].offer.features.length; j++) {
        var itemFeature = popupFeature[0].cloneNode(true);

        itemFeature.classList.remove();
        itemFeature.classList.add('popup__feature--' + pins[i].offer.features[j]);
        fragment.appendChild(itemFeature);
      }

      cardElement.querySelector('.popup__features').appendChild(fragment);

      // находим фото
      var blocks = cardElement.querySelectorAll('.popup__photos > img');

      // удаляем ненужное фото
      cardElement.querySelector('.popup__photos').removeChild(blocks[0]);

      fragment = new DocumentFragment();

      // заполняем фотографиями из массива
      for (var k = 0; k < pins[i].offer.photos.length; k++) {
        var cardPhoto = popupPhoto.cloneNode(true);

        cardPhoto.src = pins[i].offer.photos[k];
        fragment.appendChild(cardPhoto);
      }
      cardElement.querySelector('.popup__photos').appendChild(fragment);

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
