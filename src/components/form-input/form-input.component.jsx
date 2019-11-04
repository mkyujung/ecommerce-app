import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ handleChange, label, value, ... otherProps }) => (
    <div className="group">
        <input className='form-input' onChange={handleChange} {...otherProps} />
    {
        label ? 
        (<label 
            //check whether anything has been typed into form - if so apply 'shrink' class
            className={`${
                value.length} ? 'shrink' : ''
                } form-input-label `}
        >
            {label}
        </label>
        ) : null
    }
    
    </div>
)

export default FormInput;