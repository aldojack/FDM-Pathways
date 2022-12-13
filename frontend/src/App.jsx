import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import NotFound from "./pages/error/NotFound";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Game from "./components/Game";
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from "react";
import {useCookies} from 'react-cookie';


export default function App() {
  const [cookies,  setCookie, removeCookie] = useCookies(['user']);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const AuthToken = cookies.AuthToken;
  const [games, setGames] = useState(null);

  useEffect(() => {
    if(AuthToken){
        const getUser = async() => {
            const userId = cookies.UserId;
            const response = await axios.get('http://localhost:8000/user', userId);
            setUser(response.data);
        }
        getUser();
    }
},[])


useEffect(() => {
  if(AuthToken){
      const getGames = async() => {
          const response = await axios.get('http://localhost:8000/games');
          setGames(response.data);
      }
      getGames();
  }
},[])

function handleClick() {
  setShowModal(true);
  setIsSignUp(true);
}

  return (
    <>
    <Nav
      setShowModal={setShowModal} 
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      cookies={cookies}
      removeCookie={removeCookie}
      AuthToken={AuthToken}
      User={user}
    />
    <Header 
      handleClick={handleClick} 
      AuthToken={AuthToken}
      />
    <Routes>
      <Route path="/" element={<Home handleClick={handleClick} AuthToken={AuthToken} showModal={showModal} setShowModal={setShowModal} isSignUp={isSignUp}/>}/>
      {/* Dashboard and Games will need auth so only signed in users can view */}
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/games">
        <Route index element={<Games AuthToken={AuthToken} Games={games}/>}/>
        <Route path=":name" element={<Game/>}/>
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
    </>
  )
}