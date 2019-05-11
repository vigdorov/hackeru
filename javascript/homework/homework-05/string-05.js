const fiveInput  = document.getElementById('five-input'),
      fiveResult = document.getElementById('five-result');

fiveInput.addEventListener('input', () => {
  let string = fiveInput.value;

  let checkPalindrome = true,
      j = string.length - 1;
  for (let i = 0; i <= j; i++) {
    if (string[i] !== string[j - i]) {
      checkPalindrome = false;
    }
  }
  fiveResult.textContent = 'Палиндром? - ' + checkPalindrome;
});