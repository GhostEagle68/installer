import React, { PropsWithChildren } from 'react';
import { BorderOutlined, CloseOutlined, ExclamationCircleOutlined, MinusOutlined, } from '@ant-design/icons';
import { shell } from 'electron';

export type ButtonProps = { id?: string, className?: string, onClick?: () => void, isClose?: boolean }

export const Button: React.FC<ButtonProps> = ({ id, className, onClick, isClose, children }: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            className={`w-14 h-full flex flex-row justify-center items-center text-gray-medium ${isClose ? 'hover:text-red-offred hover:bg-navy-light' : 'hover:text-quasi-white hover:bg-navy-light'} ${className}`}
            onClick={onClick ?? (() => {})}
            id={id}
        >
            {children}
        </button>
    );
};

export const WindowButtons: React.FC = () => {
    const openGithub = () => shell.openExternal("https://github.com/flybywiresim/a32nx/issues/new/choose");

    return (
        <div className="h-14 flex flex-row ml-auto">
            <Button onClick={openGithub}><ExclamationCircleOutlined /></Button>
            <Button id="min-button"><MinusOutlined /></Button>
            <Button id="max-button"><BorderOutlined /></Button>
            <Button id="close-button" isClose><CloseOutlined /></Button>
        </div>
    );
};
