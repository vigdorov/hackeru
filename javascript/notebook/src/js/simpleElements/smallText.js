/*
Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный small
 */

;(function() {
  let smallText = function(parent) {
    let small = createDOMElement('small', parent, {
      className: 'text-danger',
    });

    return small;
  };

  window.smallText = smallText;
})();