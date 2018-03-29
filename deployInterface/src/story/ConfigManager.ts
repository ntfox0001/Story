
    let fs = require("fs");

    export class ConfigManager {
        private static _sConfigManager: ConfigManager = null;
        public static getSingleton(): ConfigManager {
            return ConfigManager._sConfigManager;
        }
    
        //-----------------------------------------------------------------------------------------------
        private mSettingGroupName: string;
        constructor() {
            ConfigManager._sConfigManager = this;
        }
        private mSettings: any;
        public initial(configFilename: string, settingGroupName: string): void {
            this.mSettingGroupName = settingGroupName;
            this.mSettings = JSON.parse(fs.readFileSync(configFilename));
        }
        public getSetting(settingName: string): string | number | object | undefined {
            return this.mSettings[this.mSettingGroupName][settingName] == undefined ?
                this.mSettings["GlobalSetting"][settingName] : this.mSettings[this.mSettingGroupName][settingName];
        }
        public getGlobalSetting(settingName: string): string | number | object | undefined {
            return this.mSettings["GlobalSetting"][settingName];
        }
    }
    

