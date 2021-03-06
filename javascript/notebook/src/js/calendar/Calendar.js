const drawCalendar = require('./drawCalendar');

let Calendar = function(parent) {

  let div = parent.parentNode;
  div.style.position = 'relative';

  this.input = parent;
  this.currentDay = new Date();

  this.table = createDOMElement(
    'table', div, 'table date-table table-borderless table-sm'
  );

  this.month = createDOMElement({
    tagName: 'span',
    parent: div,
    property: {
      className: 'badge badge-primary',
      textContent: 'Месяц',
    },
  });

  this.year = createDOMElement({
    tagName: 'span',
    parent: div,
    property: {
      className: 'badge badge-primary',
      textContent: '1980',
    },
  });

  this.dateToArray = function(text) {
    let date = [];
    if (String(text).length > 10) {
      text = new Date( Date.parse(text) );
      date[0] = text.getDate() ;
      date[1] = text.getMonth() + 1;
      date[2] = text.getFullYear();
    } else {
      let number = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '.') {
          date.push(number);
          number = '';
        } else {
          number += text[i];
        }
        if (i === text.length - 1 && number.length > 0) {
          date.push(number);
        }
      }
    }
    return date;
  };

  this.arrayToDate = function(date) {
    return new Date(date[2], date[1] - 1, date[0]);
  };

  this.arrayToString = function(date) {

    date.forEach( function(elem, i) {
      date[i] = Number(elem);
    });

    if (date[0] < 10) {
      date[0] = '0' + date[0];
    }

    if (date[1] < 10) {
      date[1] = '0' + date[1];
    }

    if (date[2] < 10) {
      date[2] = '200' + date[2];
    } else if (date[2] < 100) {
      date[2] = '20' + date[2];
    }

    return date[0] + '.' + date[1] + '.' + date[2];
  };

  this.msToDay = function(ms) {
    let result = ms / 86400000;
    if (result >= 0) {
      result = Math.floor(result);

    } else {
      result = Math.ceil(result);
    }
    if (result === -0) {
      result = 0;
    }
    return result;
  };

  this.createCalendar = function() {
    let date = this.dateToArray(this.currentDay);
    let month = date[1] - 1;
    let year = date[2];
    let weekNumber = new Date(year, month, 0).getDay();
    let daysMonth = 32 - new Date(year, month, 32).getDate();
    drawCalendar(this, {
      parent: this.table,
      startWeekday: weekNumber,
      daysMonth: daysMonth,
      month: month,
      year: year,
    });
  };

  this.card = createDOMElement({
    tagName: 'div',
    parent: div,
    property: {
      className: 'card date-popup',
      style: {
        display: 'none',
        position: 'absolute',
        width: '280px',
        height: '280px',
        top: '-251px',
        left: '-15px',
      },
      id: 'date-popup',
    },
  });

  this.input.addEventListener('click', () => {
    this.card.style.display = 'block';
    this.createCalendar();

    document.body.addEventListener('mousedown', function del(e) {
      let isPopup = function(target) {
        if (target === null) {
          return false;
        }
        if (target.className === 'card date-popup') {
          return true;
        }
        return isPopup(target.parentNode);
      };

      if ( !isPopup(e.target) ) {
        document.getElementById('date-popup').style.display = 'none';
        document.body.removeEventListener('touchstart', del);
      }
    });

  });

  let cardBody = createDOMElement('div', this.card, 'card-body');
  let rowUp = createDOMElement('div', cardBody, 'row justify-content-between');
  let colUpLeft = createDOMElement('div', rowUp, 'col text-left');

  colUpLeft.appendChild(this.month);

  createDOMElement({
    tagName: 'span',
    parent: colUpLeft,
    property: {
      textContent: ' ',
    },
  });

  colUpLeft.appendChild(this.year);

  let colUpRight = createDOMElement('div', rowUp, 'col text-right');

  let buttonGroup = createDOMElement({
    tagName: 'div',
    parent: colUpRight,
    property: {
      className: 'btn-group mr-2',
    },
    attributes: {
      role: 'group',
      'aria-label': 'First group',
    },
  });

  let leftMonth = createDOMElement({
    tagName: 'button',
    parent: buttonGroup,
    property: {
      className: 'btn btn-outline-primary btn-sm',
    },
    attributes: {
      type: 'button',
    },
  });
  createDOMElement('i', leftMonth, 'fas fa-caret-left');

  leftMonth.addEventListener('click', () => {
    let newMonth = this.currentDay.getMonth() - 1;
    let year = this.currentDay.getFullYear();
    this.currentDay = new Date(year, newMonth);
    this.createCalendar();
  });

  let currentMonth = createDOMElement({
    tagName: 'button',
    parent: buttonGroup,
    property: {
      className: 'btn btn-primary btn-sm',
    },
    attributes: {
      type: 'button',
    },
  });
  createDOMElement('i', currentMonth, 'far fa-calendar-check');

  currentMonth.addEventListener('click', () => {
    this.currentDay = new Date();
    this.createCalendar();
  });

  let rightMonth = createDOMElement({
    tagName: 'button',
    parent: buttonGroup,
    property: {
      className: 'btn btn-outline-primary btn-sm',
    },
    attributes: {
      type: 'button',
    },
  });
  createDOMElement('i', rightMonth, 'fas fa-caret-right');

  rightMonth.addEventListener('click', () => {
    let newMonth = this.currentDay.getMonth() + 1;
    let year = this.currentDay.getFullYear();
    this.currentDay = new Date(year, newMonth);
    this.createCalendar();
  });

  let rowDown = createDOMElement('div', cardBody, 'row');
  let colDown = createDOMElement('div', rowDown, 'col');

  colDown.appendChild(this.table);

};

module.exports = Calendar;