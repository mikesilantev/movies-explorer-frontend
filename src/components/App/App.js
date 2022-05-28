
import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import mainApi from "../../utils/MainApi";
import movieApi from "../../utils/MovieApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { PageNotFound } from "../PageNotFound/PageNotFound";

import './App.css';
export default function App() {

  const [currentUser, setCurrentUser] = useState({});


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={
          <AppLayout/>}>
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='movies' element={<Movies/>}></Route>
            <Route path='saved-movies' element={<SavedMovies/>}></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route path='/profile' element={<ProfileLayout/>}>
            <Route index element={<Profile/>} />
          </Route>
        </Route>
        <Route path='/signup' element={<Register/>} />
        <Route path='/signin' element={<Login/>}/>
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </CurrentUserContext.Provider>
  )
}
