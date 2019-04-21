let CategoryControl = function (parent) {


  let div = createDOMElement('div', parent, 'form-group');

  let label = createDOMElement({
    tagName: 'label',
    parent: div,
    property: {
      textContent: 'Категории:',
    },
    attributes: {
      for: 'color-select',
    },
  });

  // создаем кнопки категорий которые уже созданы.
  let divShowCategory = createDOMElement('div', div, 'form-group');

  this.refreshCategory = function () {

    divShowCategory.innerHTML = '';

    let nameCategory = state.temporary.nameCategory;

    for (let i = 0; i < nameCategory.length; i++) {
      let color = 'btn btn-' + nameCategory[i].color;
      let element = createDOMElement({
        tagName: 'button',
        parent: divShowCategory,
        property: {
          className: color,
          textContent: nameCategory[i].name + ' ',
        }
      });

      let deleteButton = createDOMElement('i', element, 'fas fa-times');

      deleteButton.addEventListener('click', () => {
        divShowCategory.removeChild(element);
        state.temporary.nameCategory.splice(i, 1);
        this.refreshCategory();
        console.log(state.temporary.nameCategory);
      });

      deleteButton.addEventListener('mouseover', function () {
        deleteButton.classList.add('text-danger');
        deleteButton.addEventListener('mouseout', function () {
          deleteButton.classList.remove('text-danger');
        });
      });
    }
  };


  let btnGroup = createDOMElement('div', div, 'btn-group');

  let buttonForInput = createDOMElement({
    tagName: 'button',
    parent: btnGroup,
    property: {
      className: 'btn btn-sm btn-primary',
    },
  });
  // Сохраняем цвет кнопки кнопки
  let color = 'primary';

  this.input = createDOMElement({
    tagName: 'input',
    parent: buttonForInput,
    property: {
      className: 'form-control form-control-sm',
    },
    attributes: {
      type: 'text',
    },
  });

  let buttonSelectColor = createDOMElement({
    tagName: 'button',
    parent: btnGroup,
    property: {
      className: 'btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split',
    },
    attributes: {
      'data-toggle': 'dropdown',
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
    },
  });

  createDOMElement('span', buttonSelectColor, 'sr-only');

  let dropdownMenu = createDOMElement('div', btnGroup, 'dropdown-menu');

  let colorGroup = createDOMElement('div', dropdownMenu, 'list-group');

  let tempClassColor = 'list-group-item list-group-item-action list-group-item-';
  let colors = [
    { name: 'Синий', className: 'primary'},
    { name: 'Зеленый', className: 'success'},
    { name: 'Красный', className: 'danger'},
    { name: 'Желтый', className: 'warning'},
    { name: 'Голубой', className: 'info'},
  ];

  colors.forEach( (color) => {
    let element = createDOMElement({
      tagName: 'a',
      parent: colorGroup,
      property: {
        className: tempClassColor + color.className,
        textContent: color.name,
        style: {
          cursor: 'pointer',
        },
      },
    });

    element.addEventListener('click', () => {
      let btnForInputTemp = 'btn btn-sm btn-' + color.className;
      let btnSelectTemp = 'btn btn-sm dropdown-toggle dropdown-toggle-split' +
                          ' btn-' + color.className;
      // Обновляем цвет кнопки
      this.colorValue(color.className);
      buttonForInput.className = btnForInputTemp;
      buttonSelectColor.className = btnSelectTemp;
    });

  });

  this.colorValue = function (value) {
    if (value === undefined) {
      return color;
    } else {
      color = value;
    }
  };

  this.buttonAddColor = createDOMElement({
    tagName: 'button',
    parent: div,
    property: {
      className: 'btn',
      textContent: 'Добавить категорию'
    },
  });

  let divSmall = createDOMElement('div', div);

  let small = createDOMElement({
    tagName: 'small',
    parent: divSmall,
    property: {
      className: 'text-danger',
    },
  });

  this.errorMsg = function(msg) {
    if (msg) {
      this.input.classList.add('is-invalid');
    } else {
      this.input.classList.remove('is-invalid');
    }
    small.textContent = msg || '';
  };

  this.refreshButton = function () {
    let btnForInputTemp = 'btn btn-sm btn-primary';
    let btnSelectTemp = 'btn btn-sm dropdown-toggle dropdown-toggle-split' +
      '                  btn-primary';
    // Обновляем цвет кнопки
    this.colorValue('primary');
    this.input.value = '';
    buttonForInput.className = btnForInputTemp;
    buttonSelectColor.className = btnSelectTemp;
  };

};

module.exports = CategoryControl;