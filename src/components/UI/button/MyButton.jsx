import React from 'react';
import classes from './MyButton.module.css'
import {Button} from "reactstrap";

/**
 * The MyButton component is used to render a custom-styled button using the styles
 * from 'MyButton.module.css'. It can optionally be styled with different themes (white or red).
 *
 * @param {Object} props - The props passed to the component.
 * @param {boolean} [props.isWhite=false] - Determines the button's theme (white or red).
 * @param {React.ReactNode} props.children - The content to be displayed within the button.
 * @param {any} [props.otherProps] - Any other props to be passed to the underlying Button component.
 *
 * @returns {JSX.Element} The MyButton component.
 */
const MyButton = (props) => {

    // Compute the class name for the button based on the 'isWhite' prop
    const btnClassName = `${classes.myBtn} ${props.isWhite ? classes.whiteBtn : classes.redBtn}`;

    // Render the button with custom styling and content
    return (
        <Button {...props} className={btnClassName}>
            {props.children}
        </Button>
    );
};

export default MyButton;
