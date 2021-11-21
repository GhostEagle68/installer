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

    return (
        <div
            className={`${isSelected ? 'selected' : 'selector'} ${isInstalled ? 'installed border-solid md:border-2 md:border-green-lime' : ''} w-60 flex flex-row items-center ${isSelected ? 'bg-navy-navy2 border-solid md:border-2 md:border-blue-cyan' : 'bg-navy-navy2'} rounded-md transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer`}
            onClick={() => handleSelected(track)}
        >
            <div className="flex flex-col px-5 py-2">
                <span className={`text-xl ${isInstalled ? 'text-green-lime' : ''} ${isSelected ? 'text-blue-cyan' : 'text-gray-50'}`}>{track.name}</span>
                <span className={`text-2x1 ${isInstalled ? 'text-green-lime' : ''} ${isSelected ? 'text-blue-cyan' : 'text-gray-50'}`}><code>{latestVersionName}</code></span>
            </div>
        </div>
    );
};
