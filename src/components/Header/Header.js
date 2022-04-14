import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../images/logo.svg";
import "./Header.css";
// BACKLOG
// Заменить компонент Button на button
export default function Header({ isLogged }) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  function openMobileMenu() {
    setOpenMenu(true);
    console.log(openMenu)
  }

  function closeMobileMenu() {
    setOpenMenu(false);
    console.log(openMenu)
  }

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

  function onClickButton() {
    console.log('onClickButton')
  }
  return (
    <header className={'header ' + (loggedIn ? ('') : ('header__auth'))}>
      {/* // {loggedIn ? ('header') : ('hui')}> */}

      <Link to="/" className="header__logo" onClick={headerClick}>
        <img src={logo} alt="Mesto" />
      </Link>

      {
        loggedIn ? (
          <ul className="header__link-items">
            <li className="header__link-item">
              <Link to="/signup" className="header__link">
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
              <button
                onClick={openMobileMenu}
                type="button"
                className="button__default button__header-menu"
                value=""
              />
              <ul className="header__link-items header__link-items_auth">
                <li className="header__link-item">
                  <Link to="/movies" className="header__link">
                    Фильмы
                  </Link>
                </li>
                <li className="header__link-item">
                  <Link to="/saved-movies" className="header__link">
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
              <Button buttonText="Аккаунт" buttonStyle="button__header-account" />

              {openMenu ? (<div className="header__mobmenu">
                <button className="button__default button__mobmenu-close" onClick={closeMobileMenu} />
                <div className="header__mobmenu-wrap">
                  <p className="header__mobmenu-title">
                    Главная
                  </p>
                  <nav className="header__mobmenu-items">
                    <Link to="/" className="header__mobmenu-link">Главная</Link>
                    <Link to="/movies" className="header__mobmenu-link">Фильмы</Link>
                    <Link to="/saved-movies" className="header__mobmenu-link">Сохранённые фильмы</Link>
                  </nav>
                </div>

                <Button buttonText="Аккаунт" buttonStyle="button__mobmenu-account" />
              </div>) : ('')}

            </>

          )
      }


    </header>
  );
}
