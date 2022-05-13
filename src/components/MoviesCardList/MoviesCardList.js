import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MovieCard } from '../MoviesCard/MoviesCard';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';
import mainApi from '../../utils/MainApi';

export function MoviesCardList({
  moviesPage,
  moviesToRender,
  setMoviesToRender,
  saveMovieToDb,
  filteredMovies,
  removeMovieFromDb
}) {

  let {pathname} = useLocation();

  useEffect(() => {
    if(moviesPage) {
      if (filteredMovies.length === 0) {
        const getLocalFilteredMovie = JSON.parse(localStorage.getItem('filteredMovies'));
        setMoviesToRender(getLocalFilteredMovie)
      } else {
        setMoviesToRender(filteredMovies)
      }
    } else {
      getSavedMoviesFromApi();
    }
  },[])

  function getSavedMoviesFromApi (){
    console.log('getSavedMoviesFromApi')
    const token = localStorage.getItem('JWT_TOKEN');
    let saveMovies = JSON.parse(localStorage.getItem('savedMovies'))
    console.log(saveMovies)
    mainApi
      .getSavedMovie(token)
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res))
      })
      .then(
        setMoviesToRender(saveMovies)
      )
      .catch(err => console.log(err))
      .finally()
  }
  
// moviesPage ? moviesToRender.lentgh > 0 ? '' : ''
  return (
    <section className='movies-list'>
      <div className='movie-list__card-wrap'>
      
      {moviesPage ? moviesToRender ? 
        (
          moviesToRender.map((card) => {
            return <MovieCard
            key={card.id}
            cover={`https://api.nomoreparties.co/${card.image.url}`}
            title={card.nameRU}
            durationMovie={card.duration}
            trailerLink={card.trailerLink}
            movie={card}
            saveMovieToDb={saveMovieToDb}
            removeMovieFromDb={removeMovieFromDb}
          />
          })
        ) : 
        (<p className='movies-list__nulled-query'>Ничего не найдено</p>) : 
        ( moviesToRender ? (
          moviesToRender.map((card) => {
            return <MovieCard
            key={card.movieId}
            cover={card.image}
            title={card.nameRU}
            durationMovie={card.duration}
            trailerLink={card.trailerLink}
            movie={card}
            saveMovieToDb={saveMovieToDb}
            removeMovieFromDb={removeMovieFromDb}
          />
          })
        ) : 'Нету' )}

      </div>

      <button
        className='movies-list__btn'>
        Еще
      </button>

    </section>

  )
}
