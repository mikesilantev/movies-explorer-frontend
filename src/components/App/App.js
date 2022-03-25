import React from "react";
import './App.css'

import Header from "../Header/Header";
import Promo from "../Main/Promo/Promo";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutUs from "../Main/AboutMe/AboutMe"

export default function App(){
  return (
    <>
      <Header></Header>
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutUs></AboutUs>
    </>
  )
}