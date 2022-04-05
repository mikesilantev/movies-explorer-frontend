import React from "react";
import Promo from "../Main/Promo/Promo";
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutUs from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";


export default function Main(){
  return (
    <>
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutUs></AboutUs>
      <Portfolio></Portfolio>
    </>

  )
}