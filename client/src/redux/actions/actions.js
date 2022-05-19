import { 
  GET_VIDEOGAMES, PAGINATE, VIEW_GAMES, 
  GET_GENRES, SEARCH_NAME, FLAG, GET_GAME_DETAIL
} from './actionsTypes.js';

import axios from 'axios';

export const getVideoGames = () => {
  return async function (dispatch){
    return axios.get(`http://localhost:3001/videogames`)
    .then((allGames)=>{
      dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
    })
  }
}

export const resetGames = (arr)=>{
  return {type: GET_VIDEOGAMES, payload: arr}
}

export const getGenres = () => {
  return async function (dispatch){
    return axios.get(`http://localhost:3001/genres`)
    .then((genres)=>{
      dispatch({type: GET_GENRES, payload: genres.data })
    })
  }
}

export const paginate = (page) => {
  return{
    type: PAGINATE,
    payload: {init: (page-1)*15, end: (page*15)-1} //Convierte el numero de pagina en valor inicial y final en el arreglo
  }
}

export const setViewGames = (viewGames) => {
  return{
    type: VIEW_GAMES,
    payload: viewGames
  }
}

export const searchForName = (name) => {
  return async function (dispatch){
    return axios.get(`http://localhost:3001/videogames?name=${name}`)
    .then((allGames)=>{
      dispatch({type: SEARCH_NAME, payload: allGames.data })
    })
  }
}

export const flag =(fl) => {return {type: FLAG, payload: fl}}
export const resetGame =() => {return {type: GET_GAME_DETAIL, payload: []}}

export const getGameDetail = (id) =>{
    return async function (dispatch){
      return axios.get(`http://localhost:3001/videogame/${id}`)
      .then((detail)=>{
        dispatch({type: GET_GAME_DETAIL, payload: detail.data })
      }).catch((error)=>{
        console.log(error);
      })
    }
}

export const setNewGame = (data) =>{
  return async function (dispatch){
    return axios.post(``, data)
      .then((rs)=>{
        console.log(rs);
      })
  }
}