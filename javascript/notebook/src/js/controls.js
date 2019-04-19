let controls = function(manager) {

  manager.getStorage();

  let taskEdit = manager.taskEdit;
  let taskList = manager.taskList;
  let popup    = manager.popup;
  let calendar = manager.calendar;

  let clearForm = function() {
    taskEdit.value({
      name: '',
      description: '',
      date: '',
      important: false,
    });
    taskEdit.edit();
    taskEdit.errors();
    taskEdit.inputHeader.textContent = 'Добавить событие';
    taskEdit.inputAdded.textContent = 'Добавить';
    taskEdit.inputAdded.classList.remove('btn-warning');
    taskEdit.inputCancel.textContent = 'Очистить';
    taskList.activated();
    document.getElementById('date-popup').style.display = 'none';
  };

  let taskIconEvent = {
    star: {
      click: function() {
        let index = Number(this.getAttribute('index'));
        important = state.tasksStorage[index].important;
        this.classList.remove('fas', 'far');
        if (important) {
          this.classList.add('far');
        } else {
          this.classList.add('fas');
        }
        state.tasksStorage[index].important = !important;
        if (taskEdit.editIndex === index) {
          taskEdit.inputCheck.checked = !important;
        }
        manager.setStorage();
      },
      mouseover: function() {
        this.classList.add('text-danger');
        this.addEventListener('mouseout', function() {
          this.classList.remove('text-danger');
        });
      },
    },
    edit: {
      click: function() {
        let index = Number(this.getAttribute('index'));
        taskEdit.value(state.tasksStorage[index]);
        taskEdit.edit(index);
        taskList.activated(index);
      },
      mouseover: function() {
        this.classList.add('text-warning');
        this.addEventListener('mouseout', function() {
          this.classList.remove('text-warning');
        });
      },
    },
    trash: {
      click: function() {
        let index = Number(this.getAttribute('index'));
        popup.show({
          textHeader: 'Удалить задачу?',
          textMessage: 'Вы действительно хотите удалить задачу? Данные будут безвозвратно утеряны.',
          buttons: {
            textCancel: 'Отмена',
            textAction: 'Удалить задачу',
            funcAction: function() {
              state.tasksStorage.splice(index, 1);
              manager.setStorage();
              clearForm();
              taskList.refresh(taskIconEvent);
            },
          },
        });
      },
      mouseover: function() {
        this.classList.add('text-danger');
        this.addEventListener('mouseout', function() {
          this.classList.remove('text-danger');
        });
      },
    },
  };

  taskList.refreshList = function() {
    taskList.refresh(taskIconEvent);
  };

  taskList.refreshList();

  let select = taskList.select;
  let options = ['Все задачи', 'Просроченные', 'Выполнить сегодня'];

  options.forEach( function(option) {
    createDOMElement({
      tagName: 'option',
      parent: select,
      property: {
        textContent: option,
      }
    })
  });

  select.addEventListener('change', function () {
    state.filterList = select.options.selectedIndex;
    taskList.refreshList();
  });

  let checkForm = function() {
    let notErrors = true;
    let errors = {
      taskName: false,
      taskDesc: false,
      taskDate: false,
    };

    if (taskEdit.inputName.value.length < 3) {
      errors.taskName = 'Название события не менее 3-х символов';
      notErrors = false;
      taskEdit.inputName.addEventListener('click', function del() {
        taskEdit.getChildren.taskName.errorMsg();
        taskEdit.inputName.removeEventListener('click', del);
      });
    }

    let checkDate = function(value) {

      let date = calendar.dateToArray(value);

      if (date.length === 0) {
        return 'Введите дату';
      }

      if (date[1] > 12) {
        return date[1] + ' - такого месяца не существует';
      }

      if ((date[2] < 1000 || date[2] > 9999) && (date[2] > 99) ) {
        return 'Укажите год в формате - ГГГГ или ГГ';
      }

      for (let i = 0; i < date.length; i++) {
        if (isNaN( Number(date[i])) ) {
          return 'Введите дату в формате ДД.ММ.ГГГГ';
        }
      }

      let daysMonth = 32 - new Date(date[2], date[1] - 1, 32).getDate();
      let days = daysMonth === 31 ? ' день' : ' дней';
      if (date[0] > daysMonth) {
        return 'В указанном месяце только ' + daysMonth + days;
      }

      return '';
    };

    let msg = checkDate(taskEdit.inputDate.value);

    if (msg) {
      errors.taskDate = msg;
      notErrors = false;
      taskEdit.inputDate.addEventListener('click', function del() {
        taskEdit.getChildren.taskDate.errorMsg();
        taskEdit.inputDate.removeEventListener('click', del);
      });
    }

    taskEdit.errors(errors);
    return notErrors;
  };

  let btnAdded = taskEdit.inputAdded;
  btnAdded.addEventListener('click', function() {
    if (checkForm()) {
      let form  = taskEdit.value();
      form.date = calendar.arrayToString( calendar.dateToArray(form.date) );
      if (taskEdit.editIndex === -1) {
        state.tasksStorage.push( form );
      } else {
        state.tasksStorage[taskEdit.editIndex] = form;
      }
      manager.setStorage();
      clearForm();
      taskList.refreshList();

    }
  });

  let btnCancel = taskEdit.inputCancel;
  btnCancel.addEventListener('click', function() {
    clearForm();
  });

};

module.exports = controls;