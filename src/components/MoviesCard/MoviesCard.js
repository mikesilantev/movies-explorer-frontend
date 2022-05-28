import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  durationMovie,
  movie,
  trailerLink,
  handleSaveMovies,
  savedMoviesID,
  handleRemoveMovie,

}) {

  const { pathname } = useLocation();
  // Сохранен фильм или нет
  const [isSaved, setIsSaved] = useState();

  useEffect(() => {
    //MOVIES
    if (pathname === '/movies' && savedMoviesID) {
      setIsSaved(savedMoviesID.some((saveMovie) => {
        if (saveMovie.id === movie.id) {
          return true
        } else {
          return false
        }
      }))
  
    }

  }, [savedMoviesID])



  function saveMovieClick() {
    handleSaveMovies({
      country: movie.country || 'пусто',
      director: movie.director || 'пусто',
      duration: movie.duration || 0,
      year: movie.year || 'пусто',
      description: movie.description || 'пусто',
      image: movie.image.url || 'пусто',
      trailerLink: movie.trailerLink || 'https://youtube.com',
      thumbnail: movie.image.formats.thumbnail.url || 'пусто',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN || 'empty',
    });
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleRemove() {
    handleRemoveMovie(movie._id)
  }

  return (
    <article className='movie-card'>

      <a href={trailerLink} target="_blank" rel="noreferrer">
      <img src={cover} alt={title} className="movie-card__cover" />
        </a>
      {
        pathname === '/movies' ?
          !isSaved ?
            (<button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>) :
            (<button className='movie-card__save-btn movie-card__saved' ></button>) :
          (<button className='movie-card__save-btn movie-card__remove-btn' onClick={handleRemove}></button>)
      }


      <div className="movie-card__description">
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{durationMovie}</span>
      </div>

    </article>
  )
}