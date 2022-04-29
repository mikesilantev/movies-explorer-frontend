import react, { useState, useEffect } from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/moviesData';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';

export function MoviesCardList({ 
  filteredMovies,
  setSavedMovie,
  savedMovieBtnStatus,
  setSavedMovieBtnStatus,
 }) {
  let { pathname } = useLocation();

  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2;
  const moviesToAddMoreSizeM = 3;

  useEffect(() => {
    if (width <= 480) {
      setCardCount(5)
      setCardToRender(moviesToAddMoreSizeS)
    } 
    if (width <= 768) {
      setCardCount(8)
      setCardToRender(moviesToAddMoreSizeS)
    }  
    if (width >= 1280){
      setCardCount(12)
      setCardToRender(moviesToAddMoreSizeM)
    }
    // console.log(width)
  }, [width]);

  function handleMoreBtn(evt) {
    evt.preventDefault();
    setCardCount(cardCount + cardToRender)
  }

  //5+2
  return (
    <section className='movies-list'>
      <div className={filteredMovies.length > 0 ? 'movie-list__card-wrap' : 'movie-list__card-error'}>
        {filteredMovies.length > 0 ? (
          // console.log(filteredMovies)
          filteredMovies.reduce((cardAmount, card) => {
            if (cardAmount.length < cardCount) {
              cardAmount.push(
                <MovieCard
                  key={card.id}
                  cover={`https://api.nomoreparties.co/${card.image.url}`}
                  title={card.nameRU}
                  duration={card.duration}
                  trailerLink={card.trailerLink}
                  savedMovieBtnStatus={savedMovieBtnStatus}
                  setSavedMovieBtnStatus={setSavedMovieBtnStatus}
                />
              )
            }

            return cardAmount
          }, [])
        ) : (<p className='movies-list__nulled-query'>Ничего не найдено</p>)}
      </div>


      {
        (filteredMovies.length > cardCount)
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