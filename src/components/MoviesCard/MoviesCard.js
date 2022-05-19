import react, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  durationMovie,
  movie,
  handleSaveMovies,

  savedMoviesId,
}) {

  const { pathname } = useLocation();
  let isSaved;
  if (pathname === '/movies') {
      isSaved = savedMoviesId.some((saveMovie) => {
      if (saveMovie.id === movie.id) {
        return true
      } else {
        return false
      }
    })
  }

  function saveMovieClick() {
    isSaved = true;
    handleSaveMovies({
      country: movie.country || 'пусто',
      director: movie.director || 'пусто',
      duration: movie.duration || 0,
      year: movie.year || 'пусто',
      description: movie.description || 'пусто',
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url || 'https://youtube.com',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN, 
    });
  }


  return (
    <article className='movie-card'>

      <img src={cover} alt={title} className="movie-card__cover" />
      {
        pathname === '/movies' ?
          !isSaved ?
            (<button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>) :
            (<button className='movie-card__save-btn movie-card__saved' ></button>) :
          (<button className='movie-card__save-btn movie-card__remove-btn' ></button>)
      }


      <div className="movie-card__description">
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{durationMovie}</span>
      </div>

    </article>
  )
}