import { useEffect } from 'react';
import { Form } from '../Form/Forms';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Login.css';

export function Login({ handleSignin, apiTextError }) {
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
        apiTextError={apiTextError}
      >
        <div className='form__label-wrap'>
          <label className='form__label'>
            <span className='form__input-name'>E-mail</span>

            {/* input 'email' */}
            <input
              onChange={handleChange}
              value={values.email || ''}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              name='email'
              type='email'
              className='form__input form__input_type_name'
              placeholder='pochta@yandex.ru'
            />
            {/* input 'email' */}

            <span className='form__input-error'>{errors.email || ''}</span>
          </label>


          <label className='form__label'>
            <span className='form__input-name'>Пароль</span>

            {/* input 'password' */}
            <input
              onChange={handleChange}
              // value={values.password || ''}
              required
              pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])\S{8,30}$'

              type='password'
              name='password'
              autoComplete='on'
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