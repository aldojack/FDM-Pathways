import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/Onboarding";
import {BrowserRouter, Routes, Route} from 'react-router-dom'



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/onboarding" element={<OnBoarding/>}/>
    </Routes>
  </BrowserRouter>
  )
}