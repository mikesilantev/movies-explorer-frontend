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

  // STATE
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  // useEffect(() => {
  //   checkToken();
  // },[]);

  //     async function checkTokenAndCurrentUser() {
  //       if (token) {
  //         const getUser = await mainApi.getUser(token)
  //         setCurrentUser(getUser)
  //         setLoggedIn(true)
  //         console.log(token)
  //       }
  //     }
  //     checkTokenAndCurrentUser();
  // }, []);


  function checkToken() {
    let token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      mainApi.getUser(token)
        .then((res) => {
          setCurrentUser(res);
          console.log(res)
        })
        .then(() => {
          setLoggedIn(true)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    checkToken();
    console.log('effect')
  }, [])
 


  // Регистрация
  const registerUser = () => {

  }

  // Авторизация
  const loginUser = () => {
    
  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={
        <AppLayout 
        />}>
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='movies' element={
              <Movies
              />
            }></Route>
            <Route path='saved-movies' element={<SavedMovies/>}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element=
          {<ProfileLayout 

          />}>
            <Route index element=
              {<Profile
              />} />
          </Route>
        </Route>


        <Route path='/signup'
          element=
          {<Register
          />} />

        <Route path='/signin'
          element=
          {<Login
          />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}