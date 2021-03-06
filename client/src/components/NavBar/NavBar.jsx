import style  from './navBar.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavBar(){
  const { user } = useSelector((state)=>state);
  function logout(){
    localStorage.removeItem("token_id");
    window.location.reload();
  }

  if(user.id){ 
    return (
      <div>
        <nav className={style.navBar}>
          <Link to={`/`}>Home / </Link>
          <Link to={'/videogames'}>Videogames / </Link>
          <Link to={'/videogames/create'}>Crear  </Link>
          <button onClick={()=>{logout()}}>Logout</button>
        </nav>
      </div>
    )
  }else{
    return null
  }
}