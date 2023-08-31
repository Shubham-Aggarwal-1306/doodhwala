import React from 'react'
import "./FormInput.css";
const FormInput = ({ setInputValue, label, type, value, id, pattern, isDisabled=false}) => {
    const handleChange = (e) => {
        if (pattern) {
            if (e.target.value.match(pattern) != null) {
                setInputValue(e.target.value);
            }
        } else {
            setInputValue(e.target.value);
        }
    }
    return (
        <div>
            <div className="form-input">
                <input type={type} placeholder={label} id={id} onChange={handleChange} value={value} disabled={isDisabled} />
                <label htmlFor={id}>{label}</label>
            </div>
        </div>
    )
}

export default FormInput
