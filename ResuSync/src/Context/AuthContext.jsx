import React,{createContext,useState,useContext,useEffect, Children} from "react";
import instance from "../instance";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext(null);

export const useAuth=()=>useContext(AuthContext);


export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [password,setPassword]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    const navigate=useNavigate();

    const login=(userData)=>{
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout=async ()=>{
        try{
            await instance.post("/api/logout");
            
        }catch(error){
            
        }finally{
            setUser(null);
            setIsAuthenticated(false);
            navigate("/Login");
        }
    };

    useEffect(()=>{
        const checkAuthStatus=async()=>{
            try{
                const response=await instance.get('/api/user');
                login(response.data);
            }catch(error){
                setUser(null);
                setIsAuthenticated(false);
            }finally{
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    },[]);

    const contextValue={
        user,isAuthenticated,isLoading,login,logout,setIsLoading
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
