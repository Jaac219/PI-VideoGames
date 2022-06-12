import { Link } from 'react-router-dom';
import style from './landing.module.css'
import Login from '../Login/Login.jsx'
import { useSelector } from 'react-redux';

export default function Landing(){
  const { user } = useSelector((state)=>state)
  return (
    <div style={{backgroundImage: `url(./images/landing.png)`}} className={style.container}>
        { user.id ? 
          <Link to='/videogames'><img src="./images/play.png" alt="" /></Link>:
          <Login />
        }
    </div>
  );
}

