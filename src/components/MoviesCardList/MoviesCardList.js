import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';




import mainApi from '../../utils/MainApi';

import { MovieCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export function MoviesCardList({
  renderMovies,


  handleSaveMovies,

  savedMoviesID,


  handleRemoveMovie,
  allSavedMovies,

  renderSavedMovie,
  setRenderSavedMovies,
  textError,
  // ТЕСТ
  // isSaved,
  // setIsSaved,
}) {

  console.log(renderSavedMovie)
  /* 
    Комментарий: Надпись "Ничего не найдено." присутствует на страницах сразу же при входе, когда пользователь ещй ничено не искал, а не только когда ничего не найдено.

    Комментарий: Для нового пользователя отображаются активные лайки и карточки, которые сохранял предыдущий пользователь. Каждый пользователь должен иметь возможность видеть только свои сохранённые карточки и работать только со своими сохранёнными карточками. Чужие карточки исчезли только после перезагрузки сайта.
   */

  const currentUser = useContext(CurrentUserContext);
  let { pathname } = useLocation();
  // const [moviesToRender, setMoviesToRender] = useState([]);

  // Стейты для вывода кол-ва карточек в зависимости от ширины
  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2;
  const moviesToAddMoreSizeM = 3;

  // useEffect(() => {
  //   if (pathname === '/saved-movies' && allSavedMovies) {
  //     setRenderSavedMovies(allSavedMovies)
  //   }
  // }, [allSavedMovies])

  // Эффект на измененние ширины экрана
  useEffect(() => {
    if (pathname === '/movies') {
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

  if (textError.length) {
    return (
      <section className='movies-list'>
        <p className='movies-list__nulled-query'>{textError}</p>
      </section>
    )
  }
  return (
    <section className='movies-list'>
      {
        pathname === '/movies' ?
          renderMovies && renderMovies?.length > 0 ?
            (<>
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
                      />
                    )
                  }
                  return accum
                }, [])
                }

              </div>


              {(renderMovies.length > cardCount && pathname === '/movies')
                &&
                <button
                  onClick={handleMoreBtn}
                  className='movies-list__btn'>
                  Еще
                </button>}

            </>
            )
            :
            (<p className='movies-list__nulled-query'>Ничего не найдено</p>) :

          renderSavedMovie?.length ? (
            <div className={'movie-list__card-wrap'}>{
              renderSavedMovie.slice(0).reverse().map((card) => {
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
            </div>) : (
            <p className='movies-list__nulled-query'>Ничего не найдено</p>
          )


      }
    </section>
  )
}
