import react from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';


export default function SavedMovies({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
}){
  return (
  <section className="saved-movies">
      <SearchForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        >
      </SearchForm>
    <MoviesCardList></MoviesCardList>
  </section>
  )
}
