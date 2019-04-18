let Footer = function(parent) {
  let footer = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'modal-footer',
    },
  });

  this.setButtons = function(settings) {

    footer.innerHTML = '';

    let btnCancel = createDOMElement({
      tagName: 'button',
      parent: footer,
      property: {
        className: 'btn btn-secondary',
        textContent: settings.textCancel,
      },
      attributes: {
        'data-dismiss': 'modal',
      }
    });

    let btnAction = createDOMElement({
      tagName: 'button',
      parent: footer,
      property: {
        className: 'btn btn-danger',
        textContent: settings.textAction,
      },
      attributes: {
        'data-dismiss': 'modal',
      }
    });

    if (settings.funcAction) {
      btnAction.addEventListener('click', settings.funcAction);
    }
  };

};

module.exports = Footer;