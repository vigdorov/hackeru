/*
Создает элемент ввода имени задачи.

Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный input
 */

;(function() {
  let taskDateCreate = function(parent) {
    let div = createDOMElement('div', parent, {
      className: 'form-group',
    });

    let label = labelForInput('Дата события:', true, div, 'task-date-input');
    let input = inputText('input', 'Введите дату', div, 'task-date-input');
    let small = smallText(div);

    Object.defineProperty(div, 'errorMsg', {
      value: function(msg) {
        if (msg) {
          label.classList.add('text-danger');
          input.classList.add('is-invalid');
        } else {
          label.classList.remove('text-danger');
          input.classList.remove('is-invalid');
        }
        small.textContent = msg || '';
      }
    });

    Object.defineProperty(div, 'value', {
      get: function() {
        return input.value;
      },
      set: function(value) {
        input.value = value;
      },
    });

    return div;
  };

  window.taskDateCreate = taskDateCreate;
})();