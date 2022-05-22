import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

export function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  checkboxStatus,
  setCheckboxStatus,
}) {

  let { pathname } = useLocation();


  // useEffect(() => {
  //   if (pathname === '/movies') {
  //     setSearchQuery(localStorage.getItem('searchQuery'))
  //     console.log('отработка')
  //   } else {
  //     setSearchQuery('')
  //   }
  // }, []);


  function handleSearchInput(evt) {
    setSearchQuery(evt.target.value)
  }


  function handleSubmit(evt) {
    evt.preventDefault();
    handleSubmitSearchButton()
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <span className="search-form__search-icon"></span>
      <label htmlFor="search-input" className="search-form__input-wrap">

        <input
          onChange={(evt) => {
            setSearchQuery(evt.target.value)
          }}
          value={searchQuery}
          type="text"
          name="search"
          id="search-input"
          className="search-form__input"
          placeholder="Фильм"
          required
        />

        <button
          type="submit"
          className="search-form__button"
        ></button>
      </label>
      <FilterCheckbox
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />
    </form>
  )
}