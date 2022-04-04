import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useIsDarkTheme } from "common/settings";
import { Publisher } from "renderer/utils/InstallerConfiguration";
import { useAppSelector } from "renderer/redux/store";
import { InstallStatus } from "renderer/components/AircraftSection";
import { Gear, Wrench } from "react-bootstrap-icons";

export const NavBar: FC = ({ children }) => {
    const darkTheme = useIsDarkTheme();

    const bg = darkTheme ? 'bg-navy-dark' : 'bg-navy';

    return (
        <div className={`${bg} px-6 py-7 border-r border-navy-light flex flex-col justify-between h-full`}>
            <div className="flex flex-col gap-y-5">
                {children}
            </div>

            <div className="mt-auto flex flex-col gap-y-5">
                {process.env.NODE_ENV === 'development' && (
                    <NavbarItem to="/debug">
                        <Wrench className="text-gray-100" size={28} strokeWidth={1} />
                    </NavbarItem>
                )}
                <NavbarItem to="/settings">
                    <Gear className="text-gray-100" size={28} strokeWidth={1} />
                </NavbarItem>
            </div>
        </div>
    );
};

const BASE_STYLE = "w-20 h-20 flex flex-col justify-center items-center rounded-md bg-transparent hover:bg-navy-light transition duration-200 border-2 border-navy-light";

export interface NavBarItemProps {
    to: string;
    showNotification?: boolean;
    notificationColor?: string;
}

export const NavbarItem: FC<NavBarItemProps> = ({ to = '/', showNotification = false, notificationColor = 'orange', children }) => (
    <NavLink
        to={to}
        className={BASE_STYLE}
        activeClassName={`${BASE_STYLE} bg-navy-light`}
    >
        {children}

        <span className="absolute w-0 h-0" style={{ visibility: showNotification ? 'visible' : 'hidden' }}>
            <svg className="relative w-3.5" viewBox="0 0 10 10" style={{ left: '24px', bottom: '35px' }}>
                <circle cx={5} cy={5} r={5} fill={notificationColor} />
            </svg>
        </span>
    </NavLink>
);

export interface NavBarPublisherProps extends NavBarItemProps {
    publisher: Publisher;
}

export const NavBarPublisher: FC<NavBarPublisherProps> = ({ to, publisher }) => {
    const hasAvailableUpdates = useAppSelector((state) => publisher.addons.some((addon) => state.installStatus[addon.key] === InstallStatus.NeedsUpdate));

    return (
        <NavbarItem
            to={to}
            showNotification={hasAvailableUpdates}
            notificationColor="orange"
        >
            <img width={34} src={publisher.logoUrl} alt={`${publisher.name} Logo`}/>
        </NavbarItem>
    );
};
