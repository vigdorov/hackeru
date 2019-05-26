let str = 'dfgdfg sdf7 78sdf _sdf;_78sdf _ропа.лвап s,sпривт3 887';

/**
 * Функция разбивает строку на элементы массива, используя в качестве
 * разделителя символы: ' ,.;'
 *
 * @param {string} string - строка которую необходимо превратить в массив
 * @returns {Array} - готовый массив из слов
 */
let stringToArray = function (string) {
  let ignoredSymbols = ' ,.;',
      result         = [],
      word           = '';

  for (let symbol of string) {
    let isIgnoredSymbol = false;
    for (let ignored of ignoredSymbols) {
      if (symbol === ignored) isIgnoredSymbol = true;
    }
    if (isIgnoredSymbol && word) {
      result.push(word);
      word = '';
    } else {
      word += symbol;
    }
  }

  if (word) result.push(word);
  word = '';

  return result;
};

/**
 * Функция принимает один символ и строку символов и далее ищет, есть ли в этой
 * строке указанный символ. Если есть то возвращает true
 *
 * @param symbol - символ который надо найти в строке
 * @param searchSymbols - строка из символов которые ищем
 * @returns {boolean} - возвращает удалось ли найти символ
 */
let searchSymbol = function (symbol, searchSymbols) {
  searchSymbols += searchSymbols.toUpperCase();
  for (let search of searchSymbols) {
    if (symbol === search) return true;
  }
  return false;
};

/**
 * Собственно функция задачи. ПРинимает массив слов, а потом выводи в консоль
 * каждое слово и указывает является ли оно идентивикатором.
 *
 * @param {Array} array - принимает массив из строк
 */
let searchIdentification = function (array) {
  array.forEach( string => {
    let identification = true,
      firstLetter    = '_qwertyuiopasdfghjklzxcvbnm',
      anotherLetter  = firstLetter + '1234567890';

    for (let i = 0;  i < string.length; i++) {
      if ( i === 0 && !searchSymbol(string[i], firstLetter)) {
        identification = false;
      }
      if ( i > 0 && !searchSymbol(string[i], anotherLetter)) {
        identification = false;
      }
    }

    console.log(string + ' is', identification ? '' : 'not', 'identification');
  });
};

// Запускаем первую задачу по поиску идентификатора с втроке.
searchIdentification( stringToArray(str) );

// Решение второй задачи

let array = [1, 3, 5, 6, 6, -2, 0, -23, -1, 56, -90, 0],
    positiveArray = [],
    negativeArray = [];

/**
 * Принимает массив с числами и два пустых массива. В пустые массивы функция
 * положит отдельно положительные и отдельно отрицательный числа. Нули будут
 * проигнорированы.
 *
 * @param {Array} array - массив с числами
 * @param {Array} positive - пустой массив с положительными числами
 * @param {Array} negative - пустой массив с отрицательными числами
 */
let positiveNegative = function (array, positive, negative) {
  array.forEach( number => {
    if (number > 0) positive.push(number);
    if (number < 0) negative.push(number);
  });
};

// запускаем функцию
positiveNegative(array, positiveArray, negativeArray);

// выводим результат
console.log('Положительный числа: ' + positiveArray);
console.log('Отрицательные числа: ' + negativeArray);