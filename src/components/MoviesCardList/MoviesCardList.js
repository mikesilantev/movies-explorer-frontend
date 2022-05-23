import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';




import mainApi from '../../utils/MainApi';

import { MovieCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export function MoviesCardList({
  searchQuery,
  setSearchQuery,
  renderMovies,
  setRenderMovies,

  handleSaveMovies,

  savedMoviesId,
  handleRemoveMovie,


  // ТЕСТ
  // isSaved,
  // setIsSaved,
}) {

  const currentUser = useContext(CurrentUserContext);
  let { pathname } = useLocation();
  const [moviesToRender, setMoviesToRender] = useState([]);

  // Стейты для вывода кол-ва карточек в зависимости от ширины
  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2
  const moviesToAddMoreSizeM = 3;

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

  useEffect(() => {
    let localFilterMovies = localStorage.getItem('filterMovies')

    if (pathname === '/movies' && !localFilterMovies) {

      async function getMoviesToLocalStorage() {
        let filterMoviesLocalStorage = await JSON.parse(localStorage.getItem('filteredMovies'));
        await setRenderMovies(filterMoviesLocalStorage);
      }
      getMoviesToLocalStorage();

    } else {
      console.log(savedMoviesId)
      // if (savedMoviesId) {
      const token = localStorage.getItem('JWT_TOKEN');
      async function compareOwner() {
        const getSavedMoviesApi = await mainApi.getSavedMovie(token)
        let arr = []
        const compareMoviesId = await getSavedMoviesApi.forEach((movie) => {
          if (movie.owner._id === currentUser._id) {
            arr.push(movie)
          }
        })
        setMoviesToRender(arr)
      }
      compareOwner();
      // }
    }
  }, [])


  return (
    <section className='movies-list'>
      {
        pathname === '/movies' ?
          renderMovies && renderMovies.length > 0 ?      
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
                      savedMoviesId={savedMoviesId}
                      handleSaveMovies={handleSaveMovies}
                    // ТЕСТ
                    // isSaved={isSaved}
                    // setIsSaved={setIsSaved}
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

          moviesToRender ? (
            <div className={'movie-list__card-wrap'}>{
              moviesToRender.slice(0).reverse().map((card) => {
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
