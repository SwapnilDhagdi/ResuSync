import { createContext, useContext ,useState} from "react";

const LoadingContext=createContext(null);
export const useLoading=()=>useContext(LoadingContext);

export const LoadingProvider=({children})=>{

    const [isLoading,setIsLoading]=useState(false);
    const [loadingMessage,setLoadingMessage]=useState("Loading....");

    const showLoading=(message="Loading...")=>{
        setLoadingMessage(message);
        setIsLoading(true);
    }

    const hideLoading=()=>{
        setIsLoading(false);
    }

    return (

        <LoadingContext.Provider value={{isLoading,loadingMessage,setIsLoading,setLoadingMessage,showLoading,hideLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}

