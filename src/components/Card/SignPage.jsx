import React, { useEffect, useState } from 'react';
import Card from './Card';
import classes from './SignPage.module.css';
import List from './List';
import InfoService from '../API/InfoService';

const SignPage = () => {
    const [themes, setThemes] = useState([]);
    const [selectedThemeId, setSelectedThemeId] = useState(null);
    const [cardsData, setCardsData] = useState([]);

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

    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
    };

    return (
        <div className={classes.signPage}>
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
                <List
                    themes={themes}
                    selectedThemeId={selectedThemeId}
                    onThemeClick={handleThemeClick}
                />
            </div>
        </div>
    );
};

export default SignPage;
