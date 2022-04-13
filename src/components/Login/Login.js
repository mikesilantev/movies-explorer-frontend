import react from 'react';
import { Form } from '../Form/Forms';

import './Login.css';

export function Login(){
  return (
    <section className="login">
    <Form 
    title='Рады видеть!'
    buttonText='Войти'
    signMessage='Ещё не зарегистрированы?'
    signLinkMessage='Регистрация'
    signLink='/signup'
    >
      <div className="form__label-wrap">
      <label className='form__label'>
        <span className='form__input-name'>E-mail</span>
        <input type="text" className='form__input form__input_type_name'
        placeholder='pochta@yandex.ru'/>
        <span className='form__input-error'>Что-то пошло не так...</span>
      </label>
      <label className='form__label'>
        <span className='form__input-name'>Пароль</span>
        <input type="text" className='form__input form__input_type_name'
        placeholder='••••••••••••••'/>
        <span className='form__input-error'>Что-то пошло не так...</span>
      </label>

      </div>  

    </Form> 
  </section>
  )
}