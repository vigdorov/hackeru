let state = {
  taskList: [],
  statusEdit: false,
  editIndex: null,
  getStorage: function() {
    this.taskList = JSON.parse(localStorage.getItem('notes')) || [];
  },
  setStorage: function() {
    let parse = JSON.stringify(this.taskList);
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
};

state.getStorage();

let taskName = document.getElementById('task-name');
let taskDesc = document.getElementById('task-desc');
let taskDate = document.getElementById('task-date');
let taskCheck = document.getElementById('task-check');

let btnAdd = document.getElementById('add');
let btnClear = document.getElementById('clear');

let formTaskDate = {
  children: [
    document.getElementById('date-header'),
    document.getElementById('task-date'),
    document.getElementById('msg-date'),
  ]
};

let formTaskName = document.getElementById('form-task-name');

let errorPaint = function(formGroup, msg) {
  formGroup.children[0].classList.remove('text-danger');
  formGroup.children[1].classList.remove('is-invalid');
  formGroup.children[2].classList.remove('text-danger');
  formGroup.children[2].textContent = '';
  if (msg) {
    formGroup.children[0].classList.add('text-danger');
    formGroup.children[1].classList.add('is-invalid');
    formGroup.children[2].classList.add('text-danger');
    formGroup.children[2].textContent = msg;
  }
};

let clearForm = function() {
  taskName.value = '';
  taskDesc.value = '';
  taskDate.value = '';
  taskCheck.checked = false;
  btnAdd.textContent = 'Добавить';
  btnAdd.classList.remove('btn-warning');
  btnClear.textContent = 'Очистить';
  state.statusEdit = false;
  state.editIndex = null;
  state.calendarDate = new Date();
  let tasks = document.getElementById('tasks');
  for (let i = 0; i < tasks.children.length; i++) {
    tasks.children[i].classList.remove('active');
  }
  errorPaint(formTaskName);
  errorPaint(formTaskDate);
};

let setForm = function(index) {
  let data = state.taskList[index];
  taskName.value = data.name;
  taskDesc.value = data.desc;
  taskDate.value = createDate( parseDate(data.date), 'string' );
  taskCheck.checked = data.important;
  btnAdd.classList.add('btn-warning');
  btnAdd.textContent = 'Изменить';
  btnClear.textContent = 'Отменить';
  state.statusEdit = true;
  state.editIndex = index;
};

let delTask = function(index) {
  state.taskList.splice(index, 1);
  state.setStorage();
  clearForm();
  refreshTaskList();
};

let setDate = function(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  taskDate.value = day + '.' + month + '.' + year;
};

taskDate.addEventListener('keydown', function(e) {
  if (!/[0-9\.]|Backspace|Delete/.test((e.key))) {
    e.preventDefault();
  } else {
    errorPaint(formTaskDate);
  }
});

let msPerDay = function(ms) {
  let result = ms / 86400000;
  if (result >= 0) {
    return Math.floor(result);
  } else {
    return Math.ceil(result);
  }
};

let parseDate = function(text) {
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

let createTask = function(index) {
  let difference = msPerDay(new Date(Date.parse(state.taskList[index].date)) - new Date());

  let li = document.createElement('li');
  li.classList.add('list-group-item', 'list-group-item-action');
  li.setAttribute('data-index', index);
  li.addEventListener('mousedown', function(e) {
    e.preventDefault();
  });

  let row = document.createElement('div');
  row.classList.add('row');

  let col1 = document.createElement('div');
  col1.classList.add('col');

  let i = document.createElement('i');
  let important = state.taskList[index].important;
  if (important) {
    i.classList.add('fas', 'fa-star');
  } else {
    i.classList.add('far', 'fa-star');
  }
  i.addEventListener('click', function() {
    i.classList.remove('fas', 'far');
    if (important) {
      i.classList.add('far');
    } else {
      i.classList.add('fas');
    }
    important = !important;
    state.taskList[index].important = important;
    if (index === state.editIndex) {
      taskCheck.checked = !taskCheck.checked;
    }
    state.setStorage();
  });

  let span = document.createElement('span');
  span.textContent = ' ' + state.taskList[index].name + ' ';
  span.style.fontWeight = 'bold';
  let spanDate = document.createElement('span');
  let date = parseDate(state.taskList[index].date);
  spanDate.textContent = date[0] + '.' + date[1] + '.' + date[2];
  let color = 'badge-primary';
  if (difference === 0) {
    color = 'badge-warning';
  } else if (difference < 0) {
    color = 'badge-danger';
  }
  spanDate.classList.add('badge', 'badge-pill', color);

  let col2 = document.createElement('div');
  col2.classList.add('col-2');

  let pen = document.createElement('i');
  pen.classList.add('fas', 'fa-pen');
  pen.addEventListener('click', function() {
    clearForm();
    let tasks = document.getElementById('tasks');
    for (let i = 0; i < tasks.children.length; i++) {
      if (i === index) continue;
      tasks.children[i].classList.remove('active');
    }
    setForm(index);
    li.classList.add('active');
    let date = parseDate(state.taskList[index].date);
    state.calendarDate = new Date(date[2], date[1] - 1, date[0]);
  });
  pen.addEventListener('mouseover', function() {
    pen.classList.add('text-warning');
    pen.addEventListener('mouseout', function() {
      pen.classList.remove('text-warning');
    })
  });

  let trash = document.createElement('i');
  trash.classList.add('far', 'fa-trash-alt');
  trash.setAttribute('data-toggle', 'modal');
  trash.setAttribute('data-target', '#exampleModalCenter');
  trash.addEventListener('click', function() {
    let delBtn = document.getElementById('modal-del');
    delBtn.setAttribute('onclick', `delTask(${index})`);
    delBtn.addEventListener('click', function() {
      delBtn.setAttribute('onclick', '');
    });
  });
  trash.addEventListener('mouseover', function() {
    trash.classList.add('text-danger');
    trash.addEventListener('mouseout', function() {
      trash.classList.remove('text-danger');
    })
  });

  let row2 = document.createElement('div');
  row2.classList.add('row');

  let col3 = document.createElement('div');
  col3.classList.add('col');
  col3.textContent = state.taskList[index].desc;

  let row3 = document.createElement('div');
  row3.classList.add('row');

  let col4 = document.createElement('div');
  col4.classList.add('col');

  let col5 = document.createElement('div');
  col5.classList.add('col-5', 'text-right');
  let first = 'Выполнить через ';
  let second = Math.abs(difference);
  let third = ' дней';
  let textClass = 'badge-primary';

  if (second < 10 || second > 19) {
    let remainder  = second % 10;
    switch(remainder) {
      case 2: case 3: case 4:
        third = ' дня'; break;
      case 1:
        third = ' день'; break;
    }
  }

  if (difference === 0) {
    first = 'Выполнить сегодня';
    second = third = '';
    textClass = 'badge-warning';
  }
  if (difference < 0) {
    first = 'Просрочено на ';
    textClass = 'badge-danger';
  }

  col5.textContent = first + second + third;
  col5.classList.add('badge', textClass);

  li.appendChild(row);
  row.appendChild(col1);
  row.appendChild(col2);
  col1.appendChild(i);
  col1.appendChild(span);
  col1.appendChild(spanDate);
  col2.appendChild(pen);
  col2.appendChild(document.createTextNode(' '));
  col2.appendChild(trash);
  li.appendChild(row2);
  row2.appendChild(col3);
  li.appendChild(row3);
  row3.appendChild(col4);
  row3.appendChild(col5);

  return li;
};

let refreshTaskList = function() {
  let tasks = document.getElementById('tasks');
  tasks.innerHTML = '';
  if (state.period) {
    state.taskList.sort( function(a, b) {
      let first = Date.parse(a.date) - new Date();
      let second = Date.parse(b.date) - new Date();
      if (first > second) return  1;
      if (first < second) return -1;
      return 0;
    });
  } else {
    state.taskList.sort( function(a, b) {
      let first = Date.parse(a.date) - new Date();
      let second = Date.parse(b.date) - new Date();
      if (first < second) return  1;
      if (first > second) return -1;
      return 0;
    });
  }

  for (let i in state.taskList) {
    let difference = msPerDay(Date.parse(state.taskList[i].date) - new Date());
    if (state.filter === '1' && difference === 0) {
      let li = createTask(i);
      tasks.appendChild(li);
    } else if (state.filter === '2' && difference < 0) {
      let li = createTask(i);
      tasks.appendChild(li);
    } else if (state.filter === '0') {
      let li = createTask(i);
      tasks.appendChild(li);
    }
  }
};

let periodBtn = document.getElementById('period-task');
periodBtn.addEventListener('click', function() {
  let i = periodBtn.children[0];
  i.classList.remove('fa-angle-down', 'fa-angle-up');
  state.period = !state.period;
  if (state.period) {
    i.classList.add('fa-angle-down');
  } else {
    i.classList.add('fa-angle-up');
  }
  refreshTaskList();
});

let selectTask = document.getElementById('select-task');
selectTask.addEventListener('change', function() {
  let select = selectTask.options.selectedIndex;
  state.filter = selectTask.options[select].value;
  refreshTaskList();
});

refreshTaskList();

let createDate = function(date, type) {
  if (type === 'date') {
    return new Date(date[2], date[1] - 1, date[0]);
  }
  if (type === 'string') {
    return date[0] + '.' + date[1] + '.' + date[2];
  }
};

let checkDate = function(date) {

  if (date.length < 3 || date.length > 3) {
    errorPaint(formTaskDate, 'Введите дату в формате дд.мм.гггг');
    return false;
  }

  for (let i = 0; i < date.length; i++) {
    if (date[i].length === 0) {
      let field = i === 0 ? 'день' : 'месяц';
      errorPaint(formTaskDate, 'Не указан ' + field);
      return false;
    }
  }

  if (date[2] > 2100 || date[2] < 2000) {
    errorPaint(formTaskDate, 'Год меньше 2000 или больше 2100');
    return false;
  }

  return true;
};

let checkForm = function() {
  let notError = true;

  if (formTaskName.children[1].value.length < 3) {
    errorPaint(formTaskName, 'Название события не менее 3-х символов');
    formTaskName.children[1].addEventListener('input', function del() {
      errorPaint(formTaskName);
      formTaskName.children[1].removeEventListener('input', del);
    });
    notError = false;
  }

  let date = parseDate(taskDate.value);
  if (!checkDate(date)) {
    notError = false;
  }

  return notError;
};

btnClear.addEventListener('click', function() {
  clearForm();
});

btnAdd.addEventListener('click', function() {
  if (checkForm()) {
    let innerObject = {
      name: taskName.value,
      desc: taskDesc.value,
      date: createDate( parseDate(taskDate.value), 'date' ),
      important: taskCheck.checked,
    };
    if (state.statusEdit) {
      state.taskList[state.editIndex] = innerObject;
    } else {
      state.taskList.push(innerObject);
    }
    clearForm();
    state.setStorage();
    refreshTaskList();
  }
});

let drawCalendar = function (start, daysMonth, month, year) {
  let table = document.getElementById('table');
  table.innerHTML = '';
  let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let nameMonths = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  document.getElementById('month').textContent = nameMonths[month];
  document.getElementById('year').textContent = year;
  let check = 0;
  for (let i = 0; i < 7; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      let cell = 'td';
      let content = '';
      let isNumber = false;
      if (i === 0) {
        content = days[j];
        cell = 'th';
      } else {
        if (check >= start && check - start + 1 <= daysMonth) {
          content = check - start + 1;
          isNumber = true;
        }
        check++;
      }
      let td = document.createElement(cell);
      td.textContent = content;
      td.classList.add('text-center');

      if (isNumber) {
        td.addEventListener('mouseover', function() {
          td.classList.add('alert', 'alert-primary');
          td.addEventListener('mouseout', function() {
            td.classList.remove('alert', 'alert-primary');
          });
        });
        td.style.cursor = 'pointer';
        td.addEventListener('click', function() {
          state.calendarDate = new Date(year, month, content);
          taskDate.value = createDate( parseDate(state.calendarDate), 'string' );
          document.getElementById('date-popup').style.display = 'none';
        });
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
};

let leftMonth = document.getElementById('left-month');
leftMonth.addEventListener('click', function() {
  state.previousMonths();
  createCalendar();
});

let rightMonth = document.getElementById('right-month');
rightMonth.addEventListener('click', function() {
  state.nextMonths();
  createCalendar();
});

let currDay = document.getElementById('curr-day');
currDay.addEventListener('click', function() {
  state.calendarDate = new Date();
  createCalendar();
});

let createCalendar = function() {
  let date = parseDate(state.calendarDate);
  let month = date[1] - 1;
  let year = date[2];
  let weekNumber = new Date(year, month, 0).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  drawCalendar(weekNumber, daysInMonth, month, year);
};

taskDate.addEventListener('click', function() {
  let datePopup = document.getElementById('date-popup');
  datePopup.style.display = 'block';
  createCalendar();
  errorPaint(formTaskDate);

  document.body.addEventListener('mousedown', function del(e) {
    let isPopup = false;
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i].className === 'card date-popup') {
        isPopup = true;
      }
    }
    if (!isPopup) {
      datePopup.style.display = 'none';
      document.body.removeEventListener('mousedown', del);
    }
  })
});