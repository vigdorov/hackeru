/**
 * Функция превращает строку в массив значений, используя в качестве
 * разделителей символы переданные в строке.
 *
 * @param {string} string - строка, которую необходимо превратить в массив
 * @param {string} ignoredSymbols - строка, символов разделителей
 * @returns {Array} data - возвращает массив данных
 */
const stringToArray = function (string, ignoredSymbols) {
  let data = [],
      word = '';
  // Бежим по строке проверяя каждый символ - игнорируемый он или нет
  for (let symbol of string) {
    let isNotIgnored = true;
    // Если символ из игнорируемым - сохраняем информацию об этом
    for (let ignoredSymbol of ignoredSymbols) {
      if (symbol === ignoredSymbol) {
        isNotIgnored = false;
      }
    }
    // Если символ не игнорируемый, то добавляем во временное хранилище
    if (isNotIgnored) {
      word += symbol;
    } else {
      /*
        Если символ игнорируемый, а временное хранилище содержит значение,
        то кладем значение в массив _data
       */
      if (word) {
        data.push(word);
        word = '';
      }
    }
  }
  // Проверяем, осталось ли слово по окончании и кладем его в массив
  if (word) data.push(word);

  return data;
};

/**
 * Функция создает текстовый элемент и помещает его в указанный DOM элемент.
 *
 * @param {string} header - заголовок текста
 * @param {string} text - сам текст
 * @param {HTMLElement} parent - DOM элемент, куда все положить
 */
const appendTextElement = function (header, text, parent) {
  let element = document.createElement('p'),
      strong  = document.createElement('strong'),
      span    = document.createElement('span');

  strong.textContent = header;
  span.textContent   = text;

  element.appendChild(strong);
  element.appendChild(span);

  parent.appendChild(element);
};

/**
 * Оставляет в массиве только числа, удаляя другие значения, которые к числам
 * преобразовать нельзя.
 *
 * @param {Array} array - массив с данными
 * @returns {Array} - возвращает числовой массив
 */
const arrayToNumbersArray = function (array) {
  let result = [];
  array.forEach( function (element) {
    let num = Number(element);
    if (!isNaN(num)) result.push(num);
  });
  return result;
};

/**
 * Вычисляет среднее арифметическое среди массива чисел
 *
 * @param {Array} array - массив чисел
 * @returns {number} - возвращает среднее арифметическое число
 */
const averageArithmetic = function (array) {
  return (array.reduce( (a, b) => a + b)) / array.length;
};

/**
 * Вычисляет все числа в массиве, которые меньше среднего арифметического
 * взятого от всех чисел в массиве.
 *
 * @param {Array} array - массив чисел для обработки
 * @returns {Array} - массив чисел меньше среднего ариметического
 */
const numbersLessAverageArithmetic = function (array) {
  let result = [],
      average = averageArithmetic(array);

  array.forEach( function(element) {
    if (element < average) result.push(element);
  });

  return result;
};

/**
 * Функция находит два минимальных числа в массиве и возвращает их
 *
 * @param {Array} array - массив чисел
 * @returns {Array} - возвращает массив из двух наименьших чисел
 */
const twoMinimalNumbers = function (array) {
  let result = array.slice().sort( (a, b) => a - b );
  return [result[0], result[1]];
};

/**
 * Функция удаляет все элементы из массива, значения которых оказались
 * в диапозоне от a до b. Освободившиеся элементы заполняет нулями и помещает
 * в конец массива.
 *
 * @param {Array} array - массив чисел
 * @param {number} a - число, начало диапозона
 * @param {number} b - число, конец диапозона
 * @returns {Array} - "сжатый" массив
 */
const deleteNumbersFromRange = function (array, a, b) {
  let result = [];
  array.forEach( (element) => {
    if (element < a || element > b) result.push(element);
  });

  let iteration = array.length - result.length;
  for (let i = 0; i < iteration; i++) {
    result.push(0);
  }

  return result;
};

/**
 * Функция возвращает индекс первого отрицательного числа массива
 *
 * @param {Array} array - массив чисел
 * @returns {number} - индекс первого отрицательного числа массива
 */
const indexFirstNegativeElement = function (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0) return i;
  }
};

/**
 * Функция вычисляет сумму модулей всех элементов, расположенных после первого
 * отрицательного элемента
 *
 * @param {Array} array - массив чисел
 * @returns {number} - сумма модулей чисел
 */
const sumModulesNumbersAfterNegativeElement = function (array) {
  let index = indexFirstNegativeElement(array) || array.length,
      result = 0;
  for (let i = index + 1; i < array.length; i++) {
    result += Math.abs( array[i] );
  }
  return result;
};

/**
 * Функция возвращает индекс наименьшего по модулю числа в массиве
 *
 * @param {Array} array - массив чисел
 * @returns {number} - индекс числа
 */
const indexMinimalFromModuleNumber = function (array) {
  let number = Math.abs( array[0] ),
      index  = 0;
  array.forEach( function (element, i) {
    let num = Math.abs(element);
    if (num < number) {
      number = num;
      index = i;
    }
  });
  return index;
};


let bindControl = function (input, output, checkbox) {

  let refreshResult = function () {
    let numbers = arrayToNumbersArray( stringToArray(input.value, ' ,;') );
    if (checkbox.checked) {
      numbers = arrayToNumbersArray( stringToArray(input.value, ' ') );
    }
    output.innerHTML = '';
    appendTextElement('Все числа: ', numbers.join(' '), output);
    appendTextElement(
      'Среднее арифметическое: ',
      averageArithmetic(numbers),
      output
    );
    appendTextElement(
      'Числа меньше среднего арифметического: ',
      numbersLessAverageArithmetic(numbers).join(' '),
      output
    );
    appendTextElement(
      'Два наименьших числа массива: ',
      twoMinimalNumbers(numbers).join(' '),
      output
    );
    appendTextElement(
      'Диапозон от 10 до 50. Сжатый массив: ',
      deleteNumbersFromRange(numbers, 10, 50).join(' '),
      output
    );
    appendTextElement(
      'Сумма модулей всех чисел, после первого отрицательного: ',
      sumModulesNumbersAfterNegativeElement(numbers),
      output
    );
    appendTextElement(
      'Индекс наименьшего по модулю числа: ',
      indexMinimalFromModuleNumber(numbers),
      output
    );
  };

  input.addEventListener('input', refreshResult );
  checkbox.addEventListener('change', refreshResult );
};

const input  = document.getElementById('inputData'),
      check  = document.getElementById('checkText'),
      result = document.getElementById('result');

bindControl(input, result, check);
