const FormGroup = require('../taskEditing/FormGroup');
const CategoryControl = require ('./CategoryControl');

let Settings = function() {
  this.body = createDOMElement('div', false, 'form-group');

  let filterTasks = createDOMElement('div', this.body, 'form-group');

  let filterLabel = createDOMElement({
    tagName: 'label',
    parent: filterTasks,
    property: {
      textContent: 'Показать:',
    },
    attributes: {
      for: 'filter-select',
    },
  });

  this.select = createDOMElement({
    tagName: 'select',
    parent: filterTasks,
    property: {
      className: 'form-control',
    },
    attributes: {
      id: 'filter-select',
    },
  });

  let options = ['Все задачи', 'Просроченные', 'Выполнить сегодня'];

  options.forEach( (option) => {
    createDOMElement({
      tagName: 'option',
      parent: this.select,
      property: {
        textContent: option,
      }
    })
  });

  this.tasksOnList = new FormGroup({
    parent: this.body,
    label: 'Задач на странице:',
    hint: '',
    id: 'tasks-count',
    type: 'text',
    imp: false,
  });

  this.categoryControl = new CategoryControl(this.body);

};

module.exports = Settings;