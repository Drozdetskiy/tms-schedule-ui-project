import './styles.less'

import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';
import {
    WechatOutlined,
    MessageOutlined,
    ScheduleOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';

import { Routes } from "../../routes/Routes";

const {Header, Content, Footer, Sider} = Layout;

// TODO: Add sign in
enum SideBarKeysEnum {
    MESSAGES = 'MESSAGES',
    CHATS = 'CHATS',
    CHRONTABS = 'CHRONTABS',
    TASKS = 'TASKS',
    SIGN_IN = 'SIGN_IN'
}

// TODO: Add logo
const MainLayout = () => {
    const [collapsed, setCollapse] = useState(false)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapse}>
                <Menu theme="light" defaultSelectedKeys={[SideBarKeysEnum.MESSAGES]} mode="inline">
                    <Menu.Item key={SideBarKeysEnum.MESSAGES} icon={<MessageOutlined/>}>
                        <Link to="/">Messages</Link>
                    </Menu.Item>
                    <Menu.Item key={SideBarKeysEnum.CHATS} icon={<WechatOutlined/>}>
                        <Link to="/chats">Chats</Link>
                    </Menu.Item>
                    <Menu.Item key={SideBarKeysEnum.CHRONTABS} icon={<ClockCircleOutlined/>}>
                        <Link to="/crontabs">Crontabs</Link>
                    </Menu.Item>
                    <Menu.Item key={SideBarKeysEnum.TASKS} icon={<ScheduleOutlined/>}>
                        <Link to="/tasks">Tasks</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header/>
                <Content style={{margin: '0 16px'}}>
                    <Routes/>
                </Content>
                <Footer>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}


export { MainLayout }
