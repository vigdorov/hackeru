import './taskListControls';

(function() {
  let taskListElement = function(parent, index) {
    let li = createDOMElement('li', parent, {
      className: 'list-group-item list-group-item-action',
    });
    let div = createDOMElement('div', li, {
      className: 'd-flex w-100 justify-content-between',
    });
    let task = state.taskStorage[index];
    let header = createDOMElement('h5', div, { textContent: task.name} );
    let controls = taskListControls(div, index);

    return li;
  };

  window.taskListElement = taskListElement;
})();