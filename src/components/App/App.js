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


  const [localInitialMovies, setLocalInitialMovies] = useState(localStorage.getItem('initialMovies'))

  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  /////
  const [readyOnState, setReadyOnState] = useState(false);



  // Поиск
  // searchQuery - стейт с запросом для поиска
  // checkboxStatus - стейт с состоянием чекбокса короткометражка
  // handleSearch - нажатие на кнопку поиска состояние
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  // Заходим в приложение
  // Проверка токена
  // Если все в порядке loggedIn true

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('JWT_TOKEN')
      try {
        if (token) {
          const userData =  await mainApi.getUser(token)
          setCurrentUser(userData)
          setLoggedIn(true)
        }
      }
      catch (err) {console.log(err)}
      finally {console.log(token)}
    }
    checkToken();
  }, [])

  useEffect(() => {
    let localInitialMovies = localStorage.getItem('initialMovies')
    const getInitialMovies = async () => {
      if (loggedIn && !localInitialMovies) {
        const getMovies = await movieApi.getMovies()
        localInitialMovies = localStorage.setItem('initialMovies', JSON.stringify(getMovies))
      } else {
        // const setMovies = await setInitialMovies(JSON.parse(localInitialMovies))
        setInitialMovies(JSON.parse(localInitialMovies))
        console.log(initialMovies)
      }
    }
    getInitialMovies()
  }, [loggedIn])

    // Поиск по массиву
  const searchByQuery = async () => {
    const performMovies = await initialMovies.filter(
      movie => (searchQuery ? movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) : true) && (checkboxStatus ? (movie.duration <= 40) : (movie.duration >= 0))
    )
    saveToLocaleStorage(performMovies)
    setFilteredMovies(performMovies)
    // console.log('filteredMovies' + performMovies)
    // console.log(filteredMovies)
  }
    function saveToLocaleStorage(searh) {
    localStorage.setItem('filteredMovies', JSON.stringify(searh))
    localStorage.setItem('checkboxStatus', checkboxStatus)
    localStorage.setItem('searchQuery', searchQuery)
  }


// const permormSearch = initialMovies.filter(
    //   movie => (searchQuery ? (movie.nameRU.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) :
    //     (console.log('нет результатов')) && (checkboxStatus ? (movie.durattion <= 40) : (movie.duration >= 0))))

    // saveToLocaleStorage(permormSearch)
  //   console.log('searchByQuery')
  // }



  // useEffect(() => {
  //   const checkInitialMovies = async () => {
  //     const localInitialMovies =  await localStorage.getItem('initialMovies')
  //     try {
  //       if (loggedIn && localInitialMovies === null){
  //         const initMovie = await movieApi.getMovies()
  //         localStorage.setItem('initialMovies', JSON.stringify(initMovie))

  //       }
  //     } 
  //     catch (err) {
  //       console.error(err)
  //     }
  //     finally {
  //       setReadyOnState(true)
  //     }
  //   }
  //   checkInitialMovies();
  // }, [loggedIn])


  // Поиск по массиву
  // const searchByQuery = async () => {
  //   try {
  //     const localInitialMovies = localStorage.getItem('initialMovies')

  //     if(!localInitialMovies){
  //       const getMovies = await movieApi.getMovies();

  //       localStorage.setItem('initialMovies', JSON.stringify(getMovies))
  //       console.log(localStorage)
  //     } else {
  //       setInitialMovies(JSON.parse(setInitialMovies))
  //     }
  //   }
  //   catch (err) {
  //     console.error(err)
  //   }
  //   finally {
  //     console.log(initialMovies)
  //   }

    // const localInitialMovies = localStorage.getItem('initialMovies')
    // setInitialMovies(JSON.parse(localInitialMovies))
    // console.log(initialMovies)


    // const permormSearch = initialMovies.filter(
    //   movie => (searchQuery ? (movie.nameRU.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) :
    //     (console.log('нет результатов')) && (checkboxStatus ? (movie.durattion <= 40) : (movie.duration >= 0))))

    // saveToLocaleStorage(permormSearch)
  //   console.log('searchByQuery')
  // }

  // function saveToLocaleStorage(searh) {
  //   localStorage.setItem('filteredMovies', JSON.stringify(searh))
  //   localStorage.setItem('checkboxStatus', checkboxStatus)
  //   localStorage.setItem('searchQuery', searchQuery)
  // }



  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem('JWT_TOKEN')
  //     try {
  //       console.log('1')
  //       if (token) {
  //         mainApi.getUser(token)
  //           .then((userData) => {
  //             setCurrentUser(userData)
  //           })
  //       }
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //     finally {
  //       setLoggedIn(true)
  //       console.log(token)
  //     }
  //   }
  //   checkToken();
  // }, [])

  // useEffect(() => {
  //   const localInitialMovies = localStorage.getItem('initialMovies')
  //   console.log("Изменения в loggedIn")
  //   try {
  //     if (loggedIn && localInitialMovies === null) {
  //       movieApi.getMovies()
  //         .then((res) => {
  //           localStorage.setItem('initialMovies', JSON.stringify(res))
  //         })
  //     }
  //   }
  //   catch (err) {
  //     console.err(err)
  //   }
  //   finally {
  //     setInitialMovies(JSON.parse(localInitialMovies));
  //   }
  // }, [loggedIn])

  // // Поиск по массиву
  // function searchByQuery() {
  //   const permormSearch = initialMovies.filter(
  //     movie => (searchQuery ? (movie.nameRU.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) :
  //       ('По запросу ничего не найдено') && (checkboxStatus ? (movie.durattion <= 40) : (movie.duration >= 0))))

  //   saveToLocaleStorage(permormSearch)
  // }

  // function saveToLocaleStorage(searh) {
  //   localStorage.setItem('filteredMovies', JSON.stringify(searh))
  //   localStorage.setItem('checkboxStatus', checkboxStatus)
  //   localStorage.setItem('searchQuery', searchQuery)
  // }







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
  // useEffect(() => {
  //   if (loggedIn) {
  //     const token = localStorage.getItem('JWT_TOKEN');
  //     mainApi.getUser(token)
  //       .then((userData) => {
  //         setCurrentUser(userData)
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       })
  //   } else {
  //     console.log('Не авторизован')
  //   }
  // }, [loggedIn]);

  // Проверка 
  // Если авторизован и в localStorage нету массива с фильмами
  // делаем запрос к апи и помещаем в localStorage весь список фильмов
  // в initialMovies. Следом помещаем в стейт initialMovies распарсенные данные

  // useEffect(() => {
  //   const localInitialMovies = localStorage.getItem('initialMovies');
  //   if (loggedIn && !localInitialMovies) {
  //     movieApi.getMovies()
  //       .then((res) => {
  //         localStorage.setItem('initialMovies', JSON.stringify(res))
  //       })
  //   }
  // }, [loggedIn])

  // useEffect(() => {
  //   const localInitialMovies = localStorage.getItem('initialMovies');
  //   if (loggedIn && localInitialMovies) {
  //     setInitialMovies(JSON.parse(localInitialMovies))
  //   }
  // }, [loggedIn])

  // // Поиск по массиву
  // function searchByQuery(){
  //   const permormSearch = initialMovies.filter(
  //     movie => (searchQuery ? (movie.nameRU.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) : 
  //     ('По запросу ничего не найдено') && (checkboxStatus ? (movie.durattion <= 40): (movie.duration >= 0)))
  //   )
  //   saveToLocaleStorage(permormSearch)

  // }

  // function saveToLocaleStorage(searh){
  //     localStorage.setItem('filteredMovies', JSON.stringify(searh))
  //     localStorage.setItem('checkboxStatus', checkboxStatus)
  //     localStorage.setItem('searchQuery', searchQuery)
  // }



  // // Регистрация пользователя /signup
  // function handleSignup(data) {
  //   mainApi.signup({ data })
  //     .then(res => {
  //       navigate('/movies');
  //     })
  // }


  // // Авторизация пользователя /signin
  // function handleSignin(data) {
  //   mainApi.signin({ data })
  //     //Получаем в ответ токен
  //     .then((res) => {
  //       localStorage.setItem('JWT_TOKEN', res.token);
  //       setCurrentUser(data)
  //       setLoggedIn(true)
  //       navigate('/movies', { replace: true });
  //     })
  //     .catch(err => {
  //       if (err === 'Ошибка: 400') {
  //         setApiErrorText('Вы ввели неправильный логин или пароль.')
  //       }
  //       if (err === 'Ошибка: 401') {
  //         setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
  //       }
  //       if (err === 'Ошибка: 409') {
  //         setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
  //       }
  //       if (err === 'Ошибка: 429') {
  //         setApiErrorText('Слишком много запросов, пожалуйста, повторите попытку позже')
  //       }
  //       else {
  //         setApiErrorText('Вы ввели неправильный логин или пароль. ')
  //         console.log(apiErrorText)
  //       }

  //     })
  // }

  // function patchUser(data) {
  //   const token = localStorage.getItem('JWT_TOKEN');
  //   mainApi.patchUser({ data, token })
  //     .then(
  //       res => {
  //         setCurrentUser(data);
  //       }
  //     ).catch(err => {
  //       setApiErrorText(err)
  //     })
  // }
  // // Выйти из системы
  // function handleSignOut() {
  //   setLoggedIn(false);
  //   localStorage.removeItem('JWT_TOKEN');
  //   navigate('/', { replace: true });
  //   console.log(navigate.name)
  //   return console.error('Ну и на хуя ты вышел?');
  // }

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
                filteredMovies={filteredMovies}
              />
            }></Route>
            <Route path='saved-movies' element={<SavedMovies />}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element={<ProfileLayout loggedIn={loggedIn} />}>
            <Route index element=
              {<Profile
                // handleSignOut={handleSignOut}
                // patchUser={patchUser}
                apiErrorText={apiErrorText}
              />} />
          </Route>
        </Route>


        <Route path="/signup"
          element=
          {<Register
          // handleSignup={handleSignup}
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
