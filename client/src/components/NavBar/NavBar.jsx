import { Link } from 'react-router-dom';
import style  from './navBar.module.css';

export default function NavBar(){
  return (
    <div>
      <nav className={style.navBar}>
        <Link to='/'>Home / </Link>
        <Link to='/videogames'>Videogames / </Link>
        <Link to='/videogames/create'>Crear  </Link>
      </nav>
    </div>
  );
}