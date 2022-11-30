import Nav from "../components/Nav";
import Header from "../components/Header";
import Body from "../components/Body";
import AuthModal from "../components/AuthModal";
import { useState } from "react";


export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    function handleClick() {
        console.log('Clicked');
        setShowModal(true);
        setIsSignUp(true);
    }

    return (
      <div>
        <Nav                 
            setShowModal={setShowModal} 
            showModal={showModal}
            setIsSignUp={setIsSignUp}
        />
        <Header/>
        <div>                
            <Body/>
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