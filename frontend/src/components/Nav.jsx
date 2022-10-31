export default function Nav(){

    return (
        <nav className="flex justify-between items-center p-4 lg:p-8 bg-black text-white min-h-full">
            <div className="logo-container">
                <h1 className="font-bold text-2xl lg:text-3xl">FDM Group</h1>
                {/* <img src="./star.png"/> */}
            </div>
            <div className="signup-container flex space-x-2 text-base lg:text-lg">
                <a className="hover:underline focus:underline cursor-pointer">Login</a>
                <a className="hover:underline focus:underline cursor-pointer">Register</a>
            </div>
        </nav>
    )
}