import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import VideoGame from '../VideoGame/VideoGame.jsx';
import Filters from '../Filters/Filters.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import style from './videoGames.module.css';
import { getVideoGames, paginate, setViewGames, flag } from '../../redux/actions/actions.js';


function VideoGames(){
  const gamesInitState = useSelector((state) => state.allVideogames);
  const gamesState = useSelector((state) => state.viewVideoGames);
  const responseServer = useSelector((state) => state.responseServer);

  const [pageState, setpageState] = useState({page: 1, numElements: 10});

  //Bandera para ordenar despues de que se filtra
  const fl = useSelector((state) => state.flag);
  const flagSearch = useSelector((state) => state.flagSearch);

  const dispatch = useDispatch();

  //Cuando se monta el componente se verifica si anteriormente se hizo una busqueda, de ser así
  //sobreescribe el array de los videojuegos por todos los juegos en vez de los que vienen de la busqueda
  useEffect(()=>{
    if(flagSearch){
      dispatch(getVideoGames());
    }
    dispatch({type: 'flagSearch', payload: false});
  }, [dispatch]);

  //Limpia la vista cuando se desmonta el componente
  useEffect(()=>{
    return (()=>{dispatch(setViewGames([]))})
  }, []);

  //APlica el ordenamiento que este en los selects segun el filtrado que se aplique
  useEffect(()=>{
    if (fl == 'filter') {handlerChangeOrder()}
    handlerClick(1);
  }, [gamesState]);
  //---------------------------------------------------------------------------------------
  
  //Control para indicar en cual pagina se quiere parar
  function handlerClick(numPage){
    if (numPage === 0) numPage = pageState.page + 1; //Envia el valor de la pagina del boton siguiente al actual
    if (numPage === -1) numPage = pageState.page - 1; //Envia el valor de la pagina del boton anterior al actual
    if (numPage > 0 && numPage <= Math.ceil(gamesState.length/pageState.numElements)){ //Valida que no envie valor menor a la pagina 1 ni superior al valor maximo de las paginas
      let groupBtns = document.getElementsByClassName('btnsPaginate');
      for (let i = 1; i <= groupBtns.length; i++) {
        if (numPage == i) document.getElementById('btnPage'+i).style.color = 'red';
        else document.getElementById('btnPage'+i).style.color = 'white';
      }
      setpageState({...pageState, page: numPage});
    }
  }// -----------------------------------------------------------------------


  //Ordenamiento por nombre o rating ascendente y decendentemente  
  function handlerChangeOrder(){
    let orderBy = document.getElementById('selOrderBy').value;
    let ascDesc = document.getElementById('ascDesc').value;

    if (orderBy){
      dispatch(flag('order'));
      let order = gamesState.map((r)=>r);
      if (ascDesc === 'ASC') {
        order = order.sort((a, b)=>{
          if(a[orderBy] > b[orderBy]) return 1;
          if(a[orderBy] < b[orderBy]) return -1;
          return 0;
        })
      }else{
        order = order.sort((a, b)=>{
          if (a[orderBy] > b[orderBy]) return -1
          if (a[orderBy] < b[orderBy]) return 1
          else return 0;
        });
      }
      dispatch(setViewGames(order));
    }
  }//------------------------------------------------------------------------
  
  
  return (
    <>
    <header>
        <Route exact path='/videogames' component={SearchBar}/>
        <Route exact path='/videogames' component={Filters}/>
    </header>
    <section className={style.section}>
      <div className={style.order}> 
        <label htmlFor="">Order by: </label>
        <select onChange={()=>{handlerChangeOrder()}} id="selOrderBy">
          <option id='opcOne' value="">Select</option>
          <option value="name">Nombre</option>
          <option value="rating">Rating</option>
        </select>
        <select onChange={()=>{handlerChangeOrder()}} id="ascDesc">
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
      <div className={style.container}>
        {gamesState[0] ? gamesState.map((game, key)=>{
          if(key >= (pageState.page-1)*pageState.numElements && key <= (pageState.page*pageState.numElements)-1){
            return(
              <VideoGame 
                key={game.id}
                name={game.name} 
                description={game.description} 
                released={game.released}
                rating={game.rating}
                background_image={game.background_image}
                genres={game.genres}
                id={game.id}
              />
            )
          }
        }): gamesInitState[0] || responseServer.data ? 
          <div className='responseError'>
            <img src="./images/error.png" alt="" />
            <h1>{responseServer.data ? responseServer.data: 'Sin resultados'}</h1>
          </div> :
          <div className='loading'>
            <img src="./images/loading.gif" alt="" />
            <h1>Loading...</h1>
          </div>}
      </div>
    </section>

    {/* Creación de los botones por pagina segun la cantidad de juegos que exista */}
    <footer>
      <button className={style.btnPage} onClick={()=>handlerClick(-1)}>{'<'}</button>
        <div id='btnPageNum' className={style.btnPageNum}>
          {gamesInitState[0] ? gamesState.map((game, key)=>{
            if ((key+1) % pageState.numElements === 0 || key === gamesState.length-1){
              let numPage = Math.ceil((key+1)/pageState.numElements);
              return (
                <button id={'btnPage'+numPage} className='btnsPaginate' onClick={(e)=>handlerClick(numPage)} key={numPage} >{numPage}</button>
              )
            }
          }): <>Loading..</>}
        </div>
      <button className={style.btnPage} onClick={()=>handlerClick(0)}>{'>'}</button>
    </footer>
    </>
  );
}

export default VideoGames;