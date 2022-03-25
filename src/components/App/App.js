import React from "react";
import './App.css'

import Header from "../Header/Header";
import Promo from "../Main/Promo/Promo";
import AboutProject from "../Main/AboutProject/AboutProject";

export default function App(){
  return (
    <>
      <Header></Header>
      <Promo></Promo>
      <AboutProject></AboutProject>
    </>
  )
}