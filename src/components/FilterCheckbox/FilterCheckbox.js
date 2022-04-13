import react from "react";
import './FilterCheckbox.css'

export function FilterCheckbox() {
  return (
    <label htmlFor="" className="filter-checkbox">
      <input className="filter-checkbox__checkbox" type="checkbox" name="" id="" />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  )
}