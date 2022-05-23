import style from './filters.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, setViewGames, flag } from '../../redux/actions/actions.js';

export default function Filters(){
  const gamesInitState = useSelector(state => state.allVideogames);
  const genreState = useSelector(state => state.genres);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGenres());
  }, [dispatch])

  //Evento cuando cambia el select de alguno de los filtros
  function handlerChangeFilter(){
    const filterType = document.getElementById('selFilterType').value;
    const filterGenre = document.getElementById('selFilterGenre').value;
    dispatch(flag('filter'));

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
    
    if (filterType && filterGenre) {
      let arrType = filterForType(gamesInitState, filterType);
      let arrGenre = filterForGenre(arrType, filterGenre);
      dispatch(setViewGames(arrGenre));
    }else if(filterType && !filterGenre){
      dispatch(setViewGames(filterForType(gamesInitState, filterType)))
    }else if (filterGenre && !filterType){
      dispatch(setViewGames(filterForGenre(gamesInitState, filterGenre)))
    }
  }//---------------------------------------------------------------------

  return (
    <div className={style.selectFilter}>
      <select onChange={()=>{handlerChangeFilter()}} id="selFilterType">
        <option value="all">All</option>
        <option value="database">DataBase</option>
        <option value="rawg">Rawg</option>
      </select>
      <select onChange={()=>{handlerChangeFilter()}} id="selFilterGenre">
        <option value=''>Select Genre</option>
        {genreState.map(val=>{
          return (
            <option key={val.id} value={val.id}>{val.name}</option>
          )
        })}
      </select>
    </div>
  );
}
