import { useState, useContext, useEffect, useMemo } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.css';

/* 
Комментарий: Нужно, чтобы в личном кабинете отображались текущие данные пользователя, а не плейсхолдеры, чтобы пользователь мог данные редактировать, а не вводить снова.

Комментарий: При редактировании пользователь может ввести текущие данные профиля и сохранить их, а нужно сделать так, чтобы можно было отправить запрос на сохранение, только если данные изменены по сравнению с текущими данными пользователя, которые должны содержаться в текущий момент в стейте и в контексте.

Комментарий: Чтобы данные профиля считались изменёнными, пользователю должно быть достаточно изменения хотя бы одного данного.

*/


export function Profile({ handleLogout, handleUserUpdate, apiTextError, setApiTextError }) {
  // Context
  const currentUser = useContext(CurrentUserContext);
  // Form validation variables

  const { values, handleChange, errors, isValid, isDisabled } = useFormWithValidation(currentUser, true);

  // Состояние формы - находится в редактировании или нет
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
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

  function canceledEditHandler() {
    setIsEdited(false);    // +
  }

  function handleSaveProfile(evt) {
    evt.preventDefault();
    handleUserUpdate(values)
    setIsEdited(false)
  }

  function handleExitProfile() {
    handleLogout();
  }

  if (!currentUser) return <></>

  return (
    <section className='profile'>
      <form
        className='profile-form'
        action='#'>
        <div className='profile-form__wrap'>
          <h1 className='profile-form__title'>Привет {currentUser?.name}!</h1>
          <label className='profile-form__label'>
            <span className='profile-form__text'>Имя</span>
            <input
              value={values?.name || ''}
              // value={values.name || ''}
              name='name'
              onChange={handleChange}
              pattern='^[а-яА-ЯёЁa-zA-Z0-9\s]+$'
              // disabled={!editProfile}
              type='text'
              className='profile-form__input'
              minLength='2'
              maxLength='30'
              // defaultValue={currentUser.name}
              // value={values.name || ''}
              // onChange={handleChangeName}
              required
              disabled={!isEdited}
            />
          </label>
          <span className='profile-form__input-error'>{errors.name || ''}</span>
          <label className='profile-form__label'>
            <span className='profile-form__text'>Email</span>
            <input
              value={values?.email || ''}
              name='email'
              onChange={handleChange}
              // disabled={!editProfile}
              type='email'
              className='profile-form__input'
              required
              // defaultValue={!editProfile ? currentUser.email : ''}
              // onChange={handleChangeEmail}
              disabled={!isEdited}
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
                <>
                  <li className='profile-form__item'>
                    <span className='profile-form__error'>{apiTextError}</span>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isDisabled && isValid}
                      type='button'
                      className='profile-form__btn-save'>
                      Сохранить
                    </button>
                  </li>
                  <li className='profile-form__item'>
                    <button
                      type='button'
                      onClick={canceledEditHandler}
                      className='profile-form__btn-logout'
                    >Отменить редактирование</button>
                  </li>
                </>

              )
          }
        </ul>
      </form>
    </section>
  )
}