const Settings    = require('./settings/Settings');
const ModalPopup  = require('./modalPopup/ModalPopup');
const TaskEditing = require('./taskEditing/TaskEditing');
const TaskList    = require('./taskList/TaskList');
const Calendar    = require('./calendar/Calendar');
const controls    = require('./controls');

let TaskManager = function(parent) {
  window.state = {
    tasksStorage: [],         // все задачи которые есть
    filteredTasksStorage: [], // отфильтрованные задачи

    settings: {           // Настройки
      filterList: 0,      // какой фильтр задач используется
      countTaskOnList: 5, // сколько задач показывать на странице
      nameCategory: [],   // Список всех категорий
    },
    temporary: {},        // временное хранилище параметров настроек, пока пользователь не принял или не отклонил их
  };

  this.getStorage = function() {
    state.tasksStorage = JSON.parse(localStorage.getItem('notes')) || [];
    state.settings.nameCategory = JSON.parse(localStorage.getItem('category')) || [];
  };

  this.getStorage();

  // заносим базовые настройки
  state.temporary = {
    filterList: state.settings.filterList,
    countTaskOnList: state.settings.countTaskOnList,
    nameCategory: state.settings.nameCategory.slice(),
  };

  this.setStorage = function() {
    let notes = JSON.stringify(state.tasksStorage);
    let category = JSON.stringify(state.settings.nameCategory);
    localStorage.setItem('notes', notes);
    localStorage.setItem('category', category);
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