import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../Header OLD/Header';

const ProfileLayout = ({loggedIn}) => {
  return (
    <>
    <Header loggedIn={loggedIn}/>
    <Outlet />
    </>
  )
}

export default ProfileLayout;