import React from 'react';
import { Link } from 'react-router-dom';
import './logo.css';
import logo from "../../images/logo.svg";

export function Logo({place}) {
  return (
    <Link to="/" className={`logo logo${place}`}>
      <img src={logo} alt="Movies" />
    </Link>
  )
}

