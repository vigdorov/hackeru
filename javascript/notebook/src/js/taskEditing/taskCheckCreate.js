/*
Создает элемент ввода имени задачи.

Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный check
 */

;(function() {
  let taskCheckCreate = function(parent) {
    let div = createDOMElement('div', parent, {
      className: 'custom-control custom-switch form-group',
    });
    let checkbox = checkboxTask(div, 'task-check');
    let label = labelForInput('', false, div, 'task-check');
    let i = icon('fas fa-star', state.constants.starsColor, label);
    createDOMElement('span', label, { textContent: ' Важное событие'} );
    label.classList.add('custom-control-label');

    Object.defineProperty(div, 'value', {
      get: function() {
        return checkbox.checked;
      },
      set: function(value) {
        checkbox.checked = value;
      },
    });

    return div;
  };

  window.taskCheckCreate = taskCheckCreate;
})();