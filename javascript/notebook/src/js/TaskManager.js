const Settings    = require('./Settings');
const ModalPopup  = require('./modalPopup/ModalPopup');
const TaskEditing = require('./taskEditing/TaskEditing');
const TaskList    = require('./taskList/TaskList');
const Calendar    = require('./calendar/Calendar');
const controls    = require('./controls');

let TaskManager = function(parent) {
  window.state = {
    tasksStorage: [],
    filterList: 0,
    countTaskOnList: 2,
    temporary: {
      filterList: this.filterList,
      countTaskOnList: this.countTaskOnList,
    },
  };

  state.temporary = {
    filterList: state.filterList,
    countTaskOnList: state.countTaskOnList,
  };

  this.getStorage = function() {
    state.tasksStorage = JSON.parse(localStorage.getItem('notes')) || [];
  };

  this.getStorage();

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

  this.settings = new Settings();
  this.popup = new ModalPopup(parent);
  this.taskEdit = new TaskEditing(cardOne);
  this.calendar = new Calendar(this.taskEdit.inputDate);
  this.taskList = new TaskList(cardTwo, this);


  controls(this);
};

module.exports = TaskManager;