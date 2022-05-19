import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail, resetGame } from '../../redux/actions/actions.js'

export default function Landing(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameDetail = useSelector((state)=>state.videogame);

  useEffect(()=>{
    dispatch(getGameDetail(id));
  }, [dispatch])
  
  useEffect(()=>{
    return (()=>{dispatch(resetGame())})
  },[dispatch])

  return (
    <>
      <h1>Game Detail</h1>
      <h3>{gameDetail.name}</h3>
      <h3>{gameDetail.rating}</h3>
      <p>{gameDetail.description}</p>
    </>
  );
}
  