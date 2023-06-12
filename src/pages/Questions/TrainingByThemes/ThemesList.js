import React, { useEffect, useState } from "react";

/**
 * Define the ThemesList component, which receives categoryId, selectedThemeId, and onThemeClick as props
 * @param categoryId
 * @param selectedThemeId
 * @param onThemeClick
 * @returns {JSX.Element}
 */
const ThemesList = ({ categoryId, selectedThemeId, onThemeClick }) => {

    // Define state variables for themes list and to show if the list is empty
    const [themes, setThemes] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);

    // Fetch themes based on categoryId from the server when the component mounts or categoryId changes
    useEffect(() => {
        fetch(`/themes?categoryId=${categoryId}`)
            .then((response) => {
                // If there is no content, return null
                if(response.status === 204)
                    return null;
                else
                    return response.json()
            })
            .then((data) => {
                if(data){
                    // If data exists, update themes and set showEmpty based on the data length
                    setThemes(data);
                    setShowEmpty(data.length === 0);
                } else {
                    // If data doesn't exist, set themes as empty array and showEmpty as true
                    setThemes([]);
                    setShowEmpty(true);
                }
            });
    }, [categoryId]);

    // If showEmpty is true, render a div indicating no themes are available
    if (showEmpty) {
        return <div className="empty-div">No themes available.</div>;
    }

    // Render the list of themes
    return (
        <div className="themes-list">
            <div
                key="all"
                className={`theme-item ${"all" === selectedThemeId ? "active" : ""}`}
                onClick={() => onThemeClick("all")}
            >
                Усі питання
            </div>

            {/* Map through the themes and render each theme */}
            {themes.map((theme) => (
                <div
                    key={theme.id}
                    className={`theme-item ${
                        theme.id === selectedThemeId ? "active" : ""
                    }`}
                    onClick={() => onThemeClick(theme.id)}
                >
                    {theme.name}
                </div>
            ))}
        </div>
    );
};

export default ThemesList;