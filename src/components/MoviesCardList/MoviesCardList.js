import react from "react";
import { MovieCard } from "../MoviesCard/MoviesCard";
import { moviesCards } from '../../utils/moviesData'
import './MoviesCardList.css';

export function MoviesCardList() {
  return (
    <section className="movies-list">
      {moviesCards.map((card) => (
        <MovieCard
          key={card.id}
          cover={card.cover}
          title={card.title}
          duration={card.duration} />
      ))
      }
      <button className="movies-list__btn">Еще</button>
    </section>
  )
}