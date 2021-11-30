import React, { useEffect, useState } from "react";
import { AlertTriangle, ArrowBarToDown, ArrowBarToLeft, ChevronDown, CircleCheck, Rotate2 } from "tabler-icons-react";
import { useSelector, } from "react-redux";
import { InstallerStore } from "renderer/redux/store";
import { InstallStatus } from "renderer/components/AircraftSection";
import { Addon } from "renderer/utils/InstallerConfiguration";

export type SidebarItemProps = { enabled?: boolean, iSelected: boolean, onClick: () => void, className?: string }

export const SidebarItem: React.FC<SidebarItemProps> = ({ enabled = true, iSelected, onClick, children, className }) => {
    return (
        <div
            className={`w-full flex flex-row items-center transition-all duration-200 ${iSelected ? 'bg-gradient-to-r from-blue-cyan to-blue-sky' : 'bg-navy-dark'} ${enabled ? 'hover:bg-navy-navy2' : ''} pl-5 py-4 ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'} ${className}`}
            onClick={onClick}
        >{children}</div>
    );
};

export type SidebarPublisherProps = { name: string, logo: string }

export const SidebarPublisher: React.FC<SidebarPublisherProps> = ({ name, logo, children }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <>
            <span onClick={() => setExpanded(old => !old)} className="flex flex-row items-center transform transition-colors duration-300 hover:bg-navy-light text-lg text-white pl-3 py-3.5 cursor-pointer">
                <ChevronDown className={`text-gray-200 transform transition-transform duration-300 ${expanded ? 'rotate-0' : '-rotate-90'}`} size={28} />
                <img className="w-4 ml-1 mr-2" src={logo} alt="" />
                <span className="text-base text-gray-100">{name}</span>
            </span>
            {expanded && children}
        </>
    );
};

export const SidebarCompact: React.FC<SidebarPublisherProps> = ({ logo, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <span className="bg-navy flex flex-row items-end text-lg text-white pl-3 py-3.5">
                <ArrowBarToLeft onClick={() => setExpanded(old => !old)} className={`text-gray-200 transform cursor-pointer ${expanded ? 'rotate-0' : '-rotate-180'}`} size={35} />
                <img className="ml-1 mr-2" src={logo} alt="" />
                <span className="text-base text-gray-100"></span>
            </span>
            {expanded && children}
        </>
    );
};

type SidebarAddonProps = { addon: Addon, isSelected: boolean, handleSelected: (key: string) => void }

export const SidebarAddon: React.FC<SidebarAddonProps> = ({ addon, isSelected, handleSelected }) => {
    const [downloadState, setStatusText] = useState('');
    const [icon, setIcon] = useState<'notAvailable' | 'install' | 'installing' | 'installed' | 'update'>('install');
    const addonDownloadState = useSelector<InstallerStore>(state => state.installStatus);

    useEffect(() => {
        if (addon.enabled) {
            switch (addonDownloadState) {
                case InstallStatus.FreshInstall:
                case InstallStatus.Unknown:
                    setStatusText('Not Installed');
                    setIcon('install');
                    break;
                case InstallStatus.NeedsUpdate:
                    setStatusText('Update Available');
                    setIcon('update');
                    break;
                case InstallStatus.DownloadPrep:
                case InstallStatus.Downloading:
                case InstallStatus.Decompressing:
                case InstallStatus.DownloadRetry:
                case InstallStatus.DownloadCanceled:
                case InstallStatus.DownloadError:
                case InstallStatus.DownloadEnding:
                    setStatusText('Installing...');
                    setIcon('installing');
                    break;
                default:
                    setStatusText('Installed');
                    setIcon('installed');
                    break;
            }
        } else {
            setStatusText('Not Available');
            setIcon('notAvailable');
        }
    }, [addonDownloadState]);

    const Icon = () => {
        switch (icon) {
            case 'notAvailable':
                return <AlertTriangle className="text-quasi-white ml-auto mr-4" size={28} />;
            case 'install':
                return <ArrowBarToDown className="text-quasi-white ml-auto mr-4" size={28} />;
            case 'installing':
                return <Rotate2 className="text-quasi-white ml-auto mr-4 animate-spin-reverse" size={28} />;
            case 'installed':
                return <CircleCheck className="text-quasi-white ml-auto mr-4" size={28} />;
            case 'update':
                return <ArrowBarToDown className="text-quasi-white ml-auto mr-4" size={28} />;
        }
    };

    return (
        <SidebarItem enabled={addon.enabled} iSelected={isSelected} onClick={() => {
            if (addon.enabled) {
                handleSelected(addon.key);
            }
        }}>
            <div className={`flex flex-col ml-3 ${addon.enabled ? 'opacity-100' : 'opacity-60'}`}>
                <span className= 'text-xl text-quasi-white font-bold' key={addon.key}>{addon.name}</span>
                <code className="text-lg text-quasi-white">{downloadState}</code>
            </div>

            <Icon />
        </SidebarItem>
    );
};
