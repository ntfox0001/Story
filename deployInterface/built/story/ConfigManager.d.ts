export declare class ConfigManager {
    private static _sConfigManager;
    static getSingleton(): ConfigManager;
    private mSettingGroupName;
    constructor();
    private mSettings;
    initial(configFilename: string, settingGroupName: string): void;
    getSetting(settingName: string): string | number | object | undefined;
    getGlobalSetting(settingName: string): string | number | object | undefined;
}
