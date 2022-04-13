import react from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export function SavedMovies(){
  return (
    <section className="saved-movies">
    <SearchForm></SearchForm>
    <MoviesCardList></MoviesCardList>
  </section>
  )
}
