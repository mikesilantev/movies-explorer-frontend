import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '..//SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';

import Footer from "../Footer/Footer";

export function AppLayout(){
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/saved-movies' element={<SavedMovies/>}></Route>
        {/* <Route path='/profile' element={<Profile/>}></Route> */}
      </Routes>
    <Footer />
    </>

  )
}