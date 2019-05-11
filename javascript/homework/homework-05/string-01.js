const firstInput  = document.getElementById('first-input'),
      firstResult = document.getElementById('first-result');

firstInput.addEventListener('input', function () {
  let arrayStrings          = firstInput.value.split('\n'),
      arrayStringsLength    = arrayStrings.map( (str) => str.length ),
      maxLength             = Math.max.apply(null, arrayStringsLength),
      indexMaxLengthStrings = '';

  arrayStringsLength.forEach( (length, i) => {
    if (length === maxLength) indexMaxLengthStrings += (i + ' ');
  });

  firstResult.innerHTML = '';
  firstResult.textContent = indexMaxLengthStrings;
});