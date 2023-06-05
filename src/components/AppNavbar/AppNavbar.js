import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './AppNavbar.css';
import homeIcon from '../../images/homeIcon.svg';
import login from '../../images/login.svg';
import logout from '../../images/logout.svg';
import MyButton from "../UI/button/MyButton";
import Logout from "../Authorization/Logout";

const AppNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        setLoggedIn(false);
        Logout();
    }

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link className="navbar-link" to="/">
                        <img src={homeIcon} className="homeImg" alt="home"/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/tests">Тести</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/rules">Правила</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/study-materials">
                        <div className="multi-line-label">
                            <span>Навчальні</span><span>матеріали</span>
                        </div>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/fines">Штрафи</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/laws">Закони</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/signs">
                        <div className="multi-line-label">
                            <span>Дорожні</span><span>знаки</span>
                        </div>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/alcotester">Алкотестер</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/number-identifier">
                        <div className="multi-line-label">
                            <span>Визначник</span><span>номерів</span>
                        </div>
                    </Link>
                </li>

                { loggedIn
                    ?
                    <li className="navbar-item navbar-item-right">
                        <Link className="navbar-link" to="/profile">
                            <MyButton style={{margin: '5px'}}>Профіль</MyButton>
                        </Link>
                        <Link className="navbar-link" to="/" onClick={handleLogout}>
                            <img src={logout} className="logoutImg" alt="logout"/>
                        </Link>
                    </li>
                    :
                    <li className="navbar-item navbar-item-right">
                        <Link className="navbar-link" to="/authorization">
                            <img src={login} className="loginImg" alt="login"/>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
};

export default AppNavbar;