import FinesTable from "./FinesTable";
import './Fines.css';
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import React from "react";

const Fines = () => {
    return (
        <div>
            <AppNavbar/>
            <FinesTable/>
        </div>
    )

}

export default Fines;