import React, { useEffect, useState } from 'react';
import ProfileEdit from "./EditProfileInfo/ProfileEdit";
import PasswordEdit from "./EditProfileInfo/PasswordEdit";
import classes from './EditPage.module.css'
import MyButton from "../../components/UI/button/MyButton";
import CategoriesService from "../../services/EditService";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import {logout} from "../../utils/logout";
import axios from "axios";
import EditService from "../../services/EditService";

const EditPage = (u) => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await EditService.getAllCategories();
                const userR = await EditService.getUserById(u);

                setCategories(response.data);
                setUser(userR.data)

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetch();
    }, []);

    const handleDeleteProfile = async () => {
        const confirmed = window.confirm('Ви справді хочете видалити профіль?');

        if (confirmed) {
            try {
                await EditService.deleteUser(user.id)
                logout()
                window.location.href = '/';
            } catch (error) {
                console.error('Error deleting profile:', error);
            }
        }
    };

    return (
        <div>
            <AppNavbar/>
            <div className={classes.myEditPage}>
                <div className={classes.myEditPageColumn}>
                    <ProfileEdit categories={categories} user={user}/>
                    <PasswordEdit user={user}/>
                </div>
                <MyButton onClick={handleDeleteProfile}>Видалити профіль</MyButton>
            </div>
        </div>
    );
};

export default EditPage;
