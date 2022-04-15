import react, { Suspense }from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function Movies(){
  return (
    <section className="movies">
      <SearchForm></SearchForm>
      <Suspense fallback={<Preloader></Preloader>}>
         <MoviesCardList></MoviesCardList>
      </Suspense>
    </section>
  )
}