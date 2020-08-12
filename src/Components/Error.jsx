import React from 'react';

const Error = ({error}) =>{
    return(
        <div className="error-display">
            <h3>{error}</h3>
        </div>
    )
}

export default Error; 