import { 
  GET_VIDEOGAMES, PAGINATE, VIEW_GAMES, GET_PLATFORMS,
  GET_GENRES, FLAG, GET_GAME_DETAIL, RESPONSE_SERVER
} from './actionsTypes.js';

import axios from 'axios';

export const getVideoGames = () => {
  return function (dispatch){
    dispatch({type: GET_VIDEOGAMES, payload: []})
    dispatch({type: RESPONSE_SERVER, payload: {} })
    return (
      axios.get(`http://localhost:3001/videogames`)
        .then((allGames)=>{
          dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
        }).catch((err)=>{
          dispatch({type: RESPONSE_SERVER, payload: err });
        })
    )
  }
}

export const getGenres = () => {
  return  function (dispatch){
    return axios.get(`http://localhost:3001/genres`)
    .then((genres)=>{
      dispatch({type: GET_GENRES, payload: genres.data })
    })
  }
}

export const getPlatforms = () => {
  return  function (dispatch){
    return axios.get(`http://localhost:3001/platforms`)
    .then((platform)=>{
      dispatch({type: GET_PLATFORMS, payload: platform.data })
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
  return  function (dispatch){
    dispatch({type: GET_VIDEOGAMES, payload: []})
    dispatch({type: RESPONSE_SERVER, payload: {} })
    return (
      axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then((allGames)=>{
          if (allGames.status === 200) {
            dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
          }else{
            dispatch({type: RESPONSE_SERVER, payload: {
            data: 'No se encontraron resultados',
            status: allGames.status
            }})
          }
        }).catch(err=>{
          dispatch({type: RESPONSE_SERVER, payload: err})
        })
    )
  }
}

export const flag =(fl) => {return {type: FLAG, payload: fl}}
export const resetGame =() => {return {type: GET_GAME_DETAIL, payload: []}}

export const getGameDetail = (id) =>{
    return  function (dispatch){
      dispatch({type: RESPONSE_SERVER, payload: {} })
      return (
        axios.get(`http://localhost:3001/videogame/${id}`)
          .then((detail)=>{
            if (detail.status === 200) {
              dispatch({type: GET_GAME_DETAIL, payload: detail.data })
            }else{
              dispatch({type: RESPONSE_SERVER, payload: {
                data: 'No se encontraron resultados',
                status: detail.status
              }})
            }
          }).catch((err)=>{
            dispatch({type: RESPONSE_SERVER, payload: {data: err}})
          })
      )
    }
}

export const setNewGame = (data) =>{
  //convierte los datos vacios en null 
  Object.keys(data).map(val=>{if(data[val] == '') data[val] = null})
  return  function (dispatch){
    dispatch({type: RESPONSE_SERVER, payload: {} })
    return (
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