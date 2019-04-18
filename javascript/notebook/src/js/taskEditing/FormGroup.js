let FormGroup = function(settings) {
  /*
  settings = {
    parent:
    label:
    hint:
    id:
    type: text/textarea
    imp: true/false
  }
  */

  let div = createDOMElement({
    tagName: 'div',
    parent: settings.parent,
    property: {
      className: 'form-group',
    },
  });

  let label = createDOMElement({
    tagName: 'label',
    parent: div,
    property: {
      textContent: settings.label,
    },
    attributes: {
      for: settings.id,
    },
  });

  if (settings.imp) {
    createDOMElement({
      tagName: 'span',
      parent: label,
      property: {
        className: 'text-danger',
        textContent: ' *',
      },
    });
  }

  let textarea = settings.type === 'textarea';

  let input = createDOMElement({
    tagName: textarea ? 'textarea' : 'input',
    parent: div,
    property: {
      className: 'form-control',
    },
    attributes: {
      placeholder: settings.hint,
      id: settings.id,
    },
  });

  if (textarea) {
    input.setAttribute('rows', '3');
  } else {
    input.setAttribute('type', 'text');
  }

  let small = createDOMElement({
    tagName: 'small',
    parent: div,
    property: {
      className: 'text-danger',
    },
  });

  this.inputValue = function(value) {
    if (value === undefined) {
      return input.value;
    } else {
      input.value = value;
    }
  };

  this.errorMsg = function(msg) {
    if (msg) {
      label.classList.add('text-danger');
      input.classList.add('is-invalid');
    } else {
      label.classList.remove('text-danger');
      input.classList.remove('is-invalid');
    }
    small.textContent = msg || '';
  };

  this.getChildren = {
    '0': label,
    '1': input,
    '2': small,
  };

};

module.exports = FormGroup;