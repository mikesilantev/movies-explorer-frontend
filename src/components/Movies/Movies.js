import { Suspense, useState, useEffect }from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function Movies({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,

  renderMovies,
  setRenderMovies,

  checkboxStatus,
  setCheckboxStatus,
  handleSaveMovies
}){


  return (
    <section className="movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />

      <MoviesCardList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        renderMovies={renderMovies}
        setRenderMovies={setRenderMovies}
        handleSaveMovies={handleSaveMovies}
      />
    </section>
  )
}