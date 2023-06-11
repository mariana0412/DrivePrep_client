import "./CustomAlert.css";
import MyButton from "../UI/button/MyButton";

const CustomAlert = ({ isOpen, onClose, message }) => {
    if (!isOpen)
        return null;

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