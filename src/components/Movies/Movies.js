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
          isMount={isMount}
          setMount={setMount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          renderMovies={renderMovies}
          setRenderMovies={setRenderMovies}
          handleSaveMovies={handleSaveMovies}
          savedMoviesID={savedMoviesID}
          allSavedMovies={allSavedMovies}
          textError={textError}
          handleRemoveMovie={handleRemoveMovie}
        />
      }


    </section>
  )
}