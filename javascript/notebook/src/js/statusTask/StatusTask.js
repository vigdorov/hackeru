const TaskElement = require('./TaskElement');

let StatusTask = function (parent, manager) {
  // контейнер в котором размещены колонки
  let row         = createDOMElement('div', parent, 'row');
  // колонки под каждую задачу (выполнено, в работе, ожидается)
  let cardDone    = createDOMElement('div',    row, 'col-md col-12 card');
  let cardExpects = createDOMElement('div',    row, 'col-md col-12 card');
  let cardInWork  = createDOMElement('div',    row, 'col-md col-12 card');
  // присваиваем id для поиска контейнеров
  cardDone.id    = 'done';
  cardExpects.id = 'expects';
  cardInWork.id  = 'in-work';
  // тела колонок (необходимость bootstrap)
  let bodyDone    = createDOMElement('div', cardDone,    'card-body');
  let bodyExpects = createDOMElement('div', cardExpects, 'card-body');
  let bodyInWork  = createDOMElement('div', cardInWork,  'card-body');
  // заголовки колонок
  let headerDone    = createDOMElement('h4', bodyDone);
  let headerExpects = createDOMElement('h4', bodyExpects);
  let headerInWork  = createDOMElement('h4', bodyInWork);
  headerDone.textContent    = 'Выполнены:';
  headerExpects.textContent = 'В ожидании:';
  headerInWork.textContent  = 'В работе:';
  // ul для будующих задач
  let ul = [
    createDOMElement('ul', bodyDone,    'list-group'),
    createDOMElement('ul', bodyExpects, 'list-group'),
    createDOMElement('ul', bodyInWork,  'list-group'),
  ];
  for (let elem of ul) {
    elem.style.position = 'relative';
  }


  // Метод объекта для отрисовки задач
  this.refresh = function () {
    // Очищаем колонки
    for (let elem of ul) {
      elem.innerHTML = '';
    }
    // заполняем колонки в соответствии со статусом
    let data = state.tasksStorage;
    for (let i in data) {
      switch (data[i].status) {
        case 'done':
          new TaskElement(ul[0], i, manager); break;
        case 'expects':
          new TaskElement(ul[1],    i, manager); break;
        case 'in-work':
          new TaskElement(ul[2],  i, manager); break;
        default:
          data[i].status = 'expects';
          new TaskElement(ul[1], i, manager);
      }
    }

    manager.setStorage();
  };

  this.refresh();
};

module.exports = StatusTask;