import React, { FC } from 'react';
import { setupInstallPath } from 'renderer/actions/install-path.utils';
import * as packageInfo from '../../../../package.json';
import { Toggle } from '@flybywiresim/react-components';
import settings, { useSetting } from "common/settings";

const SettingsItem: FC<{name: string}> = ({ name, children }) => (
    <div className="flex flex-row items-center justify-between py-3.5">
        {/* TODO: Remove this styling later */}
        <p className="m-0">{name}</p>
        {children}
    </div>
);

interface SettingItemProps<T> {
    value: T;
    setValue: (value: T) => void;
}

const InstallPathSettingItem = ({ value, setValue }: SettingItemProps<string>): JSX.Element => {
    const handleClick = async () => {
        const path = await setupInstallPath();

        if (path) {
            setValue(path);
        }
    };

    return (
        <SettingsItem name="Install Directory">
            <div className="text-white hover:text-gray-400 cursor-pointer underline transition duration-200" onClick={handleClick}>{value}</div>
        </SettingsItem>
    );
};

const DisableWarningSettingItem = ({ value, setValue }: SettingItemProps<boolean>) => {
    const handleClick = () => {
        const newState = !value;
        setValue(newState);
        settings.set('mainSettings.disableExperimentalWarning', newState);
    };

    return (
        <SettingsItem name="Disable Version Warnings">
            <Toggle
                value={value}
                onToggle={handleClick}
            />
        </SettingsItem>
    );
};

const UseCdnSettingItem = ({ value, setValue }: SettingItemProps<boolean>) => {
    const handleClick = () => {
        const newState = !value;
        setValue(newState);
        settings.set('mainSettings.useCdnCache', newState);
    };

    return (
        <SettingsItem name="Use CDN Cache (Faster Downloads)">
            <Toggle
                value={value}
                onToggle={handleClick}
            />
        </SettingsItem>
    );
};

const index = (): JSX.Element => {
    const [installPath, setInstallPath] = useSetting<string>('mainSettings.msfsPackagePath');
    const [disableVersionWarning, setDisableVersionWarning] = useSetting<boolean>('mainSettings.disableExperimentalWarning');
    const [useCdnCache, setUseCdnCache] = useSetting<boolean>('mainSettings.useCdnCache');

    const handleReset = async () => {
        settings.reset('mainSettings' as never);

        // Workaround to flush the defaults
        settings.set('metaInfo.lastVersion', packageInfo.version);
    };

    return (
        <div>
            <div className="flex flex-col">
                <h2 className="text-white">Download Settings</h2>
                <div className="flex flex-col divide-y divide-gray-600">
                    <InstallPathSettingItem value={installPath} setValue={setInstallPath} />
                    <DisableWarningSettingItem value={disableVersionWarning} setValue={setDisableVersionWarning} />
                    <UseCdnSettingItem value={useCdnCache} setValue={setUseCdnCache} />
                </div>
            </div>
            <div className="flex flex-row justify-end mt-6">
                <div
                    className="flex items-center justify-center px-2 py-1 text-white bg-red-600 hover:bg-red-700 cursor-pointer transition duration-200 rounded-md"
                    onClick={handleReset}
                >
                    Reset settings to default
                </div>
            </div>
        </div>
    );
};

export default index;
