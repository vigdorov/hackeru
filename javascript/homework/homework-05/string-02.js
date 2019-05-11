const secondElements = [
  document.getElementById('s-input-one'),
  document.getElementById('s-input-two'),
  document.getElementById('s-input-three'),
  document.getElementById('second-result')
];

/**
 * Пользовательский метод объекта String, который позволяет на экземпляре строки
 * вызвать эту функции и найдя в ней нужную подстроку, заменить пользовательской.
 *
 * @param {string} search - подстрока для поиска
 * @param {string} replace - подстрока для замены
 * @returns {string} - новая строка
 */
String.prototype.replaceString = function (search, replace) {
  let index = this.indexOf(search);
  if (index !== -1) {
    let res = '';
    for (let i = 0; i < index; i++) {
      res += this[i];
    }
    res += replace;
    for (let i = index + search.length; i < this.length; i++) {
      res += this[i];
    }
    return res;
  }
};

secondElements.forEach( element => {
  element.addEventListener('input', () => {
    let [one, two, three, result] = secondElements;
    if (one.value && two.value && three.value) {
      result.textContent = one.value.replaceString(two.value, three.value);
    }
  });
});