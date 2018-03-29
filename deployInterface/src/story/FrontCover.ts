import { StoryChain } from "./StoryChain";
import { ethAddress } from "./typeDefine";
import { ConfigManager } from "./ConfigManager";


let truffleContract = require("truffle-contract");
export class FrontCover {
    private mProvider: any;
    private mContract: any;    // 合约对象
    private mContractSol: any;
    private mName: string;
    private mStoryChain: StoryChain;
    private mAddress: ethAddress;  //合约地址

    constructor(provider: any) {
        this.mProvider = provider;

        // '../../build/contracts/FrontCover.json'
        let frontCoverJson = ConfigManager.getSingleton().getSetting("FrontCoverJson");
        this.mContract = truffleContract(require(frontCoverJson.toString()));
        this.mContract.setProvider(this.mProvider);

        // from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", gas: 4712388, gasPrice: 100000000000
        let accountAddress = ConfigManager.getSingleton().getSetting("Account");
        let gas: number = +ConfigManager.getSingleton().getSetting("NewGas");
        let gasPrice: number = +ConfigManager.getSingleton().getSetting("NewGasPrice");

        this.mContract.defaults({ from: accountAddress, gas: gas, gasPrice: gasPrice });

    }
    public getFirstStoryChain(): StoryChain {
        return this.mStoryChain;
    }
    public getName(): string {
        return this.mName;
    }
    public getContract(): any {
        return this.mContract;
    }
    public getContractSol(): any {
        return this.mContractSol;
    }
    public getAddress(): ethAddress {
        return this.mAddress;
    }
    public initialFrontCoverAndFirstStoryChain(name: string, content: string): Promise<StoryChain> {
        this.mName = name;
        let self = this;
        return new Promise((resolve: (v: StoryChain) => void, reject: (v: StoryChain) => void) => {
            self.mContract.new(self.mName).then(fc => {

                self.mContractSol = fc;
                self.mAddress = fc.address;

                fc.createChildStory(content, "0x0").then(tx => {
                    self.mStoryChain = new StoryChain(self.mProvider, self);
                    self.mStoryChain.initialFromTx(content, tx);

                    resolve(self.mStoryChain);
                });
            });
        });
    }

    public initialFrontCoverWithAddress(address: ethAddress): Promise<StoryChain> {
        let self = this;
        return new Promise((resolve: (v: StoryChain) => void, reject: (v: StoryChain) => void) => {
            self.mContract.at(address).then(fc => {
                self.mContractSol = fc;

                let scPromise = fc.storyChain();
                let namePromise = fc.name();

                Promise.all([scPromise, namePromise]).then(rts => {

                    self.mName = rts[1];

                    self.mStoryChain = new StoryChain(self.mProvider, self);
                    self.mStoryChain.initialFromAddress(rts[0]).then(() => {
                        resolve(self.mStoryChain);
                    });

                });
            });
        });
    }

}
