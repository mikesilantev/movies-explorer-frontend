import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';


export default function SavedMovies({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  handleRemoveMovie,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmitSearchButton={handleSubmitSearchButton}
      />

      <MoviesCardList
        handleRemoveMovie={handleRemoveMovie}
      />
    </section>
  )
}
