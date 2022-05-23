import { Link } from 'react-router-dom';
import style from './landing.module.css'

export default function Landing(){
  return (
    <div style={{backgroundImage: `url(./images/landing.png)`}} className={style.container}>
        <Link to='/videogames'><img src="./images/play.png" alt="" /></Link>
    </div>
  );
}

