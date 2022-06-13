// import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser, actionLoadingUser } from './redux/actions/actions.js';

import Landing from './components/Landing/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import VideoGames from './components/VideoGames/VideoGames.jsx';
import FormCreate from './components/FormCreate/FormCreate.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Error404 from './components/Error404/Error404.jsx';
import Loading from './components/Loading/Loading.jsx';

function App() {
  const { user, loadingUser } = useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    let token = localStorage.getItem("token_id");
    if (token) {dispatch(getUser(token))}
    else dispatch(actionLoadingUser(false));
  }, []);

  return (
    <div className="App">
      <>
      <NavBar/>
      <Routes>
      {loadingUser ? <Route path="*" element={<Loading />} /> :
       <>
        <Route path="/" element={<Landing />} />
        <Route path="/videogames" element={user.id ? <VideoGames /> : <Navigate to="/"/>} />
        <Route path="/videogames/game/:id" element={user.id ? <GameDetail /> : <Navigate to="/"/>} />
        <Route path="/videogames/create" element={user.id ? <FormCreate /> : <Navigate to="/"/>} />
        <Route exact path="/err404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/err404" replace />}/>
       </>
      }
      </Routes>
      </>
    </div>
  );
}

export default App;
