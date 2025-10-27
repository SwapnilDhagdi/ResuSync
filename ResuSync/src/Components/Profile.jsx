import React, { useEffect, useState } from 'react';
import '../css/Profile.css';
import {useAuth} from "../Context/AuthContext";
import instance from '../instance';
import { useNavigate } from 'react-router-dom';

import { useLoading } from '../Context/LoadingContext';
const Profile = () => {

  const [user1, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'React developer passionate about building user-friendly web applications.',
    location: 'San Francisco, CA',
  });
  const [files,setFiles]=useState([]);
  const {user,isAuthenticated,isLoading,logout}=useAuth();
  const {showLoading,hideLoading} =useLoading();
  const navigate=useNavigate();
  const [deleteConfirmation,setDeleteComfirmation]=useState(false);
  useEffect(()=>{
    const fetchData=()=>{
      instance.get("/api/getFiles",{withCredentials:true,timeout:0})
      .then(function(response){
        console.log(response.data);
        setFiles(response.data);
      })
      .catch(function(error){
        console.log(error);
      })
    }
    fetchData();
  },[])
const downloadFile = (id) => {
    
  files.forEach((file)=>{

      if(file.id==id){
        for(let n=0;n<2;n++){
          var base64Data=0;
          var fileName="";
          var fileType="";
          if(n==0){
             base64Data=file.fileData;
             fileName=file.fileName;
             fileType=file.fileType;

          }else{
             base64Data=file.jdfileData;
             fileName=file.jdfileName;
             fileType=file.jdfileType;
          }
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          
          
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          
          // Create a Blob
          const blob = new Blob([byteArray], { type: fileType });
          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          
          // Append to body, trigger click, and remove
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }    
    }
  )
};
const DeleteConfirmationModal = (id) => {
    console.log("id got at DeletetionConfirmationModel"+id)
    const onConfirm=()=>{

        console.log("deleting ......")
        showLoading("Deleting profile");
        instance.get("/api/deleteProfile",{withCredentials:true,timeout:0,params:{
          id:id
        }})
        .then(function(response){
          setDeleteComfirmation(false);
          console.log(response);
          hideLoading();
          logout();
        })
        .catch(function(error){
          console.log(error);
        })
    }
    const handleReturn=(event)=>{
        if(event.currentTarget===event.target ){
            setDeleteComfirmation(false);
        }
    } 
    return (
        <div className="modal-overlay"  onClick={handleReturn}>
            <div className="modal-content" >
                
                <h3>Confirm Account Deletion ⚠️</h3> 
                
                <p>Are you absolutely sure you want to delete your account?</p>
                <p className="warning-text">
                    This action <strong>cannot be undone</strong>  and all your associated data (files, records, etc.) will be permanently lost.
                </p>
                
                <div className="modal-actions">
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleReturn}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={onConfirm}

                    >
                        deleting
                    </button>
                </div>
            </div>
        </div>
    );
};

const handleAnalyze =(id)=>{

  instance.get("/api/analyse",{withCredentials:true,timeout:0,params:{id:id}})
  .then(function(response){
    navigate("/AnalysisResult",{state:{responsedata:response.data}})
  })
  .catch(function(error){
    console.log(error);
  });
}
 const handleDeletionClick=()=>{
   setDeleteComfirmation(true);
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user1, [name]: value });
  };

  return (
    <>
  
    {deleteConfirmation?DeleteConfirmationModal(user.id):""}
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button onClick={handleDeletionClick} className="edit-btn">
          Delete Profile
        </button>
      </div>

      <div className="profile-details">
        <div className="profile-avatar">
          {/* A simple placeholder for a user avatar */}
          <div className="avatar-placeholder">{user.username.charAt(0)}{user.username.charAt(user.username.length-1)}</div>
        </div> 
          <div className="profile-info">
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        
      </div>

     <div className="file-list-container">
            <h2>Uploaded Files ({files.length})</h2>
            <ul className="file-list">
                {files.map((file) => (
                  <li key={file.id} className="file-list-item">
                        <div className="file-details">
                            <span className="file-name">Resume:{file.fileName}</span>
                            <span className="file-id">JD:{file.jdfileName}</span>
                        </div>
                         <button
                            className="download-button"
                            key={file.id}   
                            onClick={()=>handleAnalyze(file.id)}  
                            >
                            Analyze Report
                        </button>
                        <button
                            className="download-button"
                            onClick={() => downloadFile(file.id)}
                            title={`Download ${file.fileName}`}
                            >
                            Download
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div> 
  
    </>
  );
};

export default Profile;