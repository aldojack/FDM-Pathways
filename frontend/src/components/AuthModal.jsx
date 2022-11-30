import { useState } from "react";


const AuthModal = ({setShowModal, isSignUp}) => {

    const [email,  setEmail] = useState(null);
    const [password,  setPassword] = useState(null);
    const [confirmPassword,  setConfirmPassword] = useState(null);
    const [error,  setError] = useState(null);

    const handleClick = () => {
        setShowModal(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError("Passwords need to match!");
            }
            console.log("Make a post request to the database");
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div className="auth-modal absolute left-0 right-0 top-1/4 mx-auto max-w-xs h-max bg-white rounded-lg p-10 shadow-md">
            <div className="close-icon float-right cursor-pointer" onClick={handleClick}>✖</div>
            <h2 className="text-lg font-bold">{isSignUp ? 'Create Account' : 'Login'}</h2>
            <p className="text-sm">By clicking login, you agree to our terms.  Learn how we process your data in our Privacy Policy and Cookie Policy</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="enter password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                {isSignUp && <input 
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold"type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    )
}
export default AuthModal