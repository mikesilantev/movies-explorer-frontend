import react, { useState } from 'react';

import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  duration,
  trailerLink,
  savedMovieBtnStatus,
  setSavedMovieBtnStatus,
}) {

const [saveButtonStatus, setSaveButtonStatus] = useState(false);



  //
  function saveMovieClick() {
    console.log(saveButtonStatus)
    setSaveButtonStatus(!saveButtonStatus)
  }

  //

  function handleClick() {
    console.log('SAVE')
    console.log(trailerLink)
  };

  return (
    <article className='movie-card'>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={cover} alt={title} onClick={handleClick} className='movie-card__cover' />
      </a>

      {saveButtonStatus ? (
      <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
      ) : (
      <button className='movie-card__save-btn movie-card__saved' onClick={saveMovieClick}></button>
        )}

      


      <div className='movie-card__description'>
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{duration}</span>
      </div>

    </article>
  )
}


// {

//   !savedMovie ?
//     (
//       <>
//        <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
//       <button
//         className='movie-card__save-btn movie-card__remove-btn'
//         onClick={saveMovieClick}></button>
//       </>

//     ) :
//     (
//       <button className='movie-card__save-btn movie-card__saved' onClick={delSavedMovieClick}></button>
//     )
// }
