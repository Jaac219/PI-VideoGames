import style from './searchBar.module.css'
import { useState } from 'react';
import {useDispatch} from "react-redux";
import { searchForName, getVideoGames, changeFlagSearch } from '../../redux/actions/actions.js'

export default function SearchBar(){
  const dispatch = useDispatch();
  const [stateSearch, setStateSearch] = useState('')

  function handleInputChange(evento){
    setStateSearch(evento.target.value)
  }

  function handleClick(opcion){
    if (opcion == 0){
      if (stateSearch){
        dispatch(searchForName(stateSearch))
        dispatch(changeFlagSearch(true));
      }else { 
        alert ('Debe ingresar un valor')
      }
    } else {
      dispatch(getVideoGames());
      dispatch(changeFlagSearch(false));
    }
    setStateSearch('');
  }

  function handlerSubmit(e){e.preventDefault();}

  return (
    <form className={style.formSearch} onSubmit={(e)=>{handlerSubmit(e)}}>
      <>
      <i className="fa fa-search"></i>
      <input placeholder='Search for name' onChange={(e)=> handleInputChange(e)} type="text" value={stateSearch}/>
      <div className={style.groupButton}>
        <button className={style.btnSearch} onClick={()=>{handleClick(0)}}><i className="fa fa-search"></i></button>
        <button className={style.btnSearch} onClick={()=>{handleClick(1)}}><i className="fa fa-retweet"></i></button>
      </div>
      </>
    </form>
  );
}
