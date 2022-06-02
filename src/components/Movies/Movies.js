import { Suspense, useState, useEffect, lazy } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export default function Movies({
  isMount,
  setMount,
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
  textError,
  inputRef,
  handleRemoveMovie,
}) {


  return (
    <section className="movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
        inputRef={inputRef}
        isMount={isMount}
        setMount={setMount}
      />
      {isLoading ? <Preloader /> :
        <MoviesCardList
          allSavedMovies={allSavedMovies}
          renderMovies={renderMovies}
          savedMoviesID={savedMoviesID}
          handleSaveMovies={handleSaveMovies}
          textError={textError}
          handleRemoveMovie={handleRemoveMovie}
        // isMount={isMount}
        // setMount={setMount}
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        // setRenderMovies={setRenderMovies}
        />
      }


    </section>
  )
}