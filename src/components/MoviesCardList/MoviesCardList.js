import react from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/moviesData'
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';

export function MoviesCardList() {

  function savedMovies(evt) {
    // // Добавить saved movies в loacl ыещкфпу
    // localStorage.setItem('SavedMovies', JSON.stringify(evt))
    // console.log(localStorage.getItem('SaveCard'))
    console.log('MoviesCardList')
    console.log(evt)

  }
  let { pathname } = useLocation();

  // function onLoadMovies(){
  //   localStorage.setItem('SaveCard', JSON.stringify(moviesCards))
  // }

  return (
    <section className='movies-list'>

      <div className='movie-list__card-wrap'>

        {(pathname === '/movies') ?
          (
            moviesCards.map((card) => (
              <MovieCard
                key={card.id}
                cover={card.cover}
                title={card.title}
                duration={card.duration} 
                savedMovies={savedMovies}
                />
            ))
          ) : ('')
          
          // onLoadMovies()
          }
      </div>

      {
        (pathname === '/saved-movies') ? ('') : (<button className='movies-list__btn'>Еще</button>)
      }

    </section>
  )
}