import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie';


export default function App() {
  const [cookies,  setCookie, removeCookie] = useCookies(['user']);
  
  const AuthToken = cookies.AuthToken;

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      {AuthToken && <Route path="/dashboard" element={<Dashboard/>}/>}
    </Routes>
  )
}