import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../images/logo.svg";
import "./Header.css";

export default function Header({ isLogged }) {

  const [loggedIn, setLoggedIn] = useState(false);

  function headerClick() {
    if (loggedIn === false) {
      setLoggedIn(true)
      console.log(loggedIn)
    }
    if (loggedIn === true) {
      console.log(loggedIn)
      setLoggedIn(false)
    }
  }

  return (
    <header className="header" onClick={headerClick}>

      <Link to="/" className="header__logo">
        <img src={logo} alt="Mesto" />
      </Link>

      {
        loggedIn ? (
          <ul className="header__link-items">
            <li className="header__link-item">
              <Link to="/" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__link-item">
              <Button buttonText="Войти" buttonStyle="button__header" />
            </li>
          </ul>
        )
          :
          (
            <>
              <Button buttonText="" buttonStyle="button__header-menu" />
              <ul className="header__link-items header__link-items_auth">
                <li className="header__link-item">
                  <Link to="/" className="header__link">
                    Фильмы
                  </Link>
                </li>
                <li className="header__link-item">
                  <Link to="/" className="header__link">
                    Сохранённые фильмы
                  </Link>
                </li>
                <li className="header__link-item">
                  <Button buttonText="Аккаунт" buttonStyle="button__header-account" />
                </li>
              </ul>

            </>

          )
      }

      <div className="header__mobmenu">
        <Button buttonStyle="button__mobmenu-close" />
        <div className="header__mobmenu-wrap">
          <p className="header__mobmenu-title">
            Главная
          </p>
          <nav className="header__mobmenu-items">
            <Link to="/" className="header__mobmenu-link">Фильмы</Link>
            <Link to="/" className="header__mobmenu-link">Сохранённые фильмы</Link>
          </nav>
        </div>

        <Button buttonText="Аккаунт" buttonStyle="button__mobmenu-account" />
      </div>
    </header>
  );
}
