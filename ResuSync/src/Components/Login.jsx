import '../css/Login.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';





function Login(){
    const{isAuthenticated,logout}=useAuth();
    return (
        <div className="Log_Sign_up">
            {!isAuthenticated ?
            <>
            <NavLink to={"/Login"}>
                <div className="Log_in"> <button className="Login_Button">Login</button> </div>
            </NavLink>
            <NavLink to={"/Signup"}>
                <div className="Sign_up"> <button className="Signup_Button">Sign Up</button></div>
            </NavLink>   
            <button className="Login_Button" onClick={logout}>
                Logout
            </button>
            </>:""
            }     
        </div>
    );
}
export default Login