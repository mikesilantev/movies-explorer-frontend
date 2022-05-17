import react, { useState } from 'react';

import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  durationMovie,
  movie,
  handleSaveMovies,
}) {

  function saveMovieClick() {
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
      <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
      <div className="movie-card__description">
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{durationMovie}</span>
      </div>

    </article>
  )
}