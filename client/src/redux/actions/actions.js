import { GET_VIDEOGAMES, PAGINATE, ORDER_BY } from './actionsTypes.js'
import axios from 'axios';

export function getVideoGames(){
  return function (dispatch){
    return axios.get(`http://localhost:3001/videogames`)
    .then((allGames)=>{
      dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
    })
  }
}

export function paginate(page){
  return{
    type: PAGINATE,
    payload: {init: (page-1)*15, end: (page*15)-1} //Convierte el numero de pagina en valor inicial y final en el arreglo
  }
}

export function setOrderBy(order){
  return{
    type: ORDER_BY,
    payload: order
  }
}

