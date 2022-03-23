import React from "react";
import './Button.css';
export default function Button({buttonText, buttonStyle}){
  return (
    <button className={`button__default ${buttonStyle}`} >{buttonText}</button>
  )
}