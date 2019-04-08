let clearDiv = function() {
  document.body.appendChild( createDOMElement('div') );
};
// Task #1: Сделайте функцию, которая считает и выводит
//          количество своих вызовов

let count = function() {
  let countCalls = 1;
  return function() {
    return countCalls++;
  };
};
let task01 = count();
console.log( 'Calls:', task01() );
console.log( 'Calls:', task01() );
console.log( 'Calls:', task01() );

// Task #2: Даны кнопки. Привяжите к каждой кнопке событие по клику,
//          которое будет считать количество нажатий по кнопке и
//          выводить его в текст кнопки. Количество нажатий для каждой
//          кнопки должно хранится в замыкании.

let buttons = [];

for (let i = 0; i < 3; i++) {
  buttons.push( createDOMElement('button', {}, '0') );
  document.body.appendChild(buttons[i]);
  let click = count();
  buttons[i].addEventListener('click', function() {
    buttons[i].textContent = click();
  });
}

// Task #3: Дан массив цветов. Даны абзацы. По первому нажатию на абзац
//          он должен покраситься в первый цвет из массива, по второму
//          нажатию - во второй и так далее. Все абзацы работают
//          независимо.
clearDiv();
let closureColors = function() {
  let arrayColors = ['yellow', 'red', 'blue', 'green', 'orange'];
  let i = 0;
  return function() {
    if (i === arrayColors.length) i = 0;
    return arrayColors[i++];
  }
};

let divs = [];

for (let i = 0; i < 3; i++) {
  divs.push( createDOMElement('div', {
    style: "background-color: grey; width: 100px; height: 100px;" +
           "display: inline-block; border: 1px solid black;"
  }) );
  document.body.appendChild(divs[i]);
  let color = closureColors();
  divs[i].addEventListener('click', function() {
    divs[i].style.backgroundColor = color();
  });
}

// Task #4: Даны кнопки. Каждая кнопка по нажатию на нее выводит
//          следующее число Фибоначчи. Кнопки работают независимо.
//          Решить через замыкания.
clearDiv();

let closureFibonacci = function() {
  let one = 1;
  let two = 1;
  return function() {
    let tmp = two;
    two += one;
    one = tmp;
    return two;
  }
};

let buttonsFibonacci = [];

for (let i = 0; i < 4; i++) {
  buttonsFibonacci.push( createDOMElement('button', {}, '1') );
  document.body.appendChild( buttonsFibonacci[i] );
  let clickFibonacci = closureFibonacci();
  buttonsFibonacci[i].addEventListener('click', function() {
    buttonsFibonacci[i].textContent = clickFibonacci();
  });
}



// Task #5: Даны инпуты. Сделайте так, чтобы каждый инпут хранил историю
//          своих изменений. Каждый инпут свою. Изменением считается
//          событие onchange. История должна хранится в замыкании. Над
//          каждым инпутом должны быть стрелочки назад и вперед, с
//          помощью которых можно передвигаться по истории.
clearDiv();

let closureHistory = function() {
  let inputArray = [];
  let i = 0;
  return function(input, direction) {
    if(input && !direction) {
      console.log('add:', input);
      inputArray.push(input);
      i = inputArray.length - 1;
    }
    if(direction && !input) {
      if (direction === -1 && i === 0) {
        i = inputArray.length - 1;
      } else if (direction ===  1 && i === inputArray.length - 1) {
        i = 0;
      } else {
        i += direction;
      }
      return inputArray[i];
    }
  }
};

let inputs = [];

for (let i = 0; i < 3; i++) {
  inputs[i] = [];
  inputs[i][0] = createDOMElement( 'input', {type: 'text'} );
  inputs[i][1] = createDOMElement( 'button', {}, 'left' );
  inputs[i][2] = createDOMElement( 'button', {}, 'right' );
  inputs[i].forEach( elem => document.body.appendChild(elem) );
  clearDiv();
  let history = closureHistory();
  inputs[i][0].addEventListener('change', function() {
    history( inputs[i][0].value );
  });
  inputs[i][1].addEventListener('click', function() {
    inputs[i][0].value = history(false, -1);
  });
  inputs[i][2].addEventListener('click', function() {
    inputs[i][0].value = history(false, 1);
  });
}

// Task #6: Сделайте функцию, каждый вызов который будет генерировать
//          случайные числа от 1 до 100, но так, чтобы они не
//          повторялись, пока не будут перебраны все числа из этого
//          промежутка. Решите задачу через замыкания - в замыкании
//          должен хранится массив чисел, которые уже были
//          сгенерированы функцией
clearDiv();

let closureRandom = function() {
  let array = [];
  return function() {
    if (array.length >= 100) return 'array full ';
    let num = function() {
      return Math.floor(Math.random() * 100 + 1);
    };
    let x = num();
    while(array.indexOf(x) > -1) {
      x = num();
    }
    array.push(x);
    return  array[array.length - 1] + ', ';
  }
};

let random100 = closureRandom();

let btn = createDOMElement( 'button', {}, 'nextRandom' );
document.body.appendChild(btn);
let inputDiv = createDOMElement( 'div' );
document.body.appendChild(inputDiv);

btn.addEventListener('click', function() {
  inputDiv.textContent += random100();
});