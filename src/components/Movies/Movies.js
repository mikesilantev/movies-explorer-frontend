import { Suspense, useState, useEffect, lazy } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export default function Movies({
  isLoading,
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  renderMovies,
  setRenderMovies,
  checkboxStatus,
  setCheckboxStatus,
  handleSaveMovies,
  savedMoviesID,
  allSavedMovies,
}) {


  return (
    <section className="movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />
      {isLoading ? console.log(true) : console.log(false)}
      <MoviesCardList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        renderMovies={renderMovies}
        setRenderMovies={setRenderMovies}
        handleSaveMovies={handleSaveMovies}
        savedMoviesID={savedMoviesID}
        allSavedMovies={allSavedMovies}
      />

    </section>
  )
}