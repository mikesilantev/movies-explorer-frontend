import React from "react";
import { Link } from "react-router-dom";

import "./Promo.css";

export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__header">
        Учебный проект студента факультета Веб-разработки.
      </h1>

    {/* Переделать на <nav> */}
      <ul className="promo__menu-item">
        <li className="promo__menu-items">
          <Link to="/" className="promo__menu-link">О проекте</Link>
        </li>
        <li className="promo__menu-items">
          <Link to="/" className="promo__menu-link">Технологии</Link>
        </li>
        <li className="promo__menu-items">
          <Link to="/" className="promo__menu-link">Студент</Link>
        </li>
      </ul>

    </section>
  );
}
