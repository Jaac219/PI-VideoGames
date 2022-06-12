import style from './filters.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, actionFilter, orderOrFilter } from '../../redux/actions/actions.js';

export default function Filters(){
  const gamesInitState = useSelector(state => state.allVideogames);
  const genreState = useSelector(state => state.genres);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGenres());
  }, [dispatch])

  useEffect(()=>{
    handlerChangeFilter();
  }, [gamesInitState])

  //Evento cuando cambia el select de alguno de los filtros
  function handlerChangeFilter(){
    const filterType = document.getElementById('selFilterType').value;
    const filterGenre = document.getElementById('selFilterGenre').value;
    dispatch(orderOrFilter('filter'));
    dispatch(actionFilter(filterType, filterGenre))
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
