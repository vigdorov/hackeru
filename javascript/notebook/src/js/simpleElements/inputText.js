/*
Функция принимает:
1. type    - тип input'а
2. hint    - подсказка input'a
3. parent  - объект, в которой нужно положить элемент
4. events  - объект, внутри которого идут ключи (названия событий) и
             функции, которые исполняться при событии

Функция возвращает ссылку на вновь созданный input
 */

;(function() {
  let inputText = function(type, hint, parent, id, events) {
    let input = createDOMElement(type, parent, {
      className: 'form-control',
      placeholder: hint,
      id: id,
    });

    if (type === 'textarea') {
      input.rows = '3';
    }

    if (events) {
      for (let key in events) {
        input.addEventListener(key, events[key]);
      }
    }

    return input;
  };

  window.inputText = inputText;
})();