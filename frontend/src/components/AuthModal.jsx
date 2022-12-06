import { useState } from "react";
import axios from 'axios';
import {redirect} from 'react-router-dom';
import {useCookies} from 'react-cookie';


const AuthModal = ({setShowModal, isSignUp}) => {

    const [firstName,  setFirstName] = useState(null);
    const [lastName,  setLastName] = useState(null);
    const [email,  setEmail] = useState(null);
    const [confirmEmail,  setConfirmEmail] = useState(null);
    const [password,  setPassword] = useState(null);
    const [confirmPassword,  setConfirmPassword] = useState(null);
    const [error,  setError] = useState(null);
    const [cookie,  setCookie, removeCookie] = useCookies(['user']);

    // let navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(isSignUp){
                if(password !== confirmPassword || email !== confirmEmail){
                    setError("Please check your email and passwords match");
                    return
                }
            }
            
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'register' : 'login'}`, {firstName, lastName, email, password});
            // setCookie('Email', response.data.email);
            setCookie('UserId', response.data.user_id);
            setCookie('AuthToken', response.data.token);
            const success = response.status == 201;

            if(success) {
                setShowModal(false);
                return redirect('/');
                // return redirect('/dashboard');
            }

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
            
            {isSignUp && 
            <>
                <input 
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="enter first name"
                    required={true}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input 
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="enter last name"
                    required={true}
                    onChange={(e) => setLastName(e.target.value)}
                /> 
            </>}
            <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />                
                {isSignUp && <input 
                    type="email"
                    id="confirm_email"
                    name="confirm_email"
                    placeholder="confirm email"
                    required={true}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />}
                
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
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold" type="submit" value={isSignUp ? 'Create Account' : 'Login'}/>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    )
}
export default AuthModal