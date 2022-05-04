import react, { useState, useEffect } from 'react';
import { MovieCard } from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';

export function MoviesCardList({
  filteredMovies,
  searchResult,
  searchByQuery,
  // saveMovieToDb,
}) {
  let { pathname } = useLocation();

  const [renderMovies, setRenderMovies] = useState([]);

  // Изменяемый массив с результатами во время поиска
  // console.log('filteredMovies')
  // console.log(filteredMovies)
  // Утвержденный стеейт после нажатия кнопки
  // console.log('searchResult')
  // console.log(searchResult)

  const getLocalFilteredMovie = JSON.parse(localStorage.getItem('filteredMovies'));
  // console.log('getLocalFilteredMovie')
  // console.log(getLocalFilteredMovie)

  const { width } = useChangeWindowWidth();
  const [cardToRender, setCardToRender] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const moviesToAddMoreSizeS = 2
  const moviesToAddMoreSizeM = 3;

  useEffect(() => {
    if (width <= 480) {
      setCardCount(5)
      setCardToRender(moviesToAddMoreSizeS)
    }
    if (width <= 768) {
      setCardCount(8)
      setCardToRender(moviesToAddMoreSizeS)
    }
    if (width >= 1280) {
      setCardCount(12)
      setCardToRender(moviesToAddMoreSizeM)
    }
  }, [width]);

  function handleMoreBtn(evt) {
    evt.preventDefault();
    setCardCount(cardCount + cardToRender)
  }

  useEffect(() => {
    if (searchResult.length > 0) {
      setRenderMovies(searchResult)
    } else if (getLocalFilteredMovie) {
      console.log(getLocalFilteredMovie)
    } else if (searchResult.length === 0 ){
      console.log('НЕТУ ФИЛЬМОВ')
    }
    
    else {
      setRenderMovies(null)
    }
  }, [searchResult])




  return (
    <section>
      {
        // renderMovies.length > 0 ? ('ЕСТЬ'):('Нету')
      
      // renderMovies.map((movie) => {
      //   return <span>{movie.nameRU}</span>
      // })
    }

    </section>

  )


















  // // Рабочая
  // return (
  //   <section className="movies-list">
  //     <div className='movie-list__card-wrap'>
  //       {
  //         searchResult.length > 0 ? (
  //           searchResult.map((movie) => {
  //             return (
  //               <span>{movie.nameRU}</span>
  //             )
  //           })
  //         ) : 
  //         getLocalFilteredMovie ? (
  //           getLocalFilteredMovie.map((movie) => {
  //             return (
  //               <span>{movie.nameEN}</span>
  //             )
  //           })
  //         ) : 'Ничего нету'

  //       }
  //     </div>
  //   </section>
  // )
  // return (
  //   <section className='movies-list'>
  //     <div className={filteredMovies.length > 0 ? 'movie-list__card-wrap' : 'movie-list__card-error'}>
  //       {filteredMovies.length > 0 ? (
  //         // console.log(filteredMovies)
  //         filteredMovies.reduce((cardAmount, card) => {
  //           if (cardAmount.length < cardCount) {
  //             cardAmount.push(
  //               <MovieCard
  //                 key={card.id}
  //                 cover={`https://api.nomoreparties.co/${card.image.url}`}
  //                 title={card.nameRU}
  //                 durationMovie={card.duration}
  //                 trailerLink={card.trailerLink}
  //                 // filteredMovies={filteredMovies}
  //                 movie={card}
  //                 // saveMovieToDb={saveMovieToDb}
  //               />
  //             )
  //           }

  //           return cardAmount
  //         }, [])
  //       ) : (<p className='movies-list__nulled-query'>Ничего не найдено</p>)}
  //     </div>


  //     {
  //       (filteredMovies.length > cardCount)
  //       &&
  //       <button
  //         onClick={handleMoreBtn}
  //         className='movies-list__btn'>
  //         Еще
  //       </button>
  //     }

  //   </section>
  // )
}