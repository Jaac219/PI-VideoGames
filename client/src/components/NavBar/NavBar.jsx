import { Link, Route } from 'react-router-dom';
import Filters from '../Filters/Filters.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import style  from './navBar.module.css';

export default function NavBar(){
  return (
    <nav>
      <div className={style.link}>
        <Link to='/'>Home </Link><br />
        <Link to='/videogames'>Videogames </Link><br />
        <Link to='/videogames/create'>Crear </Link>
      </div>
      <div className='filters'>
        <Route exact path='/videogames' component={Filters}/>
        <Route exact path='/videogames' component={SearchBar}/>
      </div>
    </nav>
  );
}