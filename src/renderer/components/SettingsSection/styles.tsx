import { Layout, Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  font-size: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 20px 0 20px 0;
`;

export const Menu = styled(AntdMenu)`
  border-right: 4px solid #00CCFF !important;
`;

export const PageSider = styled(Layout.Sider)`
    background-color: #171E2C;
    
    .ant-layout-sider-trigger {
        height: 40px;
        line-height: 40px;
        background-color: #232323;
    }

`;
