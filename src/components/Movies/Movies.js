import { Suspense, useState, useEffect } from 'react';
import movieApi from '../../utils/MovieApi';

import { SearchForm } from '../SearchForm/SearchForm';
import './Movies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

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
      ></MoviesCardList>
    </section>
  )
}