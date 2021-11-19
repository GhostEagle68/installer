import React from "react";
import { useSelector } from "react-redux";
import { InstallerStore } from "renderer/redux/store";

import './index.css';
import { Addon, AddonTrack } from "renderer/utils/InstallerConfiguration";

export const Tracks: React.FC = ({ children }) => (
    <div className="flex flex-row justify-start items-stretch gap-2">
        {children}
    </div>
);

type TrackProps = {
    className?: string,
    addon: Addon,
    track: AddonTrack,
    isSelected: boolean,
    isInstalled: boolean,
    handleSelected(track: AddonTrack): void,
};

export const Track: React.FC<TrackProps> = ({ isSelected, isInstalled, handleSelected, addon, track }) => {
    const latestVersionName = useSelector<InstallerStore, string>(state => {
        return state.latestVersionNames
            .find((entry) => entry.addonKey === addon.key && entry.trackKey === track.key)
            ?.info.name ?? '<unknown>';
    });

    const makeBorderStyle = () => {
        if (isInstalled) {
            return 'bg-green-lime';
        } else {
            if (isSelected) {
                return 'bg-blue-sky';
            }
        }
    };

    return (
        <div
            className={`${isSelected ? 'selected' : 'selector'} ${isInstalled ? 'installed' : ''} w-60 flex flex-row items-center ${isSelected ? 'bg-navy-light' : 'bg-navy'} rounded-md transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer`}
            onClick={() => handleSelected(track)}
        >
            <div
                className={`${makeBorderStyle()} w-1 h-12 rounded-r-xl transition-all duration-200 transform ${isInstalled ? 'scale-y-100' : 'scale-y-50'}`}/>
            <div className="flex flex-col px-5 py-2">
                <span className={`text-xl ${isInstalled ? 'text-green-lime' : ''} ${isSelected ? 'text-blue-cyan' : 'text-gray-50'}`}>{track.name}</span>
                <span className={`text-2x1 ${isInstalled ? 'text-green-lime' : ''} ${isSelected ? 'text-blue-cyan' : 'text-gray-50'}`}><code>{latestVersionName}</code></span>
            </div>
        </div>
    );
};
