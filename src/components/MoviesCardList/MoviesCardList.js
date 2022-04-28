import react from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/moviesData'
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';

export function MoviesCardList() {

  let { pathname } = useLocation();

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