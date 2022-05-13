import { useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({
  searchQuery,
  setSearchQuery,
  handleSearch,
  checkboxStatus,
  setCheckboxStatus,
  setMoviesToRender,
  moviesToRender,
  removeMovieFromDb,


  savedMoviesCheckboxStatus,
  setSavedMoviesCheckboxStatus,
}){


  useEffect(() => {
    console.log('SAVED MOVIES')
  }, []);

  return (
    <section className='movies'>
      <SearchForm
      handleSearch={handleSearch}
      checkboxStatus={checkboxStatus}
      setCheckboxStatus={setCheckboxStatus}
      savedMoviesCheckboxStatus={savedMoviesCheckboxStatus}
      setSavedMoviesCheckboxStatus={setSavedMoviesCheckboxStatus}
      >
      </SearchForm>
      <MoviesCardList
      searchQuery={searchQuery}
      moviesToRender={moviesToRender}
      setMoviesToRender={setMoviesToRender}
      removeMovieFromDb={removeMovieFromDb}

      ></MoviesCardList>
    </section>
  )
}