import React from "react";
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project" id='about-project-section'>
      <h2 className="about-project_title">О проекте</h2>

      <div className="about-project__articles">

        <article className="about-project__article">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__paragraph">
            
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>

        <article className="about-project__article">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>


      </div>




      <div className="about-project__progress-bar">
        <p className="about-project__bar-item about-project__bar-item_green">1 неделя</p>
        <p className="about-project__bar-item about-project__bar-item_gray">4 недели</p>
        <p className="about-project__bar-item">Back-end</p>
        <p className="about-project__bar-item">Front-end</p>
      </div>

    </section>
  )
}