import FinesTable from "./FinesTable";
import './Fines.css';
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import React from "react";

/**
 * Define the Fines component
 * @returns {JSX.Element}
 */
const Fines = () => {
    // Return JSX that renders the AppNavbar and FinesTable components
    return (
        <div>
            <AppNavbar/>
            <FinesTable/>
        </div>
    )

}

export default Fines;