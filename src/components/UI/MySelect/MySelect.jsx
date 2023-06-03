import React from 'react';
import classes from "./MySelect.module.css"

const MySelect = ({ options, defaultValue, value, onChange }) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

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
