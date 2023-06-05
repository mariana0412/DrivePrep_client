import React from 'react';

const SignsList = ({ themes, selectedThemeId, onThemeClick }) => {
    const showEmpty = themes.length === 0;

    if (showEmpty) {
        return <div className="empty-div">No themes available.</div>;
    }

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
