import react from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';


export default function SavedMovies(){
  return (
  <section className="saved-movies">
    <SearchForm></SearchForm>
    <MoviesCardList></MoviesCardList>
  </section>
  )
}
