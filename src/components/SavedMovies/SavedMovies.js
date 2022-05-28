import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';


export default function SavedMovies({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  handleRemoveMovie,

  allSavedMovies,

  renderSavedMovie,
  setRenderSavedMovies,
  inputRef,
  textError,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        inputRef={inputRef}

      />

      <MoviesCardList
        handleRemoveMovie={handleRemoveMovie}
        allSavedMovies={allSavedMovies}

        renderSavedMovie={renderSavedMovie}
        setRenderSavedMovies={setRenderSavedMovies}
        textError={textError}
      />
    </section>
  )
}
