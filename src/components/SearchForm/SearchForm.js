import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

export function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSubmitSearchButton,
  checkboxStatus,
  setCheckboxStatus,
  inputRef,
}) {

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
          // onChange={(evt) => {
          //   setSearchQuery(evt.target.value)
          // }}
          ref={inputRef}
          // value={searchQuery}
          defaultValue={searchQuery}
          type="text"
          name="search"
          id="search-input"
          className="search-form__input"
          placeholder="Фильм"
        />
        <button
          type="submit"
          className="search-form__button"
        />
      </label>

      <FilterCheckbox
        checkboxStatus={checkboxStatus}
        setCheckboxStatus={setCheckboxStatus}
      />
      
    </form>
  )
}