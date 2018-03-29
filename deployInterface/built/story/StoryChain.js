"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EasyTransaction_1 = require("./EasyTransaction");
const ConfigManager_1 = require("./ConfigManager");
let util = require('util');
let truffleContract = require("truffle-contract");
class StoryChain {
    constructor(provider, frontCover) {
        this.mContent = undefined;
        this.mPraise = -1;
        this.mChildren = new Array();
        this.mProvider = provider;
        this.mFrontCover = frontCover;
    }
    getTransaction() {
        return this.mTransaction;
    }
    getFrontCover() {
        return this.mFrontCover;
    }
    getContent() {
        return this.mContent;
    }
    initialFromTx(content, ethTx) {
        this.mContent = content;
        this.mTransaction = new EasyTransaction_1.EasyTransaction(ethTx);
        this.mAddress = this.mTransaction.getLog().getLogData("childCreated").child;
        console.debug("create story chain: %s", this.mAddress);
    }
    getChild(index) {
        return this.mChildren[index];
    }
    getChildCount() {
        return this.mChildren.length;
    }
    addChild(child) {
        child.mParent = this;
        this.mChildren.push(child);
    }
    initialFromAddress(address) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.mAddress = address;
            let storyChainJson = ConfigManager_1.ConfigManager.getSingleton().getSetting("StoryChainJson");
            self.mContract = truffleContract(require(storyChainJson.toString()));
            self.mContract.setProvider(self.mProvider);
            self.mContract.at(address).then(contra => {
                console.debug("restore story chain: %s", self.getAddress());
                contra.getInfo().then(rts => {
                    self.mContent = rts[0];
                    self.mPraise = rts[1];
                    let promiseArray = new Array();
                    rts[3].forEach(element => {
                        let scChild = new StoryChain(self.mProvider, self.mFrontCover);
                        self.addChild(scChild);
                        promiseArray.push(scChild.initialFromAddress(element));
                    });
                    Promise.all(promiseArray).then(() => {
                        resolve();
                    });
                });
            });
        });
    }
    getAddress() {
        return this.mAddress;
    }
    createChild(content) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.mFrontCover.getContractSol().createChildStory(content, self.mAddress).then(tx => {
                let sc = new StoryChain(self.mProvider, self.mFrontCover);
                sc.initialFromTx(content, tx);
                self.addChild(sc);
                console.debug(sc.getTransaction().toString());
                resolve(sc);
            })
                .catch(err => {
                console.error(util.format("frontCover contract createChildStory failed: %s", err.stack));
            });
        });
    }
}
exports.StoryChain = StoryChain;
//# sourceMappingURL=StoryChain.js.map