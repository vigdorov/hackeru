const thirdElements = [
  document.getElementById('t-input-one'),
  document.getElementById('t-input-two'),
  document.getElementById('three-result')
];

/**
 * Пользовательский метод объекта String, который удаляет дубликаты
 * разделителей из указанной строки.
 *
 * @param {string} duplicates - дубликаты разделителей, которые нужно удалить
 * @returns {string} - очищенная от дубликатов строка
 */
String.prototype.cleanDuplicate = function (duplicates) {
  let result = '';
  for (let i = 0; i < this.length; i++) {
    let isNotDuplicate = true;
    for (let j = 0; j < duplicates.length; j++) {
      if (this[i] === duplicates[j] && this[i + 1] === duplicates[j]) {
        isNotDuplicate = false;
      }
    }
    if (isNotDuplicate) {
      result += this[i];
    } else {
      i++;
    }
  }
  return result;
};

thirdElements.forEach( element => {
  element.addEventListener('input', () => {
    let [one, two, result] = thirdElements;
    if (one.value && two.value) {
      result.textContent = one.value.cleanDuplicate(two.value);
    }
  });
});