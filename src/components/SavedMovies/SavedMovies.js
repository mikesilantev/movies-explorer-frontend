import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({
}){

  return (
    <section className='movies'>
      <SearchForm
      >
      </SearchForm>
      <MoviesCardList
      ></MoviesCardList>
    </section>
  )
}