// import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import VideoGames from './components/VideoGames/VideoGames.jsx';
import FormCreate from './components/FormCreate/FormCreate.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route path='/videogames' component={NavBar} />
      <Route exact path='/videogames' component={VideoGames} />
      <Route path='/videogames/create' component = {FormCreate} />
      <Route path='/videogames/game/:id' component={GameDetail} />
    </div>
  );
}

export default App;
