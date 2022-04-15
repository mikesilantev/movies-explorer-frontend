import react, { useState } from "react";
import Header from "../Header/Header";
import Button from '../Button/Button';
import { Link } from "react-router-dom";
import './Profile.css';

export function Profile() {
  const [ editProfile, setEditProfile ] = useState();
  return (
    <>
      <Header />
      <section className="profile">
        <form className="profile-form">
          <div className="profile-form__wrap">
            <h1 className="profile-form__title">Привет, Виталий!</h1>

            <label className="profile-form__label">
              <span className="profile-form__text">Имя</span>
              <input className="profile-form__input" disabled defaultValue="Виталий"></input>
            </label>

            <label className="profile-form__label">
              <span className="profile-form__text">Email</span>
              <input className="profile-form__input" disabled defaultValue="pochta@yandex.ru"></input>
            </label>
          </div>

          <ul className="profile-form__items">

            <li className="profile-form__item">
              <Link to="" className="profile-form__link">
                <Button
                  buttonText='Редактировать'
                  buttonStyle='profile-form__btn-edit'
                />
              </Link>

            </li>
            <li className="profile-form__item">
              <Link to="" className="profile-form__link">
                <Button
                  buttonText='Выйти из аккаунта'
                  buttonStyle='profile-form__btn-logout'
                /></Link>
            </li>
          </ul>
        </form>
      </section>
    </>
  )
}