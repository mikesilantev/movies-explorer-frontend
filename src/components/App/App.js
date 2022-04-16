import { AppLayout } from "../AppLayout/AppLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";

import React, { useState } from "react";
import {Routes, Route, } from "react-router-dom";

import './App.css'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";

import { PageNotFound } from "../PageNotFound/PageNotFound";
export default function App() {

const [auth, setAuth] = useState(false);

  return (       
    <Routes>

      <Route path='/' element={<AppLayout auth={auth}/>}>
        <Route index element={<Main />} />
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/saved-movies' element={<SavedMovies/>}></Route>
      </Route>

      <Route path='/profile' element={<ProfileLayout />}>
        <Route index element={<Profile/>} />
      </Route>
      
      <Route path="/signup" element={<Register/>} />
      <Route path="/signin" element={<Login/>} />
      <Route path="*" element={<PageNotFound/>} />

    </Routes>
  )
}
