import './taskEditing/taskEditingCreate';
import './taskList/taskListCreate';

(function() {
  let taskManager = function(parent) {
    let h1 = createDOMElement('h1', parent, {
      textContent: 'Менеджер задач'
    });
    let row = createDOMElement('div', parent, { className: 'row' });
    let cardOne = createDOMElement('div', row, {className: 'col-6 card'});
    let cardTwo = createDOMElement('div', row, {className: 'col-6 card'});

    // Объект управления формой
    state.taskEdit = taskEditingCreate(cardOne);

    // Объект управления списком
    state.taskList = taskListCreate(cardTwo);
    state.taskList.refreshList();
  };

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
    calendarDate: new Date(),
    previousMonths: function() {
      let newMonth = this.calendarDate.getMonth() - 1;
      let year = this.calendarDate.getFullYear();
      this.calendarDate = new Date(year, newMonth);
    },
    nextMonths: function() {
      let newMonth = this.calendarDate.getMonth() + 1;
      let year = this.calendarDate.getFullYear();
      this.calendarDate = new Date(year, newMonth);
    },
    filter: '0',
    period: true,
    constants: {
      starsColor: '#f5d000',
    }
  };

  state.getStorage();

  window.taskManager = taskManager;
  window.state = state;
})();