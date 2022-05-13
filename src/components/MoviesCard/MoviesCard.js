import react, { useState } from 'react';


import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  durationMovie,
  trailerLink,
  movie,
  saveMovieToDb,
  removeMovieFromDb,
}) {
  const {
    country, director, year, description, image, thumbnail,
    nameRU, nameEN, duration, trailer, movieId,
  } = movie;

const [saveButtonStatus, setSaveButtonStatus] = useState(false);

  //
  function saveMovieClick() {
    saveMovieToDb({
      country: movie.country || 'пусто',
      director: movie.director || 'пусто',
      duration: movie.duration || 0,
      year: movie.year || 'пусто',
      description: movie.description || 'пусто',
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url || 'htts://youtube.com',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN, 
    });
    setSaveButtonStatus(true)
  }

  function removieMovieClick(){
    removeMovieFromDb(movie.id);
    console.log(movie.id)
    console.log('first')
  }

  //
  return (
    <article className='movie-card'>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={cover} alt={title} className='movie-card__cover' />
      </a>

      {!saveButtonStatus ? (
      <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
      ) : (
      <button className='movie-card__save-btn movie-card__saved' onClick={removieMovieClick}></button>
        )}

      


      <div className='movie-card__description'>
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{durationMovie}</span>
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
