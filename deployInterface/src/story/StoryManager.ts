import { FrontCover } from "./FrontCover";
import { ethAddress } from "./typeDefine";
import { ConfigManager } from "./ConfigManager";


let Web3 = require("Web3");

export class StoryManager {
    private mStoryMap: Map<ethAddress, FrontCover> = new Map<string, FrontCover>();
    private mWeb3: any;
    private mProvider: any;//Web3.providers.HttpProvider;

    public constructor() {

    }

    public initial(): void {
        this.mWeb3 = new Web3();

        let provider = ConfigManager.getSingleton().getSetting("Provider");

        this.mProvider = new Web3.providers.HttpProvider(provider);

    }

    public createFrontCover(name: string, content: string): Promise<FrontCover> {
        return new Promise((resolve: (v: FrontCover) => void, reject: (v: FrontCover) => void) => {
            let fc = new FrontCover(this.mProvider);
            fc.initialFrontCoverAndFirstStoryChain(name, content).then(sc => {
                this.mStoryMap.set(fc.getAddress(), fc);
                resolve(fc);
            });
        });
    }

    public restoreFrontCover(address: ethAddress): Promise<FrontCover> {
        return new Promise((resolve: (v: FrontCover) => void, reject: (v: FrontCover) => void) => {
            let fc = new FrontCover(this.mProvider);
            fc.initialFrontCoverWithAddress(address).then(sc => {
                this.mStoryMap.set(address, fc);
                resolve(fc);
            });
        });
    }
}

