import React, { useRef, useState } from 'react';
import '../css/Form.css';
import instance from '../instance.js';
import { Navigate,useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useLoading } from '../Context/LoadingContext.jsx';

function Form({ formTitle, buttonText }){
     const fields = [
  { name: 'email', label: 'email', type: 'email', required: true },
  { name: 'password', label: 'password', type: 'password', required: true },
];
  const {showLoading,hideLoading}=useLoading();
  const {login}=useAuth();
  const [formState, setFormState] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errorMsg,setErrorMsg] = useState();

  const ref=useRef({});
  const navigate=useNavigate();
  const [hidden,setHidden]=useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const changeHidden=()=>{

    if(hidden){
      setHidden(false);
    }else{
      setHidden(true);
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading("Validating")
    instance.post('/api/validate',{
        email:formState.email,
        password:formState.password
    })
    .then(function(response){
        hideLoading();
        if(!response.data){
          setErrorMsg("Invalid data")
        }else{
          setErrorMsg("You are Authorized");
          login(response.data);
          navigate("/")
        }
      
    })
    .catch(function(error){
        if(error.response.status==401){
          setErrorMsg("Credential MisMatched")
        }
    })
    .finally(function(){
      hideLoading();
        ref.current.email.value="";
        ref.current.password.value="";

    })
  };
  return (
    <div className="form-container">
      {formTitle && <h2>{formTitle}</h2>}
      <form onSubmit={handleSubmit} className="generic-form">
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label} {field.type=="password"? (hidden)?(< FaEye onClick={changeHidden}  />):(<FaEyeSlash onClick={changeHidden}/>):'' }</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                required={field.required}
              > </textarea>
            ) : (
              
              <input
                type={field.name=="email"?"email" :(!hidden)?"password":"text"}
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                required={field.required}
                ref={(el)=>ref.current[field.name]=el}                
                />
                
            
            )}
          </div>
        ))}
        <button type="submit" className="form-submit-btn">
          {buttonText || 'Submit'}
        </button>
        {errorMsg && 
        <div style={{ 
          color: 'red', 
          marginTop: '10px', 
          padding: '10px', 
          border: '1px solid red', 
          backgroundColor: '#ffe6e6' 
        }}>
          {errorMsg && <div className="login-error-message" role="alert"><p>{errorMsg}</p></div>}
        </div>
        }
      </form>
    </div>
  );
};

export default Form;