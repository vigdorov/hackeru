/*
Функция принимает:
1. value     - текст на кнопке
2. classTags - классы кнопки
3. parent    - объект, в которой нужно положить кнопку
4. events    - объект, внутри которого идут ключи (названия событий) и
             функции, которые исполняться при событии

Функция возвращает ссылку на вновь созданную кнопку
 */

;(function() {
  let buttonTask = function(value, classTags, parent, events) {
    let button = createDOMElement('button', parent, {
      className: classTags,
      textContent: value,
    });

    if (events) {
      for (let key in events) {
        button.addEventListener(key, events[key]);
      }
    }

    return button;
  };

  window.buttonTask = buttonTask;
})();