import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from '../Form/Forms';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Login.css';

export function Login({ handleSignin, apiErrorText }) {

  // Form validation variables
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const isDisabled = !isValid;

  // Отправка данных в форме
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSignin({
      email: values.email,
      password: values.password,
    })
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm])


  return (
    <section className='login'>
      <Form
        onSubmit={handleSubmit}
        title='Рады видеть!'
        buttonText='Войти'
        isDisabled={isDisabled}
        signMessage='Ещё не зарегистрированы?'
        signLinkMessage='Регистрация'
        signLink='/signup'
        apiErrorText={apiErrorText}
      >
        <div className='form__label-wrap'>
          <label className='form__label'>
            <span className='form__input-name'>E-mail</span>

            {/* input 'email' */}
            <input
              required
              className='form__input form__input_type_name'
              onChange={handleChange}
              type='email'
              name='email'
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder='pochta@yandex.ru'
              value={values.email || ''}
            />
            {/* input 'email' */}

            <span className='form__input-error'>{errors.email || ''}</span>
          </label>


          <label className='form__label'>
            <span className='form__input-name'>Пароль</span>
            <input
              onChange={handleChange}
              required
              pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])\S{8,30}$'
              autoComplete="on"
              type='password'
              name='password'
              className={!errors.password ? 'form__input' : 'form__input form__input_error'}
              placeholder='••••••••••••••'
            />

            {/* input 'password' */}

            <span className='form__input-error'>{errors.password || ''}</span>
          </label>

        </div>

      </Form>
    </section>
  )
}