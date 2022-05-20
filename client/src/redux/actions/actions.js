import { 
  GET_VIDEOGAMES, PAGINATE, VIEW_GAMES, GET_PLATAFORMS,
  GET_GENRES, SEARCH_NAME, FLAG, GET_GAME_DETAIL, RESPONSE_SERVER
} from './actionsTypes.js';

import axios from 'axios';

export const getVideoGames = () => {
  return async function (dispatch){
    return (
      dispatch({type: RESPONSE_SERVER, payload: {} }),
      axios.get(`http://localhost:3001/videogames`)
        .then((allGames)=>{
        dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
        })
    )
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

export const getPlataforms = () => {
  return async function (dispatch){
    return axios.get(`http://localhost:3001/plataforms`)
    .then((plataforms)=>{
      dispatch({type: GET_PLATAFORMS, payload: plataforms.data })
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
      if (allGames.status === 200) {
        dispatch({type: SEARCH_NAME, payload: allGames.data })
      }else{
        dispatch({type: RESPONSE_SERVER, payload: {
          data: 'No se encontraron resultados',
          status: allGames.status
        } })
      }
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
  Object.keys(data).map(val=>{if(data[val] == '') data[val] = null})
  return async function (dispatch){
    return (
      dispatch({type: RESPONSE_SERVER, payload: {} }),
      axios.post(`http://localhost:3001/videogame`, data)
      .then((rs)=>{
        // rs.data, rs.status
        dispatch({type: RESPONSE_SERVER, payload: rs });
      }).catch((err)=>{
        //err.message, err.name
        dispatch({type: RESPONSE_SERVER, payload: err });
      })
    )
  }
}