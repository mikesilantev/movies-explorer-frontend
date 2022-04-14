import react from "react";
import './Profile.css';

export default function Profile(){
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      
      Имя Виталий
      Email pochta@yandex.ru


      <div className="profile__nav">
        <ul className="profile__items">
          <li className="profile__item">
            <a href="" className="profile__link">Редактировать</a>
          </li>
          <li className="profile__item">
            <a href="" className="profile__link">Выйти из аккаунта</a>
          </li>
        </ul>
      </div>

    </section>
  )
}      
{/* <form action="">
<label htmlFor="" className="profile__label">
  <input className="profile__input" type="text" placeholder="Имя"/>
  <input className="profile__input" type="text" placeholder="Виталий "/>
</label>

</form> */}