import styled from 'styled-components';
import { colors } from "renderer/style/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 26px;
`;

export const PageTitle = styled.span`
  font-size: 20px;
  margin-bottom: 30px;
  color: #00E0FE;
`;

export const SettingsItems = styled.div`
  border-bottom: 3px solid #47536B;
`;

export const SettingsItem = styled.div`
    display: flex;
    flex-direction: column;

    button {
        position: absolute;
        right: 40px;
    }

`;

export const SettingItemName = styled.span`
  font-size: 15px;
`;

export const SettingItemContent = styled.span`
    width: 80%;
    font-size: 15px;
    color: ${colors.mutedText} !important;
    margin-bottom: 15px;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover {
      color: ${colors.teal50} !important;
    }
`;

export const InfoButton = styled.h6`
  margin-top: 1.5em;
  color: ${colors.mutedText} !important;
  cursor: pointer;

  :hover {
    color: ${colors.teal50} !important;
  }
`;

export const ResetButton = styled.button`
  padding: 0.2em 0.5em 0.2em 0.5em;
  margin-top: 1.5em;
  color: #fafafa !important;
  background: #D10303;
  border: 2px solid;
  border-color: #D10303;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;

  :hover {
    background: #FF2D1A;
    border-color: #FF2D1A;
  }
`;
