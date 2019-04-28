class Person {
  constructor (name, surname) {
    this._name    = name;
    this._surname = surname;
  }

  getFullName () {
    return this._name + ' ' + this._surname;
  }

  sayHello () {
    console.log(this.getFullName() + ' say: "Hello!"');
  }
}

let john = new Person('John', 'Snow');

john.sayHello();

class Worker extends Person {
  static nameUpperCase (name) {
    return name.toUpperCase();
  }

  constructor (name, surname) {
    super(Worker.nameUpperCase(name), surname);
  }

  set age (value) {
    this._age = value;
  }

  set daysWorked (value) {
    this._days = value;
  }

  getFullName () {
    return `${ super.getFullName() } (age: ${ this._age }) days: ${this._days}`;
  }
}

let sara = new Worker('Sara', 'Connor');
sara.age = 35;
sara.daysWorked = 17;

sara.sayHello();

const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
movies
  .then( function (data) {
    console.log(data);
  })
  .catch( function (e) {
    console.log(e);
  });