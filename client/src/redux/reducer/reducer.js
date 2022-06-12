import { GET_VIDEOGAMES, GET_PLATFORMS, FILTER, FLAG_SEARCH, SUCCESS,
  GET_GENRES, ORDER_OR_FILTER, GET_GAME_DETAIL, ERROR, ORDER_BY, GET_USER
} from '../actions/actionsTypes.js';

const initialState = {
  allVideogames: [],
  viewVideoGames: [],
  genres: [],
  platforms: [],
  videogame: {},
  orderOrFilter: '',
  error: '',
  success: '',
  flagSearch: true,
  user: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state, 
        allVideogames: action.payload,
        viewVideoGames: action.payload
      }
    case GET_GENRES:
      return {...state, genres: action.payload }
    case GET_PLATFORMS:
      return { ...state, platforms: action.payload }
    case FILTER: 
      function filterForType(arr, filter){
        return arr.filter(val=>{
          if(filter == 'rawg' && Number.isInteger(val.id)) return val
          if(filter == 'database' && !Number.isInteger(val.id)) return val
          if(filter == 'all') return val
        })
      }
      function filterForGenre(arr, filter){
        return arr.filter(val=>{
          let bs = val.genres.find(v=>v.id==filter);
          if(bs) return val;
        })
      }
      let filterType = action.payload.filterType;
      let filterGenre = action.payload.filterGenre;

      let ultimateFilter = state.allVideogames;
      
      if (filterType) ultimateFilter = filterForType(ultimateFilter, filterType);
      if (filterGenre) ultimateFilter = filterForGenre(ultimateFilter, filterGenre);

      return {...state,  viewVideoGames: ultimateFilter}
    case ORDER_BY:
      let order = [...state.viewVideoGames];
      let ascDesc = action.payload.ascDesc;
      let orderBy = action.payload.orderBy;
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
      return {...state, viewVideoGames: order}
    case ORDER_OR_FILTER: 
      return { ...state, orderOrFilter: action.payload }
    case GET_GAME_DETAIL:
      return {...state, videogame: action.payload }
    case ERROR:
      return { ...state, error: action.payload }
    case FLAG_SEARCH:
      return {...state, flagSearch: action.payload}
    case SUCCESS:
      return {...state, success: action.payload}
    case GET_USER:
      return {...state, user: action.payload}
    default:
      return state;
  }
}

export default rootReducer;