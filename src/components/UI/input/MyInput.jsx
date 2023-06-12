import React from 'react';
import classes from './MyInput.module.css'

/**
 * The MyInput component is used to render a custom-styled input element.
 * It forwards a ref to the underlying input element.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.Ref} ref - A ref that will be forwarded to the underlying input element.
 * @param {any} [props.otherProps] - Any other props to be passed to the underlying input element.
 *
 * @returns {JSX.Element} The MyInput component.
 */
const MyInput = React.forwardRef((props, ref) => {

    // Render the input element with custom styling and forward the ref
    return (
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;
