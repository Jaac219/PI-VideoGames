import { Link } from 'react-router-dom';
export default function VideoGame(props){
  return (
    <div>
      <Link to={`/videogames/game/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
      <h6>{props.rating}</h6>
    </div>
  );
}