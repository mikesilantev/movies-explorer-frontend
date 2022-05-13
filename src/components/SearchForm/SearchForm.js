import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

export function SearchForm({
  moviesPage,

  searchQuery,
  setSearchQuery,
  handleSearch,
  checkboxStatus,
  setCheckboxStatus,

}) {



  // Проверяем есть ли запрос в локал сторейдж searchQuery
  // Если есть возвпращаем в поле поиска содержание запроса
  // Если нет вернем пустой поле
  function searchQueryLocal() {
    let query = localStorage.getItem('searchQuery');
    if (query) {
      // console.log(query)
      return query
    } else {
      // console.log(query)
      return ''
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch();
  }



  return (
    <form
      className='search-form'
      onSubmit={handleSubmit}
    >

      <span className='search-form__search-icon'></span>
      <label htmlFor='search-input' className='search-form__input-wrap'>

        <input
          onChange={(evt) => {
            setSearchQuery(evt.target.value)
          }}
          type='text'
          name='search'
          id='search-input'
          className='search-form__input'
          placeholder='Фильм'
          required
          defaultValue={moviesPage ? (searchQueryLocal()) : ''}
        />

        <button
          type='submit'
          className='search-form__button'
        ></button>
      </label>
      <FilterCheckbox
        moviesPage={moviesPage}
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      ></FilterCheckbox>
    </form>
  )
}