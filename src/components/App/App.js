import React, { useState } from "react";
import {Routes, Route, } from "react-router-dom";

import './App.css'
import { AppLayout } from "../AppLayout/AppLayout";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { PageNotFound } from "../PageNotFound/PageNotFound";
export default function App() {
const [auth, setAuth] = useState(false);
  return (       
    <Routes>
       <Route exact path='/*' element={<AppLayout auth={auth}/>} />
       <Route path="/signup" element={<Register/>} />
       <Route path="/signin" element={<Login/>} />
       {/* <Route path="/profile" element={<Profile/>} /> */}
       <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}