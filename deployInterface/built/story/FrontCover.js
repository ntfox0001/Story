"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StoryChain_1 = require("./StoryChain");
const ConfigManager_1 = require("./ConfigManager");
let truffleContract = require("truffle-contract");
class FrontCover {
    constructor(provider) {
        this.mProvider = provider;
        let frontCoverJson = ConfigManager_1.ConfigManager.getSingleton().getSetting("FrontCoverJson");
        this.mContract = truffleContract(require(frontCoverJson.toString()));
        this.mContract.setProvider(this.mProvider);
        let accountAddress = ConfigManager_1.ConfigManager.getSingleton().getSetting("Account");
        let gas = +ConfigManager_1.ConfigManager.getSingleton().getSetting("NewGas");
        let gasPrice = +ConfigManager_1.ConfigManager.getSingleton().getSetting("NewGasPrice");
        this.mContract.defaults({ from: accountAddress, gas: gas, gasPrice: gasPrice });
    }
    getFirstStoryChain() {
        return this.mStoryChain;
    }
    getName() {
        return this.mName;
    }
    getContract() {
        return this.mContract;
    }
    getContractSol() {
        return this.mContractSol;
    }
    getAddress() {
        return this.mAddress;
    }
    initialFrontCoverAndFirstStoryChain(name, content) {
        this.mName = name;
        let self = this;
        return new Promise((resolve, reject) => {
            self.mContract.new(self.mName).then(fc => {
                self.mContractSol = fc;
                self.mAddress = fc.address;
                fc.createChildStory(content, "0x0").then(tx => {
                    self.mStoryChain = new StoryChain_1.StoryChain(self.mProvider, self);
                    self.mStoryChain.initialFromTx(content, tx);
                    resolve(self.mStoryChain);
                });
            });
        });
    }
    initialFrontCoverWithAddress(address) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.mContract.at(address).then(fc => {
                self.mContractSol = fc;
                let scPromise = fc.storyChain();
                let namePromise = fc.name();
                Promise.all([scPromise, namePromise]).then(rts => {
                    self.mName = rts[1];
                    self.mStoryChain = new StoryChain_1.StoryChain(self.mProvider, self);
                    self.mStoryChain.initialFromAddress(rts[0]).then(() => {
                        resolve(self.mStoryChain);
                    });
                });
            });
        });
    }
}
exports.FrontCover = FrontCover;
//# sourceMappingURL=FrontCover.js.map