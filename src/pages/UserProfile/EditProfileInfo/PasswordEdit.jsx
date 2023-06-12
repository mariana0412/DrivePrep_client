import React, { useState } from 'react';
import axios from 'axios';
import MyInput from "../../../components/UI/input/MyInput";
import MyButton from "../../../components/UI/button/MyButton";
import classes from "./PasswordEdit.module.css";
import {
    oldAndNewPasswordsAreDifferent,
    passwordLengthIsValid,
    repeatPasswordIsEqualToPassword
} from "../../../utils/userDataValidation";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";

// Password Edit - component of EditPage
const PasswordEdit = ({ user }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Handling changes in the old password field.
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    // Handling changes in the new password field.
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    // Handling changes in the repeat password field.
    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    // Handling the password change.
    const handleChangePassword = async () => {
        if(!passwordIsValid())
            return;

        setLoading(true);

        try {
            const response = await axios.put("http://localhost:8080/users/password", {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword
            });

            if (response.status === 200) {
                setModalMessage("Пароль змінено успішно!");
                clearFields();
            }
            else
                setModalMessage("Не вийшло змінити пароль...");
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                const statusCode = error.response.status;
                const errorCode = getErrorCode(responseData);

                if (statusCode === 400 && errorCode === "ERR001")
                    setModalMessage("Неправильний старий пароль!");
                else if (statusCode === 400 && errorCode === "ERR002")
                    setModalMessage("Новий пароль коротший за 8 символів!");
                else
                    setModalMessage("Не вийшло змінити пароль...");
            }
        }
        openModal();
        setLoading(false);
    };

    // Validating the password fields.
    const passwordIsValid = () => {
        const validLength = passwordLengthIsValid(newPassword);
        const repeatPasswordIsEqual = repeatPasswordIsEqualToPassword(newPassword, repeatPassword);
        const differentOldAndNewPasswords = oldAndNewPasswordsAreDifferent(oldPassword, newPassword);

        if(validLength && repeatPasswordIsEqual && differentOldAndNewPasswords)
            return true;

        if(!validLength)
            setModalMessage("Пароль має мати більш ніж 8 символів!");
        else if(!repeatPasswordIsEqual)
            setModalMessage("Паролі не збігаються!");
        else if(!differentOldAndNewPasswords)
            setModalMessage("Старий і новий паролі ідентичні!");
        openModal();

        return false;
    }

    // Clearing the password fields.
    const clearFields = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatPassword('');
    }

    // Extracting the error code from the error response data.
    const getErrorCode = (responseData) => {
        const errorParts = responseData.split(":");
        return errorParts[0].trim();
    }

    // Opening and closing the modal.
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Rendering the PasswordEdit component.
    return (
        <div className={classes.container}>
            <div>
                <p>Старий пароль</p>
                <MyInput type="password" value={oldPassword} onChange={handleOldPasswordChange} />
            </div>
            <div>
                <p>Новий пароль</p>
                <MyInput type="password" value={newPassword} onChange={handleNewPasswordChange} />
            </div>
            <div>
                <p>Повторіть пароль</p>
                <MyInput type="password" value={repeatPassword} onChange={handleRepeatPasswordChange} />
            </div>
            <div>
                <MyButton isWhite onClick={handleChangePassword} disabled={loading}>
                    {loading ? "Зміна пароля..." : "Змінити пароль"}
                </MyButton>
            </div>
            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalMessage}
            />
        </div>
    );
};

export default PasswordEdit;
