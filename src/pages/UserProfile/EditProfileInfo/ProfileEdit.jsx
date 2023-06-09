import React, { useState, useEffect } from 'react';
import MyInput from "../../../components/UI/input/MyInput";
import classes from "./ProfileEdit.module.css";
import MyButton from "../../../components/UI/button/MyButton";
import MySelect from "../../../components/UI/MySelect/MySelect";
import {emailFormatIsValid, emailIsRu, nameAndSurnameAreNotEmpty} from "../../../utils/userDataValidation";

const ProfileEdit = ({ categories, user }) => {
    const [newSurname, setNewSurname] = useState('');
    const [newName, setNewName] = useState('');
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (user) {
            setNewSurname(user.surname || '');
            setNewName(user.name || '');
            setNewCategoryId(user.categoryId || '');
            setNewEmail(user.email || '');
        }
    }, [user]);

    const handleProfileUpdate = () => {
        const profileUpdatePayload = {
            id: user.id,
            surname: newSurname || user.surname,
            name: newName || user.name,
            categoryId: newCategoryId|| user.categoryId,
            email: newEmail || user.email,
        };

        if(!nameIsValid() || !emailIsValid())
            return;

        fetch(`http://localhost:8080/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileUpdatePayload),
        })
            .then(response => {
                if (response.ok)
                   alert('Інформація змінена успішно!');
                else if(response.status === 400)
                    alert('Ця електронна адреса вже використовується!');
                else
                    alert("Не вийшло змінити інформацію...")
            })
            .catch(error => {
                console.error('Не вийшло змінити інформацію:', error);
            });
    };

    const emailIsValid = () => {
        const validEmailFormat = emailFormatIsValid(newEmail);
        const ruEmail = emailIsRu(newEmail);

        if(validEmailFormat && !ruEmail)
            return true;
        else if(!validEmailFormat)
            alert("Будь-ласка, введіть коректну електронну адресу.");
        else if(ruEmail)
            alert("Система не підтримує використання РОСІЙСЬКИХ поштових адрес");
        return false;
    }

    const nameIsValid = () => {
        if(!nameAndSurnameAreNotEmpty(newName, newSurname)) {
            alert("Ім'я та прізвище є обов'язковими.");
            return false;
        }
        return true;
    };

    return (
        <div className={classes.container}>

            <div className={classes.inputContainer}>
                <div>
                    <p>Прізвище</p>
                    <MyInput value={newSurname} onChange={e => setNewSurname(e.target.value)} />
                </div>

                <div>
                    <p>Ім'я</p>
                    <MyInput value={newName} onChange={e => setNewName(e.target.value)} />
                </div>

                <div>
                    <p>Категорія</p>
                    <MySelect
                        defaultValue={categories.find(category => category.id === user.categoryId)?.name || "Категорія"}
                        options={categories.filter(category => category.id !== 0 && category.id !== user.categoryId).map((category) => ({
                            value: category.id,
                            name: category.name
                        }))}
                        onChange={selectedValue => {
                            setNewCategoryId(selectedValue);
                        }}
                    />
                </div>

                <div>
                    <p>Електронна пошта</p>
                    <MyInput value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                </div>
            </div>
            <MyButton isWhite onClick={handleProfileUpdate}>Зберегти зміни</MyButton>
        </div>
    );
};

export default ProfileEdit;
