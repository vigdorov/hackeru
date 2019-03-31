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

let body = document.body;
let h1 = createDOMElement('div', {class: 'header'}, 'Hello world!');
body.appendChild(h1);

// Task: to create an object in two ways

// First way

let person = {
  surname: 'Smith',
  name: 'John',
  lastName: 'Evan',
  age: 25,
  telephone: {
    codeCountry: '+3',
    codeRegion: '456',
    number: '745-05-55',
  },
};

// Second way

let person2 = {};
person2.surname = 'Brown';
person2.name = 'June';
person2.lastname = 'Toby';
person2.age = 45;
person2.telephone = {};
person2.telephone.codeCountry = '+8';
person2.telephone.codeRegion = '457';
person2.telephone.number = '785-85-85';

console.log(person, person2);