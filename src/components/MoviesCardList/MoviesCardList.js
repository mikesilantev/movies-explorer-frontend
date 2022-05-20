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





  useEffect(() => {
    let localFilterMovies = localStorage.getItem('filterMovies')

    if (pathname === '/movies' && !localFilterMovies) {

      async function getMoviesToLocalStorage() {
        let filterMoviesLocalStorage = await JSON.parse(localStorage.getItem('filteredMovies'));
        await setRenderMovies(filterMoviesLocalStorage);
      }

      getMoviesToLocalStorage();
    } else {
      if (localStorage.getItem('searchQuery')) {
        const token = localStorage.getItem('JWT_TOKEN');
        async function compareOwner() {
          const getSavedMoviesApi = await mainApi.getSavedMovie(token)
          console.log(getSavedMoviesApi)
          let arr = []
          const compareMoviesId = await getSavedMoviesApi.forEach((movie) => {
            if (movie.owner._id === currentUser._id) {
              arr.push(movie)
            }
          })
          console.log(arr)
          setMoviesToRender(arr)
        }
        compareOwner();
      }
    }
  }, [])


  return (
    <section className='movies-list'>
      {/* <div className={'movie-list__card-wrap'}> */}

      {/* <div className={renderMovies && renderMovies.length > 0 ? 'movie-list__card-wrap' : ''}> */}
        {
          pathname === '/movies' ?
            renderMovies && renderMovies.length > 0 ?
            (<div className={'movie-list__card-wrap'}>
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
                      handleSaveMovies={handleSaveMovies}

                      savedMoviesId={savedMoviesId}
                    />
                  )
                }
                return accum
              }, [])}
              </div>)
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
                    handleSaveMovies={handleSaveMovies}
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

//   (

//             ) :
//             (<h1>SAVED MOVIES</h1>)


// eslint-disable-next-line no-lone-blocks
{/* <section className='movies-list'>
<div className='movie-list__card-wrap'>
  { 
    pathname === '/movies' ?
    renderMovies && renderMovies.length > 0 ?
        ( 
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
                // saveMovieToDb={saveMovieToDb}
                // removeMovieFromDb={removeMovieFromDb}
              />
              )
            }
          })
        ):
        console.log(renderMovies.length) :
    (<span>Saved Movies: {pathname}</span>)
  }
</div>
</section> */}