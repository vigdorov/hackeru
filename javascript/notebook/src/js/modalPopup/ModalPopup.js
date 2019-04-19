const Header = require('./Header');
const Body = require('./Body');
const Footer = require('./Footer');

let ModalPopup = function(parent) {
  let modal = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'modal fade',
    },
    attributes: {
      id: 'exampleModalCenter',
      tabindex: '-1',
      role: 'dialog',
      'aria-labelledby': 'exampleModalCenterTitle',
      'aria-hidden': 'true'
    }
  });

  let modalDialog = createDOMElement({
    tagName: 'div',
    parent: modal,
    property: {
      className: 'modal-dialog modal-dialog-centered',
    },
    attributes: {
      role: 'document',
    },
  });


  let modalContent = createDOMElement({
    tagName: 'div',
    parent: modalDialog,
    property: {
      className: 'modal-content',
    },
  });

  let header = new Header(modalContent);
  let body   = new Body(modalContent);
  let footer = new Footer(modalContent);

  this.show = function(settings) {
    header.value(settings.textHeader);
    body.value(settings.textMessage);
    body.inner(settings.inner);
    footer.setButtons(settings.buttons);
  };

};

module.exports = ModalPopup;