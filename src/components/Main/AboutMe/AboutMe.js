import React from "react";
import './AboutUs.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import profilePhoto from '../../../images/profile-photo.png';

export default function AboutUs() {
  return (
    <section className="about-us">
      <SectionTitle text="Студент" />
      <article className="about-us__paragraph-wrap">

        <article className="about-us__paragraph-content">
          <h3 className="about-us__paragraph-title">Евгений</h3>
          <p className="about-us__paragraph-job">
            Инженер-математик, 56 лет
          </p>
          <p className="about-us__paragraph-text">
            Я родился в Новороссийске, окончил 4-й (технический) факультет Высшей школы КГБ. У меня есть жена
            китаянка и пятеро детей. Я люблю горнолыжный спорт, увлекаюсь походами на байдарках и альпинизом. Пишу книги. Работаю в своей небольшой компании.
          </p>
          <ul className="about-us__paragraph-items">
            <li className="about-us__paragraph-item">
              Fakebook
            </li>
            <li className="about-us__paragraph-item">
              Github
            </li>
          </ul>

        </article>


        <img src={profilePhoto} alt="" className="about-us__photo-profile" />
      </article>

    </section>
  )
}