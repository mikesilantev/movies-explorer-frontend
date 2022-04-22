import { Suspense, useState }from "react";
import movieApi from "../../utils/MovieApi";

import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function Movies(){
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  return (
    <section className="movies">
      <SearchForm></SearchForm>
      <Suspense fallback={<Preloader></Preloader>}>
         <MoviesCardList></MoviesCardList>
      </Suspense>
    </section>
  )
}