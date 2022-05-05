import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

export function SearchForm({
  searchQuery,
  setSearchQuery,
  checkboxStatus,
  setCheckboxStatus,
  searchByQuery,
  initialMovies
}) {

  let {pathname} = useLocation();

  //Чистим строку поиска
  
  useEffect(() => {
    if (pathname === '/saved-movies'){
      setSearchQuery('');
    }
    console.log(pathname)
  }, [])


  const handleQueryChange = (evt) => {
    setSearchQuery(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchByQuery();
  }
  return (
    <form
      className='search-form'
      onSubmit={handleSubmit}
    >

      <span className='search-form__search-icon'></span>
      <label htmlFor='search-input' className='search-form__input-wrap'>

        <input
          onChange={handleQueryChange}
          value={searchQuery}
          type='text'
          name='search'
          id='search-input'
          className='search-form__input'
          placeholder='Фильм'
          required
        />

        <button
          type='submit'
          className='search-form__button'
        ></button>
      </label>
      <FilterCheckbox
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      ></FilterCheckbox>
    </form>
  )
}