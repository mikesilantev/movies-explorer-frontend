import React from "react";
import "./AboutUs.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import profilePhoto from "../../../images/profile-photo.png";

export default function AboutUs() {
  return (
    <section className="about-us">
      <h2 className="about-us__title">Студент</h2>
      <article className="about-us__paragraph-wrap">
      <img src={profilePhoto} alt="" className="about-us__photo-profile" />
        <article className="about-us__paragraph-content">
          <h3 className="about-us__paragraph-title">Виталий</h3>
          <p className="about-us__paragraph-job">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-us__paragraph-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-us__paragraph-items">
            {/* Вставить ссылки */}
            <li className="about-us__paragraph-item">Fakebook</li>
            <li className="about-us__paragraph-item">Github</li>
          </ul>
        </article>


      </article>
    </section>
  );
}
