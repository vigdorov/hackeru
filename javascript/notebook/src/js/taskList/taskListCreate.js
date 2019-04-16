import '../simpleElements/iconFontAwesome';
import './taskListElement';

(function() {
  let taskListCreate = function(parent) {
    let div = createDOMElement('div', parent, { className: 'card-body'} );
    let header = createDOMElement('h3', div, {
      textContent: 'Список задач',
    });
    let ul = createDOMElement('ul', div, { className: 'list-group'} );

    Object.defineProperty(div, 'refreshList', {
      value: function() {
        ul.innerHTML = '';
        for (let index in state.taskStorage) {
          taskListElement(ul, index);
        }
      }
    });

    Object.defineProperty(div, 'active', {
      value: function(index = -1) {
        let tasks = ul.children;
        for (let i = 0; i < tasks.length; i++) {
          if (String(i) === index) {
            tasks[i].classList.add('active');
          } else {
            tasks[i].classList.remove('active');
          }
        }
      }
    });

    return div;
  };

  window.taskListCreate = taskListCreate;
})();