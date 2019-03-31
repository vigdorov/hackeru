let createDOMElement = function(tagName, attributes, ...textContent) {
  let element = document.createElement(tagName);
  if (attributes) {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr))
        element.setAttribute(attr, attributes[attr]);
    }
  }
  if (textContent) {
    textContent.forEach( function(elem) {
      if (typeof elem === 'string') {
        let text = document.createTextNode(elem);
        element.appendChild(text);
      }
    });
  }
  return element;
};