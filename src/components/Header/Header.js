import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import Button from "../Button/Button";
import logo from "../../images/logo.svg";
import "./Header.css";
// BACKLOG
// Заменить компонент Button на button
export default function Header({ isLogged }) {

  let { pathname } = useLocation()


console.log(pathname)

  function saveCurrentPatch(){
    if (pathname !== '/'){
      console.log('Не равно /')
    } else {

    }
  }

  saveCurrentPatch();
 
  const [loggedIn, setLoggedIn] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  // function testState() {
  //   console.log('rere')
  // }
  // function headerClick() {
  //   if (loggedIn === false) {
  //     setLoggedIn(true)
  //     console.log(loggedIn)
  //   }
  //   if (loggedIn === true) {
  //     console.log(loggedIn)
  //     setLoggedIn(false)
  //   }
  // }

  
  // .header__no-index 
  return (
    // <header className={'header'}>
    <header className={ (pathname === '/') ? ('header') : ('header header_dark')}>

      <NavLink to="/" className="header__logo">
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
                onClick={() => setOpenMenu(!openMenu)}
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

              {/* {openMenu ? (<MobileMenu 
                              status={openMenu} 
                              setOpenMenu={setOpenMenu}
                            />) : ('')} */}
            <MobileMenu 
                status={openMenu} 
                setOpenMenu={setOpenMenu}
              />
              
            </>
          )
      }
    </header>
  );
}
