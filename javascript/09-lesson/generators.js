document.head.getElementsByTagName('title')[0].textContent = 'Generators';

function* generator () {
  yield 1;
  yield 2;
  yield 3;
}

let gen = generator();

for (let value of gen) {
  console.log(value);
}

function* generatorSec (start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* generateAlphaNum () {
  yield* generatorSec(48, 57);
  yield* generatorSec(65, 90);
  yield* generatorSec(97, 122);
}

let str = '';
for (let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

console.log(str);

function* gener () {
  let result = yield "2 + 2?";

  console.log('result: ' + result);
}

let gen3 = gener();

let question = gen3.next().value;

setTimeout( () => gen3.next(4), 2000);

// генератор для получения и показа аватара. Он yield'ит промисы
function* showUserAvatar () {
  let userFetch = yield fetch('https://reqres.in/api/users/7');
  let userInfo  = yield userFetch.json();

  let githubFetch = yield fetch('https://api.github.com/users/' + userInfo.data.first_name);
  let githubUserInfo = yield githubFetch.json();

  let img = new Image();
  img.src = githubUserInfo.avatar_url;
  img.className = 'promise-avatar-example';
  document.body.appendChild(img);

  yield  new Promise( resolve => setTimeout(resolve, 3000) );
  img.remove();

  return img.src;
}
// вспомогательная функция-чернорабочий для выполнения промисов из generator
function execute (generator, yieldValue) {
  console.log(generator, yieldValue);
  let next = generator.next(yieldValue);

  // если генератор не закончился, то берем промис из генератора и обрабатываем
  // его результат
  if (!next.done) {
    next.value.then(
      result => execute(generator, result),
      error  => generator.throw(error)
    );
  } else {
    // обработаем рузельтат return из генератора, обычно здесь вызов callback
    // или что-то в этом роде
    console.log(next.value);
  }
}
// запускаем работу функции
// execute( showUserAvatar() );

// библотека CO
co( function* () {
  let result = yield new Promise(
    resolve => setTimeout(resolve, 1000, 1)
  );

  console.log('CO: ',result);
});