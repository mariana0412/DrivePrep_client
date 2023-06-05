import React, { useState } from 'react';
import axios from 'axios';
import MyInput from "../../../components/UI/input/MyInput";
import MyButton from "../../../components/UI/button/MyButton";
import classes from "./PasswordEdit.module.css";


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
        if (newPassword !== repeatPassword) {
            alert("New password and repeat password do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put("http://localhost:8080/users/password", {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword
            });


            if (response.status === 200) {
                alert("Password changed successfully");
            } else {
                alert("Failed to change password");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("User not found");
            } else if (error.response && error.response.status === 400) {
                alert("Invalid old password");
            } else {
                console.error("Failed to change password:", error);
                alert("Failed to change password");
            }
        }

        setLoading(false);
    };

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
