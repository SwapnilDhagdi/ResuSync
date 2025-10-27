import { useLoading } from "../Context/LoadingContext.jsx";
import Loader from "./Loader.jsx";
function AppWithLoader({children}){
    const {isLoading,loadingMessage}=useLoading();

    return (
        <>
            {isLoading&&<Loader message={loadingMessage}></Loader>}
            {children}
        </>
    )
}
export default AppWithLoader;