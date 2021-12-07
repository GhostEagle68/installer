import React from 'react';
import { Layout } from 'antd';
import { Container, Menu, PageSider } from './styles';

import GeneralSettings from 'renderer/components/GeneralSettings';
import { Download, Settings, Share } from 'tabler-icons-react';

function index(): JSX.Element {
    return (
        <Container className="bg-navy-navy2 rounded-lg">
            <Layout>
                <PageSider>
                    <Menu theme="dark" mode="inline" style={{ width: 256, backgroundColor: '#171E2C', color: '#fafafa' }}
                        defaultSelectedKeys={['general-settings']}>
                        <h2 className="text-blue-cyan text-2xl text-semibold pl-2">Installer Settings</h2>
                        <div className="flex items-center justify-between p-2 space-x-3">
                            <Menu.Item key="general-settings" style={{ backgroundColor: '#1F2A3C', borderRadius: 5, width: 500 }}>
                                <li className="rounded-sm">
                                    <a className="text-blue-sky flex items-center p-2 space-x-3 rounded-md hover:text-quasi-white">
                                        <Settings></Settings>
                                        <span>General Settings</span>
                                    </a>
                                </li>
                            </Menu.Item>
                        </div>
                        <div className="flex items-center justify-between p-2 space-x-3">
                            <Menu.Item key="download-settings" style={{ backgroundColor: '#0E131B', borderRadius: 5, width: 500 }}>
                                <li className="rounded-sm">
                                    <a className="text-quasi-white flex items-center p-2 space-x-3 rounded-md hover:text-blue-sky">
                                        <Download></Download>
                                        <span>Download Settings</span>
                                    </a>
                                </li>
                            </Menu.Item>
                        </div>
                        <h2 className="text-blue-cyan text-2xl text-semibold pt-5 pl-2">User Settings</h2>
                        <div className="flex items-center justify-between p-2 space-x-3">
                            <Menu.Item key="general-settings" style={{ backgroundColor: '#0E131B', borderRadius: 5, width: 500 }}>
                                <li className="rounded-sm">
                                    <a className="text-quasi-white flex items-center p-2 space-x-3 rounded-md hover:text-blue-sky">
                                        <Share></Share>
                                        <span>Connections</span>
                                    </a>
                                </li>
                            </Menu.Item>
                        </div>
                    </Menu>
                </PageSider>
                <Layout.Content className="pl-24 bg-navy-navy2">
                    <GeneralSettings />
                </Layout.Content>
            </Layout>
        </Container>
    );
}

export default index;
