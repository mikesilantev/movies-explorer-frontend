// Layout
import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import Test from "../Test/Test";
//
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import './App.css'
// API
import mainApi from "../../utils/MainApi";
import movieApi from "../../utils/MovieApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext'

// Components
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
  const [loggedIn, setLoggedIn] = useState(false);

  //Запись в контекст  
  const [currentUser, setCurrentUser] = useState({});

  //Состояние ошибок из API
  const [apiErrorText, setApiErrorText] = useState('');
  let { pathname } = useLocation()

  // Фильмы
  // initialMovies - стейт с со всеми фильмами, который берется
  // из localStorage
  // filteredMovies - стейт с фильмами после searchQuery запроса
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);


  // Поиск
  // searchQuery - стейт с запросом для поиска
  // checkboxStatus - стейт с состоянием чекбокса короткометражка
  // handleSearch - нажатие на кнопку поиска состояние
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const localStorageInitialMovies = localStorage.getItem('initialMovies')




  // del
  // console.log('======================================')
  // console.log('Мы находимся: ' + pathname)
  // console.log('Состояние авторизации: ' + loggedIn)
  // console.log('Состояние CurrentUserContext: ')
  // console.log(currentUser)
  // console.log('======================================')
  // // del

  // Проверка аутентификации
  // и загрузка данных в контекст провайдер
  useEffect(() => {
    if (loggedIn) {
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

  // Проверка 
  // Если авторизован и в localStorage нету массива с фильмами
  // делаем запрос к апи и помещаем в localStorage весь список фильмов
  // в initialMovies. Следом помещаем в стейт initialMovies распарсенные данные
  useEffect(() => {
    if (loggedIn && !localStorageInitialMovies) {
      movieApi.getMovies()
        .then((res) => {
          //
          localStorage.setItem('initialMovies', JSON.stringify(res))
        })
        .then(() => {
          const getInitialMoviesLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));
          setInitialMovies(getInitialMoviesLocalStorage)
          console.log(initialMovies)
        })
    }
  }, [loggedIn, localStorageInitialMovies])

  // Поиск по массиву
  function searchByQuery(){
    const permormSearch = initialMovies.filter(
      movie => (searchQuery ? (movie.nameRU.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) : 
      ('По запросу ничего не найдено') && (checkboxStatus ? (movie.durattion <= 40): (movie.duration >= 0)))
    )
    if (permormSearch) {
      localStorage.setItem('filteredMovies', JSON.stringify(permormSearch))
      localStorage.setItem('checkboxStatus', checkboxStatus)
      localStorage.setItem('searchQuery', searchQuery)
      setFilteredMovies(JSON.stringify(permormSearch))
    }
  }


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
        navigate('/movies', { replace: true });
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
        else {
          setApiErrorText('Вы ввели неправильный логин или пароль. ')
          console.log(apiErrorText)
        }

      })
  }

  function patchUser(data) {
    const token = localStorage.getItem('JWT_TOKEN');
    mainApi.patchUser({ data, token })
      .then(
        res => {
          setCurrentUser(data);
        }
      ).catch(err => {
        setApiErrorText(err)
      })
  }
  // Выйти из системы
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('JWT_TOKEN');
    navigate('/', { replace: true });
    console.log(navigate.name)
    return console.error('Ну и на хуя ты вышел?');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        <Route path='/' element={<AppLayout loggedIn={loggedIn} />}>
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='movies' element={
              <Movies
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                checkboxStatus={checkboxStatus}
                setCheckboxStatus={setCheckboxStatus}

                searchByQuery={searchByQuery}
              />
            }></Route>
            <Route path='saved-movies' element={<SavedMovies />}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element={<ProfileLayout loggedIn={loggedIn} />}>
            <Route index element=
              {<Profile
                handleSignOut={handleSignOut}
                patchUser={patchUser}
                apiErrorText={apiErrorText}
              />} />
          </Route>
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
