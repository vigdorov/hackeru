/*
Создает элемент управления задачей, кнопки для удаления и очистки формы.

Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный input
 */

;(function() {
  let taskButtonsCreate = function(parent) {
    let div = createDOMElement('div', parent, { className: 'form-group' });
    let row = createDOMElement('div', div, { className: 'row' });
    let col1 = createDOMElement('div', row, { className: 'col-6' });
    let col2 = createDOMElement('div', row, { className: 'col-6' });

    let buttonAdd = buttonTask('Добавить', 'btn btn-primary btn-block', col1, {
      click: function() {
        if (state.editIndex > -1) {
          state.taskStorage[state.editIndex] = state.taskEdit.value;
        } else {
          state.taskStorage.push(state.taskEdit.value);
        }
        state.taskEdit.clear();
        state.setStorage();
        state.taskList.refreshList();
      }
    });

    let buttonClear = buttonTask('Очистить', 'btn btn-outline-secondary btn-block', col2, {
      click: function() {
        state.taskEdit.clear();
      }
    });

    Object.defineProperty(div, 'edit', {
      value: function(enabled) {
        if (enabled) {
          buttonAdd.textContent = 'Изменить';
          buttonAdd.classList.add('btn-warning');
          buttonClear.textContent = 'Отмена';
        } else {
          buttonAdd.textContent = 'Добавить';
          buttonAdd.classList.remove('btn-warning');
          buttonClear.textContent = 'Очистить';
        }
      }
    });

    return div;
  };

  window.taskButtonsCreate = taskButtonsCreate;
})();