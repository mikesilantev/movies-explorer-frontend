// Layout
import { AppLayout } from '../AppLayout/AppLayout';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
// API
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MovieApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
  const { pathname } = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [correctToken, setCorrectToken] = useState(false);

  const [initialMovies, setInitialMovies] = useState([]);
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [savedMoviesID, setSavedMoviesID] = useState([]);
  const [renderSavedMovie, setRenderSavedMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState();
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [apiTextError, setApiTextError] = useState('');

  const [textError, setTextError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isMount, setMount] = useState(false)

  const moviesPage = pathname === '/movies',
    savedPage = pathname === '/saved-movies';


  const filteredMovies = useMemo(
    () =>
      searchQuery?.length ? initialMovies
        ?.filter((movie) =>
          movie?.nameRU?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
        ?.filter((movie) =>
          checkboxStatus ? movie.duration <= 40 : movie.duration >= 0
        ) : [],
    [searchQuery, checkboxStatus, initialMovies]
  );

  const filteredSavedMovies = useMemo(
    () =>
      searchQuery?.length ? allSavedMovies
        ?.filter((movie) =>
          movie?.nameRU?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
        ?.filter((movie) =>
          checkboxStatus ? movie.duration <= 40 : movie.duration >= 0
        ) : allSavedMovies,
    [searchQuery, checkboxStatus, allSavedMovies]
  );

  const inputRef = useRef(null);

  // Загрузка приложения
  // Проверка токена

  useEffect(() => {
    checkToken(); // loggedIn :true
    setApiTextError('');
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesApi();
    }
  }, [loggedIn]);


  useEffect(() => {
    if (savedPage) {
      inputRef.current.value = '';
      setSearchQuery('')
      return
    }
    if (moviesPage) {
      const query = localStorage.getItem('searchQuery') ?? ''
      setSearchQuery(query);
      inputRef.current.value = query;
      setCheckboxStatus(localStorage.getItem('checkboxStatus') === 'true' ? true : false);
    }
  }, [moviesPage, savedPage]);



  // Сортировка и запись id сохраненных фильмов
  useEffect(() => {
    if (allSavedMovies) {
      let savedID = [];
      allSavedMovies.map((savedMovieId) => {
        return savedID.push({ id: savedMovieId.movieId });
      });
      setSavedMoviesID(savedID);
    }
  }, [allSavedMovies]);


  useEffect(() => {
    const moviesToLocalStorage = localStorage.getItem('initialMovies');

    if (loggedIn && !moviesToLocalStorage) {
      try {
        getMovies();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      saveMoveToState(moviesToLocalStorage);
    }
    // setIsLoading(true)
  }, [loggedIn]);

  // Загружаем фильмы
  async function getMovies() {
    try {
      const getMovies = await movieApi.getMovies();
      localStorage.setItem('initialMovies', JSON.stringify(getMovies));
      setInitialMovies(getMovies);
    } catch (err) {
      console.log(err);
    }
  }

  // Сохраняем в стейт
  function saveMoveToState(localMovies) {
    const getLocalMovies = JSON.parse(localMovies);
    setInitialMovies(getLocalMovies);
  }

  function handleSubmitSearchButton() {
    const newSearchValue = inputRef.current?.value;
    setSearchQuery(newSearchValue);
    if (!newSearchValue) {
      setTextError('Нужно ввести ключевое слово');
    }
  }

  useEffect(() => {
    if (moviesPage) {
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('checkboxStatus', checkboxStatus);
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery, filteredMovies, checkboxStatus])

  // Загружаем список всех сохраненных фильмов
  async function getSavedMoviesApi() {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      try {
        const responseMovies = await mainApi.getSavedMovie(token);
        if (!responseMovies?.length) {
          console.log('no data in db');
          return;
        }
        const savedMoviesCurrentUser = responseMovies.filter(
          (movie) => movie.owner._id === currentUser._id
        );
        setAllSavedMovies(savedMoviesCurrentUser);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  // нажатие на кнопку сохранить
  // пока просто сохраняем в базу данных
  function handleSaveMovies(data) {
    mainApi
      .saveMovie(data)
      .then((movie) => {
        setAllSavedMovies([...allSavedMovies, movie]);
        localStorage.setItem('SavedMovies', true);
      })
      .catch((err) => console.log(err));
  }

  // Удаляем фильма
  function handleRemoveMovie(id) {
    console.log('УДАЛИТЬ');
    const token = localStorage.getItem('JWT_TOKEN');
    mainApi
      .removeMovie(id, token)
      .then((res) => {
        console.log(res);
        let moviesArr = [];
        moviesArr = allSavedMovies.filter((savedMovie) => {
          return savedMovie._id !== res._id;
        });
        console.log(moviesArr);
        setAllSavedMovies(moviesArr);
      })
      .catch((err) => console.log(err))
      .finally(console.log(allSavedMovies));
  }

  // Проверка токена
  function checkToken() {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      auth(token);
    } else {
      // new
      handleLogout();
    }
  }

  // Авторизация
  function auth(token) {
    mainApi
      .getUser(token)
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        localStorage.setItem('CORRECT_TOKEN', true);
        setCorrectToken(true);
      })
      .catch((err) => {
        setCorrectToken(false);
        localStorage.setItem('CORRECT_TOKEN', false);
        localStorage.removeItem('JWT_TOKEN');
        console.log(err);
      });
  }

  // Регистрация
  // data: name, email, password
  function handleSignup(data) {
    console.log(typeof data);
    mainApi
      .signup({ data })
      .then((res) => {
        //  setCurrentUser(res);
        handleSignin({ email: data.email, password: data.password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setApiTextError('Пользователь с таким email уже существует.');
        } else if (err === 'Ошибка: 429') {
          setApiTextError('Слишком много запросов, попробуйте позже!');
        } else {
          setApiTextError('При регистрации пользователя произошла ошибка.');
        }
      });
  }

  // Отправили email и пароль, получили токен
  function handleSignin(data) {
    mainApi
      .signin({ data })
      .then((res) => {
        localStorage.setItem('JWT_TOKEN', res.token);
        auth(res.token);
        setLoggedIn(true);
        setCorrectToken(true);
        navigate('/movies');
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setApiTextError('Вы ввели неправильный логин или пароль. ');
        } else if (err === 'Ошибка: 401') {
          setApiTextError(' При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        } else if (err === 'Ошибка: 403') {
          setApiTextError('При авторизации произошла ошибка. Переданный токен некорректен');
        } else if (err === 'Ошибка: 429') {
          setApiTextError('Слишком много запросов, попробуйте позже!');
        } else {
          setApiTextError('На сервере произошла ошибка');
        }
      });
  }

  // Редактирование профиля
  function handleUserUpdate(data) {
    mainApi
      .patchUser(data)
      .then(() => {
        setCurrentUser({ name: data.name, email: data.email });
        setApiTextError('');
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setApiTextError('Пользователь с таким email уже существует');
        } else if (err === '401') {
          setApiTextError('При обновлении профиля произошла ошибка');
        } else if (err === '429') {
          setApiTextError('Слишком много запросов, попробуйте позже!');
        } else {
          setApiTextError('На сервере произошла ошибка');
        }
      });
  }

  // logout
  function handleLogout() {
    setLoggedIn(false);
    removeLocalStorageOnExit();
    navigate('/', { replace: true });
  }

  function removeLocalStorageOnExit() {
    localStorage.clear();

    // setRenderMovies([]);
    setAllSavedMovies(null);
    setSavedMoviesID(null);
    setRenderSavedMovies(null);
    setInitialMovies(null);
    console.log('isClear')
  }

  useEffect(() => {
    console.log(filteredSavedMovies)
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<AppLayout loggedIn={loggedIn} />}>
          <Route index element={<Main />} />
          <Route
            element={
              <ProtectedRoute loggedIn={loggedIn} correctToken={correctToken} />
            }
          >
            <Route
              path='movies'
              element={
                <Movies
                  isMount={isMount}
                  setMount={setMount}
                  isLoading={isLoading}
                  moviesPage={moviesPage}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSubmitSearchButton={handleSubmitSearchButton}
                  checkboxStatus={checkboxStatus}
                  setCheckboxStatus={setCheckboxStatus}
                  renderMovies={filteredMovies}
                  // setRenderMovies={setRenderMovies}
                  handleSaveMovies={handleSaveMovies}
                  allSavedMovies={allSavedMovies}
                  savedMoviesID={savedMoviesID}
                  currentUser={currentUser}
                  textError={textError}
                  inputRef={inputRef}
                />
              }
            ></Route>
            <Route
              path='saved-movies'
              element={
                <SavedMovies
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setCheckboxStatus={setCheckboxStatus}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSubmitSearchButton={handleSubmitSearchButton}
                  handleRemoveMovie={handleRemoveMovie}
                  allSavedMovies={filteredSavedMovies}
                  renderSavedMovie={filteredSavedMovies}
                  setRenderSavedMovies={setRenderSavedMovies}
                  inputRef={inputRef}
                  textError={textError}
                />
              }
            ></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path='/profile'
            element={<ProfileLayout loggedIn={loggedIn} />}
          >
            <Route
              index
              element={
                <Profile
                  handleUserUpdate={handleUserUpdate}
                  handleLogout={handleLogout}
                  apiTextError={apiTextError}
                  setApiTextError={setApiTextError}
                />
              }
            />
          </Route>
        </Route>

        <Route
          path='/signup'
          element={
            <Register handleSignup={handleSignup} apiTextError={apiTextError} />
          }
        />

        <Route
          path='/signin'
          element={
            <Login handleSignin={handleSignin} apiTextError={apiTextError} />
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
