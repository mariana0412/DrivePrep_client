import React, { useEffect, useState } from 'react';
import ProfileEdit from "./EditProfileInfo/ProfileEdit";
import PasswordEdit from "./EditProfileInfo/PasswordEdit";
import classes from './EditPage.module.css'
import MyButton from "../../components/UI/button/MyButton";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import {logout} from "../../utils/logout";
import EditService from "../../services/EditService";

// EditPage component definition.
const EditPage = () => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState([]);
    const id = localStorage.getItem('userId');

    // Fetching categories and user data on component mount.
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await EditService.getAllCategories();
                const userR = await EditService.getUserById(id);
                setCategories(response.data);
                setUser(userR.data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetch();
    }, []);

    // Handling the deletion of the user's profile.
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

    // Rendering the EditPage component.
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
