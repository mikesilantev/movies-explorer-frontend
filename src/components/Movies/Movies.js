import { Suspense, useState, useEffect }from "react";
import movieApi from "../../utils/MovieApi";

import { SearchForm } from "../SearchForm/SearchForm";
import './Movies.css';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function Movies(){

  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);


  function handleQueryChange(evt){
    setSearchQuery(evt.target.value)
    
  }
 
  // // Загрузка фильмов
  // function testClick(){
  //   movieApi.getMovies()
  //     .then(res => {
  //       console.log(res)
  //       //ФИЛЬМЫ В ЛОКАЛ СТОРЕЙДЖ
  //       // Мы должны отправить запрос с фильтром поиска
  //       localStorage.setItem('initialMovies', JSON.stringify(res))
  //     })
  //     .then(

  //     )
  //   }



  return (
    <section className="movies">
      {searchQuery}
      <SearchForm 
        checkboxStatus={checkboxStatus} 
        searchQuery={searchQuery}
        handleQueryChange={handleQueryChange}
        >
        
      </SearchForm>
      <Suspense fallback={<Preloader></Preloader>}>
         <MoviesCardList></MoviesCardList>
      </Suspense>
    </section>
  )
}