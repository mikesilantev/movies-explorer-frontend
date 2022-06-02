// MovieApi
// https://api.nomoreparties.co/beatfilm-movies

class MovieApi {
  constructor({ url }) {
    this._url = url;
  }
  _checkResult(res){
    if(res.ok){
      return Promise.resolve(res.json())
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
 
  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResult)
  }
}

const movieApi = new MovieApi({
  url: `https://api.nomoreparties.co/beatfilm-movies`,
})

export default movieApi;