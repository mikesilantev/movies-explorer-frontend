import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

export default function Footer(){
  return (
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <div className="footer__nav-wrap">
         <span className="footer__copyright">&copy; 2020</span>
         <ul className="footer__nav">
           <li className="footer__nav-item"><Link to="/" className="footer__nav-link">Яндекс.Практикум </Link></li>
           <li className="footer__nav-item"><Link to="/" className="footer__nav-link">Github</Link></li>
           <li className="footer__nav-item"><Link to="/" className="footer__nav-link">Facebook</Link></li>
         </ul>
       </div>
    </footer>
  )
}
