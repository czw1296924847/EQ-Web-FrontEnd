import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Menu} from 'antd';
import {
    HomeOutlined, LogoutOutlined, ProfileOutlined, AppstoreOutlined,
    SettingOutlined, UpCircleOutlined, DownCircleOutlined,
    PartitionOutlined, FontColorsOutlined,
} from '@ant-design/icons';
import {INFOS, OPTS, STYLES} from "../../operation/utils";
import "../MyLayout.css";
import {Trans_NavMenu} from "../utils";

const NavMenu = ({model_names, getNavOptUrl, logout, setLa, la}) => {
    const navigate = useNavigate();
    const url = window.location.href.split('/').slice(2);
    const [opt, setOpt] = useState("");
    const [style, setStyle] = useState("");

    const NavMenu_Icon_Size = 25;
    const NavMenu_Element_Icon_Size = 22;

    useEffect(() => {
        const {opt, style} = getOptStyle();
        setOpt(opt);
        setStyle(style);
    }, [la]);

    const getOptStyle = () => {
        let opt = "";
        let style = "";
        if (STYLES.includes(url[url.length - 1])) {                     // OptResult, ModelRecord, ModelFactor
            opt = url[url.length - 2];
            style = url[url.length - 1];
        } else if (OPTS.includes(url[url.length - 1])) {                // Model(Param)
            opt = url[url.length - 1];
            style = "param";
        } else if (INFOS.includes(url[1]) || url[2] === "detail") {     // Information, ModelDetail
            return {opt, style};
        } else {
            throw new Error("Invalid 'style' or 'opt'!");
        }
        return {opt, style};
    }

    const getModelUrl = (model) => {
        if (OPTS.includes(opt) && STYLES.includes(style)) {     // OptResult, ModelRecord, ModelFactor
            return `/${model}/${opt}/${style}`;
        } else if (OPTS.includes(opt) && style === "param") {   // Model(Param)
            return `/${model}/${opt}`;
        } else if (opt === "" && style === "" &&
            (INFOS.includes(url[1]) || url[2] === "detail")) {     // Information, ModelDetail
            return `/${model}/detail`;
        } else {
            throw new Error("反正就是路由配置不对！")
        }
    }

    const getTrainUrl = () => {
        const a = 1;
        if (url.length === 3 && model_names.includes(url[1]) && OPTS.includes(url[2])) {
            navigate(`/${url[1]}/train`);
        } else if (url.length === 4 && model_names.includes(url[1]) && OPTS.includes(url[2])) {
            navigate(`/`);
        }
    }

    const changeLa = (la) => {
        setLa(la);
        localStorage.setItem('la', la);
    }

    const NavMenu = [
        {
            label: <span className="MyLayout-NavMenu-Title">{Trans_NavMenu(la)['title']}</span>,
            style: {backgroundColor: 'transparent'},
        },
        {
            label: <span
                className="MyLayout-NavMenu-SubTitle">{Trans_NavMenu(la)['sub-title']}</span>,
            style: {backgroundColor: 'transparent'},
        },
        {
            label: <a className="MyLayout-NavMenu-Label-First"
                      href={"/home"}>{Trans_NavMenu(la)['overview']}</a>,
            key: 'overview',
            icon: <HomeOutlined className="MyLayout-Icon" style={{fontSize: `${NavMenu_Icon_Size}px`}}/>,
            children: [
                {
                    label: <a className="MyLayout-NavMenuElement-Label-First"
                              href={"/inform"}>{Trans_NavMenu(la)['information']}</a>,
                    key: 'information',
                    icon: <ProfileOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                    // children: model_names && model_names.length > 0 ? model_names.map(model => ({
                    //     label: <a href={`/${model}/detail`}
                    //               className="MyLayout-NavMenuElement-Label">{model}</a>,
                    //     key: `${model}-information`,
                    // })) : null,
                }
            ],
        },
        {
            label: <span className="MyLayout-NavMenu-Label">{Trans_NavMenu(la)['model']}</span>,
            key: 'model',
            icon: <AppstoreOutlined className="MyLayout-Icon" style={{fontSize: `${NavMenu_Icon_Size}px`}}/>,
            children: model_names && model_names.length > 0 ? model_names.map(model => ({
                label: <a href={getModelUrl(model)}
                          className="MyLayout-NavMenuElement-Label">{model}</a>,
                key: `${model}`,
            })) : null,
        },
        {
            label: <span className="MyLayout-NavMenu-Label">{Trans_NavMenu(la)['operation']}</span>,
            key: 'operation',
            icon: <PartitionOutlined style={{fontSize: `${NavMenu_Icon_Size}px`}}/>,
            children: [
                {
                    label: <span className="MyLayout-NavMenuElement-Label" onClick={getTrainUrl}>{Trans_NavMenu(la)['train']}</span>,
                        key: 'train',
                    icon: <UpCircleOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                    // children: model_names && model_names.length > 0 ? model_names.map(model => ({
                    //     label: <a href={`/${getNavOptUrl(model, "train")}`}
                    //               className="MyLayout-NavMenuElement-Label">{model}</a>,
                    //     key: `${model}-train`,
                    // })) : null,
                },
                {
                    label: <a className="MyLayout-NavMenuElement-Label"
                              href="/test">{Trans_NavMenu(la)['test']}</a>,
                    key: 'test',
                    icon: <DownCircleOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                    // children: model_names && model_names.length > 0 ? model_names.map(model => ({
                    //     label: <a href={`/${getNavOptUrl(model, "test")}`}
                    //               className="MyLayout-NavMenuElement-Label">{model}</a>,
                    //     key: `${model}-test`,
                    // })) : null,
                },
            ],
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
                            label: <span onClick={() => changeLa("en")}
                                         className="MyLayout-NavMenuElement-Label">{Trans_NavMenu(la)['en']}</span>,
                            key: 'en',
                        },
                        {
                            label: <span onClick={() => changeLa("zh")}
                                         className="MyLayout-NavMenuElement-Label">{Trans_NavMenu(la)['zh']}</span>,
                            key: 'zh',
                        },
                    ],
                },
                {
                    label: <a className="MyLayout-NavMenu-label-logout"
                              href={"/login"}
                              onClick={logout}>{Trans_NavMenu(la)['logout']}</a>,
                    key: 'logout',
                    icon: <LogoutOutlined style={{fontSize: `${NavMenu_Element_Icon_Size}px`}}/>,
                },
            ]
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={NavMenu}
            style={{marginLeft: "-2%"}}
        />
    );
}

export default NavMenu;
