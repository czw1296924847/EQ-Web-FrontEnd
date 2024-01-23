import React, {Component} from "react";
import {HomeOutlined, CloudUploadOutlined, CloudDownloadOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import "./Header.css";


// Used Models
const links = ['MagInfoNet', 'EQGraphNet', 'MagNet', 'CREIME', 'ConvNetQuakeINGV'];

// Navigation Menu
const items = [
    {
        label: <Link to="/" className="home-icon" rel="noopener noreferrer">Home</Link>,
        key: 'home',
        icon: <HomeOutlined/>,
    },
    {
        label: <span className="train-icon">Train</span>,
        key: 'train',
        icon: <CloudUploadOutlined/>,
        children: links.map(link => ({
            label: <Link to={`/${link}/train`} rel="noopener noreferrer">{link}</Link>,
            key: `${link}-train`,
        })),
    },
    {
        label: <span className="test-icon">Test</span>,
        key: 'test',
        icon: <CloudDownloadOutlined className="train-icon"/>,
        children: links.map(link => ({
            label: <Link to={`/${link}/test`} rel="noopener noreferrer">{link}</Link>,
            key: `${link}-test`,
        })),
    },
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {                      // Set initial state correctly.
            current: ['home'],
            title: 'Magnitude Estimation Model'
        };
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({current: e.key, title: this.getNewTitle(e)});
    };

    onSelect = (selectedKeys, e) => {           // Handle selection.
        console.log('selectedKeys ', selectedKeys);
        this.setState({current: selectedKeys});
    };

    getNewTitle(e) {
        let key = "";
        if (typeof e === 'string') {
            key = e.split('-');
        } else if (e instanceof Object) {
            if (e["key"] === 'home') {
                return "Magnitude Estimation Model";
            }
            key = e["key"].split('-');
        } else {
            throw new Error("Type of 'e' must be string or Object!");
        }
        let str = key[0];
        if (key[1] === "train") {
            str = str + " Training ";
        } else if (key[1] === "test") {
            str = str + " Testing";
        } else {
            throw new Error("The second word must be 'home', 'train' or 'test'!");
        }
        return str;
    }

    render() {
        return (
            <div>
                <h1 className="text-center">{this.state.title}</h1>
                <Menu className="text-center"
                      onClick={this.handleClick}
                      onSelect={this.onSelect}
                      mode="horizontal"
                      items={items}/>
            </div>
        );
    }
}

export default Header;