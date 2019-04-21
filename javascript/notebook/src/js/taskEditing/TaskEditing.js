const FormGroup = require('./FormGroup');
const CheckboxGroup = require('./CheckboxGroup');
const CategoryGroup = require('./CategoryGroup');
const ButtonsGroup = require('./ButtonsGroup');

let TaskEditing = function(parent) {

  let div = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'card-body',
    }
  });

  let header = createDOMElement({
    tagName: 'h3',
    parent: div,
    property: {
      textContent: 'Добавить событие',
    }
  });

  let taskName = new FormGroup({
    parent: div,
    label: 'Название события:',
    hint: 'Добавьте название',
    id: 'task-name',
    type: 'text',
    imp: true,
  });

  let taskDesc = new FormGroup({
    parent: div,
    label: 'Описание:',
    hint: 'Добавьте описание',
    id: 'task-desc',
    type: 'textarea',
    imp: false,
  });

  let taskCategory = new CategoryGroup({
    parent: div,
    label: 'Категория:',
    id: 'task-category',
  });

  let taskDate = new FormGroup({
    parent: div,
    label: 'Дата события:',
    hint: 'Введите дату',
    id: 'task-date',
    type: 'text',
    imp: true,
  });

  let taskCheck = new CheckboxGroup({
    parent: div,
    label: ' Важное событие',
    id: 'task-check',
  });

  let taskButtons = new ButtonsGroup({
    parent: div,
    textButtonAdded: 'Добавить',
    textButtonCancel: 'Очистить',
  });

  this.value = function(task) {
    if (task) {
      taskName.inputValue(task.name);
      taskDesc.inputValue(task.description);
      taskDate.inputValue(task.date);
      taskCheck.checkValue(task.important);
      taskCategory.inputValue(task.category.name);
      taskCategory.inputColor(task.category.color);
    } else {
      return {
        name: taskName.inputValue(),
        description: taskDesc.inputValue(),
        date: taskDate.inputValue(),
        important: taskCheck.checkValue(),
        category: {
          name: taskCategory.inputValue(),
          color: taskCategory.inputColor(),
        }
      };
    }
  };

  this.errors = function(errors) {
    if (errors === undefined) {
      taskName.errorMsg();
      taskDesc.errorMsg();
      taskDate.errorMsg();
    } else {
      taskName.errorMsg(errors.taskName || false);
      taskDesc.errorMsg(errors.taskDesc || false);
      taskDate.errorMsg(errors.taskDate || false);
    }
  };

  this.inputHeader = header;
  this.inputName = taskName.getChildren[1];
  this.inputDesc = taskDesc.getChildren[1];
  this.inputDate = taskDate.getChildren[1];
  this.inputAdded = taskButtons.getChildren[0];
  this.inputCancel = taskButtons.getChildren[1];
  this.inputCheck = taskCheck.getChildren[0];

  this.editIndex = -1;

  this.edit = function(value = -1) {
    if (value > -1) {
      this.editIndex = value;
      header.textContent = 'Редактировать событие';
      this.inputAdded.textContent = 'Изменить';
      this.inputAdded.classList.add('btn-warning');
      this.inputCancel.textContent = 'Отмена';
    } else {
      this.editIndex = -1;
    }
  };



  this.getChildren = {
    header: header,
    taskName: taskName,
    taskDesc: taskDesc,
    taskDate: taskDate,
    taskCheck: taskCheck,
    taskButtons: taskButtons,
  };

};

module.exports = TaskEditing;