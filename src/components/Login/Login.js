import React, { useState } from 'react';
import { Form } from '../Form/Forms';

import './Login.css';

export function Login(){

    //Состояния полей
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
  
    // Изменение состояния инпута Email
    function handleChangeEmail(evt){
      setEmail(evt.target.value);
      console.log(email);
    }
  
    // Изменение состояния инпута password
    function handleChangePassword(evt){
      setPassword(evt.target.value);
      console.log(password);
    }
  
  // Отправка данных в форме
  function handleSubmitForm(evt){
    evt.preventDefault();
    // handleSignup({
    //   email: email,
    //   name: name,
    //   password: password, 
    // })
    console.log('Клик - Login.js')
  }



  return (
    <section className="login">
    <Form 
    title='Рады видеть!'
    buttonText='Войти'
    signMessage='Ещё не зарегистрированы?'
    signLinkMessage='Регистрация'
    signLink='/signup'
    onSubmit={handleSubmitForm}
    >
      <div className="form__label-wrap">
      <label className='form__label'>
        <span className='form__input-name'>E-mail</span>

        {/* input 'email' */}
        <input 
          type="email"
          className='form__input form__input_type_name'
          placeholder='pochta@yandex.ru'
          
          onChange={handleChangeEmail}
          />
        {/* input 'email' */}

        <span className='form__input-error'>Что-то пошло не так...</span>
      </label>
      <label className='form__label'>
        <span className='form__input-name'>Пароль</span>

        {/* input 'password' */}
        <input 
          type="password" 
          className='form__input form__input_type_name'
          placeholder='••••••••••••••'
          
          onChange={handleChangePassword}
          />
        {/* input 'password' */}

        <span className='form__input-error'>Что-то пошло не так...</span>
      </label>

      </div>  

    </Form> 
  </section>
  )
}