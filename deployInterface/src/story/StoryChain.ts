import { FrontCover } from "./FrontCover";
import { EasyTransaction } from "./EasyTransaction";
import { ethAddress, __function, __line, __stack } from "./typeDefine";
import { ConfigManager } from "./ConfigManager";


let util = require('util');
let truffleContract = require("truffle-contract");

export class StoryChain {
    // 合约数据 -------------------------------------------------
    private mContent: string | undefined = undefined;
    private mPraise: number = -1;      // uint32
    private mParent: StoryChain;
    private mChildren: Array<StoryChain> = new Array<StoryChain>();
    private mFrontCover: FrontCover;
    // ---------------------------------------------------------

    private mTransaction: EasyTransaction; // 交易数据
    private mAddress: string;      // 合约地址
    private mProvider: any;
    private mContract: any;        // 合约对象

    constructor(provider: any, frontCover: FrontCover) {
        this.mProvider = provider;
        this.mFrontCover = frontCover;
    }

    public getTransaction(): EasyTransaction {
        return this.mTransaction;
    }

    public getFrontCover(): FrontCover {
        return this.mFrontCover;
    }

    public getContent(): string {
        return this.mContent;
    }

    public initialFromTx(content: string, ethTx: any): void {
        this.mContent = content;
        this.mTransaction = new EasyTransaction(ethTx);
        this.mAddress = this.mTransaction.getLog().getLogData("childCreated").child;

        console.debug("create story chain: %s", this.mAddress);
    }

    public getChild(index: number): StoryChain {
        return this.mChildren[index];
    }
    public getChildCount(): number {
        return this.mChildren.length;
    }
    private addChild(child: StoryChain): void {
        child.mParent = this;
        this.mChildren.push(child);
    }
    public initialFromAddress(address: ethAddress): Promise<void> {
        let self = this;
        return new Promise((resolve: () => void, reject: () => void) => {
            self.mAddress = address;
            let storyChainJson = ConfigManager.getSingleton().getSetting("StoryChainJson");
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

    public getAddress(): string {
        return this.mAddress;
    }

    public createChild(content: string): Promise<StoryChain> {
        let self = this;
        return new Promise((resolve: (v: StoryChain) => void, reject: (v: StoryChain) => void) => {

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
