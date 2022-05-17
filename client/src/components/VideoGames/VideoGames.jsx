import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import VideoGame from '../VideoGame/VideoGame.jsx';
import { getVideoGames, paginate, setOrderBy } from '../../redux/actions/actions.js';

function VideoGames(){
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(getVideoGames())}, []);
  

  //Control para los botones siguiente y anterior del paginado
  function handlerClick(numPage){
    if (numPage === 0) numPage = Math.ceil(state.page.init / 15)+2; //Envia el valor de la pagina del boton siguiente al actual
    if (numPage === -1) numPage = Math.ceil(state.page.init / 15); //Envia el valor de la pagina del boton anterior al actual
    if (numPage > 0 && numPage <= Math.ceil(state.viewVideoGames.length/15)){ //Valida que no envie valor menor a la pagina 1 ni superior al valor maximo de las paginas
      dispatch(paginate(numPage))
    }
  }// -----------------------------------------------------------------------


  //Ordenamiento por nombre o rating ascendente y decendentemente  
  function handlerChangeOrder(){
    let orderBy = document.getElementById('selOrderBy').value;
    let ascDesc = document.getElementById('ascDesc').value;
    if (state) {
      if (orderBy){
        let order = state.viewVideoGames.map((r)=>r);
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
        dispatch(setOrderBy(order));
      }else{
        dispatch(setOrderBy(state.allVideogames));
      }
    }else{
      document.getElementById('selOrderBy').value = '';
    }
  }//------------------------------------------------------------------------


  return (
    <>
    <div className="container">
      <div> 
        <label htmlFor="">Order by: </label>
        <select onChange={()=>{handlerChangeOrder()}} id="selOrderBy">
          <option value=""></option>
          <option value="name">Nombre</option>
          <option value="rating">Rating</option>
        </select>
        <select onChange={()=>{handlerChangeOrder()}} id="ascDesc">
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
      {state ? state.viewVideoGames.map((game, key)=>{
        if(key >= state.page.init && key <= state.page.end){
          return(
            <div key={game.id}>
              <VideoGame name={game.name} rating={game.rating} />
            </div>
          )
        }
      }): <h1>Cargando...</h1>}
    </div>

    {/* Creación de los botones por pagina segun la cantidad de juegos que exista */}
    <div><button onClick={()=>handlerClick(-1)}>{'<'}</button>
    {state ? state.viewVideoGames.map((game, key)=>{
      if ((key+1) % 15 === 0 || key === state.viewVideoGames.length-1){
        let numPage = Math.ceil(key/15);
        return (<input type={'button'} value={numPage} onClick={()=>handlerClick(numPage)} key={numPage} />)
      }
    }): <button>Loading...</button>}
    <button onClick={()=>handlerClick(0)}>{'>'}</button></div>
    {/* fin creación de botones */}
    </>
  );
}

export default VideoGames;