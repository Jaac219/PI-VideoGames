import { Link } from 'react-router-dom';
import style from './videoGame.module.css';
import { useSelector } from "react-redux";

export default function VideoGame(props){
  const dbGenres = useSelector(state => state.genres);
  return (
    <div className={style.card}>
      <img src={props.background_image ? props.background_image: './images/background_default.jpg'} alt="Imagen del juego" />
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
      <Link to={`/videogames/game/${props.id}`}>
        <p>view more</p>
      </Link>
    </div>
  );
}