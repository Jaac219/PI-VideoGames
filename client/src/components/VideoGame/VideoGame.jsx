import { Link } from 'react-router-dom';
import style from './videoGame.module.css';
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, getVideoGames } from "../../redux/actions/actions.js"

import ModalEdit from '../ModalEdit/ModalEdit';

import { useEffect, useState } from 'react';

export default function VideoGame(props){
  const { PUBLIC_URL } = process.env;
  const dbGenres = useSelector(state => state.genres);
  const { error, success } = useSelector(state => state);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(()=>{
    if (error) alert(error);
    if (success){
      alert(success);
      dispatch(getVideoGames());
    } 
  }, [error, success])

  function onClickDelete(id){
    if(window.confirm('Seguro que quiere elminar este juego')){
      dispatch(actionDelete(id));
    }
  }
  function showModal(opc) { 
    setShow(opc);
  }

  return (
    <div className={style.card}>
      <img src={props.background_image ? props.background_image: `${PUBLIC_URL}/images/background_default.jpg`} alt="Imagen del juego" />
      <h1>{props.name}</h1>
      <div className={style.containRating}>
        <i className="fa fa-star" aria-hidden="true">
          <i className="fa fa-star" aria-hidden="true">
            <h6>{props.rating}</h6>
          </i>
        </i>
      </div>
      <div className={style.containGenres}>
        {props.genres && props.genres.map(val=>{
          //Busco la imagen del genero en mi Base de datos por que a veces viene el genero sin image desde rawg
          return dbGenres.map(v=>{
            if (val.name == v.name) {
              return(
                <div key={v.id}>
                  <img src={v.image_background} alt="" />
                  <p>{v.name}</p>
                </div>
              )
            }
          });
        })}
      </div>
      <Link className={isNaN(props.id) ? style.lnk : ''} to={PUBLIC_URL+`/videogames/game/${props.id}`}>
        <p>view more</p>
      </Link>
      {isNaN(props.id) &&
        <>
        <div className={style.btnsChanges}>
          <button onClick={()=>{showModal(true)}}><i className="fa fa-table" aria-hidden="true"></i></button>
          <button onClick={()=>{onClickDelete(props.id)}}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <ModalEdit show={show} onClose={showModal} gameId={props.id}/>
        </>
      }
    </div>
  );
}