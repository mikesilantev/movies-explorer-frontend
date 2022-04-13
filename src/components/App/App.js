import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Switch} from "react-router-dom";

import './App.css'

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { PageNotFound } from "../PageNotFound/PageNotFound";

export default function App() {

  return (
    <>
    {/* <Header />     */}
    <Routes>
     <Route path="*" element={<PageNotFound/>} />
     <Route path="/" element={<Main/>} />
     <Route path="/signin" element={<Login/>} />
     <Route path="/signup" element={<Register/>} />
     <Route path="/movies" element={<Movies/>} />
     <Route path="/saved-movies" element={<SavedMovies/>} />


    </Routes>
    {/* <Footer /> */}
    {/* <Switch>
     <Route path="/" element={<Header/>} />
    </Switch> */}
      {/* <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/" element={<Main/>} />
        <Route path="/movies" element={<Main/>} />
        <Route path="/saved-movies" element={<Main/>} />
        <Route path="/profile" element={<Main/>} />
        <Route path="/profile" element={<Main/>} />
        <Route path="/signin" element={<Main/>} />
        <Route path="/signup" element={<Register/>} />
        {/* <Footer /> */}
      {/* </Routes> */}

    </>
  )
}