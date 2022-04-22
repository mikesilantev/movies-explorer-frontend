// MovieApi
// https://api.nomoreparties.co/beatfilm-movies

class MovieApi {
  constructor({ url}) {
    this._utl = url;
  }

  _ckeckResult(res) {
    if(res.ok){
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies(){
    return fetch(`${this.url}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      },
    })
    .then(res => {
      this._ckeckResult(res);
    })
  }
}

const movieApi = new MovieApi({
  url: `https://api.nomoreparties.co/beatfilm-movies`
})

export default movieApi;