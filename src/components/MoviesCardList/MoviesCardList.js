import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MovieCard } from '../MoviesCard/MoviesCard';
import useChangeWindowWidth from '../../hooks/useChangeWindowWidth';
import './MoviesCardList.css';
import mainApi from '../../utils/MainApi';

export function MoviesCardList({
}) {


  return (
    <section className='movies-list'>
      <div className='movie-list__card-wrap'>
        <p className='movies-list__nulled-query'>Ничего не найдено</p>

      </div>

      <button
        className='movies-list__btn'>
        Еще
      </button>

    </section>

  )
}
