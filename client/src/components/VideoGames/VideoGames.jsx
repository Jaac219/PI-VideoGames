import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import VideoGame from '../VideoGame/VideoGame.jsx';
import { getVideoGames, paginate, setViewGames, resetGames, flag } from '../../redux/actions/actions.js';

function VideoGames(){
  const gamesInitState = useSelector((state) => state.allVideogames);
  const gamesState = useSelector((state) => state.viewVideoGames);
  const pageState = useSelector((state) => state.page);
  const responseServer = useSelector((state) => state.responseServer);

  const fl = useSelector((state) => state.flag);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getVideoGames());
  }, [dispatch]);

  //Se vasean los 2 estados de videogames cuando se desmonta el componente 
  useEffect(()=>{
    return () => {
      dispatch(resetGames([]));
    }
  }, [])
  //---------------------------------------------------------------------------------------

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
    <div className="container">
      <div> 
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
      {gamesInitState[0] ? gamesState.map((game, key)=>{
        if(key >= pageState.init && key <= pageState.end){
          return(
            <div key={game.id}>
              <VideoGame 
                name={game.name} 
                rating={game.rating}
                id={game.id}
              />
            </div>
          )
        }
      }): responseServer.data ? [<h1 key={0}>{responseServer.data}</h1>]: <h1>Loading...</h1>}
    </div>
    {/* Creación de los botones por pagina segun la cantidad de juegos que exista */}
    <div><button onClick={()=>handlerClick(-1)}>{'<'}</button>
    {gamesInitState[0] ? gamesState.map((game, key)=>{
      if ((key+1) % 15 === 0 || key === gamesState.length-1){
        let numPage = Math.ceil((key+1)/15);
        return (<button onClick={()=>handlerClick(numPage)} key={numPage} >{numPage}</button>)
      }
    }): <>Loading..</>}
    <button onClick={()=>handlerClick(0)}>{'>'}</button></div>
    {/* fin creación de botones */}
    </>
  );
}

export default VideoGames;