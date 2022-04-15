import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

      <NavLink to="/" className="header__logo" onClick={headerClick}>
        <img src={logo} alt="Mesto" />
      </NavLink>

      {
        loggedIn ? (
          <ul className="header__link-items">
            <li className="header__link-item">
              <NavLink to="/signup" className="header__link">
                Регистрация
              </NavLink>
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
                  <NavLink
                    to="/movies"
                    className={({ isActive }) => isActive ? "header__link header__link_active" : "header__link"} >
                    Фильмы
                  </NavLink>
                </li>
                <li className="header__link-item">
                  <NavLink to="/saved-movies"
                    className={({ isActive }) => isActive ? "header__link header__link_active" : "header__link"} >
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
              <NavLink to="/profile" className="header__link-button">
                <Button buttonText="Аккаунт" buttonStyle="button__header-account" />
              </NavLink>


              {openMenu ? (<div className="header__mobmenu">
                <button className="button__default button__mobmenu-close" onClick={closeMobileMenu} />
                <div className="header__mobmenu-wrap">
                  <nav className="header__mobmenu-items">
                    <NavLink to="/"
                      className={({ isActive }) => isActive ? "header__mobmenu-link header__mobmenu-link_active" : "header__mobmenu-link"} >

                      Главная</NavLink>
                    <NavLink to="/movies" className={({ isActive }) => isActive ? "header__mobmenu-link header__mobmenu-link_active" : "header__mobmenu-link"} >Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "header__mobmenu-link header__mobmenu-link_active" : "header__mobmenu-link"} >Сохранённые фильмы</NavLink>
                  </nav>
                </div>
                <NavLink to="/profile" className="header__link-button_mobile">
                  <Button buttonText="Аккаунт" buttonStyle="button__mobmenu-account" />
                </NavLink>

              </div>) : ('')}

            </>

          )
      }


    </header>
  );
}
