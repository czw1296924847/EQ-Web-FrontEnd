import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Breadcrumb, Layout, theme, Menu} from 'antd';
import {
    LogoutOutlined,
    SettingOutlined,
    FontColorsOutlined,
} from '@ant-design/icons';
import LanguageContext from "../LanguageContext";
import {Trans_NavMenu} from "./func";
import "../share/MyLayout.css";
import {
    changeLa, logout,
    NavMenu_Icon_Size, NavMenu_Element_Icon_Size
} from "../func";

const {Header, Content, Footer} = Layout;

const WeaLayout = ({children}) => {
    const {la, setLa} = useContext(LanguageContext);
    const navigate = useNavigate();

    const NavMenu = [
        {
            label: <span className="MyLayout-NavMenu-Title"
                         onClick={() => navigate("/crawler")}>{Trans_NavMenu(la)['title']}</span>,
            style: {backgroundColor: 'transparent'},
        },
        {
            label: <span className="MyLayout-NavMenu-SubTitle"
                         onClick={() => navigate("/crawler")}>{Trans_NavMenu(la)['sub-title']}</span>,
            style: {backgroundColor: 'transparent'},
        },
        {
            label: <span className="MyLayout-NavMenu-Label">{Trans_NavMenu(la)['setting']}</span>,
            key: 'setting',
            style: {backgroundColor: 'transparent'},
            icon: <SettingOutlined style={{fontSize: `${NavMenu_Icon_Size}px`}}/>,
            children: [
                {
                    label: <span className="MyLayout-NavMenuElement-Label">{Trans_NavMenu(la)['la']}</span>,
                    key: "la",
                    icon: <FontColorsOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                    children: [
                        {
                            label: <span onClick={() => changeLa("en", setLa)}
                                         className="MyLayout-NavMenuElement-Label">{Trans_NavMenu(la)['en']}</span>,
                            key: 'en',
                        },
                        {
                            label: <span onClick={() => changeLa("zh", setLa)}
                                         className="MyLayout-NavMenuElement-Label">{Trans_NavMenu(la)['zh']}</span>,
                            key: 'zh',
                        },
                    ],
                },
                {
                    label: <span className="MyLayout-NavMenu-Label-Logout"
                                 onClick={() => logout(navigate)}>{Trans_NavMenu(la)['logout']}</span>,
                    key: 'logout',
                    icon: <LogoutOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                },
            ]
        },
    ];

    return (
        <Layout>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={NavMenu}
                    style={{marginLeft: "-2%"}}
                />
            </Header>

            <Layout>
                <Content>
                    {children}
                </Content>

                <Footer style={{textAlign: 'center', height: '40px'}}>
                    EQ-Web ©{new Date().getFullYear()} Created by Ziwei Chen
                </Footer>
            </Layout>

        </Layout>
    )
}

export default WeaLayout;

