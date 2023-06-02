import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const SignIn = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleUserNameChange = (e) => setUserName(e.target.value);
    const handlePasswordChange = (e) => setUserPassword(e.target.value);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: '10px', margin: '10px' }}>

            <Label for="username" style={{ display: 'block', padding: '10px' }}>Логін: </Label>
             <Input
            className="largeInput"
            type="text"
            id="username"
            value={userName }
            onChange={handleUserNameChange}             
            style={{ width: '300px', borderRadius: '15px'}} // Adjust the width here
  
            ></Input>
            </div>
            <div style={{ padding: '10px', margin: '10px' }}>
            <Label for="username" style={{ display: 'block', padding: '10px' }}>Пароль: </Label>
             <Input size='300'
            className="largeInput"
            type="text"
            id="username"
            value={userPassword }
            onChange={handlePasswordChange}   
            style={{ width: '300px' , borderRadius: '15px'}} // Adjust the width here

            ></Input>
            </div>
            
            <div style={{ padding: '10px', margin: '10px' }}>
            <MyButton size='sm'
             style={{ width: '300px' }}>
                Увійти
            </MyButton>
            </div>
        </div>
    );
};

export default SignIn;
