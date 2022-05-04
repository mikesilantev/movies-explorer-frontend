// Layout
import { AppLayout } from '../AppLayout/AppLayout';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
//
import { useState, useCallback, Suspense, useEffect, Children } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css'
// API
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MovieApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext'

// Components
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export default function App() {
  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [initialMovies, setInitialMovies] = useState([]);
  // handleSearch - нажатие на кнопку поиска состояние
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
 
  
  const [moviesBySearch, setMoviesBySearch] = useState([]);

  // unuse
  // const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  // const [preloader, setPreloader] = useState(false);

  // loggedIn
  useEffect(() => {
    const token = localStorage.getItem('JWT_TOKEN')
    return () => {
      async function checkTokenAndCurrentUser() {
        if (token) {
          const getUser = await mainApi.getUser(token)
          setCurrentUser(getUser)
          setLoggedIn(true)
          console.log(token)
        }
      }
      checkTokenAndCurrentUser();
    };
  }, []);


  useEffect(() => {
    let moviesToLocalStorage = localStorage.getItem('initialMovies')

    if (loggedIn && !moviesToLocalStorage) {
      try {
        console.log('first')
        async function getMovies() {
          const getMovies = await movieApi.getMovies()
          moviesToLocalStorage = await localStorage.setItem('initialMovies', JSON.stringify(getMovies))
          const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'))
          setInitialMovies(getLocalMovies)
        }
        getMovies();
      }
      catch (err) {
        console.log(err)
      }
      finally {
        console.log('Закрывай прелоадер')
      }
    } else {
      console.log('НИЧЕГО НЕ ДЕЛАЕМ')
      async function saveMoveToState() {
        const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'))
        setInitialMovies(getLocalMovies)
        // console.log(initialMovies)
      }
      saveMoveToState();
    }
  }, [loggedIn])


  
  useEffect(() =>{
    // console.log(initialMovies)
    // console.log(searchQuery)
    async function filterMovie(){
       const perfomMovies = await initialMovies.filter(
        movie => (
          searchQuery ? 
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) : true) 
          && 
          (checkboxStatus ? (movie.duration <= 40) : (movie.duration >= 0))
      )
      // console.log(perfomMovies)
      setFilteredMovies(perfomMovies)
    }
    filterMovie();
  }, [searchQuery, searchResult, checkboxStatus])

  async function searchByQuery() {
    console.log('кнопка поиска')
    // console.log('searchByQuery')
    // console.log(filteredMovies)
    saveToLocaleStorage(filteredMovies)
    setSearchResult(filteredMovies)
  }

  function saveToLocaleStorage(searсh) {
    localStorage.setItem('filteredMovies', JSON.stringify(searсh))
    localStorage.setItem('checkboxStatus', checkboxStatus)
    localStorage.setItem('searchQuery', searchQuery)
  }





  //Состояние ошибок из API
  const [apiErrorText, setApiErrorText] = useState('');
  let { pathname } = useLocation()


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
                initialMovies={initialMovies}

                searchResult={searchResult}
                filteredMovies={filteredMovies}
              // saveMovieToDb={saveMovieToDb}
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


        <Route path='/signup'
          element=
          {<Register
          // handleSignup={handleSignup}
          />} />

        <Route path='/signin'
          element=
          {<Login
            handleSignin={handleSignin}
            apiErrorText={apiErrorText}
          />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}