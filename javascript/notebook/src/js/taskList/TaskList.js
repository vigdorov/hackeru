const TaskElement = require('./TaskElement');

let TaskList = function(parent, manager) {

  let div = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'card-body',
      style: {
        position: 'relative',
      }
    },
  });

  let header = createDOMElement({
    tagName: 'h3',
    parent: div,
    property: {
      textContent: 'Список задач',
    },
  });

  this.settings = createDOMElement({
    tagName: 'h4',
    parent: div,
    property: {
      className: 'fas fa-sliders-h',
      style: {
        position: 'absolute',
        top: '29px',
        right: '20px',
      },
    },
    attributes: {
      'data-toggle': 'modal',
      'data-target': '#exampleModalCenter',
    }
  });

  let ul = createDOMElement({
    tagName: 'ul',
    parent: div,
    property: {
      className: 'list-group',
    },
  });

  this.numberListActivated = 0;

  this.tasks = [];

  this.refresh = function(events) {

    ul.innerHTML = '';
    this.tasks = [];

    state.tasksStorage.sort( function(a, b) {
      let first = manager.calendar.arrayToDate( manager.calendar.dateToArray(a.date) );
      let second = manager.calendar.arrayToDate( manager.calendar.dateToArray(b.date) );
      if (first > second) return  1;
      if (first < second) return -1;
      return 0;
    });


    let startIndex = this.numberListActivated * state.countTaskOnList;
    let finalIndex = Math.min(startIndex + state.countTaskOnList, state.tasksStorage.length);
    for (let i = startIndex; i < finalIndex; i++) {

      let task = state.tasksStorage[i];

      let date = manager.calendar.dateToArray(task.date);
      let difference = new Date(date[2], date[1] - 1, date[0]) - new Date();
      let days = manager.calendar.msToDay(difference);

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
          index: i,
        }, manager.calendar);

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

    let listsTasks = Math.ceil(state.tasksStorage.length / state.countTaskOnList);

    this.btnGroup.innerHTML = '';

    for (let i = 0; i < listsTasks; i++) {
      if (listsTasks > 1) {
        createDOMElement({
          tagName: 'button',
          parent: this.btnGroup,
          property: {
            className: 'btn btn-primary',
            textContent: i + 1,
          },
        });
      }
    }
  };

  let buttonsPages = createDOMElement({
    tagName: 'div',
    parent: div,
    property: {
      className: 'btn-toolbar justify-content-center',
      style: {
        paddingTop: '10px',
      },
    },
    attributes: {
      role: 'toolbar',
    },
  });

  this.btnGroup = createDOMElement({
    tagName: 'div',
    parent: buttonsPages,
    property: {
      className: 'btn-group mr-2',
    },
    attributes: {
      role: 'group',
    },
  });

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