import style from './gameDetail.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Route } from "react-router-dom";
import { getGameDetail, resetGame } from '../../redux/actions/actions.js'
import SearchBar from '../SearchBar/SearchBar.jsx';

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

  useEffect(()=>{
    console.log(gameDetail)
  },[gameDetail])

  let ConvertStringToHTML = function (str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent;
  };

  return (
    <>
    {gameDetail.id ? 
      <div style={{backgroundImage: `url(${gameDetail.background_image})`}} className={style.container}>
        <img src={gameDetail.background_image} alt="" />
        <div className={style.containerDetail}>
          <div className={style.containRating}>
            <i className="fa fa-star" aria-hidden="true">
              <i className="fa fa-star" aria-hidden="true">
                <h3>{gameDetail.rating}</h3>
              </i>
            </i>
          </div>
          <h1>{gameDetail.name}</h1>
          <div className={style.genres}>
            <div><p style={{color: 'yellow'}}>Genre: &nbsp;&nbsp;</p></div>
            {gameDetail.genres && gameDetail.genres.map(val=>{
              return(
                <div key={val.id}>
                  <p>  {val.name} / &nbsp;</p>
                </div>
              )
            })}
          </div>
          <p>{gameDetail.description && ConvertStringToHTML(gameDetail.description)}</p>
          <div className={style.platforms}>
            <div><p style={{color: 'yellow'}}>Plataforms: &nbsp;&nbsp;</p></div>
            {gameDetail.platforms && gameDetail.platforms.map(val=>{
              if (val.platform) {
                return(
                  <div key={val.platform.id}>
                    <p>  {val.platform.name} / &nbsp;</p>
                  </div>
                )
              }else{
                return(
                  <div key={val.id}>
                    <p>  {val.name} / &nbsp;</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div> : 
      <div className='responseError'>
        <img src="../../images/error_1.png" alt="" />
        <h1>Juego no encontrado</h1>
      </div>
    }
    </>
  );
}
  