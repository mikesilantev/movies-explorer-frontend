import React from "react";
import { Link } from "react-router-dom";

import "./NavTab.css";

export default function NavTab() {
  return (
    <section className="nav-tab">
      <nav className="nav-tab__items">
        <Link to="/" className="nav-tab__item">О проекте</Link>
        <Link to="/" className="nav-tab__item">Технологии</Link>
        <Link to="/" className="nav-tab__item">Студент</Link>
      </nav>
    </section>
  );
}
