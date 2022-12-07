import Nav from "../components/Nav";
import Header from "../components/Header";
import Body from "../components/Body";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { useCookies } from 'react-cookie';


export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [cookies,  setCookie, removeCookie] = useCookies(['user']);
  
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