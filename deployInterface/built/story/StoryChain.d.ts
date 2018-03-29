import { FrontCover } from "./FrontCover";
import { EasyTransaction } from "./EasyTransaction";
import { ethAddress } from "./typeDefine";
export declare class StoryChain {
    private mContent;
    private mPraise;
    private mParent;
    private mChildren;
    private mFrontCover;
    private mTransaction;
    private mAddress;
    private mProvider;
    private mContract;
    constructor(provider: any, frontCover: FrontCover);
    getTransaction(): EasyTransaction;
    getFrontCover(): FrontCover;
    getContent(): string;
    initialFromTx(content: string, ethTx: any): void;
    getChild(index: number): StoryChain;
    getChildCount(): number;
    private addChild(child);
    initialFromAddress(address: ethAddress): Promise<void>;
    getAddress(): string;
    createChild(content: string): Promise<StoryChain>;
}
