import React, { useRef, useState } from 'react';
import '../css/Form.css';
import instance from '../instance.js';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

function SignUp({ formTitle, buttonText }){
  const navigate=useNavigate();
  
  const [codes, setCodes] = useState(new Array(4).fill(''));
     const fields = [
       { name: 'name', label: 'name', type: 'text', required: true },
       { name: 'email', label: 'email', type: 'email', required: true },
       { name: 'password', label: 'password', type: 'password', required: true },
      ];

const [formState, setFormState] = useState(
  fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);
const inputRefs = useRef([]);
const [errorMsg,setErrorMsg] =useState();
const [verificationCode,setVerificationCode]=useState(0);
const [isHidden,setIsHidden]=useState(true);
  const ref=useRef({});
  const {login}=useAuth();
  const [codesent,setCodeSent]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState, 
      [name]: value,
    });
  };
  const handleHidden=()=>{
    setIsHidden(!isHidden);
  }
  const handleSubmit =  (e) => {
    e.preventDefault();
    
    
  instance.get('/api/sendEmail',{timeout:0,params:{email:formState.email,username:formState.name}})
  .then(function (response){
    if(response.data==-1){
      setErrorMsg("Email already Present")
    }else{
      setErrorMsg(null);
      setVerificationCode(response.data);
      setCodeSent(true);
    }
  })
  .catch(function(error){
    console.log(error);
  })
} 
const VerificationCodeInput = () => {
        const callAPI=()=>{
           instance.post('/api/register',{
            name:formState.name,
            email:formState.email,
            password:formState.password
        })
        .then(function(response){
            if(!response.data){
                setErrorMsg("Email already present");
            }else{ 
                  setErrorMsg("You are Authorized");
                  login(formState)
                  navigate("/Login")
            }
        })
        .catch(function(error){
            console.log(error)
        })
        .finally(function(){
         
        })
      
        }
       
        const handleChange = (e, index) => {
            const value = e.target.value;
            const newCodes = [...codes];

            if (value.length > 1) {
                newCodes[index] = value.charAt(0);
            } else if (value === '' || /^\d$/.test(value)) {
                newCodes[index] = value;
            } else {
               
                return;
            }
    
            setCodes(newCodes);
    
            if (newCodes[index] && index < 4 - 1) {
                inputRefs.current[index + 1].focus();
            }
    

            const finalCode = newCodes.join('');
            if (finalCode.length === 4) {
               if(finalCode==verificationCode){
                console.log("Code Correct");
                callAPI();
               }else{
                console.log("incorrect code");
                setErrorMsg("Incorrect Code");
               }
            }
        };

        const handleKeyDown = (e, index) => {

            if (e.key === 'Backspace' && !codes[index] && index > 0) {
                e.preventDefault();
                inputRefs.current[index - 1].focus();
            }
        };
        
        const handlePaste = (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            
            if (pasteData.length === 4 && /^\d+$/.test(pasteData)) {
                const newCodes = pasteData.split('');
                setCodes(newCodes);
                if(newCodes==verificationCode){
                  callAPI();
                }
                inputRefs.current[4 - 1].focus();
            }
        };
    
    
        return (
          <>
            <div className="code-input-container" onPaste={handlePaste}>
                {codes.map((code, index) => (
                  <input
                        key={index}
                        type="text"
                        maxLength={1} 
                        value={code}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={el => inputRefs.current[index] = el}
                        className="code-input-box"
                        autoFocus={index === 0} 
                        aria-label={`Digit ${index + 1} of verification code`}
                        inputMode="numeric" 
                        />
                      ))}

                </div>
                {errorMsg?
                <div style={{ 
                  color: 'red', 
                  marginTop: '10px', 
                  padding: '10px', 
                  border: '1px solid red', 
                  backgroundColor: '#ffe6e6' 
                }}>
                <strong>Error:</strong> {errorMsg}
                </div>:""
                }
            </>
        );
    };
    

  
  return (
    <>
    {codesent? VerificationCodeInput():
    <div className="form-container">
      {formTitle && <h2>{formTitle}</h2>}
      <form onSubmit={handleSubmit} className="generic-form">
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label} {field.label==='password'? (isHidden)?<FaEye onClick={handleHidden}/>:<FaEyeSlash onClick={handleHidden}/>:""} </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                required={field.required}
              ></textarea>
            ) : (
              <input

              type={field.type==='password'?(!isHidden)?"password":"text":field.type}    

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
        {errorMsg && <h3> {errorMsg}</h3>}
      </form>
    </div>
    }
  </>
  );
};

export default SignUp;