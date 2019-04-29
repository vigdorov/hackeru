let user = {};
let proxy = new Proxy( user, {
  get(target, prop) {
    console.log('Чтение - ' + prop);
    return target[prop];
  },
  set(target, prop, value) {
    console.log('Запись - ' + prop + ' ' + value);
    target[prop] = value;
    return true;
  }
});

proxy.firstName = 'Иван';
proxy.firstName;

console.log( user );
