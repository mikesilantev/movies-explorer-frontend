// константы юрл и бестфильм

class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkResult(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // testApi(data){
  //   console.log(this._url);
  //   console.log(data);
  // }

  // Register
  signup({data}) {
    console.log(this._url);
    console.log(data);
    console.log({data});

    return fetch (`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          'name' : data.name,
          'email' : data.email,
          'password' : data.password,
        }),
    }).then(res => this._checkResult(res));
  }
  
  // Login
  signin({data}) {
    return fetch (`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          'email' : data.email,
          'password' : data.password,
        }),
    }).then(res => this._checkResult(res));
  }

  getUser(token){
    return fetch (`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => this._checkResult(res));
  }

  patchUser({ data, token }){
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then(res => this._checkResult(res));
  }


  testApi({data}) {
    console.log(this._url);
    console.log(data);
    console.log({data});

    return fetch (`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          'email' : data.email,
          'password' : data.password,
        }),
    }).then(res => this._checkResult(res));
  }

  
}

const mainApi = new MainApi({
  url : 'http://localhost:8080',
});


export default mainApi;
// кноструктор майн апи
// Проверка ответа

// Регистрация

// Авторизация

// Получение инфо от юзера

// Обновление юзера
// получение сохраненных фильмов

// сохранить фильм
// удалить фильм
