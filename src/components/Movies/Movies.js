import { useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import './Movies.css';


export default function Movies({
  moviesPage,
  searchQuery,
  setSearchQuery,
  handleSearch,
  checkboxStatus,
  setCheckboxStatus,
  filteredMovies,
  moviesToRender,
  setMoviesToRender,
  removeMovieFromDb,
  saveMovieToDb,



  moviesCheckBoxStatus,
  setMoviesCheckBoxStatus,
}) {

  return (
    <section className='movies'>
      <SearchForm
        moviesPage={moviesPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />

      <MoviesCardList
       moviesPage={moviesPage}
        filteredMovies={filteredMovies}
        moviesToRender={moviesToRender}
        setMoviesToRender={setMoviesToRender}

        saveMovieToDb={saveMovieToDb}
        removeMovieFromDb={removeMovieFromDb}
      />
    </section>
  )
}