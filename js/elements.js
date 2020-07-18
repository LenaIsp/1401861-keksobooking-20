'use strict';
(function () {
  // элементы
  var map = document.querySelectorAll('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var card = document.querySelector('.map__filters-container');
  var cardInfo = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photos > img');

  // Функция для генерации меток и карточек на карте
  var createMapPins = function (number) {
    for (var i = 0; i < number; i++) {
      var obj = window.data.createArray();
      var mapElement = pin.cloneNode(true);
      var cardElement = cardInfo.cloneNode(true);
      // модификация атрибутов в шаблоне "pin"
      mapElement.style.left = obj.location.x + 'px';
      mapElement.style.top = obj.location.y + 'px';
      mapElement.querySelector('img').src = obj.author.avatar;
      mapElement.querySelector('img').alt = obj.offer.title;
      mapElement.style.display = 'none';
      // модификация атрибутов в шаблоне "card"
      cardElement.querySelector('.popup__title').innerHTML = obj.offer.title;
      cardElement.querySelector('.popup__text--address').innerHTML = obj.offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = obj.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__text--capacity').innerHTML = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
      cardElement.querySelector('.popup__description').innerHTML = obj.offer.description;
      cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
      cardElement.style.display = 'none';
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
      // добавление карточи перед блоком "map__filters-container"
      card.before(cardElement);
    }
  };

  // создаем элементы при загрузке страницы с атрибутом disabled
  createMapPins(window.main.NUMBER_OF_PINS);
})();
