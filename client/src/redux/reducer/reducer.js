import { GET_VIDEOGAMES, PAGINATE, ORDER_BY } from '../actions/actionsTypes.js';

const initialState = {
  allVideogames: [],
  viewVideoGames: [],
  videogame: {},
  page: {init: 0, end: 14}
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state, 
        allVideogames: action.payload,
        viewVideoGames: action.payload,
      }
    case PAGINATE:
      return {
        ...state,
        page: action.payload
      }
    case ORDER_BY:
        return {
          ...state,
          viewVideoGames: action.payload,
          page: {init: 0, end: 14}
        }
    default:
      break;
  }
}