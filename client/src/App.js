// import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import VideoGames from './components/VideoGames/VideoGames.jsx';
import FormCreate from './components/FormCreate/FormCreate.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Error404 from './components/Error404/Error404.jsx';

function App() {
  return (
    <div className="App">
      <Route path='/videogames' component={NavBar} />
      <Switch>
        <Route exact path='/videogames/game/:id' component={GameDetail} />
        <Route exact path='/videogames/create' component = {FormCreate} />
        <Route exact path='/videogames' component={VideoGames} />
        <Route exact path='/error404' component={Error404}/>
        <Route exact path='/' component={Landing}/>
        <Redirect to='/error404'/>
      </Switch>
    </div>
  );
}

export default App;
