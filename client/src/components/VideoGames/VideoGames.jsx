import { useEffect } from 'react';
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
  const pageState = useSelector((state) => state.page);
  const responseServer = useSelector((state) => state.responseServer);
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

  //Aplica ordenamiento cuando se modifica el estado fijo(allVideogames) que contiene todos los videogames 
  useEffect(()=>{
    handlerChangeOrder();
  }, [gamesInitState]);
  //---------------------------------------------------------------------------------------

  //APlica el ordenamiento que este en los selects segun el filtrado que se aplique
  useEffect(()=>{
    if (fl == 'filter') {handlerChangeOrder()}
  }, [gamesState]);
  //---------------------------------------------------------------------------------------
  
  //Control para los botones siguiente y anterior del paginado
  function handlerClick(numPage){
    if (numPage === 0) numPage = Math.ceil(pageState.init / 15)+2; //Envia el valor de la pagina del boton siguiente al actual
    if (numPage === -1) numPage = Math.ceil(pageState.init / 15); //Envia el valor de la pagina del boton anterior al actual
    if (numPage > 0 && numPage <= Math.ceil(gamesState.length/15)){ //Valida que no envie valor menor a la pagina 1 ni superior al valor maximo de las paginas
      dispatch(paginate(numPage))
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
          <option value="name">Nombre</option>
          <option value="rating">Rating</option>
        </select>
        <select onChange={()=>{handlerChangeOrder()}} id="ascDesc">
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
      <div className={style.container}>
        {gamesInitState[0] ? gamesState.map((game, key)=>{
          if(key >= pageState.init && key <= pageState.end){
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
        }): responseServer.data ? 
              <div className='responseError'>
                <img src="./images/error.png" alt="" />
                <h1>{responseServer.data}</h1>
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
        <div className={style.btnPageNum}>
          {gamesInitState[0] ? gamesState.map((game, key)=>{
            if ((key+1) % 15 === 0 || key === gamesState.length-1){
              let numPage = Math.ceil((key+1)/15);
              return (<button onClick={()=>handlerClick(numPage)} key={numPage} >{numPage}</button>)
            }
          }): <>Loading..</>}
        </div>
      <button className={style.btnPage} onClick={()=>handlerClick(0)}>{'>'}</button>
    </footer>
    </>
  );
}

export default VideoGames;