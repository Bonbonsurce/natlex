import React from 'react';
import cl from './MyInput.css';

const MyInput = React.forwardRef(({ id, ...props }, ref) => {
    return (
        <input ref={ref} id={id} {...props} className="myInput"/>
    );
});

export default MyInput;