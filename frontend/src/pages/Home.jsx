import Nav from "../components/Nav";
import Header from "../components/Header";
import Body from "../components/Body";
import AuthModal from "../components/AuthModal";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';



export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [cookies,  setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);

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
  
    const AuthToken = cookies.AuthToken;

    function handleClick() {
        setShowModal(true);
        setIsSignUp(true);
    }

    return (
      <div>
        <Nav                 
            setShowModal={setShowModal} 
            showModal={showModal}
            setIsSignUp={setIsSignUp}
            cookies={cookies}
            removeCookie={removeCookie}
            AuthToken={AuthToken}
            User={user}
        />
        <Header handleClick={handleClick} AuthToken={AuthToken}/>
        <div>                
            <Body handleClick={handleClick} AuthToken={AuthToken}/>
            {showModal && (
                <AuthModal
                    setShowModal={setShowModal}
                    isSignUp={isSignUp}  
                />
            )}
        </div>
      </div>
    )
  }