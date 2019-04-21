const TaskIcons = require('./TaskIcons');

let TaskElement = function(settings, calendar) {

  this.index = settings.index;
  let task = state.tasksStorage[this.index];
  let nameClassForLi = 'list-group-item-' + task.category.color;

  this.li = createDOMElement({
    tagName: 'li',
    parent: settings.parent,
    property: {
      className: 'list-group-item list-group-item-action ' + nameClassForLi,
    },
  });

  let div = createDOMElement({
    tagName: 'div',
    parent: this.li,
    property: {
      className: 'd-flex w-100 justify-content-between',
    },
  });

  let header = createDOMElement({
    tagName: 'h5',
    parent: div,
    property: {
      textContent: task.name + ' ',
    },
  });

  createDOMElement({
    tagName: 'span',
    parent: header,
    property: {
      className: 'badge badge-' + task.category.color,
      textContent: task.category.name,
    }
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

  let divDate = createDOMElement({
    tagName: 'div',
    parent: this.li,
    property: {
      className: 'd-flex w-100 justify-content-between',
    },
  });

  let small = createDOMElement({
    tagName: 'small',
    parent: divDate,
    property: {
      textContent: 'Выполнить: ',
    },
  });

  let date = calendar.dateToArray(task.date);
  let temp = new Date();
  let today = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
  let difference = new Date(date[2], date[1] - 1, date[0]) - today;
  let days = calendar.msToDay(difference);


  let color = 'badge-primary';
  if (days === 0) {
    color = 'badge-warning';
  } else if (days < 0) {
    color = 'badge-danger';
  }

  let currentDate = createDOMElement({
    tagName: 'span',
    parent: small,
    property: {
      className: 'badge badge-pill ' + color,
      textContent: task.date,
    },
  });


  let termDays = Math.abs(days);
  let message = days;

  if (termDays < 10 || termDays > 19) {

    switch(termDays % 10) {
      case 2: case 3: case 4:
        message += ' дня'; break;
      case 1:
        message += ' день'; break;
      default:
        message += ' дней'; break;
    }
  } else {
    message += ' дней';
  }

  if (days === 0) {
    message = 'сегодня';
  }

  let term = createDOMElement('small', divDate);

  createDOMElement({
    tagName: 'span',
    parent: term,
    property: {
      className: 'badge badge-pill ' + color,
      textContent: message,
    },
  });

};

module.exports = TaskElement;