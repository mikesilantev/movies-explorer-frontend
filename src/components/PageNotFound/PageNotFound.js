import react from 'react'
import { useNavigate } from 'react-router-dom'
import './PageNotFound.css'

export function PageNotFound({ redirect }) {
  const navigate = useNavigate()

  return (
    <section className="page-not-found">
      <div className="page-not-found__wrap">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__paragraph">Страница не найдена</p>
      </div>
      <button className="page-not-found__link" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  )
}
