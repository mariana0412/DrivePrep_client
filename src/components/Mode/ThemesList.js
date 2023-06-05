import React, { useEffect, useState } from "react";

const ThemesList = ({ categoryId, selectedThemeId, onThemeClick }) => {
    const [themes, setThemes] = useState([]);
    const [showEmpty, setShowEmpty] = useState(false);

    useEffect(() => {
        fetch(`/themes?categoryId=${categoryId}`)
            .then((response) => {
                if(response.status === 204)
                    return null;
                else
                    return response.json()
            })
            .then((data) => {
                if(data){
                    setThemes(data);
                    setShowEmpty(data.length === 0);
                } else {
                    setThemes([]);
                    setShowEmpty(true);
                }
            });
    }, [categoryId]);

    if (showEmpty) {
        return <div className="empty-div">No themes available.</div>;
    }

    return (
        <div className="themes-list">
            <div
                key="all"
                className={`theme-item ${"all" === selectedThemeId ? "active" : ""}`}
                onClick={() => onThemeClick("all")}
            >
                Усі питання
            </div>
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