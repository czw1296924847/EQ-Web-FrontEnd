import React, {useContext, useEffect} from 'react';
import {Input} from 'antd';
import "./Login.css";
import LanguageContext from "../../LanguageContext";
import {Trans_Login, getLeftUserPass} from "../utils";


const LoginForm = ({ onSubmit, username, password, setUsername, setPassword }) => {
    const {la, _} = useContext(LanguageContext);
    const {left_u, left_p} = getLeftUserPass(la);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ username: username, password: password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="LoginForm-Input-Container-First">
                <label className="LoginForm-Input-Label">
                    {Trans_Login(la)['username']}
                    <input
                        className="LoginForm-Input"
                        style={{marginLeft: `${left_u}px`}}
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </label>
            </div>
            <div className="LoginForm-Input-Container">
                <br/>
                <label className="LoginForm-Input-Label">
                    {Trans_Login(la)['password']}
                    <input
                        className="LoginForm-Input"
                        style={{marginLeft: `${left_p}px`}}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>
            <br/>
            <div className="LoginForm-Input-Container">
                <input className="LoginForm-Button" type="submit" value={Trans_Login(la)['login']}/>
            </div>
        </form>
    );
};

export default LoginForm;