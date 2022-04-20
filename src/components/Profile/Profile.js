import { useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";

//
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
//
import Button from '../Button/Button';

//
import './Profile.css';

// При переходе в профиль
// Состояние - 
// Изменение состояния при редактировании

// Копка Сохранить
// Активна сначала
// Если ошибка не Активна
export function Profile({handleSignOut}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

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

   // Выход из аккаунта
   function exitAccount(){
    handleSignOut();
    console.log('Клик')
   }

  function editHandler(evt){
    evt.preventDefault();
    setEditProfile(true)
    console.log('editHandler')
  }
  function closeEdit(evt){
    evt.preventDefault();
    setEditProfile(false)
    console.log('closeEdit')
  }

  return (
      <section className="profile">
        <form className="profile-form">
          <div className="profile-form__wrap">
            <h1 className="profile-form__title">Привет {currentUser.name}!</h1>

            <label className="profile-form__label">
              <span className="profile-form__text">Имя</span>

              {/* input 'name' */}
              <input
              
                disabled={!editProfile ? true : false }
                type='text'
                className="profile-form__input"  
                
                defaultValue={!editProfile ? currentUser.name : ''}
                onChange={handleChangeName}
              />
              {/* input 'name' */}

            </label>

            <label className="profile-form__label">
              <span className="profile-form__text">Email</span>

              {/* input 'email' */}
              <input 
                disabled={!editProfile ? true : false }
                type='email'
                className="profile-form__input"  
                defaultValue={!editProfile ? currentUser.email : ''}
                onChange={handleChangeEmail}
              />
              {/* input 'email' */}

            </label>
          </div>


          <ul className="profile-form__items">
            {
              !editProfile ?
                (<>
                  <li className="profile-form__item">
                    <Link to="" className="profile-form__link">
                      <Button
                        buttonText='Редактировать'
                        buttonStyle='profile-form__btn-edit'
                        handleClick={editHandler}
                      />
                    </Link>

                  </li>
                  <li className="profile-form__item">
                    <Link to="" className="profile-form__link">
                      <Button
                        buttonText='Выйти из аккаунта'
                        buttonStyle='profile-form__btn-logout'
                        // onClick={exitAccount}
                        // onClick={console.log('click')}
                        handleClick={exitAccount}
                      /></Link>
                  </li>
                </>
                ) : (
                  <li className="profile-form__item">
                    <span className="profile-form__error">При обновлении профиля произошла ошибка.</span>
                    <Link to="" className="profile-form__link">
                      <Button
                        handleClick={closeEdit}
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