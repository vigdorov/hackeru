let CheckboxGroup = function(settings) {
  /*
  settings = {
    parent:
    label:
    id:
  }
   */

  let div = createDOMElement({
    tagName: 'div',
    parent: settings.parent,
    property: {
      className: 'custom-control custom-switch form-group',
    },
  });

  let checkbox = createDOMElement({
    tagName: 'input',
    parent: div,
    property: {
      className: 'custom-control-input',
    },
    attributes: {
      type: 'checkbox',
      id: settings.id,
    },
  });

  let label = createDOMElement({
    tagName: 'label',
    parent: div,
    property: {
      className: 'custom-control-label',
    },
    attributes: {
      for: settings.id,
    }
  });

  createDOMElement({
    tagName: 'i',
    parent: label,
    property: {
      className: 'fas fa-star',
      style: {
        color: '#f5d000',
      }
    }
  });

  createDOMElement({
    tagName: 'span',
    parent: label,
    property: {
      textContent: settings.label,
    }
  });

  this.checkValue = function(value) {
    if (value === undefined) {
      return checkbox.checked;
    }
    checkbox.checked = value;
  };

  this.getChildren = {
    '0': checkbox,
    '1': label,
  };

};

module.exports = CheckboxGroup;