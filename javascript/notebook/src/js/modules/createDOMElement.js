/*
Функция принимает:
1. tagName  - имя тега для создания (обязательный)
2. parent   - объект, в который нужно добавить элемент (не обязательный)
3. property - объект со свойствами, которые нужно добавить новому элементу
              (не обязательный)

Функция возвращает ссылку на вновь созданный элемент DOM
 */

;(function() {
  let createDOMElement = function(tagName, parent, property) {
    if (!tagName) {
      console.error('createDOMElement: tagName is empty!');
      return null;
    }

    let element = document.createElement(tagName);

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

    return element;
  };

  window.createDOMElement = createDOMElement;
})();


