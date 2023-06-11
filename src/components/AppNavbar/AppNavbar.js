import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './AppNavbar.css';
import homeIcon from '../../assets/homeIcon.svg';
import loginIcon from '../../assets/loginIcon.svg';
import logoutIcon from '../../assets/logoutIcon.svg';
import MyButton from "../UI/button/MyButton";
import {logout} from "../../utils/logout";

const AppNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        setLoggedIn(false);
        logout();
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
                    <Link className="navbar-link" to="/region-identifier">
                        <div className="multi-line-label">
                            <span>Визначник регіону</span><span>за номером машини</span>
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
                            <img src={logoutIcon} className="logoutImg" alt="logout"/>
                        </Link>
                    </li>
                    :
                    <li className="navbar-item navbar-item-right">
                        <Link className="navbar-link" to="/authorization">
                            <img src={loginIcon} className="loginImg" alt="login"/>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
};

export default AppNavbar;
