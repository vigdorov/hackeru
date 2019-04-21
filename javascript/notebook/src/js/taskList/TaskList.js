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

  // хранит какой лист задач сейчас открыт
  this.numberListActivated = 0;

  // хранит объекты задач, которые сейчас отображены на странице
  this.tasks = [];

  this.refresh = function(events) {

    // Очищаем лист задач и объект хранения элементов задачи
    ul.innerHTML = '';
    this.tasks = [];

    // Сортируем данные в массиве по дате (по возрастанию)
    state.tasksStorage.sort( function(a, b) {
      let first = manager.calendar.arrayToDate( manager.calendar.dateToArray(a.date) );
      let second = manager.calendar.arrayToDate( manager.calendar.dateToArray(b.date) );
      if (first > second) return  1;
      if (first < second) return -1;
      return 0;
    });

    // Очищаем временный массив отфильтрованных тасков
    state.filteredTasksStorage = [];

    // Фильтруем задачи по признаку, занося их во временный массив
    state.tasksStorage.forEach( function (task, index) {
      let date = manager.calendar.dateToArray(task.date);
      let difference = new Date(date[2], date[1] - 1, date[0]) - new Date();
      let days = manager.calendar.msToDay(difference);
      task.realIndex = index;

      if (state.settings.filterList === 0) {
        state.filteredTasksStorage.push(task);
      }
      if (state.settings.filterList === 1 && days < 0) {
        state.filteredTasksStorage.push(task);
      }
      if (state.settings.filterList === 2 && days === 0) {
        state.filteredTasksStorage.push(task);
      }

    });

    // Рисуем задачи из отфильтрованного массива.

    let startIndex = this.numberListActivated * state.settings.countTaskOnList;
    let finalIndex = Math.min(startIndex + state.settings.countTaskOnList, state.filteredTasksStorage.length);
    for (let i = startIndex; i < finalIndex; i++) {

      let task = state.filteredTasksStorage[i];

      let li = new TaskElement({
        parent: ul,
        index: task.realIndex,
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

    let listsTasks = Math.ceil(state.filteredTasksStorage.length / state.settings.countTaskOnList);

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