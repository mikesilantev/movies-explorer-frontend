import { useState, useEffect, useContext} from 'react';
import { useNavigate, Link} from 'react-router-dom';

//
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

//
import Button from '../Button/Button';

//
import './Profile.css';
export function Profile({handleLogout, patchUser, apiErrorText}) {
  
  // Context
  const currentUser = useContext(CurrentUserContext);
  
  // Form validation variables
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  
  const isDisabled =! isValid;
  // Состояние формы - находится в редактировании или нет
  const [ isEdited, setIsEdited ] = useState(false);

   //Состояние ошибки
  const [ textError, setTextError ] = useState('');

  function handleEdited(){
    setIsEdited(true)
    console.log('Кнопка')
  }

  function handleSaveProfile(evt){
    evt.preventDefault();
    console.log(values)
    patchUser(values);
    setIsEdited(false)
  }

  function handleExitProfile(){
    console.log('handleExitProfile');
    handleLogout();
  }

  useEffect(() => {
    if(textError) {
      console.log(textError)
    }
  },[textError]);

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])


  return (
      <section className='profile'>
        <form
          className='profile-form'
          action='#'
          
          >
          <div className='profile-form__wrap'>
            <h1 className='profile-form__title'>Привет {currentUser.name}!</h1>

            <label className='profile-form__label'>
              <span className='profile-form__text'>Имя</span>

              {/* input 'name' */}
              <input
                value={ values.name || '' }
                name='name'
                onChange={handleChange}
                // disabled={!editProfile}
                type='text'
                className='profile-form__input'  

                minLength='2'
                maxLength='30'
                // defaultValue={!editProfile ? currentUser.name : ''}
                // value={values.name || ''}

                // onChange={handleChangeName}

                placeholder={currentUser.name}
                required
                disabled={!isEdited}
              />
              {/* input 'name' */}

            </label>
            <span className='profile-form__input-error'>{errors.name || ''}</span>
            <label className='profile-form__label'>
              <span className='profile-form__text'>Email</span>

              {/* input 'email' */}
              <input 
                value={values.email || '' }
                name='email'
                onChange={handleChange}

                // disabled={!editProfile}
                type='email'
                className='profile-form__input'  
                required
                // defaultValue={!editProfile ? currentUser.email : ''}
                // onChange={handleChangeEmail}
                disabled={!isEdited}
                placeholder={currentUser.email}
              />

              {/* input 'email' */}

            </label>
            
            <span className='profile-form__input-error'>{errors.email || ''}</span>
          </div>


          <ul className='profile-form__items'>
            {
              !isEdited ?
                (<>
                  <li className='profile-form__item'>
                  <button
                    type='button'
                    onClick={handleEdited}
                    className='profile-form__btn-edit'
                    >Редактировать</button>

                  </li>
                  <li className='profile-form__item'>
                    <button
                    type='button'
                    onClick={handleExitProfile}
                    className='profile-form__btn-logout'
                    >Выйти из аккаунта</button>
                  </li>
                </>
                ) : (
                  <li className='profile-form__item'>
                    <span className='profile-form__error'>{apiErrorText}</span>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isDisabled}
                      type='button'
                      className='profile-form__btn-save'>
                      Сохранить
                    </button>

                  </li>
              )
            }

          </ul>


        </form>
      </section>
  )
}
