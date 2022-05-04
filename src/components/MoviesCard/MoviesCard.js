import react, { useState } from 'react';


import './MovieCard.css';

export function MovieCard({
  cover,
  title,
  durationMovie,
  trailerLink,
  movie,
  saveMovieToDb,
}) {
  const {
    country, director, year, description, image, thumbnail,
    nameRU, nameEN, duration, trailer, movieId,
  } = movie;
  // {country, director, duration, year, description, image, trailerLink}

  // country: "Великобритания"
  // created_at: "2020-12-03T10:55:15.247Z"
  // description: "Документальный нуар о Британии накануне появления панк-рока, «Город нефти» — это первый фильм в так называемой панк-трилогии Темпла, который является приквелом к его лентам о The Sex Pistols и Джо Страммере. В центре фильма — история британской паб-рок-банды Dr. Feelgood из Эссекса, одной из самых недооцененных групп своего времени, которая своей бескомпромиссностью вдохнула новые силы в независимую сцену, из шинели которой вышел панк-рок. В результате Вилко Джонсон со товарищи заслужили титул величайшей местной группы в мире, в то время как Темпл идеально передал дух времени и конвертировал его в фильм, который смотрится как «Бегущий по лезвию». Как справедливо писал о «Городе нефти» лондонский TimeOut, «безумно захватывающий фильм, даже если вы не любите музыку»."
  // director: "Джульен Темпл"
  // duration: 104
  // id: 40
  // image: {id: 39, name: 'Oil_City_Confidential-676986530-large', alternativeText: '', caption: '', width: 635, …}
  // nameEN: "Oil City Confidential"
  // nameRU: "Город Нефти"
  // trailerLink: "https://www.youtube.com/watch?v=7CZMLs8Ke40"
  // updated_at: "2020-12-03T10:55:15.247Z"
  // year: "2009"

const [saveButtonStatus, setSaveButtonStatus] = useState(false);

  //
  function saveMovieClick(evt) {
    saveMovieToDb({
      country: movie.country || 'пусто',
      director: movie.director || 'пусто',
      duration: movie.duration || 0,
      year: movie.year || 'пусто',
      description: movie.description || 'пусто',
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN, 
    });
    console.log('КНОПКА ИЗ MOVIES.JS')
    console.log(movie);
  
  }




    // console.log('Кнопка сохранить')
    // console.log(movie)
    // console.log(movie.country)
    // console.log(movie.description)

    // saveMovieToDb({
    //   // movie
    //   country: movie.country || 'пусто',
    //   director: movie.director || 'пусто',
    //   duration: movie.duration || 0,
    //   year: movie.year || 'пусто',
    //   description: movie.description || 'пусто',
    //   image: movie.image.url,
    //   trailerLink: movie.trailerLink,
    //   thumbnail: movie.image.formats.thumbnail.url,
    //   movieId: movie.id,
    //   nameRU: movie.nameRU,
    //   nameEN: movie.nameEN,
    // })

    // console.log(saveButtonStatus)
    // setSaveButtonStatus(!saveButtonStatus)
    // saveMovieToDb({
    //   country: country || 'Не указано',
    //   director: director || 'Не указано',
    //   duration: duration || 0,
    //   year: year || 'Не указано',
    //   description: description || 'Не указано',
    //   image: image || 'https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png',
    //   trailer: (trailer && trailer.startsWith('http')) ? trailer : 'https://youtube.com',
    //   thumbnail: thumbnail || 'https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png',
    //   nameRU: nameRU || 'Не указано',
    //   nameEN: nameEN || 'Не указано',
    //   movieId,
    // });
    
// console.log(movie)


  //

  return (
    <article className='movie-card'>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={cover} alt={title} className='movie-card__cover' />
      </a>

      {!saveButtonStatus ? (
      <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
      ) : (
      <button className='movie-card__save-btn movie-card__saved'></button>
        )}

      


      <div className='movie-card__description'>
        <p className='movie-card__title'>{title}</p>
        <span className='movie-card__duration'>{durationMovie}</span>
      </div>

    </article>
  )
}


// {

//   !savedMovie ?
//     (
//       <>
//        <button className='movie-card__save-btn' onClick={saveMovieClick}>Сохранить</button>
//       <button
//         className='movie-card__save-btn movie-card__remove-btn'
//         onClick={saveMovieClick}></button>
//       </>

//     ) :
//     (
//       <button className='movie-card__save-btn movie-card__saved' onClick={delSavedMovieClick}></button>
//     )
// }
