// Перечисляем элементы с которыми будет работать программа
let elements = {
  input:    document.getElementById('inputArray'),
  checkbox: document.getElementById('checkArray'),
  result:   document.getElementById('result'),
  select:   document.getElementById('parity'),
  radio0:   document.getElementsByName('radio')[0],
  radio1:   document.getElementsByName('radio')[1],
  radio2:   document.getElementsByName('radio')[2],
};

// Конструктор объекта для работы с данными
let arrayWithDate = function() {

  // Данные, которые хранит объект
  let arrayNumbers         = [];
  let arrayNumbersFiltered = [];
  let arrayWords           = [];
  let numbersHeader        = 'Все числа:';
  let normalizeString      = '';

  // Метод принимает строку, и создает два массива,
  // один с числами, второй со словами. Так же сохраняет нормализованную
  // строку на будущее
  this.setData = function (text) {

    // функция создания массива принимает строку, массив игнорируемых символов,
    // а так же условие: создать массив из слов или только чисел
    let createArray = function (text, ignoredSymbols, isNumber) {
      let word  = '';
      let array = [];

      for (let i = 0; i < text.length; i++) {

        let isNotIgnored = true;
        for (let j = 0; j < ignoredSymbols.length; j++) {
          if (text[i] === ignoredSymbols[j]) {
            isNotIgnored = false;
          }
        }

        let pushWord = function (value) {
          if ( isNumber && !isNaN(Number(value)) ||
              !isNumber) {
            array.push(value);
          }
        };

        if (isNotIgnored) {
          word += text[i];
        } else {
          if (word) {
            pushWord(word);
            word = '';
          }
        }

        if (i === text.length - 1 && word) {
          pushWord(word);
        }
      }

      return array;
    };

    // генерируем данные объекта
    arrayNumbers         = createArray(text, ' ,;', true );
    arrayWords           = createArray(text,   ' ', false);
    arrayNumbersFiltered = arrayNumbers.slice();
    normalizeString      = arrayWords.join(' ');
  };

  // Внутренняя функция объекта для подсчета букв в строке
  // Считает, как английские, так и русские буквы
  let countLetters = function (text) {
    let countSmall = 0;
    let countBig   = 0;
    for (let i = 0; i < text.length; i++) {
      if (
        text.charCodeAt(i) === 1105 ||
        (text.charCodeAt(i) > 96 && text.charCodeAt(i) < 123) ||
        (text.charCodeAt(i) > 1071 && text.charCodeAt(i) < 1104)
      ) {
        countSmall++;
      }
      if (
        text.charCodeAt(i) === 1025 ||
        (text.charCodeAt(i) > 64 && text.charCodeAt(i) < 91) ||
        (text.charCodeAt(i) > 1039 && text.charCodeAt(i) < 1072)
      ) {
        countBig++;
      }
    }
    return { small: countSmall, big: countBig };
  };

  // метод выводит информацию в двух режимах
  // параметр parent - принимает объект, в котором распечатать информацию
  // параметр condition - принимает 'numbers'/'string', в каком
  // режиме распечатать информацию
  this.drawData = function (parent, condition) {
    parent.textContent = '';

    if (condition === 'numbers') {
      let header = document.createElement('strong');
      header.textContent = numbersHeader;

      arrayNumbersFiltered.forEach( function (element, i) {
        let string = document.createElement('div');
        string.textContent = (i + 1) + ': ' + element;
        parent.appendChild(string);
      });

      if (parent.textContent !== '') {
        parent.insertBefore(header, parent.firstChild);
      }
    }

    if (condition === 'string') {
      let header = document.createElement('strong');
      header.textContent = 'Строка:';
      parent.appendChild(header);

      if (normalizeString === '') {
        let empty = document.createElement('div');
        empty.textContent = 'Строка пустая';
        parent.appendChild(empty);
      } else {
        let string = document.createElement('div');
        string.textContent = 'Нормализованная строка: ' + normalizeString;
        parent.appendChild(string);

        let countObj = countLetters(normalizeString);
        let countBig = document.createElement('div');
        let countSmall = document.createElement('div');
        countBig.textContent = 'Больших букв в строке: ' + countObj.big;
        countSmall.textContent = 'Маленьких букв в строке: ' + countObj.small;
        parent.appendChild(countBig);
        parent.appendChild(countSmall);

        let greaterWord = [ arrayWords[0] ];
        for (let i = 1; i < arrayWords.length; i++) {
          if (arrayWords[i].length > greaterWord[0].length) {
            greaterWord = [ arrayWords[i] ];
          } else if (arrayWords[i].length === greaterWord[0].length) {
            greaterWord.push( arrayWords[i] );
          }
        }

        let greaterDiv = document.createElement('div');
        let head = 'Самое длинное слово: ';
        if (greaterWord.length > 1) {
          head = 'Несколько длинных слов: ';
        }
        greaterDiv.textContent = head + greaterWord.join(' ');
        parent.appendChild(greaterDiv);
      }
    }
  };

  // even - принимает true/false/null, minMax - принимает 'min'/'max'/null
  // далее функция фильтрует arrayNumbers и помещает результат
  // в arrayNumbersFiltered
  this.filtered = function (even = null, minMax = null) {
    arrayNumbersFiltered = arrayNumbers.slice();
    numbersHeader = 'Все числа:';

    if (even !== null && arrayNumbersFiltered.length) {
      arrayNumbersFiltered = arrayNumbers.filter( function (element) {
        if (even && element % 2 === 0) {
          numbersHeader = 'Четные числа:';
          return true;
        }
        if (!even && element % 2 === 1) {
          numbersHeader = 'Нечетные числа:';
          return true;
        }
      });
    }

    if (minMax !== null && arrayNumbersFiltered.length) {
      if (minMax === 'min') {
        numbersHeader = 'Минимальное число:';
      }
      if (minMax === 'max') {
        numbersHeader = 'Максимальное число:';
      }

      arrayNumbersFiltered = [
        arrayNumbersFiltered.reduce( function (previous, current) {
          let comparison;
          previous = Number(previous);
          current = Number(current);
          if (minMax === 'min') {
            comparison = previous < current;
          }
          if (minMax === 'max') {
            comparison = previous > current;
          }
          return comparison ? previous : current;
        })
      ];
    }
  };


};

// функция с помощью которой узнаем индекс выбранной радио кнопки
let getRadioIndex = function (name) {
  let radio = document.getElementsByName(name);
  let index = null;
  radio.forEach( function (element, i) {
    if (element.checked) index = i;
  });
  return index;
};

// Создаем новый объект управления данными
let array = new arrayWithDate();

// Функция обновления данных из объекта на экране
let refreshArray = function () {
  // Берем данные для объекта из input'а
  array.setData( elements.input.value );

  // если стоит галочка, что мы работаем с текстом, то блокируем управление
  // кнопок для работы с числами и выводим данные объекта в текстовом режиме
  // в заранее созданный div
  if (elements.checkbox.checked) {
    array.drawData(elements.result, 'string');
    elements.select.disabled = true;
    elements.radio0.disabled = true;
    elements.radio1.disabled = true;
    elements.radio2.disabled = true;
  } else {
    // если галочка не стоит, то работаем с объектом в числовом режиме
    // открываем доступ к управлению цифоровыми данными
    elements.select.disabled = false;
    elements.radio0.disabled = false;
    elements.radio1.disabled = false;
    elements.radio2.disabled = false;
    // считываем выбран ли четный или нечетный режим фильтрации
    let selectedIndex = elements.select.options.selectedIndex;
    let even = null;
    if (selectedIndex === 0) {
      even = true;
    }
    if (selectedIndex === 1) {
      even = false;
    }

    // смотрим выбран ли режим показа max\min числа или нет
    let radioIndex = getRadioIndex('radio');
    let minMax = null;
    if (radioIndex === 0) {
      minMax = 'min';
    }
    if (radioIndex === 1) {
      minMax = 'max';
    }

    // запускаем фильтр данных исходя из условий
    array.filtered(even, minMax);

    // рисуем полученные числовые данные
    array.drawData(elements.result, 'numbers');
  }
};

// навешиваем событие обновления и рисования данных на все элементы управления
for (let key in elements) {
  if (key === 'input') {
    elements[key].addEventListener('input', refreshArray);
  } else {
    elements[key].addEventListener('change', refreshArray);
  }
}
