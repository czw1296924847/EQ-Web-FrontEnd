import React, {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {ESTIMATE_URL} from "../../../index";
import LoginForm from "./LoginForm";
import {Alert} from 'antd';
import {Trans_Login_Msg} from "../../func";
import "../../Alert.css";
import "./Login.css";
import LanguageContext from "../../LanguageContext";


const Login = () => {
    const {la, _} = useContext(LanguageContext);
    const navigate = useNavigate()
    const {state} = useLocation()

    localStorage.setItem('token', "0");
    const EXPIRE_TIME = 60 * 60 * 1000;
    setTimeout(() => {
        localStorage.setItem('token', "0");
    }, EXPIRE_TIME);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("login");
    const [showAlert, setShowAlert] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [returnURL, setReturnURL] = useState(state?.returnURL || '/inform');

    useEffect(() => {
        const handleClickOutside = () => {
            if (showAlert) {
                setUsername("");
                setPassword("");
                setMsg("");
                setShowAlert(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showAlert]);

    const handleSubmit = ({username, password}) => {
        axios.get(ESTIMATE_URL + "login" + `?username=${username}&password=${password}`)
            .then(response => {
                setMsg(response.data.msg);
                setShowAlert(true);
                setIsLogin(true);
                console.log("Login Successful: ", msg);
                localStorage.setItem('token', "1");
                navigate(returnURL, {replace: true})
            }).catch(error => {
            setMsg(error.response.data.msg);
            setShowAlert(true);
            console.error("Login Failed: ", msg);
        });
    };

    return (
        <div>
            <div className="Login-Background"></div>
            <div className="Login-Module">
                <LoginForm onSubmit={handleSubmit}
                           username={username}
                           password={password}
                           setUsername={setUsername}
                           setPassword={setPassword}/>
                {msg === 'login_success' && showAlert &&
                    <Alert className="Login-Alert" message={Trans_Login_Msg(la)[msg]} type="success"
                           showIcon/>}
                {msg === 'user_not_exist' && showAlert &&
                    <Alert className="Login-Alert" message={Trans_Login_Msg(la)[msg]} type="warning"
                           showIcon/>}
                {msg === 'password_error' && showAlert &&
                    <Alert className="Login-Alert" message={Trans_Login_Msg(la)[msg]} type="error"
                           showIcon/>}
            </div>
        </div>
    );
}

export default Login;