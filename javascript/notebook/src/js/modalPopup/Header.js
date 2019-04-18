let Header = function(parent) {
  let modalHeader = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'modal-header',
    },
  });

  let h5 = createDOMElement({
    tagName: 'h5',
    parent: modalHeader,
    property: {
      className: 'modal-title',
      textContent: 'Заголовок сообщения',
    },
    attributes: {
      id: 'exampleModalCenterTitle',
    },
  });

  let closeButton = createDOMElement({
    tagName: 'button',
    parent: modalHeader,
    property: {
      className: 'close',
    },
    attributes: {
      type: 'button',
      'data-dismiss': 'modal',
      'aria-label': 'Close',
    }
  });

  createDOMElement({
    tagName: 'span',
    parent: closeButton,
    property: {
      innerHTML: '&times;'
    },
    attributes: {
      'aria-hidden': 'true'
    }
  });

  this.value = function(value) {
    h5.textContent = value;
  }

};
module.exports = Header;