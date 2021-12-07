import React from 'react';
import logo from 'renderer/assets/installer-header.svg';
import fullLogo from 'renderer/assets/FBW-Logo-White.svg';
import { Container, } from './styles';

export const Logo = (): JSX.Element => (
    <Container>
        <img src={logo} alt="FlyByWire Logo" id="fbw-logo" style={{ height: '2.5rem' }}/>
    </Container>
);

export const HomeLogo = (): JSX.Element => (
    <Container>
        <img src={fullLogo} alt="FlyByWire Logo" id="fbw-logo"/>
    </Container>
);
