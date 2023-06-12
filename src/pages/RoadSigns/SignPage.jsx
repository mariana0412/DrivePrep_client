import React, { useEffect, useState } from 'react';
import Card from '../Tips/Card/Card';
import classes from './SignPage.module.css';
import SignsList from './SignsList';
import InfoService from '../../services/InfoService';
import AppNavbar from "../../components/AppNavbar/AppNavbar";

/**
 * SignPage component definition.
 * @returns {JSX.Element}
 */
const SignPage = () => {

    // State variables to track themes, selected theme, and cards data.
    const [themes, setThemes] = useState([]);
    const [selectedThemeId, setSelectedThemeId] = useState(null);
    const [cardsData, setCardsData] = useState([]);

    // Fetching themes from the InfoService API.
    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await InfoService.getAllSignThemes();
                setThemes(response.data);
                setSelectedThemeId(response.data[0]?.id);
            } catch (error) {
                console.error('Error fetching themes:', error);
            }
        };

        fetchThemes();
    }, []);

    // Fetching cards data based on the selected theme.
    useEffect(() => {
        const fetchCardsData = async () => {
            try {
                const response = await InfoService.getAllThemeSign(selectedThemeId);
                setCardsData(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        if (selectedThemeId) {
            fetchCardsData();
        }
    }, [selectedThemeId]);

    // Event handler for theme selection.
    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
    };

    // Render the SignPage component.
    return (
        <div className={classes.signPage}>
            <AppNavbar/>
            <div className={classes.cardContainer}>
                {cardsData.map((card) => (
                    <Card
                        className={classes.card}
                        key={card.id}
                        image={card.picturePath}
                        title={card.name}
                        description={card.text}
                    />
                ))}

            </div>
            <div className={classes.listContainer}>
                <SignsList
                    themes={themes}
                    selectedThemeId={selectedThemeId}
                    onThemeClick={handleThemeClick}
                />
            </div>
        </div>
    );
};

export default SignPage;
