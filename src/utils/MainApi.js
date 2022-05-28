// константы юрл и бестфильм
const movieUrl = 'https://api.nomoreparties.co'

class MainApi {
  token; // атрибуты
  url; 
  constructor() {
    this.url = 'http://192.168.1.5:8080';
    this.token = localStorage.getItem('JWT_TOKEN');
  }

  _checkResult(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${console.log(res)}`);
    }
  }

  async request(method, url, params){
    return  await fetch (`${this.url}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(params),
    }).then(res => this._checkResult(res));
  }

  // User Zone
  signup({ name, email, password }) {
    return this.request('POST', 'signup',
      {
        name, 
        email, 
        password
      });
    }
  
    signin({ email, password }){
      return this.request('POST', 'signin',{
        email, password
      }).then((res) => {
        localStorage.setItem('JWT_KEY', res.token)
      })
    }

    getUser(){
      return this.request('GET', 'users/me');
    }

    patchUser({ name, email}){
      return this.request('PATCH', 'users/me', { name, email })
    }

    saveMovie({
      country, 
      director, 
      duration, 
      year, 
      description, 
      image, 
      trailerLink, 
      nameRU, 
      nameEN,
      thumbnail,
      movieId,
    }){
      return this.request('POST', 'movies', {
        country, 
        director, 
        duration, 
        year, 
        description, 
        image, 
        trailerLink, 
        nameRU, 
        nameEN,
        thumbnail,
        movieId, 
      })
    }
  
    getSavedMovie(){
      return this.request('GET', 'movies')
    }

    removeMovie(id){
      return this.request('DELETE', `movies/${id}`)
    }
}

const mainApi = new MainApi();

export default mainApi;