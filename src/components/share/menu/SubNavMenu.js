import {Layout, Menu} from 'antd';
import {ProfileOutlined, ImportOutlined, ToolOutlined, CarryOutOutlined,} from '@ant-design/icons';
import "../MyLayout.css";
import {Trans_SubNavMenu} from "../utils";

const {Sider} = Layout;
const SubNavMenu_Icon_Size = 22;
const color = '#08c';

const SubNavMenu = ({getSubNavUrl, showSider, background, la}) => {
    const SubNavMenuItem = [
        {
            label: <a href={`/${getSubNavUrl()}`}
                      className="MyLayout-SubNavMenu-label">{Trans_SubNavMenu(la)['param']}</a>,
            key: 'param',
            icon: <ImportOutlined style={{fontSize: `${SubNavMenu_Icon_Size}px`, color: color}}/>,
        },
        {
            label: <a href={`/${getSubNavUrl()}/result`}
                      className="MyLayout-SubNavMenu-label">{Trans_SubNavMenu(la)['result']}</a>,
            key: 'result',
            icon: <CarryOutOutlined style={{fontSize: `${SubNavMenu_Icon_Size}px`, color: color}}/>,
        },
        {
            label: <a href={`/${getSubNavUrl()}/record`}
                      className="MyLayout-SubNavMenu-label">{Trans_SubNavMenu(la)['record']}</a>,
            key: 'record',
            icon: <ProfileOutlined style={{fontSize: `${SubNavMenu_Icon_Size}px`, color: color}}/>,
        },
        {
            label: <a href={`/${getSubNavUrl()}/factor`}
                      className="MyLayout-SubNavMenu-label">{Trans_SubNavMenu(la)['factor']}</a>,
            key: 'factor',
            icon: <ToolOutlined style={{fontSize: `${SubNavMenu_Icon_Size}px`, color: color}}/>,
        },
    ];

    return (
        showSider() &&
        <Sider
            width={170}
            style={{background: background}}>
            <Menu
                style={{marginTop: 15}}
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={SubNavMenuItem}/>
        </Sider>
    );
}

export default SubNavMenu;
