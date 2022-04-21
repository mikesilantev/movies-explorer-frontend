import { useState, useEffect, useContext} from "react";
import { useNavigate, Link} from "react-router-dom";

//
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
//
import Button from '../Button/Button';

//
import './Profile.css';
export function Profile({handleSignOut}) {

  //Компонент используем для переадресации
  const navigate = useNavigate();
  
  // Context
  const currentUser = useContext(CurrentUserContext);
  
  // Form validation variables
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  // Состояние формы - находится в редактировании или нет
  const [isEdited, setIsEdited] = useState(false);

   //Состояния полей
   const [ email, setEmail] = useState('')
   const [ name, setName] = useState('')


  function closeEdit(evt){
    evt.preventDefault();
    setEditProfile(false)

  }

  return (
      <section className="profile">
        <form
          onChange={handleSubmit}
          className="profile-form"
          action="#"
          
          >
          <div className="profile-form__wrap">
            <h1 className="profile-form__title">Привет {currentUser.name}!</h1>

            <label className="profile-form__label">
              <span className="profile-form__text">Имя</span>

              {/* input 'name' */}
              <input
                value={values.name || ''}
                onChange={handleChange}
                disabled={!editProfile}
                type='text'
                className="profile-form__input"  
                
                // defaultValue={!editProfile ? currentUser.name : ''}
                value={values.name || ''}

                onChange={handleChangeName}
              />
              {/* input 'name' */}

            </label>

            <label className="profile-form__label">
              <span className="profile-form__text">Email</span>

              {/* input 'email' */}
              <input 
                disabled={!editProfile}
                type='email'
                className="profile-form__input"  
                value={values.email || ''}
                // defaultValue={!editProfile ? currentUser.email : ''}
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
                  <button
                    type="button"
                    onClick={editHandler}
                    className='profile-form__btn-edit'
                    >Редактировать</button>

                  </li>
                  <li className="profile-form__item">
                    <button
                    type="button"
                    onClick={exitAccount}
                    className='profile-form__btn-logout'
                    >Выйти из аккаунта</button>
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

 
 

  //  // Изменение состояния инпута Email
  //  function handleChangeEmail(evt){
  //    setEmail(evt.target.value);
  //    console.log(email);
  //  }
 
  //  // Изменение состояния инпута name
  //  function handleChangeName(evt){
  //    setName(evt.target.value);
  //    console.log(name);
  //  }

  //  // Выход из аккаунта
  //  function exitAccount(){
  //   handleSignOut();
  //  }


  //  // Редактирование профиля
  //  function editHandler(evt){
  //   evt.preventDefault();

    
  //   setEditProfile(true)
  //   console.log(currentUser)
  // }


  // useEffect(() => {
  //   if (currentUser){
  //     resetForm(currentUser, {}, false)
  //   }
  // }, [currentUser, resetForm]);


