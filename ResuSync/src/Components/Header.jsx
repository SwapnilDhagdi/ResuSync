import image from "../assets/LogoCroped.png"
import Function from './Function'
import Login from './Login'
import { useAuth } from "../Context/AuthContext";

function Header(props){
    const {isAuthenticated}=useAuth();
    return (
        <>
            <nav className="Nav">
                <div className="Logo">
                    <div className="Logo_img"><img src={image} alt="Logo"  id="Logo"/></div>
                </div>
                {isAuthenticated?(<Function></Function>):(<Login></Login>)
            }
            </nav>
        </>
    );
}

export default Header;