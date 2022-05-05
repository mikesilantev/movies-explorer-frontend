import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MovieCard } from '../MoviesCard/MoviesCard';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';
import mainApi from '../../utils/MainApi';

export function MoviesCardList({
  // del?
  filteredMovies,
  searchResult,
  // del?
  searchByQuery,
  checkboxStatus,
  saveMovieToDb,
  searchQuery,
  setSearchQuery,
  removeMovieFromDb,
}) {

  
  let { pathname } = useLocation();
  const [renderMovies, setRenderMovies] = useState([]);

  // Стейты для вывода кол-ва карточек в зависимости от ширины
  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2
  const moviesToAddMoreSizeM = 3;

  // Эффект на измененние ширины экрана
  useEffect(() => {
    if (pathname === '/movies'){
      if (width <= 480) {
        setCardCount(5)
        setCardToRender(moviesToAddMoreSizeS)
      } else if (width <= 768) {
        setCardCount(8)
        setCardToRender(moviesToAddMoreSizeS)
      } else if (width > 768) {
        setCardCount(12)
        setCardToRender(moviesToAddMoreSizeM)
      }
    }
  }, [width]);

  // Кнопка показать "еще"
  function handleMoreBtn(evt) {
    evt.preventDefault();
    setCardCount(cardCount + cardToRender)
  }


  // Конста с распарсенными данными с результатами поиска
  const getLocalFilteredMovie = JSON.parse(localStorage.getItem('filteredMovies'));
  const getLastQuery = localStorage.getItem('searchQuery')

  // Загрузка страницы
  useEffect(() => {
    if (pathname === '/movies') {
      console.log(pathname)
      if (getLocalFilteredMovie) {
        // console.log(getLocalFilteredMovie)
        setRenderMovies(getLocalFilteredMovie)
        setSearchQuery(getLastQuery)
      }
    } else {
      console.log('СОХРАНЕННЫЕ ФИЛЬМЫ')
      getSavedMoviesFromApi()
    }
  }, [searchResult])

  function getSavedMoviesFromApi (){
    const token = localStorage.getItem('JWT_TOKEN');
    let saveMovies = JSON.parse(localStorage.getItem('savedMovies'))
    mainApi
      .getSavedMovie(token)
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res))
      })
      .then(
        setRenderMovies(saveMovies)
      )
      .catch(err => console.log(err))
      .finally(console.log(renderMovies))
  }


  //Эффект запускается при записи результата в стейт
  // и изменение чекбокса

  return (
    <section className='movies-list'>
      <div className={renderMovies.length > 0 ? 'movie-list__card-wrap' : 'movie-list__card-error'}>
        {
          renderMovies.length > 0 && pathname === '/movies' ?
            (
              // console.log('ВЫДАЧА'),
              // console.log(renderMovies),
              // console.log(cardCount),
              renderMovies.reduce((accum, card) => {
                if (accum.length < cardCount) {
                  accum.push(
                    <MovieCard
                      key={card.id}
                      cover={`https://api.nomoreparties.co/${card.image.url}`}
                      title={card.nameRU}
                      durationMovie={card.duration}
                      trailerLink={card.trailerLink}
                      movie={card}
                      saveMovieToDb={saveMovieToDb}
                      removeMovieFromDb={removeMovieFromDb}
                    />
                  )
                }
                return accum
              }, [])
            )
            :
            renderMovies.length > 0 && pathname === '/saved-movies' ?
            (

              renderMovies.map((card) => {
                
                return <MovieCard
                key={card.id}
                cover={card.image}
                title={card.nameRU}
                durationMovie={card.duration}
                trailerLink={card.trailerLink}
                movie={card}
                saveMovieToDb={saveMovieToDb}
                removeMovieFromDb={removeMovieFromDb}
              />  
            })

            ) :
            (<p className='movies-list__nulled-query'>Ничего не найдено</p>)
        }
      </div>
      {
        (renderMovies.length > cardCount && pathname === '/movies')
        &&
        <button
          onClick={handleMoreBtn}
          className='movies-list__btn'>
          Еще
        </button>
      }
    </section>

  )
}
 