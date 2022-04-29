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
  savedMovieBtnStatus,
  setSavedMovieBtnStatus,
}){


  return (
    <section className='movies'>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
        searchByQuery={searchByQuery}
      >

      </SearchForm>
      <MoviesCardList
        filteredMovies={filteredMovies}
        savedMovieBtnStatus={savedMovieBtnStatus}
        setSavedMovieBtnStatus={setSavedMovieBtnStatus}
      ></MoviesCardList>
    </section>
  )
}