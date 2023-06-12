import React, { useState } from "react";
import MyButton from "../../components/UI/button/MyButton";
import { Label, Input } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import CustomAlert from "../../components/CustomAlert/CustomAlert";

/**
 * Define SignIn component
 * @returns {JSX.Element}
 */
const SignIn = () => {
    // State variables for email, password, modal visibility and modal message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Event handlers
    const handleUserNameChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Function to handle sign-in when the sign-in button is clicked
    const handleSignIn = () => {
        // User data to send to the server
        const userData = {
            email: email,
            password: password,
        };

        // Make POST request to the server
        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                // Check if the response is successful
                if (response.ok)
                    return response.json();
                else
                    throw new Error(response.status);
            })
            .then((data) => {
                // Populate local storage with token and user data, clear input fields and navigate to home page
                fillLocalStorage(data);
                clearInputFields();
                navigate('/');
            })
            .catch((error) => {
                // Show modal with error message if login failed
                if (error.message === "400") {
                    setModalMessage("Неправильний логін або пароль.");
                    openModal();
                }
                else
                    console.error(error);
            });
    };

    // Function to populate local storage with token and decoded user data
    const fillLocalStorage = (data) => {
        const token = data?.token;
        localStorage.setItem("token", token);

        const userId = jwt_decode(token)?.userId;
        localStorage.setItem("userId", userId);

        const userCategoryId = jwt_decode(token)?.userCategoryId
        localStorage.setItem("userCategoryId", userCategoryId);
    }

    // Function to clear input fields
    const clearInputFields = () => {
        setEmail("");
        setPassword("");
    }

    // Functions to open and close modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Render form
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Email input */}
            <div style={{ padding: '10px', margin: '10px' }}>
                <Label for="email" style={{ display: 'block', padding: '10px' }}>Логін: </Label>
                <Input
                    className="largeInput"
                    type="email"
                    id="email"
                    value={email }
                    onChange={handleUserNameChange}
                    style={{ width: '300px', borderRadius: '15px'}}
                />
            </div>

            {/* Password input */}
            <div style={{ padding: '10px', margin: '10px' }}>
                <Label for="password" style={{ display: 'block', padding: '10px' }}>Пароль: </Label>
                <Input
                    size='300'
                    className="largeInput"
                    type="password"
                    id="password"
                    value={password }
                    onChange={handlePasswordChange}
                    style={{ width: '300px' , borderRadius: '15px'}}
                />
            </div>

            {/* Sign in button */}
            <div style={{ padding: '10px', margin: '10px' }}>
                <MyButton style={{ width: '300px' }} onClick={handleSignIn}>
                    Увійти
                </MyButton>
            </div>

            {/* Custom alert modal */}
            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalMessage}
            />
        </div>
    );
};

export default SignIn;
