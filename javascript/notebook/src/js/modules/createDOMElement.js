!(function() {

  /**
   * Создает DOM элемент с параметрами и аттрибутами
   *
   * @param {(string|object)} settings - принимает либо название тега DOM элемента,
   * либо объект с параметрами
   * @param {object} parent - принимает объект, к которому добавить вновь созданный
   * эелемент
   * @param {string} className - строка с классами DOM элемента
   * @returns {object} Возвращает вновь созданный DOM элемент
   */
  let createDOMElement = function (settings = 'div', parent, className) {
    let element;

    if (typeof settings === 'string') {
      element = document.createElement(settings);

      if (parent) {
        parent.appendChild(element);
      }

      if (className) {
        element.className = className;
      }

    } else {
      let {tagName, parent, property, attributes} = settings;
      element = document.createElement(tagName);

      if (parent) {
        parent.appendChild(element);
      }

      if (property) {
        let addElementProperty = function(element, property) {
          for (let key in property) {
            if (typeof property[key] === 'object') {
              addElementProperty(element[key], property[key]);
            } else {
              element[key] = property[key];
            }
          }
        };

        addElementProperty(element, property);
      }

      if (attributes) {
        for (let attr in attributes) {
          if (attributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, attributes[attr]);
          }
        }
      }
    }
    return element;
  };

  window.createDOMElement = createDOMElement;
})();


