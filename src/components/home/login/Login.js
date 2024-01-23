import React, {useState, useEffect, useContext} from 'react';
import { useLocation ,useNavigate} from 'react-router-dom'
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

    localStorage.setItem('token', 0);
    const navigate  = useNavigate()
    const { state } = useLocation()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("login");
    const [showAlert, setShowAlert] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [returnURL, setReturnURL] = useState(state?.returnURL || '/home');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.alert') === null) {
                setMsg("");
                setShowAlert(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSubmit = ({username, password}) => {
        axios.get(ESTIMATE_URL + "login" + `?username=${username}&password=${password}`)
            .then(response => {
                setMsg(response.data.msg);
                setShowAlert(true);
                setIsLogin(true);
                console.log("Login Successful: ", msg);
                localStorage.setItem('token', 1);
                navigate(returnURL,{replace:true})
            }).catch(error => {
                setUsername("");
                setPassword("");
                setMsg(error.response.data.msg);
                setShowAlert(true);
                console.error("Login Failed: ", msg);
            });
    };

    return (
        <div>
            <div className="Login-Background"></div>
            <div className="Login-Module">
                <LoginForm onSubmit={handleSubmit} username={username} password={password}/>
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