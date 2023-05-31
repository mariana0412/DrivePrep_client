import React from 'react';
import classes from './MyButton.module.css'
import {Button} from "reactstrap";
const MyButton = (props) => {

    const btnClassName = `${classes.myBtn} ${props.isWhite ? classes.whiteBtn : classes.redBtn}`;

    return (
        <Button {...props} className={btnClassName}>
            {props.children}
        </Button>
    );
};

export default MyButton;
