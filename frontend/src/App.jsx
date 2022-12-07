import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/Onboarding";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie';


export default function App() {
  const [cookies,  setCookie, removeCookie] = useCookies(['user']);
  
  const AuthToken = cookies.AuthToken;

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {AuthToken && <Route path="/dashboard" element={<Dashboard/>}/>}
      {AuthToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
    </Routes>
  </BrowserRouter>
  )
}