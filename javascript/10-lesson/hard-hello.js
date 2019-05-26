let one   = String('.'.length),
    two   = String('..'.length),
    three = String('...'.length),
    four  = String('...,'.length),
    five  = String('...,,'.length),
    six   = String('...,,,'.length),
    seven = String('...,,,.'.length),
    eight = String('...,,,..'.length),
    nine  = String('...,,,...'.length),
    zero  = String(''.length);

console.log( String.fromCharCode(
  Number(seven + two),
  Number(one + zero + one),
  Number(one + zero + eight),
  Number(one + zero + eight),
  Number(one + one + one),
  Number(three + two),
  Number(one + one + nine),
  Number(one + one + one),
  Number(one + one + four),
  Number(one + zero + eight),
  Number(one + zero + zero),
));

let hundred = [];
for (let i = 0; i <= 100; i++) {
  hundred.push(i);
}
let sum1 = hundred.reduce( (acc, curr) => acc + curr );
let deleteNumber = Math.floor(Math.random() * 101);
hundred[deleteNumber] = 0;
let sum2 = hundred.reduce( (acc, curr) => acc + curr );

console.log('deleteNumber = ' + deleteNumber, 'result func = ' + (sum1 - sum2));



