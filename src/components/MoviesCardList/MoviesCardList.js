import react, {useState, useEffect} from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/moviesData';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth  from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';

export function MoviesCardList({ filteredMovies }) {
  let { pathname } = useLocation();

  const { width } = useChangeWindowWidth();

  const {cardCount, setCardCount} = useState(0);





  // useEffect(() => {
  //   if (width <= 480) {
  //     setCardCount('1')
  //     console.log('OOOOOOOOO')
  //   }
  //   if (width <= 768) {
  //     console.log('AAAAAAAAA')
  //     setCardCount(1)
  //   }
  //   if (width <= 1280) {
  //     console.log('QQQQQQQQQ')
  //     setCardCount(1)
  //   }
  //   console.log(width)
  // }, [setCardCount, width])


  return (
    <section className='movies-list'>
      <div className={filteredMovies.length > 0 ? 'movie-list__card-wrap' : 'movie-list__card-error'}>
    {filteredMovies.length > 0 ? (
            filteredMovies.map((card) => (
              <MovieCard
                key={card.id}
                cover={`https://api.nomoreparties.co/${card.image.url}`}
                title={card.nameRU}
                duration={card.duration} 
                />
            ))
    ) : (<p className='movies-list__nulled-query'>Ничего не найдено { width }</p>)}
      </div>
      {
        (filteredMovies.length > cardCount)
        && <button className='movies-list__btn'>Еще</button>
      }

    </section>
  )
}