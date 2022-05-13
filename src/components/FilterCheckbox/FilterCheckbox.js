import { useState }from "react";
import { useLocation } from "react-router-dom";
import './FilterCheckbox.css'

export function FilterCheckbox({
  checkboxStatus,
  setCheckboxStatus,
}) {
    // Переключатель чекбокса
const handleCheckbox = () => {
  setCheckboxStatus(!checkboxStatus);
}

let { pathname } = useLocation()
const checkboxMovielocalStatus = localStorage.getItem('checkboxStatus');


  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__wrap">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          name=""
          id="filter-checkbox"
          defaultChecked={!checkboxStatus}
          onClick={handleCheckbox}
        />
        <label htmlFor="filter-checkbox" className="filter-checkbox__label"></label>
      </div>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  )
}