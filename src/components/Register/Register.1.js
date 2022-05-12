import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../Form/Forms';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Register.css';


export function Register({handleSignup}) {
  const navigate = useNavigate();
  //Состояния полей
  const [ email, setEmail] = useState('')
  const [ name, setName] = useState('')
  const [ password, setPassword] = useState('')

  const [ errorText, setErrorText ] = useState('');

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

  // Изменение состояния инпута password
  function handleChangePassword(evt){
    setPassword(evt.target.value);
    console.log(password);
  }

  // Отправка данных в форме
  function handleSubmitForm(evt){
    evt.preventDefault();
    handleSignup({
      email,
      name,
      password,
    })
  }


  return (
    <section className="register">

    {/* Прочитать заполненые пользователя
    Проверить валидатором
    Отправить на апи */}
          <Form 
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            signMessage='Уже зарегистрированы?'
            signLinkMessage='Войти'
            signLink='/signin'
            onSubmit={handleSubmitForm}
            >

        <div className="form__label-wrap">
        <label className='form__label'>
          <span className='form__input-name'>Имя</span>

          {/* input 'name' */}
          <input
            required
            type="text" 
            className='form__input form__input_type_name'
            placeholder='Виталий'

            onChange={handleChangeName}
            
          />
          {/* input 'name' */}

          <span className='form__input-error'>{errorText}</span>
        </label>


        <label className='form__label'>
          <span className='form__input-name'>E-mail</span>

          {/* input 'email' */}
          <input
            required
            type="email" 
            className='form__input form__input_type_name'
            placeholder='pochta@yandex.ru'

            onChange={handleChangeEmail}
            
          />
          {/* input 'email' */}

        
          <span className='form__input-error'>{errorText}</span>
        </label>


        <label className='form__label'>
          <span className='form__input-name'>Пароль</span>

          {/* input 'password' */}
          <input
            required
            pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])\S{8,30}$'
            autoComplete="on"
            type="password"
            name='password'
            className='form__input form__input_type_name'
            placeholder='••••••••••••••'

            onChange={handleChangePassword}
                        
          />
          {/* input 'password' */}

          <span className='form__input-error'>{errorText}</span>
        </label>

        </div>  

      </Form> 
    </section>
  )
} 
