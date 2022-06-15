import { 
  GET_VIDEOGAMES, GET_PLATFORMS, FILTER, FLAG_SEARCH, SUCCESS, LOADING_USER,
  GET_GENRES, ORDER_OR_FILTER, GET_GAME_DETAIL, ERROR, ORDER_BY, GET_USER
} from './actionsTypes.js';

import axios from 'axios';

export const getVideoGames = () => {
  return function (dispatch){
    dispatch({type: SUCCESS, payload: '' })
    dispatch({type: ERROR, payload: '' })
    dispatch({type: GET_VIDEOGAMES, payload: []})
    return (
      axios.get(`https://api-rest-videogames.herokuapp.com/videogames`)
        .then((allGames)=>{
          dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
        }).catch((err)=>{
          dispatch({type: ERROR, payload: 'No se encontraron resultados' });
        })
    )
  }
}

export const getGenres = () => {
  return function (dispatch){
    return axios.get(`https://api-rest-videogames.herokuapp.com/genres`)
    .then((genres)=>{
      dispatch({type: GET_GENRES, payload: genres.data })
    })
  }
}

export const getPlatforms = () => {
  return  function (dispatch){
    return axios.get(`https://api-rest-videogames.herokuapp.com/platforms`)
    .then((platform)=>{
      dispatch({type: GET_PLATFORMS, payload: platform.data })
    })
  }
}

export const actionOrderBy = (orderBy, ascDesc) =>{
  return {type: ORDER_BY, payload: {orderBy, ascDesc}}
}
export const actionFilter = (filterType, filterGenre) =>{
  return {type: FILTER, payload: {filterType, filterGenre}}
}
//Indica si cuando el estado viewVideoGames cambia fue a causa del filtrado o del ordenamiento.
export const orderOrFilter = (ofl) => {
  return {type: ORDER_OR_FILTER, payload: ofl}
}
//---------------------------------------------------------------------------------------------

export const searchForName = (name) => {
  return  function (dispatch){
    dispatch({type: GET_VIDEOGAMES, payload: []})
    dispatch({type: ERROR, payload: '' })
    return (
      axios.get(`https://api-rest-videogames.herokuapp.com/videogames?name=${name}`)
        .then((allGames)=>{
          if (allGames.status === 200) {
            dispatch({type: GET_VIDEOGAMES, payload: allGames.data })
          }else{
            dispatch({type: ERROR, payload: 'No se encontraron resultados'})
          }
        }).catch(err=>{
          dispatch({type: ERROR, payload: 'Ha ocurrido un error'})
        })
    )
  }
}

export const getGameDetail = (id) =>{
    return  function (dispatch){
      dispatch({type: GET_GAME_DETAIL, payload: {} })
      dispatch({type: ERROR, payload: '' })
      return (
        axios.get(`https://api-rest-videogames.herokuapp.com/videogame/${id}`)
          .then((detail)=>{
            if (detail.status === 200) {
              dispatch({type: GET_GAME_DETAIL, payload: detail.data })
            }else{
              dispatch({type: ERROR, payload:  'No se encontraron resultados'})
            }
          }).catch((err)=>{
            dispatch({type: ERROR, payload: 'Ha ocurrido un error'})
          })
      )
    }
}

export const setNewGame = (data) =>{
  //convierte los datos vacios en null 
  Object.keys(data).map(val=>{if(data[val] == '') data[val] = null})
  return  function (dispatch){
    dispatch({type: ERROR, payload: '' })
    dispatch({type: SUCCESS, payload: '' })
    return (
      axios.post(`https://api-rest-videogames.herokuapp.com/videogame`, data)
      .then((rs)=>{
        dispatch({type: SUCCESS, payload: 'Juego creado correctamente'});
      }).catch((err)=>{
        dispatch({type: ERROR, payload: 'Ha ocurrido un error' });
      })
    )
  }
}

export const actionDelete = (id) => {
  return function(dispatch){
    dispatch({type: ERROR, payload: '' })
    dispatch({type: SUCCESS, payload: '' })
    return (
      axios.delete(`https://api-rest-videogames.herokuapp.com/videogame/${id}`)
        .then((rs)=>{
          dispatch({type: SUCCESS, payload: 'Juego eliminado correctamente'});
        }).catch((err)=>{
          dispatch({type: ERROR, payload: 'Ha ocurrido un error' });
        })
    )
  }
} 

export const actionUpdate = (data)=>{
  Object.keys(data).map(val=>{if(data[val] == '') data[val] = null})
  return function(dispatch){
    dispatch({type: SUCCESS, payload: ''});
    dispatch({type: ERROR, payload: ''});
    return(
      axios.put(`https://api-rest-videogames.herokuapp.com/videogame`, data)
        .then(()=>{
          dispatch({type: SUCCESS, payload: 'Juego actualizado correctamente'})
        }).catch(()=>{
          dispatch({type: ERROR, payload: 'Error al registrar el juego'})
        })
    ) 
  }
}

export const changeFlagSearch = (flag) =>{
  return { type: FLAG_SEARCH, payload: flag }
} 

export const login = (data) =>{
  return function(dispatch){
    return (
      axios.post('https://api-rest-videogames.herokuapp.com/login', data)
        .then((resp)=>{
          localStorage.setItem("token_id", resp.data.token);
          dispatch({type: GET_USER, payload: resp.data.user})
        })  
    )
  }
}

export const getUser = (token) => {
  return async function(dispatch){
    return(
      await axios.post(`https://api-rest-videogames.herokuapp.com/login/getUser`, {token})
        .then((resp)=>{
          dispatch({type: GET_USER, payload: resp.data})
          dispatch(actionLoadingUser(false));
        }).catch(()=>{
          alert('Error en la autenticación');
          localStorage.removeItem("token_id");
          dispatch(actionLoadingUser(false));
        })
    )
  };
}

export const actionLoadingUser = (payload) =>{
  return {type: LOADING_USER, payload}
}