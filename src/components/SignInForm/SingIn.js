import { useState } from "react";
import MyButton from "../UI/button/MyButton";
import { Label, Input } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const navigate = useNavigate();

    const handleSignIn = () => {
        const userData = {
            email: email,
            password: password,
        };

        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error(response.status);
            })
            .then((data) => {
                fillLocalStorage(data);
                clearInputFields();
                navigate('/');
            })
            .catch((error) => {
                if (error.message === "400")
                    alert("Неправильний логін або пароль.");
                else
                    console.error(error);
            });
    };

    const fillLocalStorage = (data) => {
        const token = data?.token;
        localStorage.setItem("token", token);

        const userId = jwt_decode(token)?.userId;
        localStorage.setItem("userId", userId);

        const userCategoryId = jwt_decode(token)?.userCategoryId
        localStorage.setItem("userCategoryId", userCategoryId);
    }

    const clearInputFields = () => {
        setEmail("");
        setPassword("");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
            
            <div style={{ padding: '10px', margin: '10px' }}>
                <MyButton style={{ width: '300px' }} onClick={handleSignIn}>
                    Увійти
                </MyButton>
            </div>
        </div>
    );
};

export default SignIn;
