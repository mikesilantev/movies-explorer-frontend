import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MovieCard } from '../MoviesCard/MoviesCard';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';

export function MoviesCardList({
  // del?
  filteredMovies,
  searchResult,
  // del?
  searchByQuery,
  checkboxStatus,
  saveMovieToDb,
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
  }, [width]);

  // Кнопка показать "еще"
  function handleMoreBtn(evt) {
    evt.preventDefault();
    setCardCount(cardCount + cardToRender)
  }


  // Конста с распарсенными данными с результатами поиска
  const getLocalFilteredMovie = JSON.parse(localStorage.getItem('filteredMovies'));

  // Загрузка страницы
  useEffect(() => {
    if (getLocalFilteredMovie) {
      // console.log(getLocalFilteredMovie)
      setRenderMovies(getLocalFilteredMovie)
    }
  }, [searchResult])

  //Эффект запускается при записи результата в стейт
  // и изменение чекбокса

  return (
    <section className='movies-list'>
      <div className={renderMovies.length > 0 ? 'movie-list__card-wrap' : 'movie-list__card-error'}>
        {
          renderMovies.length > 0 ?
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
                    />
                  )
                }
                return accum
              }, [])
            )
            :
            (<p className='movies-list__nulled-query'>Ничего не найдено</p>)
        }
      </div>
      {
        (renderMovies.length > cardCount)
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
 