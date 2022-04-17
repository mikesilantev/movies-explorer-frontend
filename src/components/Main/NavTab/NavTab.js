import React from "react";
import "./NavTab.css";

export default function NavTab() {

  return (
    <section className="nav-tab">
      <nav className="nav-tab__items">
        <a href="#about-project-section" className="nav-tab__item">О проекте</a>
        <a href="#techs-section" className="nav-tab__item">Технологии</a>
        <a href="#about-me-section" className="nav-tab__item">Студент</a>
      </nav>
    </section>
  );
}
