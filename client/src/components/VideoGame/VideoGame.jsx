export default function VideoGame(props){
  return (
    <div>
      <h3>{props.name}</h3>
      <h6>{props.rating}</h6>
    </div>
  );
}