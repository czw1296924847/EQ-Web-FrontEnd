import React, {useState, useEffect, useContext} from 'react';
import LanguageContext from "../LanguageContext";
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import axios from "axios";
import NavMenu from "./menu/NavMenu";
import SubNavMenu from "./menu/SubNavMenu";
import "./MyLayout.css";
import {ESTIMATE_URL} from "../../index";
import {DEFAULT_MODELS} from "../func";

const {Header, Content, Footer} = Layout;

const MyLayout = ({children}) => {
    const {la, setLa} = useContext(LanguageContext);

    const url = window.location.href.split('/').slice(2);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    const isLogin = () => {
        return url.length === 2 && url[1] === "login";
    }

    const logout = () => {
        localStorage.removeItem('token');
    }

    const model_names = DEFAULT_MODELS;
    // const [model_names, setModelNames] = useState([]);
    //
    // useEffect(() => {
    //     const fetchModelNames = () => {
    //         axios.get(ESTIMATE_URL + "models").then(response => {
    //             const model_names = response.data.map(item => {
    //                 return item.name;
    //             });
    //             setModelNames(model_names);
    //         }).catch(error => {
    //             console.error(error);
    //         });
    //     };
    //     fetchModelNames();
    // }, [la]);

    const getNavOptUrl = (model_name, style) => {
        let url_new = window.location.href.split('/').slice(3);
        url_new[0] = model_name;
        url_new[1] = style;
        return url_new.join('/');
    }

    const getSubNavUrl = () => {
        return `${url[1]}/${url[2]}`;
    }

    const showSider = () => {
        if (model_names === null) {
            return false;
        }
        return url.length >= 3
            && model_names.includes(url[1])
            && ['train', 'test'].includes(url[2]);
    }

    if (isLogin()) {            // <Login> do not use <MyLayout>
        return (
            <div>
                {children}
            </div>
        );
    } else {
        return (
            <Layout>
                <Header>
                    <NavMenu model_names={model_names}
                             getNavOptUrl={getNavOptUrl}
                             logout={logout}
                             setLa={setLa}
                             la={la}/>
                </Header>

                <Layout>
                    <SubNavMenu getSubNavUrl={getSubNavUrl}
                                showSider={showSider}
                                background={colorBgContainer}
                                la={la}/>

                    <Layout style={{padding: '0px 24px 24px',}}>
                        <Breadcrumb style={{margin: '15px 0',}}>
                            {/*<Breadcrumb.Item>Input</Breadcrumb.Item>*/}
                        </Breadcrumb>

                        <Content className="MyLayout-Content"
                                 style={{background: colorBgContainer, borderRadius: borderRadiusLG,}}>
                            {children}
                        </Content>

                        <Layout>
                            <Footer style={{textAlign: 'center', height: '40px'}}>
                                EQ-Web ©{new Date().getFullYear()} Created by Ziwei Chen
                            </Footer>
                        </Layout>

                    </Layout>
                </Layout>
            </Layout>
        );
    }
};

export default MyLayout;
