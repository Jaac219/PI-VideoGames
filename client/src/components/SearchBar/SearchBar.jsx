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
    <form onSubmit={(e)=>{handlerSubmit(e)}}>
      <label htmlFor="">Name: </label>
      <input onChange={(e)=> handleInputChange(e)} type="text" value={state.search}/>
      <button onClick={(e)=>{handleClick(e)}} value={0}> + </button>
      <button onClick={(e)=>{handleClick(e)}} value={1}> x </button>
    </form>
  );
}
