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
                <h1 className="font-bold text-2xl lg:text-3xl">FDM Group</h1>
                {/* <img src="./star.png"/> */}
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