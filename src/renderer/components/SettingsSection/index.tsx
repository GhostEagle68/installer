import React from 'react';
import { Layout } from 'antd';
import { Container, Menu, PageSider } from './styles';

import GeneralSettings from 'renderer/components/GeneralSettings';

function index(): JSX.Element {
    return (
        <Container className="bg-navy-navy2 rounded-lg">
            <Layout>
                <PageSider>
                    <Menu theme="dark" mode="inline" style={{ width: 256, backgroundColor: '#171E2C', color: '#fafafa' }}
                        defaultSelectedKeys={['general-settings']}>
                        <Menu.Item key="general-settings" style={{ backgroundColor: '#0E131B', }}>
                            General Settings
                        </Menu.Item>
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
