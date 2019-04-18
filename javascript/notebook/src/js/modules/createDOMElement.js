/*
Функция принимает:
1. tagName    - имя тега для создания (обязательный)
2. parent     - объект, в который нужно добавить элемент (не обязательный)
3. property   - объект со свойствами, которые нужно добавить новому элементу
                (не обязательный)
4. attributes - атрибуты, которые нужно добавить к html тегу

Функция возвращает ссылку на вновь созданный элемент DOM
 */

;(function() {
  let createDOMElement = function(tagName, parent, property, attributes) {
    if (!tagName) {
      console.error('createDOMElement: tagName is empty!');
      return null;
    }

    let element;

    if (typeof tagName === 'string') {
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
    } else {
      let setting = tagName;
      element = document.createElement(setting.tagName);

      if (setting.parent) {
        setting.parent.appendChild(element);
      }

      if (setting.property) {
        let addElementProperty = function(element, property) {
          for (let key in property) {
            if (typeof property[key] === 'object') {
              addElementProperty(element[key], property[key]);
            } else {
              element[key] = property[key];
            }
          }
        };

        addElementProperty(element, setting.property);
      }

      if (setting.attributes) {
        for (let attr in setting.attributes) {
          if (setting.attributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, setting.attributes[attr]);
          }
        }
      }
    }

    return element;
  };

  window.createDOMElement = createDOMElement;
})();


