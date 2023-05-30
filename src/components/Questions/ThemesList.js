import React, { useEffect, useState } from "react";

const ThemesList = ({ selectedThemeId, onThemeClick }) => {
    /*TODO: make arrow in the lower part of the table for a larger number of categories*/
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        /*TODO: fetch themes according to chosen category if it was chosen*/
        fetch("/themes")
            .then((response) => response.json())
            .then((data) => setThemes(data));
    }, []);

    return (
        <div className="themes-list">
            <div
                key='all'
                className={`theme-item ${'all' === selectedThemeId ? "active" : ""}`}
                onClick={() => onThemeClick('all')}
            >
                Усі питання
            </div>
            {themes.map((theme) => (
                <div
                    key={theme.id}
                    className={`theme-item ${theme.id === selectedThemeId ? "active" : ""}`}
                    onClick={() => onThemeClick(theme.id)}
                >
                    {theme.name}
                </div>
            ))}
        </div>
    );
};

export default ThemesList;