import React, { useEffect } from 'react';
import '../css/Loader.css';
import image from "../assets/Logo.png"
const Loader = ({message}) => {
  return (
    <div className='container'>
      <div className="loader-container">
        <div className="logo-wrapper">
          <img src={image} alt="Resusync Logo" className="logo" />
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
        </div>

          <div className="circle-loader-container"
           style={{width: "75px",height: "75px", borderColor:"blue transparent"}}role="status" aria-live="polite" aria-label="Loading"
          >
            <span className="visually-hidden">message</span>
          </div>
        <p className="loading-text">{message?message:"loading"}</p>
      </div>
    </div>
  );
};

export default Loader;