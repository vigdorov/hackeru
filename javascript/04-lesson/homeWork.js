// Task #1: Написать функцию, которая принимает следующие аргументы (name,
//          surname, age, sex ). Из функции вернуть объект со следующими
//          ключами и значениями:
//          - fullname : функция возвращает name + surname
//          - greetMessage: функция возвращает обращение в зависимости
//            от переданного поля sex.
//          - age: функция возвращает возраст

// First realization
let people = function(name, surname, age, sex) {
  return {
    fullName: function() {
      return name + ' ' + surname;
    },
    greetMessage: function() {
      return sex === 'male' ? 'Mr.' : 'Mrs.';
    },
    age: function() {
      return age;
    },
  }
};

let john  = people('John',   'Snow', 25, 'male');
let sansa = people('Sansa', 'Stark', 27, 'female');
console.log( john.greetMessage(),  john.fullName()  + '. Age:', john.age() );
console.log( sansa.greetMessage(), sansa.fullName() + '. Age:', sansa.age() );

// Second realization
let People = function(name, surname, age, sex) {
  this.fullName = function() {
    return name + ' ' + surname;
  };

  this.greetMessage = function() {
    return sex === 'male' ? 'Mr.' : 'Mrs.';
  };

  this.age = function() {
    return age;
  };
};

let aria = new People('Aria', 'Stark', 16, 'female');
console.log( aria.greetMessage(), aria.fullName() + '. Age:', aria.age() );

// Task #2: Написать функцию возвращую сумму для переданного числа - sumTo(n)
//          Например:
//          sumTo(2) = 2 + 1 = 3
//          sumTo(4) = 4+ 3 +2 + 1 = 10
//          sumTo(100) = 100 + 99 + 98 + n = 5050


// Реализация через рекурсию
let sumTo = function(n) {
  if (n === 1) return 1;
  return n + sumTo(n - 1);
};

console.log( 'SumTo(2) =', sumTo(2) );
console.log( 'SumTo(4) =', sumTo(4) );
console.log( 'SumTo(100) =', sumTo(100) );

// Реализация методом динамического программирования
let sumTo2 = function(n) {
  let sum = n;
  for (let i = n - 1; i !== 0; i--) {
    sum += i;
  }
  return sum;
};

console.log( 'SumTo(2) =', sumTo2(2) );
console.log( 'SumTo(4) =', sumTo2(4) );
console.log( 'SumTo(100) =', sumTo2(100) );

// Task #3: Написать 2 функции, реализующие одну и ту же функциональность,
//          но разными методами: первая - с использование цикла, вторая
//          с использованием рекурсии, для подсчета арифметической прогрессии
//          числа (Последовательность, в которой каждый следующий член можно
//          найти, прибавив к предыдущему одно и то же число d, называется
//          арифметической прогрессией.)

// Две реализации функции, которая принимает два числа N и D,
// а возвращает уменьшающуюся арифметическую прогрессию от N до
// базового числа, с шагом D.
// Реализация через рекурсию
let decreasingProgression = function(n, d) {
  let result = [];

  let counting = function(n, d) {
    if (n < 0) return;
    result.push(n);
    counting(n - d, d);
  };

  counting(n, d);
  return result;
};
console.log( 'Последовательность:',  decreasingProgression(15, 5) );

// Реализация в цикле
let decreasingProgression2 = function(n, d) {
  let result = [];

  for (let i = n; i >= 0; i -= d) {
    result.push(i);
  }

  return result;
};

console.log( 'Последовательность:',  decreasingProgression2(15, 5) );

// Две реализации функции, которая принимает три значени: N, D , Z.
// А возвращает арифметическую прогрессию от N до Z с шагом D.

// Реализация через рекурсию
let increasingProgression = function(n, d, z) {
  let result = [];

  let counting = function (n, d, z) {
    if(n > z) return;
    result.push(n);
    counting(n + d, d, z);
  };
  counting(n, d, z);

  return result;
};

console.log( 'Последовательность от 1:', increasingProgression(1, 5, 45) );

// Реализация через цикл
let increasingProgression2 = function(n, d, z) {
  let result = [];

  for (let i = n; i <= z; i += d) {
    result.push(i);
  }

  return result;
};

console.log( 'Последовательность от 2:', increasingProgression2(2, 7, 77) );