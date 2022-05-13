// Layout
import { AppLayout } from '../AppLayout/AppLayout';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
// React && React Router
import { useState, useCallback, Suspense, useEffect, Children } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css'
// API
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MovieApi';
// Context
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// Components
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { PageNotFound } from '../PageNotFound/PageNotFound';

// START APP
export default function App() {

  const navigate = useNavigate();
  let { pathname } = useLocation();

  const moviesPage = pathname === '/movies',
        savedMoviesPage = pathname === '/saved-movies';

  // STATE
  const [initialMovies, setInitialMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [checkboxStatus, setCheckboxStatus] = useState(false);


  const [filteredMovies, setFilteredMovies] = useState([]);

  const [moviesToRender, setMoviesToRender] = useState([]);



  const[savedMovie, setSavedMovie] = useState([]);

  const [searchResult, setSearchResult] = useState([]);

  //Состояние ошибок из API
  const [apiErrorText, setApiErrorText] = useState('');


  // unuse
  // const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  // const [preloader, setPreloader] = useState(false);
  
  // loggedIn
  useEffect(() => {
    const token = localStorage.getItem('JWT_TOKEN')

      async function checkTokenAndCurrentUser() {
        if (token) {
          const getUser = await mainApi.getUser(token)
          setCurrentUser(getUser)
          setLoggedIn(true)
          console.log(token)
        }
      }
      checkTokenAndCurrentUser();
  }, []);


  // Загрузка в локал файла с фильмами и добавление в стейт или добавление в стейт
  // или добавление в стейт срабатывает при изменении стейта loggedIn

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
    console.log('Отработала getMovies')
    const getMovies = await movieApi.getMovies();
    localMovies = await localStorage.setItem('initialMovies', JSON.stringify(getMovies));
    const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'));
    setInitialMovies(getLocalMovies);
  }

  async function saveMoveToState(localMovies) {
    const getLocalMovies = await JSON.parse(localMovies);
    setInitialMovies(getLocalMovies);
  }



  // Поведение поля поиска при вводе 
  useEffect(() => {
    if (moviesPage){
      filterMovie(searchQuery, initialMovies);
      console.log(filteredMovies);
    } else if (pathname === '/saved-movies'){

      console.log('SAVED MOVIES SEARCH')
    }
  }, [searchQuery, checkboxStatus]);
  // }, [searchQuery, searchResult, checkboxStatus]);


  async function filterMovie(query, data) {
    const perfomMovies = await data.filter(
      movie => (
        query ?
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) : true)
        &&
        (checkboxStatus ? (movie.duration <= 40) : (movie.duration >= 0))
    )
    setFilteredMovies(perfomMovies);
  }

  function handleSearch() {
    saveToLocaleStorage(filteredMovies)
    renderMoviesToPage(filteredMovies);
  }

  // Сохраняем данные запроса
  function saveToLocaleStorage(searсh) {
    if (moviesPage) {
      localStorage.setItem('filteredMovies', JSON.stringify(searсh))
      console.log('MOVIES')
    }
    localStorage.setItem('checkboxStatus', checkboxStatus)
    localStorage.setItem('searchQuery', searchQuery)
  }

  function renderMoviesToPage(arr) {
    setMoviesToRender(arr)
  }

  function saveMovieToDb(item) {
    const token = localStorage.getItem('JWT_TOKEN');
    mainApi.saveMovie(item, token)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  function removeMovieFromDb(id) {
    const token = localStorage.getItem('JWT_TOKEN');
    mainApi.removeMovie(id, token)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  // ДОДЕЛАТЬ
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

  // ДОДЕЛАТЬ
  function handleSignup(data) {
    mainApi.signup({ data })
      .then(res => {
        navigate('/movies');
      })
  }

  // ДОДЕЛАТЬ
  function patchUser(data){
    let token = localStorage.getItem('JWT_TOKEN');
    mainApi.patchUser(data, token)
      .then((res) => console.log(res))
  }


  // logout
  function handleLogout() {
    setLoggedIn(false);
    setSearchQuery('');
    removeLocalStorageOnExit();
    navigate('/', { replace: true });
  }

  function removeLocalStorageOnExit(){
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
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='movies' element={
              <Movies

                moviesPage={moviesPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                checkboxStatus={checkboxStatus}
                setCheckboxStatus={setCheckboxStatus}

                filteredMovies={filteredMovies}
                moviesToRender={moviesToRender}
                setMoviesToRender={setMoviesToRender}

                saveMovieToDb={saveMovieToDb}

              />
            }></Route>
            <Route path='saved-movies' element={
              <SavedMovies
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              checkboxStatus={checkboxStatus}
              setCheckboxStatus={setCheckboxStatus}
              moviesToRender={moviesToRender}
              setMoviesToRender={setMoviesToRender}

              removeMovieFromDb={removeMovieFromDb}
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
                patchUser={patchUser}
                apiErrorText={apiErrorText}
                handleLogout={handleLogout}
              />} />
          </Route>
        </Route>


        <Route path='/signup'
          element=
          {<Register
          handleSignup={handleSignup}
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