import { StoryChain } from "./StoryChain";
import { ethAddress } from "./typeDefine";
export declare class FrontCover {
    private mProvider;
    private mContract;
    private mContractSol;
    private mName;
    private mStoryChain;
    private mAddress;
    constructor(provider: any);
    getFirstStoryChain(): StoryChain;
    getName(): string;
    getContract(): any;
    getContractSol(): any;
    getAddress(): ethAddress;
    initialFrontCoverAndFirstStoryChain(name: string, content: string): Promise<StoryChain>;
    initialFrontCoverWithAddress(address: ethAddress): Promise<StoryChain>;
}
