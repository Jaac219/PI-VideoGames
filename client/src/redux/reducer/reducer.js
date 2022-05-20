import { GET_VIDEOGAMES, PAGINATE, VIEW_GAMES, GET_PLATAFORMS,
  GET_GENRES, SEARCH_NAME, FLAG, GET_GAME_DETAIL, RESPONSE_SERVER
} from '../actions/actionsTypes.js';

const initialState = {
  allVideogames: [],
  viewVideoGames: [],
  genres: [],
  plataforms: [],
  videogame: {},
  page: {},
  flag: '',
  responseServer: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state, 
        allVideogames: action.payload,
        viewVideoGames: action.payload,
        page: {init: 0, end: 14}
      }
    case PAGINATE:
      return {
        ...state,
        page: action.payload
      }
    case VIEW_GAMES:
      return {
        ...state,
        viewVideoGames: action.payload,
        page: {init: 0, end: 14}
      }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    case GET_PLATAFORMS:
      return {
        ...state,
        plataforms: action.payload
    }
    case SEARCH_NAME:
      return {
        ...state,
        allVideogames: action.payload,
        viewVideoGames: action.payload
      }
    case FLAG: 
      return { ...state, flag: action.payload }
    case GET_GAME_DETAIL:
      return {
        ...state,
        videogame: action.payload
      }
    case RESPONSE_SERVER:
      return {
        ...state,
        responseServer: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;