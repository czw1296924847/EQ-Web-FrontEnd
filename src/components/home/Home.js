import React from 'react';
import {Button, Alert} from "antd";
import {Trans_ModelDetail} from "../func";

const Home = () => {
    return (
        <div>
        </div>
    )
};

export default Home;

export function HomeAlert(className, message, type, onClose) {
    return (
        <Alert className={className}
               message={message}
               closable
               type={type}
               showIcon
               onClose={(e) => onClose(e)}/>
    );
}
