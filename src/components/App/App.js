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
  const {pathname} = useLocation();


  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [correctToken, setCorrectToken] = useState(false);
  // const [,set] = useState();

  // Стейты с фильмами
  const [initialMovies, setInitialMovies] = useState([]);
  // Отсортированные фильмы - идет в локал
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);


  // Массив ID Сохраненных фильмов 
  const [savedLocalMovies, setSavedLocalMovies] = useState([]);
  // Стейты поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const [apiTextError, setApiTextError] = useState('');



  // Страницы с фильмами
  const moviesPage = pathname === '/movies',
        savedPage = pathname === '/saved-movies';



  useEffect(() => {
    checkToken();
    setApiTextError('');
    // if (!correctToken){
    //   setLoggedIn(false)
    //   handleLogout();
    // }
  }, [])

  useEffect(() => {
    let moviesToLocalStorage = localStorage.getItem('initialMovies');
    if (loggedIn && !moviesToLocalStorage) {
      try {
        getMovies(moviesToLocalStorage);
      }
      catch (err) {
        console.log(err);
      }
    } else {
      saveMoveToState(moviesToLocalStorage);
    }
  }, [loggedIn]);

  async function getMovies(localMovies) {
    const getMovies = await movieApi.getMovies();
    localMovies = await localStorage.setItem('initialMovies', JSON.stringify(getMovies));
    const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'));
    setInitialMovies(getLocalMovies);
  }

  async function saveMoveToState(localMovies) {
    const getLocalMovies = await JSON.parse(localMovies);
    setInitialMovies(getLocalMovies);
  }

  useEffect(() => {
    console.log(searchQuery)
    if (moviesPage){
      filterMovies(searchQuery, initialMovies);
      console.log(filteredMovies);
    } else if (savedPage){
      console.log("savedPage")
    } else {
      console.log(pathname)
    }
  }, [searchQuery, checkboxStatus])

  // Фильтруем входящий массив с фильмами
  // query - Поисковый запрос, data - массив с фильмами - либо initialMovies || savedMovies
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
      
    }

  }

  function handleSubmitSearchButton(){
    addMoviesSearchToLocalStorage(filteredMovies)
    setRenderMovies(filteredMovies)
  }

  function addMoviesSearchToLocalStorage(search){
    if (moviesPage) {
      localStorage.setItem('filteredMovies', JSON.stringify(search))
      localStorage.setItem('checkboxStatus', checkboxStatus)
      localStorage.setItem('searchQuery', searchQuery);
    }
    // localStorage.setItem(moviesPage ? ('moviesCheckBoxStatus', checkboxStatus) : ('savedMoviesCheckboxStatus', checkboxStatus));
  }


  function handleSaveMovies(data) {
    mainApi.saveMovie(data)
      .then(res => {
        console.log(res)
        console.log(res.movieId)
      })
      .catch(err => console.log(err))

  }



  // Проверка токена
  function checkToken() {
    const token = localStorage.getItem('JWT_TOKEN')
    if (token) {
      auth(token);
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
       console.log(res)
       setCurrentUser(res);
       handleSignin({email: data.email, password: data.password})
    })
    .catch(err => {
      if ( err === 'Ошибка: 400') {
        setApiTextError('Пользователь с таким email уже существует.')
      } else if ( err === 'Ошибка: 401') {
        setApiTextError('Ошибка 401')
      } else if ( err === 'Ошибка: 403') {
        setApiTextError('Ошибка 403')
      } else if ( err === 'Ошибка: 409' ) {
        setApiTextError('Пользователь с таким email уже существует.')
      } else if ( err === 'Ошибка: 429' ) {
        setApiTextError('Слишком много запросов, попробуйте позже!')
      } else {
        setApiTextError('Неизвестная ошибка!')
      }
    })
  }

// Отправили email и пароль, получили токен
function handleSignin(data){
  mainApi.signin({data})
  .then(res => {
    localStorage.setItem('JWT_TOKEN', res.token)
    setLoggedIn(true);
    setCorrectToken(true);
    navigate('/movies');
  })
  .catch(err => {
    if ( err === 'Ошибка: 400') {
      setApiTextError('')
    } else if ( err === 'Ошибка: 401') {
      setApiTextError('Вы ввели неправильный логин или пароль')
    } else if ( err === 'Ошибка: 403') {
      setApiTextError('')
    } else if ( err === 'Ошибка: 409' ) {
      setApiTextError('')
    } else if ( err === 'Ошибка: 429' ) {
      setApiTextError('Слишком много запросов, попробуйте позже!')
    }  
  })
}

// Редактирование профиля 
 function handleUserUpdate(data){
  mainApi.patchUser(data)
  .then(()=> {
    setCurrentUser({name: data.name, email: data.email})
    setApiTextError('');
  })
  .catch(err => {
    if ( err === 'Ошибка: 400') {
      setApiTextError('Пользователь с таким email уже существует');
    } else if ( err === '401') {
      setApiTextError('При обновлении профиля произошла ошибка');
    }
     else if ( err === '409') {
      setApiTextError('При обновлении профиля произошла ошибка');
    }
     else if ( err === '429') {
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

function removeLocalStorageOnExit(){
  localStorage.removeItem('CORRECT_TOKEN')
  localStorage.removeItem('JWT_TOKEN')
  localStorage.removeItem('checkboxStatus')
  localStorage.removeItem('initialMovies')
  localStorage.removeItem('savedMovies')
  localStorage.removeItem('searchQuery')
  localStorage.removeItem('filteredMovies')  
}



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
              />
            }></Route>

            {/* {SAVED-MOVIES} */}
            <Route path='saved-movies' element={

              <SavedMovies
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmitSearchButton={handleSubmitSearchButton}
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
