const TaskElement = require('./TaskElement');

let TaskList = function(parent) {

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

    for (let index in state.tasksStorage) {

      let li = new TaskElement({
        parent: ul,
        index: index,
      });

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