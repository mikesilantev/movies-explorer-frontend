import React, { useEffect} from 'react'



const Test = () => {

  

  useEffect(() => {
    const movies = [
      {
        id: '1',
        NameRU: 'Филдьмы',
      },
      {
        id: '2',
        NameRU: 'Брат 2',
      },
      {
        id: '3',
        NameRU: 'Шрек',
      },
    ];
    localStorage.setItem('DATA', JSON.stringify(movies))
    console.log(localStorage.DATA)
  })

  function testSearch(){
    const movies = localStorage.DATA;

    if(movies.filter(el => el.NameRU === 'Шрек')){
      console.log(movies)
    }
    
  }

  return (
    <>
      <div>Test</div>
      <button  type='button' onClick={testSearch}>ОТПРАВИТЬ В ХРАНИЛИЩЕ</button>

    </>

  )
}

export default Test