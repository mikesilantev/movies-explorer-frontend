import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css'

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

export default function App(){

  return (
    <>
      <Header />
      {/* <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/movies" element={<Main/>} />
        <Route path="/saved-movies" element={<Main/>} />
        <Route path="/profile" element={<Main/>} />
        <Route path="/profile" element={<Main/>} />
        <Route path="/signin" element={<Main/>} />
        <Route path="/signup" element={<Main/>} />
      </Routes> */}

      {/* <Footer /> */}
    </>
  )
}