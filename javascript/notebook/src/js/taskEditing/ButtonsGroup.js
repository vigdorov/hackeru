let ButtonsGroup = function(settings) {
  /*
  settings = {
    parent:
    textButtonAdded:
    textButtonCancel:
  }
   */

  let div = createDOMElement({
    tagName: 'div',
    parent: settings.parent,
    property: {
      className: 'form-group',
    },
  });

  let row = createDOMElement({
    tagName: 'div',
    parent: div,
    property: {
      className: 'row',
    },
  });

  let colAdded = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-6',
    },
  });

  let colCancel = createDOMElement({
    tagName: 'div',
    parent: row,
    property: {
      className: 'col-6',
    },
  });

  let buttonAdded = createDOMElement({
    tagName: 'button',
    parent: colAdded,
    property: {
      className: 'btn btn-primary btn-block',
      textContent: settings.textButtonAdded,
    }
  });

  let buttonCancel = createDOMElement({
    tagName: 'button',
    parent: colCancel,
    property: {
      className: 'btn btn-outline-secondary btn-block',
      textContent: settings.textButtonCancel,
    }
  });

  this.getChildren = {
    '0': buttonAdded,
    '1': buttonCancel,
  };

};

module.exports = ButtonsGroup;