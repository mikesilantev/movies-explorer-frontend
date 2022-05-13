import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({ 
  searchQuery, 
  setSearchQuery, 
  checkboxStatus, 
  setCheckboxStatus, 
  searchByQuery, 
  filteredMovies,
  saveMovieToDb,
  searchResult,
  initialMovies,
  removeMovieFromDb,
}){

  return (
    <section className='movies'>
      <SearchForm
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      checkboxStatus={checkboxStatus}
      setCheckboxStatus={setCheckboxStatus}
      searchByQuery={searchByQuery}
      initialMovies={initialMovies}
      >
      </SearchForm>
      <MoviesCardList
      ></MoviesCardList>
    </section>
  )
}