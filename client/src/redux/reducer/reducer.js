import { GET_VIDEOGAMES, VIEW_GAMES, GET_PLATFORMS,
  GET_GENRES, FLAG, GET_GAME_DETAIL, RESPONSE_SERVER
} from '../actions/actionsTypes.js';

const initialState = {
  allVideogames: [],
  viewVideoGames: [],
  genres: [],
  platforms: [],
  videogame: {},
  flag: '',
  responseServer: {},
  flagSearch: true
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state, 
        allVideogames: action.payload,
        viewVideoGames: action.payload,
      }
    case VIEW_GAMES:
      return {
        ...state,
        viewVideoGames: action.payload,
      }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload
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
    case 'flagSearch':
      return {
        ...state,
        flagSearch: action.payload
    }
    default:
      return state;
  }
}

export default rootReducer;