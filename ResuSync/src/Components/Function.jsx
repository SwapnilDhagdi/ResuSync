import {Link,NavLink} from "react-router-dom";
import instance from "../instance";
import { useAuth } from "../Context/AuthContext";
import { useLoading } from "../Context/LoadingContext";
function Function(){
    const {logout} =useAuth();
    return (
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
        </div>
    );
}
export default Function