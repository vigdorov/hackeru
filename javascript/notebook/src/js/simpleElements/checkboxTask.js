/*
Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный checkbox
 */

;(function() {
  let checkboxTask = function(parent, id) {
    let checkbox = createDOMElement('input', parent, {
      className: 'custom-control-input',
      type: 'checkbox',
      id: id,
    });

    return checkbox;
  };

  window.checkboxTask = checkboxTask;
})();