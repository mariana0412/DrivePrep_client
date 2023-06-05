import SignIn from "./SingInForm";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import SignUpForm from "./SignUpForm";

const AuthorizationPage = () => {
    return (
        <div>
            <AppNavbar/>
            <div style={{ display: 'flex', paddingTop: "60px"}}>
            <div style={{ flex: '30%', borderRight: '2px solid #000', paddingRight: '10px' , margin: "60px"}}>
                <SignIn/>
            </div>
            <div style={{ flex: '70%', paddingLeft: '10px', margin: "30px"}}>
                <SignUpForm/>
            </div>
            </div>
        </div>
    );
};

export default AuthorizationPage;
