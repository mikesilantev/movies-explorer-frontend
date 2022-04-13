import react from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function Movies(){
  return (
    <section className="movies">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </section>
  )
}