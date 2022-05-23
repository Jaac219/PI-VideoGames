import style from './searchBar.module.css'
import { useState } from 'react';
import {useDispatch} from "react-redux";
import { searchForName, resetGames, getVideoGames } from '../../redux/actions/actions.js'

export default function SearchBar(){
  const dispatch = useDispatch();
  const [state, setState] = useState({search: ''})

  function handleInputChange(evento){
    setState({search: evento.target.value})
  }

  function handleClick(e){
    if (e.target.value == 0){
      if (state.search){
        dispatch(resetGames([]));
        dispatch(searchForName(state.search))
      }else { 
        alert ('Debe ingresar un valor')
      }
    } else {
      dispatch(resetGames([]));
      dispatch(getVideoGames());
    }
    setState({search: ''});
  }

  function handlerSubmit(e){e.preventDefault()}

  return (
    <form className={style.formSearch} onSubmit={(e)=>{handlerSubmit(e)}}>
      <>
      <i className="fa fa-search"></i>
      <input placeholder='Search for name' onChange={(e)=> handleInputChange(e)} type="text" value={state.search}/>
      <div className={style.groupButton}>
        <button className={style.btnSearch} onClick={(e)=>{handleClick(e)}} value={0}><i className="fa fa-search"></i></button>
        <button className={style.btnSearch} onClick={(e)=>{handleClick(e)}} value={1}><i className="fa fa-retweet"></i></button>
      </div>
      </>
    </form>
  );
}
