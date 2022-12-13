import { Link } from 'react-router-dom'
import fdm from '../assets/fdm-star.svg'

export default function Nav({setShowModal, showModal,setIsSignUp, cookies, removeCookie, AuthToken, User}){
    //Current gets the user to the nav but may not be needed
    const loginClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const logout = () => {
        removeCookie('AuthToken', cookies.AuthToken);
        removeCookie('UserId', cookies.UserId);
        window.location.reload();
        return;
    }

    const registerClick = () => {
        setShowModal(true)
        setIsSignUp(true)
    }

    return (

        <nav className="flex justify-between items-center p-4 lg:p-8 bg-black text-white min-h-full">
            <div className="logo-container">
                <Link to="/"><img src={fdm} className="w-1/4"></img></Link>
            </div>
            <ul className="signup-container flex space-x-2 text-base lg:text-lg">
            {!AuthToken && 
            <>
                <li>
                    <button  className="hover:underline focus:underline cursor-pointer" onClick={loginClick}>Login</button>
                </li>
                <li>
                    <button className="hover:underline focus:underline cursor-pointer" onClick={registerClick}>Register</button>
                </li>
            </>}
            {AuthToken && 
            <>
                <li>
                    <Link to="/dashboard" className='hover:underline focus:underline cursor-pointer'>Account</Link>
                </li>
                <li>
                    <button className="hover:underline focus:underline cursor-pointer" onClick={logout}>Logout</button>
                </li>
            </>}
            </ul>
        </nav>
    )
}