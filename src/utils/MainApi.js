// константы юрл и бестфильм
const movieUrl = 'https://api.nomoreparties.co'


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

// User Zone
  signup({data}) {
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

  patchUser(data, token ){
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
  
  saveMovie(data){

    let token = localStorage.getItem('JWT_TOKEN')
    return fetch (`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${movieUrl}${data.image}`,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `${movieUrl}${data.thumbnail}`,
        movieId: data.movieId,
      }
      )
    })
    .then(res => this._checkResult(res))
  }


  getSavedMovie(token){
    console.log(token)
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResult)
  }


  removeMovie(data, token){
    // console.log(data)
    return fetch (`${this._url}/movies/${data}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => this._checkResult(res))
  }

  testApi({data}) {
    console.log(this._url);
    console.log(data);
    console.log({data});

    return fetch (`${this._url}/movies`, {
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

// Movies Zone

  
  
}

const mainApi = new MainApi({
  url : 'http://localhost:8080',
});


export default mainApi;