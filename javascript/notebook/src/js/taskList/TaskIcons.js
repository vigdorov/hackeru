let TaskIcons = function(settings) {

  let span = createDOMElement({
    tagName: 'span',
    parent: settings.parent,
  });

  let index = settings.index;
  let important = state.tasksStorage[index].important;

  this.star = createDOMElement({
    tagName: 'i',
    parent: span,
    property: {
      className: important ? 'fas fa-star' : 'far fa-star',
      style: {
        color: '#f5d000',
        cursor: 'pointer',
      }
    },
    attributes: {
      index: index,
    },
  });

  createDOMElement({
    tagName: 'i',
    parent: span,
    property: {
      textContent: ' ',
    },
  });

  this.edit = createDOMElement({
    tagName: 'i',
    parent: span,
    property: {
      className: 'fas fa-pen',
      style: {
        color: '#000000',
        cursor: 'pointer',
      },
    },
    attributes: {
      index: index,
    },
  });

  createDOMElement({
    tagName: 'i',
    parent: span,
    property: {
      textContent: ' ',
    },
  });

  this.trash = createDOMElement({
    tagName: 'i',
    parent: span,
    property: {
      className: 'far fa-trash-alt',
      style: {
        color: '#000000',
        cursor: 'pointer',
      },
    },
    attributes: {
      index: index,
      'data-toggle': 'modal',
      'data-target': '#exampleModalCenter',
    },
  });

};

module.exports = TaskIcons;