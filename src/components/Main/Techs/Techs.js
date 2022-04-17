import React from "react";
import './Techs.css';
import SectionTitle from "../SectionTitle/SectionTitle";

export default function Techs() {
  return (
    <section className="techs" id='techs-section'>
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="tech__paragraph">
      На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>

      <ul className="tech__items">
        <li className="tech__item">HTML</li>
        <li className="tech__item">CSS</li>
        <li className="tech__item">JS</li>
        <li className="tech__item">React</li>
        <li className="tech__item">Git</li>
        <li className="tech__item">Express.js</li>
        <li className="tech__item">mongoDB</li>
      </ul> 
    </section>
  )
}