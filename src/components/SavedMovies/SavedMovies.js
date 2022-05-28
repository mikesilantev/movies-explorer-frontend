import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';


export default function SavedMovies({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  handleRemoveMovie,

  allSavedMovies,
  checkboxStatus,
  setCheckboxStatus,
  renderSavedMovie,
  setRenderSavedMovies,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />

      <MoviesCardList
        handleRemoveMovie={handleRemoveMovie}
        allSavedMovies={allSavedMovies}
        renderSavedMovie={renderSavedMovie}
        setRenderSavedMovies={setRenderSavedMovies}
      />
    </section>
  )
}
