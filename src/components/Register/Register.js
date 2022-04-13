import react from 'react';
import { Form } from '../Form/Forms';
import './Register.css';


export function Register() {

  return (
    <section className="register">
          <Form 
    title='Добро пожаловать!'
    buttonText='Зарегистрироваться'
    signMessage='Уже зарегистрированы?'
    signLinkMessage='Войти'
    signLink='/signin'
    >
        <div className="form__label-wrap">
        <label className='form__label'>
          <span className='form__input-name'>Имя</span>
          <input type="text" className='form__input form__input_type_name'
          placeholder='Виталий'/>
          <span className='form__input-error'>Что-то пошло не так...</span>
        </label>
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
