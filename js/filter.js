'use strict';
(function () {
  var NUMBER_OF_PINS = 5;
  var ZERO = 0;

  var PriceRange = {
    LOWER: 10000,
    UPPER: 50000
  };

  var BorderPrice = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGHT: 'high'
  };

  // элементы для фильтрации
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');

  var pins = [];

  var getIsAnyType = function (value) {
    return value === 'any';
  };

  // Общая функция для фильтрации полей
  var filterItem = function (it, item, key) {
    return getIsAnyType(it.value) || it.value === item[key].toString();
  };

  // фильтруем по типу жилья
  var filtrationByType = function (item) {
    return filterItem(housingType, item.offer, 'type');
  };

  // фильтруем по цене
  var filtrationByPrice = function (item) {
    switch (housingPrice.value) {
      case BorderPrice.LOW:
        return item.offer.price < PriceRange.LOWER;
      case BorderPrice.MIDDLE:
        return item.offer.price >= PriceRange.LOWER && item.offer.price <= PriceRange.UPPER;
      case BorderPrice.HIGHT:
        return item.offer.price > PriceRange.UPPER;

      default:
        return true;
    }
  };
  // Сортировка по кол-ву комнат
  var filtrationByRooms = function (item) {
    return filterItem(housingRooms, item.offer, 'rooms');
  };

  // Сортировка по кол-ву гостей
  var filtrationByGuests = function (item) {
    return filterItem(housingGuests, item.offer, 'guests');
  };

  // Сортировка по фичам
  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };
  
  var filterPins = function (pins) {
    var filterItems = pins.filter(function (pin) {
      return filtrationByType(pin) && filtrationByPrice(pin) && filtrationByRooms(pin) && filtrationByGuests(pin) && filtrationByFeatures(pin);
    });
    var displayPins = filterItems.length > NUMBER_OF_PINS ? filterItems.slice(ZERO, NUMBER_OF_PINS) : filterItems;
    window.elements.createMapPins(displayPins);
    window.map.allClosedCard();
  };

  var clearMap = function () {
    var pinThumbnails = document.querySelectorAll('.map__pin');
    var cardThumbnails = document.querySelectorAll('.map__card');
    for (var i = 1; i < pinThumbnails.length; i++) {
      pinThumbnails[i].remove();
    }
    for (var j = 0; j < cardThumbnails.length; j++) {
      cardThumbnails[j].remove();
    }
  };

  window.filter = {
    filterPins: filterPins,
    clearMap: clearMap
  };

})();
