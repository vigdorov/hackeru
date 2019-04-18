const TaskEditing = require('./taskEditing/TaskEditing');
const TaskList    = require('./taskList/TaskList');
const ModalPopup  = require('./modalPopup/ModalPopup');
const Calendar    = require('./calendar/Calendar');
const controls    = require('./controls');

let TaskManager = function(parent) {
  window.state = {
    tasksStorage: [],
  };

  this.getStorage = function() {
    state.tasksStorage = JSON.parse(localStorage.getItem('notes')) || [];
  };

  this.setStorage = function() {
    let parse = JSON.stringify(state.tasksStorage);
    localStorage.setItem('notes', parse);
  };

  createDOMElement({
    tagName: 'h1',
    parent: parent,
    property: {
      textContent: 'Менеджер задач',
    },
  });

  let row = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'row',
    },
  });

  let cardOne = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-6 card',
    },
  });

  let cardTwo = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-6 card',
    },
  });

  this.taskEdit = new TaskEditing(cardOne);
  this.taskList = new TaskList(cardTwo);
  this.popup = new ModalPopup(parent);
  this.calendar = new Calendar(this.taskEdit.inputDate);

  controls(this);
};

module.exports = TaskManager;



/*
(function() {


  const state = {
    taskStorage: [],
    editIndex: -1,
    getStorage: function() {
      this.taskStorage = JSON.parse(localStorage.getItem('notes')) || [];
    },
    setStorage: function() {
      let parse = JSON.stringify(this.taskStorage);
      localStorage.setItem('notes', parse);
    },
    calendarDate: [],
    previousMonths: function() {
      let month = this.calendarDate[1];
      let year = this.calendarDate[2];
      this.calendarDate[0] = 1;
      this.calendarDate[1] = month === 0 ? 11 : month - 1;
      this.calendarDate[2] = month === 0 ? year - 1: year;
    },
    nextMonths: function() {
      this.calendarDate[0] = 1;
      let month = this.calendarDate[1];
      let year = this.calendarDate[2];
      this.calendarDate[1] = month === 11 ? 0 : month + 1;
      this.calendarDate[2] = month === 11 ? year + 1: year;
    },
    filter: '0',
    period: true,
    constants: {
      starsColor: '#f5d000',
      editColor : 'black',
      trashColor: 'black',
    }
  };
  state.getStorage();

  window.taskManager = taskManager;
  window.state = state;
})();
*/
