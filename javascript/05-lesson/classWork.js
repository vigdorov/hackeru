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
};

state.getStorage();

let taskName = document.getElementById('task-name');
let taskDesc = document.getElementById('task-desc');
let taskDate = document.getElementById('task-date');
let taskCheck = document.getElementById('task-check');

let btnAdd = document.getElementById('add');
let btnClear = document.getElementById('clear');

let clearForm = function() {
  taskName.value = '';
  taskDesc.value = '';
  taskDate.value = '';
  taskCheck.checked = false;
  btnAdd.textContent = 'Добавить';
  btnClear.textContent = 'Очистить';
  state.statusEdit = false;
  state.editIndex = null;
  let tasks = document.getElementById('tasks');
  for (let i = 0; i < tasks.children.length; i++) {
    tasks.children[i].classList.remove('active');
  }
};

let setForm = function(index) {
  let data = state.taskList[index];
  taskName.value = data.name;
  taskDesc.value = data.desc;
  taskDate.value = data.date;
  taskCheck.checked = data.important;
  btnAdd.textContent = 'Изменить';
  btnClear.textContent = 'Отменить';
  state.statusEdit = true;
  state.editIndex = index;
};

let createTask = function(name, important, index) {
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
  });

  let span = document.createElement('span');
  span.textContent = ' ' + name;

  let col2 = document.createElement('div');
  col2.classList.add('col-2');

  let pen = document.createElement('i');
  pen.classList.add('fas', 'fa-pen');
  pen.addEventListener('click', function() {
    let tasks = document.getElementById('tasks');
    for (let i = 0; i < tasks.children.length; i++) {
      if (i === index) continue;
      tasks.children[i].classList.remove('active');
    }
    setForm(index);
    li.classList.add('active');
  });

  let trash = document.createElement('i');
  trash.classList.add('far', 'fa-trash-alt');
  trash.addEventListener('click', function() {
    state.taskList.splice(index, 1);
    state.setStorage();
    clearForm();
    refreshTaskList();
  });

  li.appendChild(row);
  row.appendChild(col1);
  row.appendChild(col2);
  col1.appendChild(i);
  col1.appendChild(span);
  col2.appendChild(pen);
  col2.appendChild(document.createTextNode(' '));
  col2.appendChild(trash);

  return li;
};

let refreshTaskList = function() {
  let tasks = document.getElementById('tasks');
  tasks.innerHTML = '';
  state.taskList.forEach( function(element, index) {
    let li = createTask(element.name, element.important, index);
    tasks.appendChild(li);
  });
};

refreshTaskList();

btnClear.addEventListener('click', function() {
  clearForm();
});

btnAdd.addEventListener('click', function() {
  let innerObject = {
    name: taskName.value,
    desc: taskDesc.value,
    date: taskDate.value,
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
});
