import React from 'react';

// SignsList component definition.
const SignsList = ({ themes, selectedThemeId, onThemeClick }) => {

    // Check if there are no themes available.
    const showEmpty = themes.length === 0;

    // Render an empty message if there are no themes.
    if (showEmpty) {
        return <div className="empty-div">No themes available.</div>;
    }

    // Render the list of themes.
    return (
        <div className="themes-list">
            {themes.map((theme) => (
                <div
                    key={theme.id}
                    className={`theme-item ${theme.id === selectedThemeId ? 'active' : ''}`}
                    onClick={() => onThemeClick(theme.id)}
                >
                    {theme.name}
                </div>
            ))}
        </div>
    );
};

export default SignsList;
