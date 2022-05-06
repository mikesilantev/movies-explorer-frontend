import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export function AppLayout({loggedIn}){

  return (
    <>
    <Header 
      loggedIn={loggedIn}
      />
    <Outlet />
    <Footer />
    </>
  )
}