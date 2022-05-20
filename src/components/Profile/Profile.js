import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.css';

export function Profile({ handleLogout, handleUserUpdate, apiTextError, setApiTextError }) {
  // Context
  const currentUser = useContext(CurrentUserContext);
  // Form validation variables
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const isDisabled = !isValid;

  // Состояние формы - находится в редактировании или нет
  const [isEdited, setIsEdited] = useState(false);

  useEffect(()=> {
    setTimeout(() => {
      let apiError = apiTextError;
      if (apiError === '') {
        setIsEdited(false);
      }
    }, 1000);
  }, [apiTextError])

  function handleEdited() {
    setIsEdited(true);    // +
    setApiTextError(''); // +
  }

  function handleSaveProfile(evt) {
    evt.preventDefault();
    handleUserUpdate(values)
  }
  
  function handleExitProfile() {
    handleLogout();
  }

  return (
    <section className='profile'>
      <form
        className='profile-form'
        action='#'>
        <div className='profile-form__wrap'>
          <h1 className='profile-form__title'>Привет {currentUser.name}!</h1>
          <label className='profile-form__label'>
            <span className='profile-form__text'>Имя</span>
            <input
              value={values.name || ''}
              name='name'
              onChange={handleChange}
              pattern='^[а-яА-ЯёЁa-zA-Z0-9\s]+$'
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
          </label>
          <span className='profile-form__input-error'>{errors.name || ''}</span>
          <label className='profile-form__label'>
            <span className='profile-form__text'>Email</span>
            <input
              value={values.email || ''}
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
                  <span className='profile-form__error'>{apiTextError}</span>
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