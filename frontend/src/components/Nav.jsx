import fdm from '../assets/fdm-star.svg'
export default function Nav({setShowModal, showModal,setIsSignUp}){

    const loginClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const registerClick = () => {
        setShowModal(true)
        setIsSignUp(true)
    }

    return (

        <nav className="flex justify-between items-center p-4 lg:p-8 bg-black text-white min-h-full">
            <div className="logo-container">
                <a href='/'><img src={fdm} className="w-1/4"></img></a>
            </div>
            <ul className="signup-container flex space-x-2 text-base lg:text-lg">
                <li>
                    <a className="hover:underline focus:underline cursor-pointer" onClick={loginClick}>Login</a>
                </li>
                <li>
                    <a className="hover:underline focus:underline cursor-pointer" onClick={registerClick}>Register</a>
                </li>
            </ul>
        </nav>
    )
}