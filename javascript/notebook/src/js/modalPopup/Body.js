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

  this.inner = function(element) {
    if (element) {
      modalBody.appendChild(element);
    }
  };

};

module.exports = Body;