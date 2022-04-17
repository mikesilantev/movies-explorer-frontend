import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

import './MobileMenu.css'

function MobileMenu({ status, setOpenMenu }) {
  return (
    <>
      <div className={status ? 'mobmenu mobmenu_active' : 'mobmenu'}>
        <button className="button__default mobmenu__btn-close" onClick={() => setOpenMenu(false)} />
        <nav className="mobmenu__items">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "mobmenu__link mobmenu__link_active" : "mobmenu__link"} >
            Главная
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => isActive ? "mobmenu__link mobmenu__link_active" : "mobmenu__link"} >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            className={({ isActive }) => isActive ? "mobmenu__link mobmenu-link_active" : "mobmenu__link"} >
            Сохранённые фильмы
          </NavLink>
        </nav>

        <NavLink 
          to="/profile"
          className={({ isActive }) => isActive ? "mobmenu__link-account mobmenu__link-account_active" : "mobmenu__link-account" }> 
          <Button buttonText="Аккаунт" buttonStyle="mobmenu__btn-account" />
        </NavLink>
      </div>
      <div className={status ? 'mobmenu__overlay mobmenu__overlay_active' : 'mobmenu__overlay'} onClick={() => setOpenMenu(false)}></div>
    </>

  )
}

export default MobileMenu;


