import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../images/logo.svg";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Mesto" className="header__logo" />
      </Link>

      <ul className="header__link-item"> 
        <li className="header__link-items">
          <Link to="/" className="header__link-register">
            Регистрация
          </Link>
        </li>
        <li className="header__link-items">
          <Button buttonText="Войти" buttonStyle="button__header" />
        </li>
      </ul>
      
    </header>
  );
}
