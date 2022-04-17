import React from "react";
import './Footer.css'

export default function Footer(){
  return (
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <div className="footer__nav-wrap">
         <span className="footer__copyright">&copy; 2022</span>
         <ul className="footer__nav">
           <li className="footer__nav-item"><a href="https://practicum.yandex.ru" className="footer__nav-link">Яндекс.Практикум </a></li>
           <li className="footer__nav-item"><a href="https://github.com/" className="footer__nav-link">Github</a></li>
           <li className="footer__nav-item"><a href="https://facebook.com/" className="footer__nav-link">Facebook</a></li>
         </ul>
       </div>
    </footer>
  )
}
