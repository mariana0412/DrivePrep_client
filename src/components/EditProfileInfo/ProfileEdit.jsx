import React, { useState, useEffect } from 'react';
import MyInput from "../UI/input/MyInput";
import classes from "./ProfileEdit.module.css";
import MyButton from "../UI/button/MyButton";
import MySelect from "../UI/MySelect/MySelect";

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

        fetch(`http://localhost:8080/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileUpdatePayload),
        })
            .then(response => {
                if (response.ok) {
                   alert('Profile data saved successfully');
                   
                } else {
                    alert('Failed to update profile data');
                }
            })
            .catch(error => {
                console.error('Failed to update profile data:', error);
            });
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
