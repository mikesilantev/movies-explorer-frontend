import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';

const ProfileLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default ProfileLayout;