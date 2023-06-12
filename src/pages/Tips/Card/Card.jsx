import classes from './Card.module.css';

// Define Card component for Carousel
const Card = ({ image, title, description }) => {

    return (
        <div className={classes.card}>
            <h1>{title}</h1>
            <img src={process.env.PUBLIC_URL +'/sign/'+image} />
            <p>{description}</p>
        </div>
    );
};

export default Card;
