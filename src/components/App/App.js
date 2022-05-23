// Layout
import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import Test from "../Test/Test";
//
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import './App.css';
// API
import mainApi from "../../utils/MainApi";
import movieApi from "../../utils/MovieApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
  const { pathname } = useLocation();


  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [correctToken, setCorrectToken] = useState(false);

  // Стейты с фильмами
  const [initialMovies, setInitialMovies] = useState([]);
  // Отсортированные фильмы - идет в локал
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);


  // Массив ID Сохраненных фильмов 
  // Все сохраненные фильмы
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  // Айди сохраненных фильмов конкретного пользователя
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  // Стейты поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const [apiTextError, setApiTextError] = useState('');



  const [isLoading, setIsLoading] = useState(false);


  // временно
  const [isSaved, setIsSaved ] = useState();
  //_______________________________________________

  // Страницы с фильмами
  const moviesPage = pathname === '/movies',
    savedPage = pathname === '/saved-movies';


// Загрузка приложения
// Проверка токена
useEffect(() => {
  checkToken(); // loggedIn :true
  setApiTextError('');
}, [])


// Если токен fale ничего

// Проверили токен - loggedIn true
// Запускаем событие по loggedIn
  useEffect(() => {
    // Скачать сохраненные фильмы
    getSavedMoviesApi()


  }, [loggedIn])

  // проверка фильмов на принадлженость пользователя
  // Загрузка айди фильмов в стейт savedMoviesId
  // на выходе Стейт с айди фильмами


  // useEffect(() => {
  //   let currentUserSavedMovies = [];
  //   allSavedMovies.map((movie) => {
  //     if(movie.owner._id === currentUser._id) {
  //       return currentUserSavedMovies.push(movie)
  //     }
  //   })
  //   setAllSavedMovies(currentUserSavedMovies)
  // }, [])

  // Сортирум сохраненные конкретным пользователем лайки
  useEffect(() => {
    let arrSavedMoviesID = [];
    allSavedMovies.map((savedMovie) => {
      arrSavedMoviesID.push({id: savedMovie.movieId})
    console.log(savedMovie)
    } )
    console.log(arrSavedMoviesID)
    setSavedMoviesId(arrSavedMoviesID)
  },  [allSavedMovies])

  // 1 ПОЛУЧИТЬ СПИСОК ВСЕХ СОХРАНЕННЫХ ФИЛЬМОВ
  // забираем сохраненные фильмы из БД
  // и заносим в стейт allSavedMovies
  function getSavedMoviesApi() {
    const token = localStorage.getItem('JWT_TOKEN');
    console.log(currentUser)
    if (token) {
      let arr = [];
      mainApi.getSavedMovie(token)
        .then((movies) => {
          setAllSavedMovies(movies)
        })
        .catch((err) => {
          console.log(err)
        })
        console.log(arr)
    }
  }


  // нажатие на кнопку сохранить
  // пока просто сохраняем в базу данных
  function handleSaveMovies(data) {
    console.log('нажали на сохранение')
    mainApi.saveMovie(data)
      .then(movie => {
        // Перезапишем в стейт allSavedMovies сстарые данные и новые movie
        setAllSavedMovies([...allSavedMovies, movie])
      })
      .catch(err => console.log(err))
  }

// Загружаем сохраненные фильмы
// Сортируем на принадлежность к пользователю
// Сравнили с фильмами из локала

// Записали в savedMoviesId

// Событие по SavedMoviesId
// Берем фильмы из локала
// Записываем в стейт












  // useEffect(() => {
  //   console.log('Проставим лайки')
  //   const querySearchLocalStorage = localStorage.getItem('searchQuery')


  //   if (loggedIn && querySearchLocalStorage) {

  //     const token = localStorage.getItem('JWT_TOKEN');
  //     let savedMovies = [];
      
  //     mainApi.getSavedMovie(token)
  //       .then((res) => {
  //         res.map((i) => {
  //           if (i.owner._id === currentUser._id) {
  //             return savedMovies.push({ id: i.movieId })
  //           }
  //         })
  //       })
  //     setSavedMoviesId(savedMovies)
  //     console.log(savedMoviesId)
  //   }
  // }, [])

  // useEffect(() => {
  //   checkToken();
  //   setApiTextError('');


  //   // if (!correctToken){
  //   //   setLoggedIn(false)
  //   //   handleLogout();
  //   // }

  // }, [])



  ////////////////////////////////////////////////////////////////////////////
  // STATE LOGGEDIN
  // При изменнении стейта loggedIn проверяем
  // Если loggedIn = true , и нету фильмов в локал сторейдже
  // загружаем их, если в локале есть фильмы записываем их 
  // через saveMoveToState в initialMovies

  useEffect(() => {
    const moviesToLocalStorage = localStorage.getItem('initialMovies');
    // setIsLoading(false)
    if (loggedIn && !moviesToLocalStorage) {
      try {
        getMovies(moviesToLocalStorage);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        // setIsLoading(true)
      }
    } else {
      saveMoveToState(moviesToLocalStorage);
    }
    // setIsLoading(true)
  }, [loggedIn]);

  // Загружаем фильмы
  async function getMovies(localMovies) {
    const getMovies = await movieApi.getMovies();
    localMovies = await localStorage.setItem('initialMovies', JSON.stringify(getMovies));
    const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'));
    setInitialMovies(getLocalMovies);
  }

  // Сохраняем в стейт
  async function saveMoveToState(localMovies) {
    const getLocalMovies = await JSON.parse(localMovies);
    setInitialMovies(getLocalMovies);
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////
  // EFFECT - при изменнении строки поиска и чекбокса
  // Если находимся на странице с фильмами /movies
  // передаем searchQuery - запрос 
  // и initialMovies массив с фильмами для фильтрации 
  // если находимся на /saved-movies
  // передаем запрос searchQuery и массив с сохраненными фильмами???????

  // ???????????????????????????
  // ???????????????????????????
  // ???????????????????????????

  useEffect(() => {
    if (moviesPage) {
      filterMovies(searchQuery, initialMovies);
    } else if (savedPage) {
      console.log("savedPage")
    } else {
      console.log(pathname)
    }
  }, [searchQuery, checkboxStatus])

  // Фильтруем входящий массив с фильмами
  // query - Поисковый запрос, data - массив с фильмами - либо initialMovies || savedMovies
  // permovMovies - рузультат поиска

  async function filterMovies(query, data) {
    const permovMovies = await data.filter(
      movie => (
        query ?
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) : true)
        &&
        (checkboxStatus ? (movie.duration <= 40) : (movie.duration >= 0))
    )
    if (moviesPage) {


      setFilteredMovies(permovMovies)
    } else {
      // ???????????
      // ???????????
      // ???????????
      // ???????????
    }

  }


  // Нажаатие на кнопку поиска
  // Отправляем отфильтрованные фильмы
  // и запрос в локал сторейдж
  // отправляем в renderMovies - filteredMovies
  function handleSubmitSearchButton() {
    if (moviesPage) {
      addMoviesSearchToLocalStorage(filteredMovies)
    }
    setRenderMovies(filteredMovies)
  }


  // функция добавления в локал сторейдж используется в handleSubmitSearchButton
  // при добавлении фильм в сохраненные на странице /movies
  function addMoviesSearchToLocalStorage(search) {
    if (moviesPage) {
      localStorage.setItem('filteredMovies', JSON.stringify(search))
      localStorage.setItem('checkboxStatus', checkboxStatus)
      localStorage.setItem('searchQuery', searchQuery);
    }
  }

 

  function handleRemoveMovie(id) {
    console.log('УДАЛИТЬ')
    const token = localStorage.getItem('JWT_TOKEN')
    mainApi.removeMovie(id, token)
      .then(
        // res => console.log(res)
      )
      .catch(err => console.log(err))
  }



  ////////////////////////////////////////////////////////////////////////////
  // Пользователь
  // 
  // Проверка токена
  function checkToken() {
    const token = localStorage.getItem('JWT_TOKEN')
    if (token) {
      auth(token);
    } else {
      // new
      handleLogout();
    }
  }

  // Авторизация
  function auth(token) {
    mainApi.getUser(token)
      .then(res => {
        setCurrentUser(res);
        setLoggedIn(true);
        localStorage.setItem('CORRECT_TOKEN', true)
        setCorrectToken(true);
      })
      .catch(err => {
        setCorrectToken(false);
        localStorage.setItem('CORRECT_TOKEN', false)
        localStorage.removeItem('JWT_TOKEN');
        console.log(err)
      })
  }

  // Регистрация
  // data: name, email, password
  function handleSignup(data) {
    console.log(typeof (data))
    mainApi.signup({ data }).then(res => {
      //  setCurrentUser(res);
      handleSignin({ email: data.email, password: data.password })
    })
      .catch(err => {
        if (err === 'Ошибка: 400') {
          setApiTextError('Пользователь с таким email уже существует.')
        } else if (err === 'Ошибка: 401') {
          setApiTextError('Ошибка 401')
        } else if (err === 'Ошибка: 403') {
          setApiTextError('Ошибка 403')
        } else if (err === 'Ошибка: 409') {
          setApiTextError('Пользователь с таким email уже существует.')
        } else if (err === 'Ошибка: 429') {
          setApiTextError('Слишком много запросов, попробуйте позже!')
        } else {
          setApiTextError('Неизвестная ошибка!')
        }
      })
  }

  // Отправили email и пароль, получили токен
  function handleSignin(data) {
    mainApi.signin({ data })
      .then(res => {
        localStorage.setItem('JWT_TOKEN', res.token)
        console.log(res)
        auth(res.token)
        setLoggedIn(true);
        setCorrectToken(true);
        navigate('/movies');
      })
      .catch(err => {
        if (err === 'Ошибка: 400') {
          setApiTextError('')
        } else if (err === 'Ошибка: 401') {
          setApiTextError('Вы ввели неправильный логин или пароль')
        } else if (err === 'Ошибка: 403') {
          setApiTextError('')
        } else if (err === 'Ошибка: 409') {
          setApiTextError('')
        } else if (err === 'Ошибка: 429') {
          setApiTextError('Слишком много запросов, попробуйте позже!')
        }
      })
  }

  // Редактирование профиля 
  function handleUserUpdate(data) {
    mainApi.patchUser(data)
      .then(() => {
        setCurrentUser({ name: data.name, email: data.email })
        setApiTextError('');
      })
      .catch(err => {
        if (err === 'Ошибка: 400') {
          setApiTextError('Пользователь с таким email уже существует');
        } else if (err === '401') {
          setApiTextError('При обновлении профиля произошла ошибка');
        }
        else if (err === '409') {
          setApiTextError('При обновлении профиля произошла ошибка');
        }
        else if (err === '429') {
          setApiTextError('Слишком много запросов, попробуйте позже!');
        }
      })
  }


  // logout
  function handleLogout() {
    setLoggedIn(false);
    // setSearchQuery('');
    removeLocalStorageOnExit();
    navigate('/', { replace: true });
  }

  function removeLocalStorageOnExit() {
    localStorage.removeItem('CORRECT_TOKEN')
    localStorage.removeItem('JWT_TOKEN')
    localStorage.removeItem('checkboxStatus')
    localStorage.removeItem('initialMovies')
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('searchQuery')
    localStorage.removeItem('filteredMovies')
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={
          <AppLayout

            loggedIn={loggedIn}

          />}>
          <Route index element={<Main />} />
          <Route element={
            <ProtectedRoute
              loggedIn={loggedIn}
              correctToken={correctToken}
            />}>

            {/* {MOVIES} */}
            <Route path='movies' element={

              <Movies
                moviesPage={moviesPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmitSearchButton={handleSubmitSearchButton}
                checkboxStatus={checkboxStatus}
                setCheckboxStatus={setCheckboxStatus}

                renderMovies={renderMovies}
                setRenderMovies={setRenderMovies}

                handleSaveMovies={handleSaveMovies}


                savedMoviesId={savedMoviesId}
                currentUser={currentUser}

              // ТЕСТ
              // isSaved={isSaved}
              // setIsSaved={setIsSaved}

              />
            }></Route>

            {/* {SAVED-MOVIES} */}
            <Route path='saved-movies' element={

              <SavedMovies
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmitSearchButton={handleSubmitSearchButton}

                handleRemoveMovie={handleRemoveMovie}
              />}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element=
            {<ProfileLayout
              loggedIn={loggedIn}
            />}>
            <Route index element=
              {<Profile
                handleUserUpdate={handleUserUpdate}
                handleLogout={handleLogout}
                apiTextError={apiTextError}
                setApiTextError={setApiTextError}
              />} />
          </Route>
        </Route>


        <Route path='/signup'
          element=
          {<Register
            handleSignup={handleSignup}
            apiTextError={apiTextError}
          />} />

        <Route path='/signin'
          element=
          {<Login
            handleSignin={handleSignin}
            apiTextError={apiTextError}
          />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
