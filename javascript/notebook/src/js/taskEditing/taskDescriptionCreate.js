/*
Создает элемент ввода описани события.

Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный input
 */

;(function() {
  let taskDescriptionCreate = function(parent) {
    let div = createDOMElement('div', parent, {
      className: 'form-group',
    });

    let label = labelForInput('Описание:', false, div, 'task-desc-input');
    let textarea = inputText('textarea', 'Добавьте описание', div, 'task-desc-input');
    let small = smallText(div);

    Object.defineProperty(div, 'errorMsg', {
      value: function(msg) {
        if (msg) {
          label.classList.add('text-danger');
          textarea.classList.add('is-invalid');
        } else {
          label.classList.remove('text-danger');
          textarea.classList.remove('is-invalid');
        }
        small.textContent = msg || '';
      }
    });

    Object.defineProperty(div, 'value', {
      get: function() {
        return textarea.value;
      },
      set: function(value) {
        textarea.value = value;
      },
    });

    return div;
  };

  window.taskDescriptionCreate = taskDescriptionCreate;
})();