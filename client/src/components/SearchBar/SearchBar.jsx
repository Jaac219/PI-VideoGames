import style from './searchBar.module.css'
import { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { searchForName, getVideoGames } from '../../redux/actions/actions.js'
import {RESPONSE_SERVER} from '../../redux/actions/actionsTypes.js';

export default function SearchBar(){
  const dispatch = useDispatch();
  const [state, setState] = useState({search: ''})

  function handleInputChange(evento){
    setState({search: evento.target.value})
  }

  function handleClick(opcion){
    if (opcion == 0){
      if (state.search){
        dispatch(searchForName(state.search))
        dispatch({type: 'flagSearch', payload: true});
      }else { 
        alert ('Debe ingresar un valor')
      }
    } else {
      dispatch(getVideoGames());
      dispatch({type: 'flagSearch', payload: false});
    }
    setState({search: ''});
  }

  function handlerSubmit(e){e.preventDefault();}

  return (
    <form className={style.formSearch} onSubmit={(e)=>{handlerSubmit(e)}}>
      <>
      <i className="fa fa-search"></i>
      <input placeholder='Search for name' onChange={(e)=> handleInputChange(e)} type="text" value={state.search}/>
      <div className={style.groupButton}>
        <button className={style.btnSearch} onClick={()=>{handleClick(0)}}><i className="fa fa-search"></i></button>
        <button className={style.btnSearch} onClick={()=>{handleClick(1)}}><i className="fa fa-retweet"></i></button>
      </div>
      </>
    </form>
  );
}
