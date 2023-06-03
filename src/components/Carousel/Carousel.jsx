import React, { useState } from 'react';
import classes from "./carousel.module.css"

const Carousel = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    const visibleCards = [
        cards[activeIndex],
        cards[(activeIndex + 1) % cards.length],
        cards[(activeIndex + 2) % cards.length],
        cards[(activeIndex + 3) % cards.length]
    ];

    return (
        <div className={classes.carousel}>
            <button className={`${classes.arrow} ${classes.left}`} onClick={handlePrev}>{'<'}</button>
            <div className={classes['carousel-items']}>
                {visibleCards.map((card, index) => (
                    <div key={index} className={classes['carousel-item']}>
                        <h2>{card.title}</h2>
                        <p>{card.content}</p>
                    </div>
                ))}
            </div>
            <button className={`${classes.arrow} ${classes.right}`} onClick={handleNext}>{'>'}</button>
        </div>
    );
};

export default Carousel;
