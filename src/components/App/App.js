import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation} from "react-router-dom";
import './App.css'

import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { PageNotFound } from "../PageNotFound/PageNotFound";

export default function App() {
  const navigate = useNavigate();

  // Переменные состояния
  // Авторизован или нет
  const [loggedIn, setLoggedIn] = useState('false');

  
  //Запись в контекст  
  const [currentUser, setCurrentUser] = useState({});

  //Состояние ошибок из API
  const [apiErrorText, setApiErrorText] = useState('');
  let { pathname } = useLocation()



  //del
  console.log('======================================')
  console.log('Мы находимся: ' + pathname)
  console.log('Состояние авторизации: ' + loggedIn)
  console.log('Состояние CurrentUserContext: ')
  console.log(currentUser)
  console.log('======================================')
  //del

  // Проверка аутентификации
  useEffect(() => {
    if (loggedIn){
      const token = localStorage.getItem('JWT_TOKEN');
      mainApi.getUser(token)
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      console.log('Не авторизован')
    }
  }, [loggedIn]);




  // Регистрация пользователя /signup
  function handleSignup(data) {
    mainApi.signup({ data })
      .then(res => {
        navigate('/movies');
      })
  }


  // Авторизация пользователя /signin
  function handleSignin(data) {
    mainApi.signin({ data })
      //Получаем в ответ токен
      .then((res) => {
        localStorage.setItem('JWT_TOKEN', res.token);
        setCurrentUser(data)
        setLoggedIn(true)
        navigate('/movies');
      })
      .catch(err => {
        if (err === 'Ошибка: 400') {
          setApiErrorText('Вы ввели неправильный логин или пароль.')
        }
        if (err === 'Ошибка: 401') {
          setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
        }
        if (err === 'Ошибка: 409') {
          setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
        }
        if (err === 'Ошибка: 429') {
          setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
        }
        // else 
        // {
        //   setApiErrorText('Вы ввели неправильный логин или пароль. ')
        //   console.log(apiErrorText)
        // }

      })
  }
  // Выйти из системы
  function handleSignOut() {
    setLoggedIn(false)
     console.log(localStorage.getItem('JWT_TOKEN'))
    localStorage.removeItem('JWT_TOKEN')
    navigate('/signin');
    // console.log(loggedIn)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<AppLayout loggedIn={loggedIn} />}>
          <Route index element={<Main />} />
          <Route path='/movies' element={<Movies />}></Route>
          <Route path='/saved-movies' element={<SavedMovies />}></Route>
        </Route>
        <Route path='/profile' element={<ProfileLayout loggedIn={loggedIn} />}>
          <Route index element={<Profile handleSignOut={handleSignOut} />} />
        </Route>

        <Route path="/signup"
          element=
          {<Register
            handleSignup={handleSignup}

          />} />

        <Route path="/signin"
          element=
          {<Login
            handleSignin={handleSignin}
            apiErrorText={apiErrorText}
          />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
