import React from "react";

import './PortfolioWorks.css'

export default function PortfolioWorks({text, link}){
  return (
    <li className="portfolio-works__item"><a href={link} className="portfolio-works__link">{text}</a></li>
  )
}