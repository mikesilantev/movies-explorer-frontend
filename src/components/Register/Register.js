import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../Form/Forms';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Register.css';


export function Register({handleSignup, apiErrorText}) {
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const isDisabled = !isValid;

  // Отправка данных в форме
  function handleSubmit(evt){
    evt.preventDefault();
    handleSignup({
      email: values.email,
      name: values.ename,
      password: values.password,
    })
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm])

  return (
    <section className='register'>

    {/* Прочитать заполненые пользователя
    Проверить валидатором
    Отправить на апи */}
          <Form 
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            signMessage='Уже зарегистрированы?'
            signLinkMessage='Войти'
            signLink='/signin'
            onSubmit={handleSubmit}
            isDisabled={isDisabled}
            >

        <div className='form__label-wrap'>
        <label className='form__label'>
          <span className='form__input-name'>Имя</span>

          {/* input 'name' */}
          <input
            required
            className='form__input form__input_type_name'
            onChange={handleChange}
            type='text' 
            name='name'
            placeholder=''
          />
          {/* input 'name' */}

          <span className='form__input-error'>{errors.name || ''}</span>
        </label>


        <label className='form__label'>
          <span className='form__input-name'>E-mail</span>

          {/* input 'email' */}
          <input
            required
            type='email'
            name='email'
            className='form__input form__input_type_name'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            placeholder='pochta@yandex.ru'
            onChange={handleChange}
            value={values.email || ''}
            
          />
          {/* input 'email' */}

        
          <span className='form__input-error'>{errors.email || ''}</span>
        </label>


        <label className='form__label'>
          <span className='form__input-name'>Пароль</span>

          {/* input 'password' */}
          <input
            required
            pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])\S{8,30}$'
            autoComplete='on'
            type='password'
            name='password'
            className='form__input form__input_type_name'
            placeholder='••••••••••••••'

            onChange={handleChange}
                        
          />
          {/* input 'password' */}

          <span className='form__input-error'>{errors.password || ''}</span>
        </label>

        </div>  

      </Form> 
    </section>
  )
} 
