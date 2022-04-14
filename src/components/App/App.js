import React, { useState } from "react";
import {Router, Routes, Route } from "react-router-dom";

import './App.css'
import { AppLayout } from "../AppLayout/AppLayout";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { PageNotFound } from "../PageNotFound/PageNotFound";
export default function App() {

  return (       
    <Routes>
       <Route path="/*" element={<AppLayout/>} />
       <Route path="/signup" element={<Register/>} />
       <Route path="/signin" element={<Login/>} />
       <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}