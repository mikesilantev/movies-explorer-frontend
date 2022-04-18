import react, { useState } from "react";
import Button from '../Button/Button';
import { Link } from "react-router-dom";
import './Profile.css';

// При переходе в профиль
// Состояние - 
// Изменение состояния при редактировании

// Копка Сохранить
// Активна сначала
// Если ошибка не Активна





export function Profile() {
  const [editProfile, setEditProfile] = useState(false);

   //Состояния полей
   const [ email, setEmail] = useState('')
   const [ name, setName] = useState('')
 
   // Изменение состояния инпута Email
   function handleChangeEmail(evt){
     setEmail(evt.target.value);
     console.log(email);
   }
 
   // Изменение состояния инпута name
   function handleChangeName(evt){
     setName(evt.target.value);
     console.log(name);
   }
 
   // Отправка данных в форме
   function handleSubmitForm(evt){
     evt.preventDefault();
     // handleSignup({
     //   email: email,
     //   name: name,
     //   password: password, 
     // })
     console.log('Клик')
   }


  return (
      <section className="profile">
        <form className="profile-form">
          <div className="profile-form__wrap">
            <h1 className="profile-form__title">Привет, Виталий!</h1>

            <label className="profile-form__label">
              <span className="profile-form__text">Имя</span>

              {/* input 'name' */}
              <input 
                type='text'
                className="profile-form__input"  defaultValue="Виталий"

                onChange={handleChangeName}
              />
              {/* input 'name' */}

            </label>

            <label className="profile-form__label">
              <span className="profile-form__text">Email</span>

              {/* input 'email' */}
              <input 
                type='email'
                className="profile-form__input"  defaultValue="pochta@yandex.ru"
                onChange={handleChangeEmail}
              />
              {/* input 'email' */}

            </label>
          </div>


          <ul className="profile-form__items">
            {
              editProfile ?
                (<>
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
                </>
                ) : (
                  <li className="profile-form__item">
                    <span className="profile-form__error">При обновлении профиля произошла ошибка.</span>
                    <Link to="" className="profile-form__link">
                      <Button
                        buttonText='Сохранить'
                        buttonStyle='profile-form__btn-save profile-form__btn-save_disabled'
                      /></Link>
                  </li>
              )
            }

          </ul>


        </form>
      </section>
  )
}