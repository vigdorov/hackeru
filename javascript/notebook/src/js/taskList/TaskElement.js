const TaskIcons = require('./TaskIcons');

let TaskElement = function(settings) {

  this.li = createDOMElement({
    tagName: 'li',
    parent: settings.parent,
    property: {
      className: 'list-group-item list-group-item-action',
    },
  });

  let div = createDOMElement({
    tagName: 'div',
    parent: this.li,
    property: {
      className: 'd-flex w-100 justify-content-between',
    },
  });

  this.index = settings.index;
  let task = state.tasksStorage[this.index];

  let header = createDOMElement({
    tagName: 'h5',
    parent: div,
    property: {
      textContent: task.name,
    },
  });

  this.icons = new TaskIcons({
    parent: div,
    index: this.index,
  });

  let p = createDOMElement({
    tagName: 'p',
    parent: this.li,
    property: {
      textContent: task.description,
    },
  });

  let small = createDOMElement({
    tagName: 'small',
    parent: this.li,
    property: {
      textContent: 'Дата: ' + task.date,
    }
  });

};

module.exports = TaskElement;