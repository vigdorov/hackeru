import '../simpleElements/labelForInput';
import '../simpleElements/inputText';
import '../simpleElements/smallText';
import '../simpleElements/checkboxTask';
import '../simpleElements/iconFontAwesome';
import '../simpleElements/buttonTask';
import './taskNameCreate';
import './taskDescriptionCreate';
import './taskDateCreate';
import './taskCheckCreate';
import './taskButtonsCreate';

(function() {
  let taskEditingCreate = function(parent) {
    let div = createDOMElement('div', parent, {className: 'card-body'});
    let header = createDOMElement('h3', div, {
      textContent: 'Добавить событие',
    });
    let taskName = taskNameCreate(div);
    let taskDecs = taskDescriptionCreate(div);
    let taskDate = taskDateCreate(div);
    let taskCheck = taskCheckCreate(div);
    let taskButtons = taskButtonsCreate(div);

    Object.defineProperty(div, 'value', {
      get: function() {
        return {
          name: taskName.value,
          description: taskDecs.value,
          date: taskDate.value,
          important: taskCheck.value,
        };
      },
      set: function(index) {
        let task = state.taskStorage[index];
        taskName.value = task.name;
        taskDecs.value = task.description;
        taskDate.value = task.date;
        taskCheck.value = task.important;
      },
    });

    Object.defineProperty(div, 'clear', {
      value: function() {
        taskName.value = '';
        taskDecs.value = '';
        taskDate.value = '';
        taskCheck.value = false;
        state.taskEdit.edit(false);
        state.editIndex = -1;
        state.taskList.active();
      }
    });

    Object.defineProperty(div, 'edit', {
      value: function(enabled) {
        if (enabled) {
          header.textContent = 'Редактировать событие';
        } else {
          header.textContent = 'Добавить событие';
        }
        taskButtons.edit(enabled);
      }
    });

    return div;
  };

  window.taskEditingCreate = taskEditingCreate;
})();