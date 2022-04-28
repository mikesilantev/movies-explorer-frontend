import react from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/moviesData'
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';

export function MoviesCardList({ filteredMovies }) {

  let { pathname } = useLocation();
  console.log(filteredMovies)
  return (
    <section className='movies-list'>
      <div className='movie-list__card-wrap'>
    {filteredMovies ? (
            filteredMovies.map((card) => (
              <MovieCard
                key={card.id}
                cover={`https://api.nomoreparties.co/${card.image.url}`}
                title={card.nameRU}
                duration={card.duration} 
                />
            ))
    ) : ('1')}
      </div>
      {/* <div className='movie-list__card-wrap'>
    

        {(pathname === '/movies') ?
          (
            filteredMovies.map((card) => (
              <MovieCard
                key={card.id}
                cover={`https://api.nomoreparties.co/${card.image.url}`}
                title={card.nameRU}
                duration={card.duration} 
                />
            ))
          ) : ('')
          
          // onLoadMovies()
          }
      </div>

      {
        (pathname === '/saved-movies') ? ('') : (<button className='movies-list__btn'>Еще</button>)
      } */}

    </section>
  )
}