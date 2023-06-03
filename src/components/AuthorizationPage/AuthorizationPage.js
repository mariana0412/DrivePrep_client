import SignIn from "../SignInForm/SingIn";
import AppNavbar from "../AppNavbar/AppNavbar";
import SignUp from "../SignUpForm/SignUp";

const AuthorizationPage = () => {
    return (
        <div>
            <AppNavbar/>
            <div style={{ display: 'flex', paddingTop: "60px"}}>
            <div style={{ flex: '30%', borderRight: '2px solid #000', paddingRight: '10px' , margin: "60px"}}>
                <SignIn/>
            </div>
            <div style={{ flex: '70%', paddingLeft: '10px', margin: "30px"}}>
                <SignUp/>
            </div>
            </div>
        </div>
    );
};

export default AuthorizationPage;
