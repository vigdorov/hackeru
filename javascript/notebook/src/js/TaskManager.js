const TaskEditing = require('./taskEditing/TaskEditing');
const TaskList    = require('./taskList/TaskList');
const ModalPopup  = require('./modalPopup/ModalPopup');
const Calendar    = require('./calendar/Calendar');
const controls    = require('./controls');

let TaskManager = function(parent) {
  window.state = {
    tasksStorage: [],
    filterList: 0,
  };

  this.getStorage = function() {
    state.tasksStorage = JSON.parse(localStorage.getItem('notes')) || [];
  };

  this.setStorage = function() {
    let parse = JSON.stringify(state.tasksStorage);
    localStorage.setItem('notes', parse);
  };

  let body = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'container',
    }
  });

  createDOMElement({
    tagName: 'h1',
    parent: body,
    property: {
      textContent: 'Менеджер задач',
    },
  });

  let row = createDOMElement({
    tagName: 'div',
    parent: body,
    property: {
      className: 'row',
    },
  });

  let cardOne = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-12 col-lg-6 col-xl-4 card',
    },
  });

  let cardTwo = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-12 col-lg-6 col-xl-8 card',
    },
  });

  this.taskEdit = new TaskEditing(cardOne);
  this.calendar = new Calendar(this.taskEdit.inputDate);
  this.taskList = new TaskList(cardTwo, this.calendar);
  this.popup = new ModalPopup(parent);


  controls(this);
};

module.exports = TaskManager;