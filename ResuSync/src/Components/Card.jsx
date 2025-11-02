
import React, { useState ,useRef} from 'react';
import '../css/Card.css'; // <-- Import the CSS file
import axios from 'axios';
import instance from '../instance';
import { Routes,useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Loader from './Loader';
import { useLoading } from '../Context/LoadingContext.jsx';
 const Card = () => {
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const [buttonState,setButtonState]=useState(true);
  const navigate=useNavigate();
  const {showLoading,hideLoading}=useLoading();


  const handleFileChange = (event, setFileState) => {

    event.preventDefault();

    const file = event.target.files[0];
    console.log(event);
    if(file.type=="application/pdf"){
      setFileState(file);
      setSubmissionMessage('');
      setIsError(false); 
    }else{
      alert("File Supported PDF only")
    }
  };
  const handleAnalyse=()=>{
    showLoading("Analyzing Data");
    instance.get("/api/analyse",{withCredentials:true,timeout:0,params:{id:-1}},)
    .then(function(response){
     navigate("/AnalysisResult",{state:{responsedata:response.data}}); 
    }).catch(function(error){
    }).finally(function (){
      hideLoading();
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fileOne || !fileTwo) {
      setSubmissionMessage('Please select both files before submitting.');
      setIsError(true); 
      return;
    }
    const formData = new FormData();
    formData.append('resume', fileOne);
    formData.append('JD', fileTwo);
    showLoading("Updating files")
    setIsError(false); 
    // {formData.forEach(file=>{
    //     const form=new FormData();
    //     form.append("file",file);
    //     axios.post("http://localhost:8080/api/upload", form, {
    //     withCredentials: true
    //     })
    //     .then(function(response){
    //        
    //     })
    //     
    // })}
    
    instance.post("/api/upload",formData,{
      withCredentials:true,
    }).then(function (res){
      hideLoading();
      setButtonState(false);    
    }).catch(function(error){
      console.log(error);
      
    })
    .finally(function(){
      hideLoading();
    })
    
    setSubmissionMessage(`✅ Success! Files prepared for upload:
      File 1: ${fileOne.name}
      File 2: ${fileTwo.name}`);
  };

  return (
    <>
    <div className="file-form-container">
      <h2>Document Upload</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="file-input-group">
          <label htmlFor="fileOne">Upload Contract Document:</label>
          <input
            id="fileOne"
            type="file"
            onChange={(e) => handleFileChange(e, setFileOne)}
            accept='application/pdf'
            />
          <small>{fileOne ? `Selected: ${fileOne.name}` : 'No file selected.'}</small>
        </div>

  
        <div className="file-input-group">
          <label htmlFor="fileTwo">Upload Photo ID/Verification:</label>
          <input
            id="fileTwo"
            type="file"
            onChange={(e) => handleFileChange(e, setFileTwo)}
            accept="application/pdf"
            />
          <small>{fileTwo ? `Selected: ${fileTwo.name}` : 'No file selected.'}</small>
        </div>

        <button 
          type="submit" 
          className="file-submit-button"
          disabled={!fileOne || !fileTwo}
          >
          Submit Documents
        </button>
      </form>
      
 
      {submissionMessage && (
        <p className={`submission-message ${isError ? 'error' : ''}`}>
          {submissionMessage}
        </p>
      )}
      <button onClick={handleAnalyse} disabled={buttonState} className='file-submit-button'>Click to Analyse </button>
    </div>
      </>
  );
};

export default Card;