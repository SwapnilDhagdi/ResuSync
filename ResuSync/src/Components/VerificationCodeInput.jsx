import React, { useState, useRef } from 'react';
import './VerificationCodeInput.css'; 
const NUM_DIGITS = 4;

const VerificationCodeInput = ({ onComplete }) => {

    const [codes, setCodes] = useState(new Array(NUM_DIGITS).fill(''));
    
 
    const inputRefs = useRef([]);

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

    
        if (newCodes[index] && index < NUM_DIGITS - 1) {
            inputRefs.current[index + 1].focus();
        }

 
        const finalCode = newCodes.join('');
        if (finalCode.length === NUM_DIGITS) {
            onComplete(finalCode);
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
        
        if (pasteData.length === NUM_DIGITS && /^\d+$/.test(pasteData)) {
            const newCodes = pasteData.split('');
            setCodes(newCodes);
            onComplete(pasteData);
            inputRefs.current[NUM_DIGITS - 1].focus();
        }
    };


    return (
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
    );
};

export default VerificationCodeInput;