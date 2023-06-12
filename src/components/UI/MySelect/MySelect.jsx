import React from 'react';
import classes from "./MySelect.module.css"

/**
 * The MySelect component renders a custom-styled select element with options.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.options - The options to be displayed in the select element. Each option is an object with `value` and `name` properties.
 * @param {string} props.defaultValue - The default display value for the select element when no option is selected.
 * @param {string|number} props.value - The currently selected value.
 * @param {function} props.onChange - The function to be called when the selected option changes.
 *
 * @returns {JSX.Element} The MySelect component.
 */
const MySelect = ({ options, defaultValue, value, onChange }) => {

    // Handle the change event of the select element
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    // Render the select element with custom styling, options, and handling of the change event
    return (
        <select className={classes.mySelect} value={value} onChange={handleSelectChange}>
            <option value="">{defaultValue}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default MySelect;
