// Layout
import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import Test from "../Test/Test";
//
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

  // Все фильмы сохраненные данным пользователем
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  // Массив ID Сохраненных фильмов 
  const [savedMoviesID, setSavedMoviesID] = useState([]);

  //Сохранен фильм или нет
  const [isSaved, setIsSaved] = useState();

  // Стейт с фильмами для отрисовки на /saved-movies
  const [renderSavedMovie, setRenderSavedMovies] = useState([]);

  // Стейты поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [apiTextError, setApiTextError] = useState('');

  // Стейт для прелоадера Preloader
  const [isLoading, setIsLoading] = useState(false);

  // Страницы с фильмами
  const moviesPage = pathname === '/movies',
    savedPage = pathname === '/saved-movies';



  // CHECKLIST
  //   Пользователю отображается уведомление об успешном запросе к серверу при сохранении профиля.
  //   Прелоадер крутится во время выполнения запроса фильмов.
  //   Если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата.
  //   На странице «Сохранённые фильмы»:
  // отображается форма поиска. Она позволяет искать фильмы по уже полученным данным о сохранённых фильмах.
  // После успешного вызова обработчика onSignOut происходит редирект на /. / 2
  // Не выполняются лишние запросы к бэкенду, например: запрос всех фильмов с сервиса beatfilm-movies производится только при первом поиске; все сохранённые фильмы не запрашиваются с сервера при каждом лайке или дизлайке; данные пользователя запрашиваются один раз при запуске приложения. / 2
  // Для элементов списка используется уникальный ключ key, а не индекс массива. / 2

  // При загрузке приложения мы скачиваем сохраненные пользователем фильмы
  // Перебираем и Записываем в стейт allSavedMovies сохраненные фильмы данного пользователя
  // Передаем стейт allSavedMovies в /saved-movies для рендера
  // Перебираем allSavedMovies и сохраняем id фильмов в savedMoviesID для отрисовки лайков



  // Загрузка приложения
  // Проверка токена
  useEffect(() => {
    checkToken(); // loggedIn :true
    setApiTextError('');
  }, [])

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesApi()
    }
  }, [loggedIn])

  // не загружает статус чекбокса при перезагрузке страницы
  // только после перехода между 
  useEffect(() => {
    if (moviesPage) {
      setSearchQuery(localStorage.getItem('searchQuery'));
      console.log(localStorage.getItem('checkboxStatus'))
      setCheckboxStatus(localStorage.getItem(false))
    } else {
      setSearchQuery('')
    }
  }, [moviesPage, savedPage])

  // Сортировка и запись id сохраненных фильмов
  useEffect(() => {
    if (allSavedMovies) {
      let savedID = []
      allSavedMovies.map((savedMovieId) => {
        return savedID.push({ id: savedMovieId.movieId })
      })
      setSavedMoviesID(savedID)
    }

  }, [allSavedMovies])

  // Загружаем список всех сохраненных фильмов
  async function getSavedMoviesApi() {
    const token = localStorage.getItem('JWT_TOKEN');
    
    // !! - перевод на булево значение
    if (token) {
      setIsLoading(true)
      try {
      const responseMovies = await mainApi.getSavedMovie(token)
      if(!responseMovies?.length) {
        return
        console.log('no data in db')
      }

      const savedMoviesCurrentUser = responseMovies.filter(movie => movie.owner._id === currentUser._id)
    
      setAllSavedMovies(savedMoviesCurrentUser)
    } catch(e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }
  // function getSavedMoviesApi() {
  //   const token = localStorage.getItem('JWT_TOKEN');
  //   const savedLocal = localStorage.getItem('SavedMovies');

  //   if (token && savedLocal === 'true') {
  //     setIsLoading(true)
  //     mainApi.getSavedMovie(token)
  //       .then((responseMovies) => {
  //         let arrSavedMoviesCurrentUser = []
  //         responseMovies.map((movie) => {
  //           if (movie.owner._id === currentUser._id) {
  //             return arrSavedMoviesCurrentUser.push(movie)
  //           }
  //         })
  //         setAllSavedMovies(arrSavedMoviesCurrentUser)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //       .finally(
  //         setIsLoading(false),
  //       )
  //   }
  // }

  // нажатие на кнопку сохранить
  // пока просто сохраняем в базу данных
  function handleSaveMovies(data) {
    console.log('нажали на сохранение')
    mainApi.saveMovie(data)
      .then(movie => {
        setAllSavedMovies([...allSavedMovies, movie])
        localStorage.setItem('SavedMovies', true)
      })
      .catch(err => console.log(err))
  }

  // Удаляем фильма
  function handleRemoveMovie(id) {
    console.log('УДАЛИТЬ')
    const token = localStorage.getItem('JWT_TOKEN')
    mainApi.removeMovie(id, token)
      .then((res) => {
        console.log(res)
        let moviesArr = []
        moviesArr = allSavedMovies.filter((savedMovie) => {
          return savedMovie._id !== res._id
        })
        console.log(moviesArr)
        setAllSavedMovies(moviesArr)

      })
      .catch(err => console.log(err))
      .finally(console.log(allSavedMovies))
  }

  useEffect(() => {
    const moviesToLocalStorage = localStorage.getItem('initialMovies');

    if (loggedIn && !moviesToLocalStorage) {

      setIsLoading(true)
      try {
        getMovies();
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false)
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
      console.log(err)
    }
  }
  // async function getMovies(localMovies) {
  //   try {
  //     const getMovies = await movieApi.getMovies();
  //     localMovies = await localStorage.setItem('initialMovies', JSON.stringify(getMovies));
  //     const getLocalMovies = await JSON.parse(localStorage.getItem('initialMovies'));
  //     setInitialMovies(getLocalMovies);
  //   } catch(err){
  //     console.log(err)
  //   }
  // }

  // Сохраняем в стейт
  function saveMoveToState(localMovies) {
    const getLocalMovies = JSON.parse(localMovies);
    setInitialMovies(getLocalMovies);
  }

  useEffect(() => {
    if (moviesPage) {
      handleFilterMovies(searchQuery, initialMovies);
    } else if (savedPage) {
      handleFilterMovies(searchQuery, allSavedMovies)
    } else {
      console.log(pathname)
    }
  }, [searchQuery, checkboxStatus])

  // Фильтруем входящий массив с фильмами
  // query - Поисковый запрос, data - массив с фильмами - либо initialMovies || savedMovies
  // permovMovies - рузультат поиска

  //chain options
  // !query.length null ? indef
  // !query?.length false/true - приводит к булеву значению

  function handleFilterMovies(query, data) {
    if (!query?.length) return data

    const filteredData = data.filter(
      movie => movie.nameRU.toLowerCase().includes(query.toLowerCase())
    )
    .filter(movie => checkboxStatus ? movie.duration <= 40 : movie.duration >= 0)

    if (moviesPage) {
      setFilteredMovies(filteredData)
    } else {
      setFilteredMovies(filteredData)
    }

  }

  // function filterMovies(query, data) {
  //   const permovMovies = data.filter(
  //     movie => (
  //       query ?
  //         movie.nameRU.toLowerCase().includes(query.toLowerCase()) : true)
  //       &&
  //       (checkboxStatus ? (movie.duration <= 40) : (movie.duration >= 0))
  //   )
  //   if (moviesPage) {


  //     setFilteredMovies(permovMovies)
  //   } else {
  //     setFilteredMovies(permovMovies)
  //     // ???????????
  //     // ???????????
  //     // ???????????
  //     // ???????????
  //   }

  // }


  // Нажаатие на кнопку поиска
  // Отправляем отфильтрованные фильмы
  // и запрос в локал сторейдж
  // отправляем в renderMovies - filteredMovies
  function handleSubmitSearchButton() {
    addMoviesSearchToLocalStorage(filteredMovies)
    if (moviesPage) {
      setRenderMovies(filteredMovies)
    } else {
      setAllSavedMovies(filteredMovies)
    }
  }

  // old
  // function handleSubmitSearchButton() {
  //   if (moviesPage) {
  //     addMoviesSearchToLocalStorage(filteredMovies)
  //     setRenderMovies(filteredMovies)
  //   } else {
  //     console.log('CLICK')
  //     setAllSavedMovies(filteredMovies)
  //   }

  // }


  // функция добавления в локал сторейдж используется в handleSubmitSearchButton
  // при добавлении фильм в сохраненные на странице /movies
  function addMoviesSearchToLocalStorage(search) {
    if (moviesPage) {
      localStorage.setItem('filteredMovies', JSON.stringify(search))
      localStorage.setItem('checkboxStatus', checkboxStatus)
      localStorage.setItem('searchQuery', searchQuery);
    }
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
    setAllSavedMovies();
    setSavedMoviesID();
    setRenderSavedMovies();
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
                isLoading={isLoading}
                moviesPage={moviesPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmitSearchButton={handleSubmitSearchButton}
                checkboxStatus={checkboxStatus}
                setCheckboxStatus={setCheckboxStatus}

                renderMovies={renderMovies}
                setRenderMovies={setRenderMovies}

                handleSaveMovies={handleSaveMovies}

                allSavedMovies={allSavedMovies}

                savedMoviesID={savedMoviesID}



                currentUser={currentUser}
              // ТЕСТ
              // isSaved={isSaved}
              // setIsSaved={setIsSaved}

              />
            }></Route>

            {/* {SAVED-MOVIES} */}
            <Route path='saved-movies' element={

              <SavedMovies

                //new
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                // new

                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmitSearchButton={handleSubmitSearchButton}

                handleRemoveMovie={handleRemoveMovie}
                allSavedMovies={allSavedMovies}
                renderSavedMovie={renderSavedMovie}
                setRenderSavedMovies={setRenderSavedMovies}

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
