"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FrontCover_1 = require("./FrontCover");
const ConfigManager_1 = require("./ConfigManager");
let Web3 = require("Web3");
class StoryManager {
    constructor() {
        this.mStoryMap = new Map();
    }
    initial() {
        this.mWeb3 = new Web3();
        let provider = ConfigManager_1.ConfigManager.getSingleton().getSetting("Provider");
        this.mProvider = new Web3.providers.HttpProvider(provider);
    }
    createFrontCover(name, content) {
        return new Promise((resolve, reject) => {
            let fc = new FrontCover_1.FrontCover(this.mProvider);
            fc.initialFrontCoverAndFirstStoryChain(name, content).then(sc => {
                this.mStoryMap.set(fc.getAddress(), fc);
                resolve(fc);
            });
        });
    }
    restoreFrontCover(address) {
        return new Promise((resolve, reject) => {
            let fc = new FrontCover_1.FrontCover(this.mProvider);
            fc.initialFrontCoverWithAddress(address).then(sc => {
                this.mStoryMap.set(address, fc);
                resolve(fc);
            });
        });
    }
}
exports.StoryManager = StoryManager;
//# sourceMappingURL=StoryManager.js.map