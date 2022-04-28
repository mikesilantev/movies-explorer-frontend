import react, { useState } from 'react';

import './MovieCard.css';

export function MovieCard({
  key,
  cover,
  title,
  duration
}) {
  const [savedMovie, setSavedMovie] = useState(false);

  function saveMovieClick() {
    setSavedMovie(true)
    console.log(savedMovie)
  }

  function delSavedMovieClick() {
    setSavedMovie(false)
    console.log(savedMovie)
  }


  return (
    <article className='movie-card' key={key}>
      <img src={cover} alt={title} className="movie-card__cover" />

      {

        !savedMovie ?
          (
            <button
              className="movie-card__save-btn movie-card__remove-btn"
              onClick={saveMovieClick}></button>
          ) :
          (
            <button className="movie-card__save-btn movie-card__saved" onClick={delSavedMovieClick}></button>
          )
      }


      {/* <button className={savedMovieClassName}>Сохранить</button> */}

      <div className="movie-card__description">
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{duration}</span>
      </div>

    </article>
  )
}