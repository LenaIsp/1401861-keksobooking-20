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
var timeinInputElement = userForm.querySelector('select[name="timein"]');
var timeoutInputElement = userForm.querySelector('select[name="timeout"]');

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
    buttonThumbnails[i].style.display = 'block';
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

// Изменение элементов в инпуте "Время заезда и выезда" при нажатии
var changeTime = function (timein, timeout) {
  var valueElement = timein.value;
  var timeOption = timeout.querySelectorAll('option');
  switch (valueElement) {
    case '12:00':
      timeOption[0].selected = true;
      break;
    case '13:00':
      timeOption[1].selected = true;
      break;
    case '14:00':
      timeOption[2].selected = true;
      break;
  }
};
timeinInputElement.addEventListener('change', function () {
  changeTime(timeinInputElement, timeoutInputElement);
});
timeoutInputElement.addEventListener('change', function () {
  changeTime(timeoutInputElement, timeinInputElement);
});

// Элементы для закрытия и открытия карточек
var cardThumbnails = document.querySelectorAll('.map__card');
var popupClose = document.querySelectorAll('.popup__close');

// Открытие карточки
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    for (var j = 0; j < cardThumbnails.length; j++) {
      cardThumbnails[j].style.display = 'none';
    }
  }
};

var openCard = function (button, cards) {
  button.addEventListener('click', function () {
    for (var i = 0; i < cardThumbnails.length; i++) {
      cardThumbnails[i].style.display = 'none';
    }
    cards.style.display = 'block';
    // закрытие по клавиши Esc
    document.addEventListener('keydown', onPopupEscPress);
  });
};

// Закрытие карточки
var closeCard = function (buttonClose, cardClose) {
  buttonClose.addEventListener('click', function () {
    cardClose.style.display = 'none';
    // удаление обработчика Esc
    document.removeEventListener('keydown', onPopupEscPress);
  });
};

for (var i = 1; i < buttonThumbnails.length; i++) {
  openCard(buttonThumbnails[i], cardThumbnails[i - 1]);
}

for (var j = 0; j < popupClose.length; j++) {
  closeCard(popupClose[j], cardThumbnails[j]);
}

