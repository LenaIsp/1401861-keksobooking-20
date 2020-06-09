'use strict';
var objMap = {
  author: {
    avatar:["img/avatars/user01.png", "img/avatars/user02.png","img/avatars/user03.png","img/avatars/user04.png","img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"]
  },
  offer: {
    title: ["заголовок #1", "заголовок #2", "заголовок #3","заголовок #4", "заголовок #5","заголовок #6","заголовок #7", "заголовок #8"],
    address:["100, 350",  "200, 350",  "300, 350",  "400, 350",  "500, 350", "600, 350", "500, 250", "500, 450"],
    price: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    type: ["palace", "bungalo", "bungalo", "flat", "bungalo", "house", "bungalo", "house"],
    rooms: [1, 2, 3, 4, 5, 6, 7, 8],
    guests: [1, 2, 3, 4, 5, 6, 7, 8],
    checkin: ["12:00", "13:00", "12:00", "13:00","14:00", "13:00","12:00", "14:00"],
    checkout: ["12:00", "13:00", "14:00", "13:00","12:00", "14:00","12:00", "13:00"],
    features: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    description: ["описание #1", "описание #2", "описание #3", "описание #4", "описание #5", "описание #6", "описание #7", "описание #8"],
    photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg", "http://o0.github.io/assets/images/tokyo/hotel4.jpg", "http://o0.github.io/assets/images/tokyo/hotel5.jpg", "http://o0.github.io/assets/images/tokyo/hotel6.jpg", "http://o0.github.io/assets/images/tokyo/hotel7.jpg","http://o0.github.io/assets/images/tokyo/hotel8.jpg"]
  },
  location: {
    x: [200, 300, 100, 500, 110, 250, 590, 380],
    y: [130, 200, 300, 350, 400, 450, 500, 550]
  }
};

var pools = document.querySelectorAll('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < 8; i++) {
  var element = template.cloneNode(true);  
  element.setAttribute('style','left:'+objMap.location.x[i]+'px;'+'top:'+ objMap.location.y[i] +'px');
  pools[0].appendChild(element);
}
