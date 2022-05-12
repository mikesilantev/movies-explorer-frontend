import react from "react";
import './FilterCheckbox.css'

export function FilterCheckbox() {

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__wrap">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          name=""
          id="filter-checkbox"

        />
        <label htmlFor="filter-checkbox" className="filter-checkbox__label"></label>
      </div>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  )
}