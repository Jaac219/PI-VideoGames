import { Link } from 'react-router-dom';
import style from './landing.module.css'
import Login from '../Login/Login.jsx'
import { useSelector } from 'react-redux';

export default function Landing(){
  const { PUBLIC_URL } = process.env;
  const { user } = useSelector((state)=>state)
  return (
    <div style={{backgroundImage: `url(${PUBLIC_URL}/images/landing.png)`}} className={style.container}>
        { user.id ? 
          <Link to={'/videogames'}><img src={`${PUBLIC_URL}/images/play.png`} alt="" /></Link>:
          <Login />
        }
    </div>
  );
}

