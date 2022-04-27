import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

import './SearchForm.css';

export function SearchForm({checkboxStatus}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isDisabled = !isValid;
  
  useEffect(() => {
    console.log(values)
  }, [values])




  return (
    <form 
      className="search-form"
      
      >
   
      <span className="search-form__search-icon"></span>
      <label htmlFor="search-input" className="search-form__input-wrap">

        <input 
          onChange={handleChange}
          value={values.search || ''}
          type="text" 
          name="search" 
          id="search-input" 
          className="search-form__input" 
          placeholder="Фильм" 
          required
        />

        <button 
          type="button" 
          className="search-form__button"
          disabled={isDisabled}
          ></button>
      </label>
      <FilterCheckbox checkboxStatus={checkboxStatus}></FilterCheckbox>
    </form>
  )
}