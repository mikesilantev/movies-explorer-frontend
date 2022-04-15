import React from "react";
import { Routes, Route, useLocation, matchPath} from "react-router-dom";

import Header from "../Header/Header";

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '..//SavedMovies/SavedMovies';
import { PageNotFound } from "../PageNotFound/PageNotFound";
// import Profile from '../Profile/Profile';

import Footer from "../Footer/Footer";

export function AppLayout(){
  const { pathname } = useLocation();
  return (
    <>
    {console.log(pathname)}
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