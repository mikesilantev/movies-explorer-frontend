import React from "react";

import './Main.css'

import Promo from "../Main/Promo/Promo";
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutMe from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";



export default function Main(){
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}
// import React from "react";

// import './Main.css'

// import Promo from "../Main/Promo/Promo";
// import NavTab from "../Main/NavTab/NavTab";
// import AboutProject from "../Main/AboutProject/AboutProject";
// import Techs from "../Main/Techs/Techs";
// import AboutUs from "../Main/AboutMe/AboutMe";
// import Portfolio from "../Main/Portfolio/Portfolio";


// export default function Main(){
//   return (

//     <main className="main">
//       <Promo></Promo>
//       <NavTab></NavTab>
//       <AboutProject></AboutProject>
//       <Techs></Techs>
//       <AboutUs></AboutUs>
//       <Portfolio></Portfolio>
//     </main>

//   )
// }