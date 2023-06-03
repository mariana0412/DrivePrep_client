import React, { useEffect, useState } from 'react';
import ProfileEdit from "../EditProfileInfo/ProfileEdit";
import PasswordEdit from "../EditProfileInfo/PasswordEdit";
import classes from './EditPage.module.css'
import MyButton from "../UI/button/MyButton";
import CategoriesService from "../API/EditService";

const EditPage = (id) => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await CategoriesService.getAllCategories();
                const userR = await CategoriesService.getUserById(id);
                setCategories(response.data);
                setUser(userR.data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetch();
    }, []);

    return (
        <div className={classes.myEditPage}>
            <div className={classes.myEditPageColumn}>
                <ProfileEdit categories={categories} user={user}/>
                <PasswordEdit user={user}/>
            </div>
            <MyButton>Переглянути прогрес за темами</MyButton>
        </div>
    );
};

export default EditPage;
