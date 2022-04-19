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

  testRegister({data}) {
    console.log(this._url);
    console.log(data);

    // return fetch (`${this._url}/signup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application',
    //   },
    //   body: JSON.stringify({data}),
    // }).then()

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
