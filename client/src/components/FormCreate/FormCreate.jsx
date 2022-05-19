import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNewGame } from '../../redux/actions/actions.js';

export default function FormCreate(){
  const [stateForm, setStateForm] = useState();
  const [stateValidate, setStateValidate] = useState();
  const dispatch = useDispatch();

  function handleSubmit(){
    dispatch(setNewGame({
      
    }));
  }


  return (
    <form action="">
        <label htmlFor="">Name: </label>
        <input type="text" />
        <label htmlFor="">Raiting: </label>
        <input type="number" />
        <label htmlFor="">Description: </label>
        <textarea name="" id="" cols="10" rows="1"></textarea>
        <label htmlFor="">Date Released: </label>
        <input type="number" />
        <label htmlFor="">background: </label>
        <input type="text" />
        <select>
          <option value="">Genres</option>
        </select>
        <select>
          <option value="">Plataforms</option>
        </select>
        <button type="input">Register</button>
    </form>
  );
}