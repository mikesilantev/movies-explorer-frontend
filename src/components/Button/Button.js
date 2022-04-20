import React from "react";
import './Button.css';
export default function Button({buttonText, buttonStyle, handleClick}){

  return (
    <button 
      onClick={handleClick}
      className={`button__default ${buttonStyle}`}
    >{buttonText}</button>
  )
}