import { useState } from 'react'
import Header from './Components/Header';
import Body from './Body'
import Footer  from './Components/Footer';
import axios from "axios"
import {Route,Routes, useLocation,Navigate} from 'react-router-dom';
import About from './Components/About';
import Contact from './Components/Contact';
import Profile from './Components/Profile'
import SignUp from './Components/SignUp'
import Form from './Components/Form'
import AnalysisResult from './Components/AnalysisResult';
import { useAuth } from './Context/AuthContext';
import Loader from "./Components/Loader";
import ImprovementPlan from './Components/ImprovementPlan';
import { LoadingProvider } from './Context/LoadingContext';
import AppWithLoader from "./Components/AppWithLoader";
import instance from './instance';
function App() {
  const[isLogin,setIsLogin]=useState(false);

  function handleRequest(){
    instance.get("/api")
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error)
    })
    .finally(function(){
      console.log("backend executed")
    })
  }
  
  return (
    <>

    <Header isLogin={isLogin}></Header>
      <LoadingProvider>
        <AppWithLoader>
        <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Body></Body>
        </ProtectedRoute> }/>
        <Route path='/About' element={<About></About>}/>
        <Route path="/Contact" element={<Contact></Contact>} />
        <Route path='/Profile' element={ <Profile></Profile> }/>
        <Route path='/Login' element={<Form formTitle="Login Form" buttonText="Login"></Form>}/>
        <Route path="/SignUp" element={<SignUp formTitle="SignUp Form" buttonText="Sign up"></SignUp>} />
        <Route path='/AnalysisResult' element={ <AnalysisResult></AnalysisResult>}> </Route>
        <Route path='/ImprovementPlan'element={ <ImprovementPlan></ImprovementPlan> } > </Route>
      </Routes>
        </AppWithLoader>  
      </LoadingProvider>

    <Footer></Footer>
    </>

  );

  function ProtectedRoute({children}){
    const {isAuthenticated,isLoading}=useAuth();
    const location=useLocation();
    if(isLoading){
        return <Loader></Loader>
    }
    if(!isAuthenticated){
        return <Navigate to="/Login" state={{from:location}} replace></Navigate>
    }
    return children;
}
}

export default App

