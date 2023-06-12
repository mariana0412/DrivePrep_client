import "./CustomAlert.css";
import MyButton from "../UI/button/MyButton";

/**
 * The CustomAlert component is used to render a custom alert modal with a message.
 * It is shown only when the isOpen prop is true.
 *
 * @param {Object} props - The props passed to the component.
 * @param {boolean} props.isOpen - A boolean indicating whether the alert should be open.
 * @param {function} props.onClose - The function to be called to close the alert.
 * @param {string} props.message - The message to be displayed in the alert.
 *
 * @returns {JSX.Element|null} The CustomAlert component or null if isOpen is false.
 */
const CustomAlert = ({ isOpen, onClose, message }) => {
    // If isOpen is false, do not render the component
    if (!isOpen)
        return null;

    // Render the custom alert modal with the message and a button to close it
    return (
        <div className="modal">
            <div className="modalContent">
                <h2>{message}</h2>
                <MyButton onClick={onClose}>Зрозуміло</MyButton>
            </div>
        </div>
    );
};

export default CustomAlert;