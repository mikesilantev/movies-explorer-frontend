import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';

import  mainApi from '../../utils/MainApi';

import { MovieCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList({
  searchQuery,
  setSearchQuery,
  renderMovies,
  setRenderMovies,

  handleSaveMovies
}) {

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

    if (pathname === '/movies' && !localFilterMovies){

        async function getMoviesToLocalStorage(){
          let filterMoviesLocalStorage = await JSON.parse(localStorage.getItem('filteredMovies'));
          await setRenderMovies(filterMoviesLocalStorage);
        }

        getMoviesToLocalStorage();
    } else {


      async function getSavedMoviesFromDB(){
        const token = localStorage.getItem('JWT_TOKEN');
        const getSavedMovies = await mainApi.getSavedMovie(token);
        await setMoviesToRender(getSavedMovies)
      }
      getSavedMoviesFromDB();
    }
  }, [])



  useEffect(() => {
    console.log(moviesToRender)
  }, [moviesToRender])


  return (
    <section className='movies-list'>
      <div className={renderMovies && renderMovies.length > 0 ? 'movie-list__card-wrap' : ''}>
        {
          pathname === '/movies' ?
          renderMovies && renderMovies.length > 0 ?
          renderMovies.reduce((accum, card) => {
            if (accum.length < cardCount){
              accum.push(
                <MovieCard
                key={card.id}
                cover={`https://api.nomoreparties.co/${card.image.url}`}
                title={card.nameRU}
                durationMovie={card.duration}
                trailerLink={card.trailerLink}
                  movie={card}
                  handleSaveMovies={handleSaveMovies}
                />
              )
            }
            return accum
          }, [])
              :
              (<p className='movies-list__nulled-query'>Ничего не найдено</p>) :

              renderMovies ? ('ЕСТЬ') : ('НЕТУ')


        }
      </div>
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