import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import './SavedMovies.css';


export default function SavedMovies({
  isLoading,
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  handleRemoveMovie,
  allSavedMovies,
  renderSavedMovie,
  setRenderSavedMovies,
  inputRef,
  textError,
  setCheckboxStatus,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
        inputRef={inputRef}
        setCheckboxStatus={setCheckboxStatus}
      />

      {
        isLoading ? <Preloader /> : (
          <MoviesCardList
            handleRemoveMovie={handleRemoveMovie}
            allSavedMovies={allSavedMovies}
            renderSavedMovie={renderSavedMovie}
            setRenderSavedMovies={setRenderSavedMovies}
            textError={textError}
          />
        )
      }

    </section>
  )
}
