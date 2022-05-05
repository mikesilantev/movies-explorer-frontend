import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import './Movies.css';


export default function Movies({ 
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
        filteredMovies={filteredMovies}
        saveMovieToDb={saveMovieToDb}
        searchResult={searchResult}
        searchByQuery={searchByQuery}
        checkboxStatus={checkboxStatus}

        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        removeMovieFromDb={removeMovieFromDb}
      ></MoviesCardList>
    </section>
  )
}