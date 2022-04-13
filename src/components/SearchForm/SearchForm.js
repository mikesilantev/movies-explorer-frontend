import react from "react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

export function SearchForm() {
  return (
    <form className="search-form">
      <span className="search-form__search-icon"></span>
      <label htmlFor="search-input" className="search-form__input-wrap">
        <input type="text" name="" id="search-input" className="search-form__input" placeholder="Фильм"/>
        <button type="submit" className="search-form__button"></button>
      </label>
      <FilterCheckbox></FilterCheckbox>
    </form>
  )
}