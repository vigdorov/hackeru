let Body = function(parent) {
  let modalBody = createDOMElement({
    tagName: 'div',
    parent: parent,
    property: {
      className: 'modal-body',
      textContent: 'Текст сообщения',
    },
  });

  this.value = function(value) {
    modalBody.textContent = value;
  };

};

module.exports = Body;