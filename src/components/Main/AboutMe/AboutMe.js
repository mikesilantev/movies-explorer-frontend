import React from "react";
import "./AboutMe.css";

import profilePhoto from "../../../images/profile-photo.png";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me-section">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__paragraph-wrap">
        <img src={profilePhoto} alt="" className="about-me__photo-profile" />
        <article className="about-me__paragraph-content">
          <h3 className="about-me__paragraph-title">Виталий</h3>
          <p className="about-me__paragraph-job">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__paragraph-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__paragraph-items">
            {/* Вставить ссылки */}
            <li className="about-me__paragraph-item"><a href='https://facebook.com' className="aboute-me__link">Fakebook</a></li>
            <li className="about-me__paragraph-item"><a href='https://github.com' className="aboute-me__link">Github</a></li>
          </ul>
        </article>
      </article>
    </section>
  );
}
