let TaskElement = function (parent, index, manager) {

  let li = createDOMElement('li', parent, 'list-group-item');
  li.classList.add('list-group-item-' + state.tasksStorage[index].category.color);

  let header = createDOMElement({
    tagName: 'h6',
    parent: li,
    property: {
      textContent: state.tasksStorage[index].name,
    },
  });

  let date = createDOMElement({
    tagName: 'p',
    parent: li,
    property: {
      textContent: state.tasksStorage[index].date,
    },
  });

  let i = 0;
  for (let value of li.parentNode.children) {
    if (value === li) {
      break;
    }
    i++;
  }

  li.x = 0;
  li.y = 0;

  let moveElement = function (e) {
    li.style.left = e.pageX - li.x + 'px';
    li.style.top  = e.pageY - li.y + (li.offsetHeight * i) + 'px';
  };

  let searchStatusDiv = function (element) {
    if (element.id === 'done')    return 'done';
    if (element.id === 'expects') return 'expects';
    if (element.id === 'in-work') return 'in-work';
    if (element.parentNode === null) return false;
    else return searchStatusDiv(element.parentNode);
  };

  li.onmousedown = function(e) {

    li.style.width = li.offsetWidth + 'px';
    li.style.height = li.offsetHeight + 'px';
    li.style.position = 'absolute';
    li.x = e.pageX;
    li.y = e.pageY;
    moveElement(e);
    li.style.zIndex = 1000;

    document.onmousemove = function (e) {
      moveElement(e);
    };

    li.onmouseup = function (e) {
      // определить где мы отпустили мышку, если это произошло в блоке 1, 2 или
      // 3, то изменить статус задачи и перерендерить страницу.

      document.onmousemove = null;
      li.onmouseup = null;
      li.style.position = 'static';
      li.x = 0;
      li.y = 0;
      li.style.left = 0;
      li.style.top = 0;
      let target = document.elementFromPoint(e.clientX, e.clientY);
      console.log(target);
      let search = searchStatusDiv(target);
      console.log('search:', search);
      if (search) {
        state.tasksStorage[index].status = search;
        manager.setStorage();
        manager.statusTask.refresh();
      }
    }
  }
};

module.exports = TaskElement;