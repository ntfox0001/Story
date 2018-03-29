"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require("fs");
class ConfigManager {
    constructor() {
        ConfigManager._sConfigManager = this;
    }
    static getSingleton() {
        return ConfigManager._sConfigManager;
    }
    initial(configFilename, settingGroupName) {
        this.mSettingGroupName = settingGroupName;
        this.mSettings = JSON.parse(fs.readFileSync(configFilename));
    }
    getSetting(settingName) {
        return this.mSettings[this.mSettingGroupName][settingName] == undefined ?
            this.mSettings["GlobalSetting"][settingName] : this.mSettings[this.mSettingGroupName][settingName];
    }
    getGlobalSetting(settingName) {
        return this.mSettings["GlobalSetting"][settingName];
    }
}
ConfigManager._sConfigManager = null;
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=ConfigManager.js.map