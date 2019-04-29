// Первый промисс для обработки таймера
let promise = new Promise( (resolve, reject) => {
  setTimeout( () => {
    reject( new Error('yeaa!') );
    resolve('result');
  }, 1000);
});

promise
  .then(
    result => {
      console.log('Fulfilled: ' + result);
    })
  .catch(
    error => {
      console.log('Rejected: ' + error);
    });

// Функция для обработки запросов на сервер, которая возвращает промисс
let httpGet = function (url) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject( new Error('Network Error') );
    };

    xhr.send();
  });
};

// Заметим, что ряд современных браузеров уже поддерживает fetch - новый
// встроенный метод для AJAX-запросов, призванный заменить XMLHttpRequest.
// Он гораздо мощнее, чем наша функция httpGet. И - да, этот метод
// использует промисы.
httpGet('http://jsonplaceholder.typicode.com/comments')
  .then(
    response => console.log('Fullfilled: ' + response)
  )
  .catch(
    error => console.log('Rejected: ' + error)
  );


// Чейнинг с использованием httpGet, reqres.in и github
httpGet('https://reqres.in/api/users/7')
  .then( response => {
    let user = JSON.parse(response);
    return user;
  })
  .then( user => {
    console.log(user);
    return httpGet('https://api.github.com/users/' + user.data.first_name);
  })
  .then( githubUser => {
    githubUser = JSON.parse(githubUser);

    let img = new Image();
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.appendChild(img);
  });

let urls = [
  'https://reqres.in/api/unknown/2',
  'https://reqres.in/api/users/2',
  'https://reqres.in/api/users/3',
  'https://reqres.in/api/users/4',
  'https://reqres.in/api/users/5',
];

Promise.all( urls.map(httpGet) )
  .then( results => {
    console.log(results);
  });

let i = 0;
let resultArray = [];
httpGet(urls[i])
  .then( result => {
    resultArray.push( result );
    i++;
    return httpGet(urls[i]);
  })
  .then( result => {
    resultArray.push( result );
    i++;
    return httpGet(urls[i]);
  })
  .then( result => {
    resultArray.push( result );
    console.log('result: ', resultArray);
  });
