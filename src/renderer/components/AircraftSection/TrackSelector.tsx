import React from "react";
import { useSelector } from "react-redux";
import { InstallerStore } from "renderer/redux/store";
import { Check } from 'tabler-icons-react';

import './index.css';
import { Addon, AddonTrack } from "renderer/utils/InstallerConfiguration";

export const Tracks: React.FC = ({ children }) => (
    <div className="flex flex-row justify-start items-stretch gap-3">
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
            className={`w-60 flex flex-row items-center relative bg-navy text-white rounded-sm-md border-2 border-transparent transition-all duration-200 cursor-pointer ${isSelected && 'border-cyan text-cyan'}`}
            onClick={() => handleSelected(track)}
        >
            <div className={`w-1 h-12 rounded-r-xl transition-all duration-200 transform ${isSelected ? 'scale-y-100' : 'scale-y-50'}`}/>
            <div className="flex flex-col px-2 py-2.5">
                <span className="text-xl text-current">{track.name}</span>
                <span className="text-lg text-current -mt-0.5">{latestVersionName}</span>
            </div>
            {isInstalled && (
                <Check className={`absolute right-2 text-green-lime stroke-current`} strokeWidth={3}/>
            )}
        </div>
    );
};
