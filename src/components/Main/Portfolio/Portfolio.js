import React from "react";

import PortfolioWorks from './PortfolioWorks/PortfolioWorks';

import './Portfolio.css'

export default function Portfolio(){
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio-items">
        <PortfolioWorks text="Статичный сайт" link=""/>
        <PortfolioWorks text="Адаптивный сайт" link=""/>
        <PortfolioWorks text="Одностраничное приложение" link=""/>
      </ul>
    </section>
  )
}