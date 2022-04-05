import React from "react";
import { Link } from "react-router-dom";

import './PortfolioWorks.css'

export default function PortfolioWorks({text, link}){
  return (
    <li className="portfolio-works__item"><Link to={link} className="portfolio-works__link">{text}</Link></li>
  )
}