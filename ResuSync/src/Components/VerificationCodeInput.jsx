import React, { useState, useRef } from 'react';
import './VerificationCodeInput.css'; // Don't forget to create this CSS file!

const NUM_DIGITS = 4;

const VerificationCodeInput = ({ onComplete }) => {
    // State to hold the 4 individual digits
    const [codes, setCodes] = useState(new Array(NUM_DIGITS).fill(''));
    
    // useRef to manage focus on the input elements
    const inputRefs = useRef([]);

    // Handler for every key change in an input box
    const handleChange = (e, index) => {
        const value = e.target.value;
        const newCodes = [...codes];

        // 1. Basic input sanitization: only allow one digit
        if (value.length > 1) {
            newCodes[index] = value.charAt(0);
        } else if (value === '' || /^\d$/.test(value)) {
            newCodes[index] = value;
        } else {
            // Ignore non-digit input
            return;
        }

        setCodes(newCodes);

        // 2. Auto-focus the next input box if a digit was entered
        if (newCodes[index] && index < NUM_DIGITS - 1) {
            inputRefs.current[index + 1].focus();
        }

        // 3. Check for completion
        const finalCode = newCodes.join('');
        if (finalCode.length === NUM_DIGITS) {
            onComplete(finalCode);
        }
    };

    // Handler for keyboard navigation and deletion
    const handleKeyDown = (e, index) => {
        // Backspace functionality: move back and clear current field if empty
        if (e.key === 'Backspace' && !codes[index] && index > 0) {
            e.preventDefault(); // Prevent browser back navigation
            inputRefs.current[index - 1].focus();
        }
    };
    
    // Handler for pasting a code (e.g., from an SMS)
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        
        if (pasteData.length === NUM_DIGITS && /^\d+$/.test(pasteData)) {
            const newCodes = pasteData.split('');
            setCodes(newCodes);
            onComplete(pasteData);
            inputRefs.current[NUM_DIGITS - 1].focus(); // Focus the last box
        }
    };


    return (
        <div className="code-input-container" onPaste={handlePaste}>
            {codes.map((code, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1} // Important: limits input to one character
                    value={code}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={el => inputRefs.current[index] = el}
                    className="code-input-box"
                    autoFocus={index === 0} // Auto-focus the first box on mount
                    // aria attributes for accessibility
                    aria-label={`Digit ${index + 1} of verification code`}
                    inputMode="numeric" // Optimizes keyboard on mobile for numbers
                />
            ))}
        </div>
    );
};

export default VerificationCodeInput;