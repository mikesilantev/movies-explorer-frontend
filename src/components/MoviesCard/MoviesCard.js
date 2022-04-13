import react, { useState } from 'react';

import './MovieCard.css';

export function MovieCard(props) {
  const [savedMovie, setSavedMovie] = useState(false);

  function saveMovieClick(){
    setSavedMovie(true)
    console.log(savedMovie)
  }

  function delSavedMovieClick(){
    setSavedMovie(false)
    console.log(savedMovie)
  }


  return (
    <article className='movie-card' key={props.id}>

      <img src={props.cover} alt={props.title} className="movie-card__cover" />

      {
      !savedMovie ? 
      (
        <button className="movie-card__save-btn" onClick={saveMovieClick}>Сохранить</button>
      ) :
        (
          <button className="movie-card__save-btn movie-card__saved" onClick={delSavedMovieClick}></button>
        )
        }


      {/* <button className={savedMovieClassName}>Сохранить</button> */}

      <div className="movie-card__description">
        <p className='movie-card__title'>{props.title}</p>
        <span className='movie-card__duration'>{props.duration}</span>
      </div>

    </article>
  )
}