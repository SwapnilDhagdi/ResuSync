import Card from './Components/Card'
import Form from './Components/Form'
import { useAuth } from './Context/AuthContext';
function Body(props){
   const {isAuthenticated} =useAuth();
    return (
        <>
            <div className="body">

                {isAuthenticated?(
                <>
                <Card></Card>
                </>
                ):(<Form formTitle="Login Form" buttonText="Login" ></Form>)
                }
            </div>
        </>

    );
}
export default Body