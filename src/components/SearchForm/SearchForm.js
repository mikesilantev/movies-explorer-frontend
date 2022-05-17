import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

import './SearchForm.css';

export function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  checkboxStatus,
  setCheckboxStatus,
}) {


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
        // defaultValue={}
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