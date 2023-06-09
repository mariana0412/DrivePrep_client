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


const PasswordEdit = ({ user }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

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
                alert("Пароль змінено успішно!");
                clearFields();
            }
            else
                alert("Не вийшло змінити пароль.");
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                const statusCode = error.response.status;
                const errorCode = getErrorCode(responseData);

                if (statusCode === 400 && errorCode === "ERR001")
                    alert("Неправильний старий пароль.");
                else if (statusCode === 400 && errorCode === "ERR002")
                    alert("Новий пароль не відповідає вимогам.");
                else
                    alert("Не вийшло змінити пароль.");
            }
        }
        setLoading(false);
    };

    const passwordIsValid = () => {
        const validLength = passwordLengthIsValid(newPassword);
        const repeatPasswordIsEqual = repeatPasswordIsEqualToPassword(newPassword, repeatPassword);
        const differentOldAndNewPasswords = oldAndNewPasswordsAreDifferent(oldPassword, newPassword);

        if(validLength && repeatPasswordIsEqual && differentOldAndNewPasswords)
            return true;
        else if(!validLength)
            alert("Пароль має мати більш ніж 8 символів!");
        else if(!repeatPasswordIsEqual)
            alert("Паролі не збігаються!");
        else if(!differentOldAndNewPasswords)
            alert("Старий і новий паролі ідентичні");
        return false;
    }

    const clearFields = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatPassword('');
    }

    const getErrorCode = (responseData) => {
        const errorParts = responseData.split(":");
        return errorParts[0].trim();
    }

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
        </div>
    );
};

export default PasswordEdit;
