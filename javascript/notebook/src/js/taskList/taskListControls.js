;(function() {
  let taskListControls = function(parent, index) {
    let span = createDOMElement('span', parent);

    let important = state.taskStorage[index].important;
    let starIcon = important ? 'fas fa-star' : 'far fa-star';
    let star = icon(starIcon, state.constants.starsColor, span, {
      click: function() {
        star.classList.remove('fas', 'far');
        if (important) {
          star.classList.add('far');
        } else {
          star.classList.add('fas');
        }
        important = !important;
        state.taskStorage[index].important = important;
        if (state.editIndex === index) {
          state.taskEdit.value = index;
        }
        state.setStorage();
      },
      mouseover: function() {
        star.classList.add('text-danger');
        star.addEventListener('mouseout', function() {
          star.classList.remove('text-danger');
        });
      },
    });
    star.style.cursor = 'pointer';
    createDOMElement('i', span, { textContent: ' '});
    let edit = icon('fas fa-pen', 'black', span, {
      click: function() {
        state.taskEdit.value = index;
        state.editIndex = index;
        state.taskEdit.edit(true);
        state.taskList.active(index);
      },
      mouseover: function() {
        edit.classList.add('text-warning');
        edit.addEventListener('mouseout', function() {
          edit.classList.remove('text-warning');
        });
      },
    });
    edit.style.cursor = 'pointer';
    createDOMElement('i', span, { textContent: ' '});
    let trash = icon('far fa-trash-alt', 'black', span, {
      click: function() {
        state.taskStorage.splice(index, 1);
        state.setStorage();
        state.taskEdit.clear();
        state.taskList.refreshList();
      },
      mouseover: function() {
        trash.classList.add('text-danger');
        trash.addEventListener('mouseout', function() {
          trash.classList.remove('text-danger');
        });
      },
    });
    trash.style.cursor = 'pointer';

    return span;
  };

  window.taskListControls = taskListControls;
})();