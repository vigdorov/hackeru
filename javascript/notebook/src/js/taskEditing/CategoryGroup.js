let CategoryGroup = function (settings) {

  let div = createDOMElement({
    tagName: 'div',
    parent: settings.parent,
    property: {
      className: 'form-group',
    },
  });

  let btnGroup = createDOMElement('div', div);

  let color = 'secondary';

  this.button = createDOMElement({
    tagName: 'button',
    parent: btnGroup,
    property: {
      className: 'btn btn-secondary dropdown-toggle',
      textContent: 'Без категории'
    },
    attributes: {
      'data-toggle': 'dropdown',
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
    },
  });

  let dropdownMenu = createDOMElement('div', btnGroup, 'dropdown-menu');
  let tempClassColor = 'list-group-item list-group-item-action list-group-item-';

  let noCategory = createDOMElement({
    tagName: 'a',
    parent: dropdownMenu,
    property: {
      className: tempClassColor + 'secondary',
      textContent: 'Без категории',
      style: {
        cursor: 'pointer',
      },
    },
  });

  noCategory.addEventListener('click', () => {
    this.button.textContent = 'Без категории';
    this.button.className = 'btn dropdown-toggle btn-secondary';
    color = 'secondary';
  });

  let category = state.settings.nameCategory;
  for (let i = 0; i < category.length; i++) {
    let a = createDOMElement({
      tagName: 'a',
      parent: dropdownMenu,
      property: {
        className: tempClassColor + category[i].color,
        textContent: category[i].name,
        style: {
          cursor: 'pointer',
        },
      },
    });

    a.addEventListener('click', () => {
      this.button.textContent = category[i].name;
      this.button.className = 'btn dropdown-toggle btn-' + category[i].color;
      color = category[i].color;
    });
  }

  this.inputValue = (value) => {
    if (value === undefined) {
      return this.button.textContent;
    } else {
      this.button.textContent = value;
    }
  };

  this.inputColor = (value) => {
    if (value === undefined) {
      return color;
    } else {
      color = value;
      this.button.className = 'btn dropdown-toggle btn-' + value;
    }
  }

};

module.exports = CategoryGroup;