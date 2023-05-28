import React from 'react';
import classes from './MyButton.module.css'
const MyButton = (props) => {

    const btnClassName = `${classes.myBtn} ${props.isWhite ? classes.whiteBtn : classes.redBtn}`;

    return (
        <button {...props} className={btnClassName}>
            {props.children}
        </button>
    );
};

export default MyButton;
