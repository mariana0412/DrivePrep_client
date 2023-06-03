import React from "react";
import Modal from "react-modal";
import MyButton from "../UI/button/MyButton";
import {ModalBody, ModalFooter} from "reactstrap";

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        width: "600px",
        height: "300px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
};

const ExplanationModal = ({ isOpen, closeModal, explanation }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Explanation Modal"
            style={modalStyles}
        >
            <ModalBody>
                <p>{explanation}</p>
            </ModalBody>

            <ModalFooter>
                <MyButton onClick={closeModal}>Зрозуміло!</MyButton>
            </ModalFooter>
        </Modal>
    );
};

export default ExplanationModal;