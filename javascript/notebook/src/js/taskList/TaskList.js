const TaskElement = require('./TaskElement');

let TaskList = function(parent, calendar) {

  let div = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'card-body',
    },
  });

  let header = createDOMElement({
    tagName: 'h3',
    parent: div,
    property: {
      textContent: 'Список задач',
    },
  });

  let menuGroup = createDOMElement('div', div, 'form-group');

  this.select = createDOMElement({
    tagName: 'select',
    parent: menuGroup,
    property: {
      className: 'form-control form-control-sm col-12 col-md-6',
    },
  });

  let ul = createDOMElement({
    tagName: 'ul',
    parent: div,
    property: {
      className: 'list-group',
    },
  });

  this.tasks = [];

  this.refresh = function(events) {

    ul.innerHTML = '';
    this.tasks = [];

    state.tasksStorage.sort( function(a, b) {
      let first = calendar.arrayToDate( calendar.dateToArray(a.date) );
      let second = calendar.arrayToDate( calendar.dateToArray(b.date) );
      if (first > second) return  1;
      if (first < second) return -1;
      return 0;
    });

    for (let index in state.tasksStorage) {

      let task = state.tasksStorage[index];

      let date = calendar.dateToArray(task.date);
      let difference = new Date(date[2], date[1] - 1, date[0]) - new Date();
      let days = calendar.msToDay(difference);

      let filter = false;

      if (state.filterList === 0) {
        filter = true;
      }
      if (state.filterList === 1 && days < 0) {
        filter = true;
      }
      if (state.filterList === 2 && days === 0) {
        filter = true;
      }

      if (filter) {
        let li = new TaskElement({
          parent: ul,
          index: index,
        }, calendar);

        for (let iconKey in li.icons) {
          let eventsForThisIcon = events[iconKey];
          if (eventsForThisIcon) {
            for (let eventKey in eventsForThisIcon) {
              let event = eventsForThisIcon[eventKey];
              li.icons[iconKey].addEventListener(eventKey, event);
            }
          }
        }

        this.tasks.push(li);
      }
    }
  };

  this.activated = function(index = -1) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (i === index) {
        this.tasks[i].li.classList.add('active');
      } else {
        this.tasks[i].li.classList.remove('active');
      }
    }
  };

};

module.exports = TaskList;