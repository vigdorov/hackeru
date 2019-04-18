let controls = function(manager) {

  manager.getStorage();

  let taskEdit = manager.taskEdit;
  let taskList = manager.taskList;
  let popup    = manager.popup;

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

    if (taskEdit.inputDate.value.length === 0) {
      errors.taskDate = 'Введите дату события';
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
      if (taskEdit.editIndex === -1) {
        state.tasksStorage.push( taskEdit.value() );
      } else {
        state.tasksStorage[taskEdit.editIndex] = taskEdit.value();
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