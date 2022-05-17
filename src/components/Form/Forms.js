import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

import './Form.css';

export function Form({
  isDisabled,
  onChange,
  title,
  buttonText,
  signMessage,
  signLinkMessage,
  signLink,
  children,
  onSubmit,
  apiTextError
}) {
  return (
    <form className='form' onSubmit={onSubmit} onChange={onChange}>

      <div className='form__wrap'>
        <Logo place='__form' />
        <h1 className='form__title'>
          {title}
        </h1>
        {children}
      </div>
      <div className='form__sign-wrap'>
        <span className='form__errors'>{apiTextError || ''}</span>
        {/* Кнопка */}
        <button
          disabled={isDisabled}
          type='submit'
          className='
          form__button 
          '>
          {buttonText}
        </button>
        {/* Кнопка */}
        <p className='form__sign-text'>
          {signMessage}
          <Link className='form__sign-link' to={signLink}>{signLinkMessage}</Link>
        </p>
      </div>
    </form>
  )
}
