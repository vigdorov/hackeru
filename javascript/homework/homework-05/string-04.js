let fourthInput  = document.getElementById('f-input-one'),
    fourthResult = document.getElementById('four-result');

fourthInput.addEventListener('input', () => {
  let string = fourthInput.value;

  let isNumber = function (value) {
    return !isNaN( Number(value) );
  };

  let result = [],
      number = '',
      point  = 0;

  for (let i = 0; i < string.length; i++) {
    if ( isNumber(string[i]) && string[i] !== ' ') {
      console.log(2);
      if (!number && string[i - 1] === '-') {
        number += '-';
      }
      number += string[i];
    } else if (string[i] === '.' && i < string.length - 1 && point < 1) {
      point++;
      if (point === 1 && number && isNumber(string[i + 1])) {
        number += '.';
      }
    } else {
      if (number) {
        result.push(number);
        number = '';
        point  = 0;
      }
    }
  }
  if (number) result.push(number);

  result.forEach( (element, i, array) => {
    array[i] = Number(element);
  });

  fourthResult.textContent = result.join(' ');

});