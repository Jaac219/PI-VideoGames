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
  const { PUBLIC_URL } = process.env;
  const { user, loadingUser } = useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    let token = localStorage.getItem("token_id");
    console.log(token);
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
        <Route path={`${PUBLIC_URL}/`} element={<Landing />} />
        <Route path={`${PUBLIC_URL}/videogames`} element={user.id ? <VideoGames /> : <Navigate to={`${PUBLIC_URL}/`}/>} />
        <Route path={`${PUBLIC_URL}/videogames/game/:id`} element={user.id ? <GameDetail /> : <Navigate to={`${PUBLIC_URL}/`}/>} />
        <Route path={`${PUBLIC_URL}/videogames/create`} element={user.id ? <FormCreate /> : <Navigate to={`${PUBLIC_URL}/`}/>} />
        <Route exact path={`${PUBLIC_URL}/err404`} element={<Error404 />} />
        <Route path="*" element={<Navigate to={`${PUBLIC_URL}/err404`} replace />}/>
       </>
      }
      </Routes>
      </>
    </div>
  );
}

export default App;
