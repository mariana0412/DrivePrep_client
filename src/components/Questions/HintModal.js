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

const HintModal = ({ isOpen, closeModal, hint }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Explanation Modal"
            style={modalStyles}
        >
            <ModalBody>
                <p>{hint}</p>
            </ModalBody>

            <ModalFooter>
                <MyButton onClick={closeModal}>Зрозуміло!</MyButton>
            </ModalFooter>
        </Modal>
    );
};

export default HintModal;