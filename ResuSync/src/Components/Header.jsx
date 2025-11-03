import image from "../assets/LogoCroped.png"
import { useAuth } from "../Context/AuthContext";
import '../css/Header.css'
import { NavLink } from "react-router-dom";

function Header(){
    const {isAuthenticated,logout,login}=useAuth();

    return (
        <>
            <nav className="Nav">
                <div className="Logo">
                    <div className="Logo_img"><img src={image} alt="Logo"  id="Logo"/> <h1 className="title">ResuSync</h1> </div>
                </div>

                {isAuthenticated?(
                    <div className="Function">
                    <NavLink to={"/Contact"}>
                        <div className="Contact"> <button className="Contact_Button">Contact</button> </div>
                    </NavLink>
                    <NavLink to={"/About"}>
                        <div className="About"><button className="About_Button"> About</button> </div>
                    </NavLink>
                    <NavLink to={"/"}>
                        <div className="About"><button className="About_Button"> Home</button> </div>
                    </NavLink>
                    <NavLink to={"/Profile"}>
                        <div className="About">
                        <button className="About_Button">Profile</button>
                    </div>
                    </NavLink>
                    <button className="About_Button" onClick={logout}>LogOut</button>
        </div>):(      
            <div className="Log_Sign_up">
            <NavLink to={"/Login"}>
                <div className="Log_in"> <button className="Login_Button">Login</button> </div>
            </NavLink>
            <NavLink to={"/Signup"}>
                <div className="Sign_up"> <button className="Signup_Button">Sign Up</button></div>
            </NavLink>    
            </div>)
            }
            </nav>
        </>
    );
}

export default Header;