import react from "react";
import './FilterCheckbox.css'

export function FilterCheckbox({checkboxStatus, setCheckboxStatus}) {

  // Переключатель чекбокса
const handleCheckbox = () => {
  setCheckboxStatus(!checkboxStatus);
}

  return (
    <div className="filter-checkbox">
      {checkboxStatus}
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