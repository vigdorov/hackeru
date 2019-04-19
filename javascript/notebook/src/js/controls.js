let controls = function(manager) {

  manager.getStorage();

  let taskEdit = manager.taskEdit;
  let taskList = manager.taskList;
  let popup    = manager.popup;
  let calendar = manager.calendar;
  let settings = manager.settings;

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
        let important = state.tasksStorage[index].important;
        this.classList.remove('fas', 'far', 'text-warning');
        if (important) {
          this.classList.add('far');
        } else {
          this.classList.add('fas', 'text-warning');
        }
        state.tasksStorage[index].important = !important;
        if (taskEdit.editIndex === index) {
          taskEdit.inputCheck.checked = !important;
        }
        manager.setStorage();
      },
      mouseover: function() {
        this.classList.add('text-warning');
        this.addEventListener('mouseout', function() {
          this.classList.remove('text-warning');
        });
      },
    },
    edit: {
      click: function() {
        this.classList.remove('text-warning');
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
        this.classList.remove('text-danger');
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

  let refreshBtnCarousel = function () {
    let btnGroup = taskList.btnGroup;
    for (let i = 0; i < btnGroup.childNodes.length; i++) {
      btnGroup.childNodes[i].addEventListener('click', () => {
        taskList.numberListActivated = i;
        taskList.refreshList();
      });
    }
  };

  taskList.refreshList = function() {
    taskList.refresh(taskIconEvent);
    refreshBtnCarousel();
  };


  taskList.refreshList();
  refreshBtnCarousel();

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

  let filter = settings.select;

  filter.addEventListener('change', function () {
    state.temporary.filterList = filter.options.selectedIndex;
  });

  let tasksOnList = settings.tasksOnList;
  let taskOnListInput = tasksOnList.getChildren[1];
  taskOnListInput.addEventListener('keydown', function(e) {
    let check = (e.keyCode >= 48 && e.keyCode <= 57) ||
                e.key === 'Backspace' || e.key === 'Delete' ||
                e.key === 'ArrowLeft' || e.key === 'ArrowRight';
    if (!check) {
      e.preventDefault();
      tasksOnList.errorMsg('Только цифры');
    } else {
      taskOnListInput.addEventListener('keyup', function del() {
        tasksOnList.errorMsg();
        taskOnListInput.removeEventListener('keyup', del);
      });
    }
  });

  taskOnListInput.addEventListener('change', function() {
    state.temporary.countTaskOnList = Number(taskOnListInput.value);
  });

  let settingsBtn = taskList.settings;

  settingsBtn.addEventListener('click', function() {
    filter.options.selectedIndex = state.filterList;
    taskOnListInput.value = state.countTaskOnList;
    popup.show({
      textHeader: 'Настройки',
      inner: settings.body,
      buttons: {
        textAction: 'Сохранить',
        textCancel: 'Закрыть',
        funcAction: function() {
          state.filterList = state.temporary.filterList;
          state.countTaskOnList = state.temporary.countTaskOnList;
          taskList.refreshList();
        },
        funcCancel: function() {
          state.temporary = {
            filterList: state.filterList,
            countTaskOnList: state.countTaskOnList,
          };
        },
      },
    });
  });

};

module.exports = controls;