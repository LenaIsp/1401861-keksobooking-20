'use strict';
(function () {
  window.load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.send();
  };
})();
