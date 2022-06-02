import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';

import { MovieCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function MoviesCardList({
  // searchQuery,
  renderMovies,
  handleSaveMovies,
  savedMoviesID,
  handleRemoveMovie,
  allSavedMovies,
  // renderSavedMovie,
  // setRenderSavedMovies,
  textError,
  // isMount,
}) {
  const currentUser = useContext(CurrentUserContext);
  let { pathname } = useLocation();
  console.log(allSavedMovies);

  // const [moviesToRender, setMoviesToRender] = useState([]);
  // Стейты для вывода кол-ва карточек в зависимости от ширины
  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2;
  const moviesToAddMoreSizeM = 3;

  useEffect(() => {
    if (pathname === '/movies') {
      if (width <= 480) {
        setCardCount(5);
        setCardToRender(moviesToAddMoreSizeS);
      } else if (width <= 768) {
        setCardCount(8);
        setCardToRender(moviesToAddMoreSizeS);
      } else if (width > 768) {
        setCardCount(12);
        setCardToRender(moviesToAddMoreSizeM);
      }
    }
  }, [width]);

  // useEffect(() => {
  //   if (pathname === '/saved-movies' && allSavedMovies) {
  //     setRenderSavedMovies(allSavedMovies)
  //   }
  // }, [allSavedMovies])

  // Кнопка показать "еще"
  function handleMoreBtn(evt) {
    evt.preventDefault();
    setCardCount(cardCount + cardToRender);
  }

  if (textError.length) {
    return (
      <section className="movies-list">
        <p className="movies-list__nulled-query">{textError}</p>
      </section>
    )
  }

  // if (!isMount) {
  //   return (
  //     <section className='movies-list'>
  //     </section>
  //   )
  // }

  return (
    <section className="movies-list">
      {pathname === '/movies' ? (
        renderMovies && renderMovies?.length > 0 ? (
          <>
            <div className={'movie-list__card-wrap'}>
              {renderMovies.reduce((accum, card) => {
                if (accum.length < cardCount) {
                  accum.push(
                    <MovieCard
                      key={card.id}
                      cover={`https://api.nomoreparties.co/${card.image.url}`}
                      title={card.nameRU}
                      durationMovie={card.duration}
                      trailerLink={card.trailerLink}
                      movie={card}
                      savedMoviesID={savedMoviesID}
                      handleSaveMovies={handleSaveMovies}
                      handleRemoveMovie={handleRemoveMovie}
                    />,
                  )
                }
                return accum
              }, [])}
            </div>
            {renderMovies.length > cardCount && pathname === '/movies' && (
              <button onClick={handleMoreBtn} className="movies-list__btn">
                Еще
              </button>
            )}
          </>
        ) : (
          <p className="movies-list__nulled-query">Ничего не найдено</p>
        )
      ) : allSavedMovies?.length ? (
        <div className={'movie-list__card-wrap'}>
          {allSavedMovies
            .slice(0)
            .reverse()
            .map((card) => {
              return (
                <MovieCard
                  key={card._id}
                  cover={card.image}
                  title={card.nameRU}
                  durationMovie={card.duration}
                  trailerLink={card.trailerLink}
                  movie={card}
                  handleRemoveMovie={handleRemoveMovie}
                />
              )
            })}
        </div>
      ) : (
        <p className="movies-list__nulled-query">Ничего не найдено</p>
      )}
    </section>
  )
}
