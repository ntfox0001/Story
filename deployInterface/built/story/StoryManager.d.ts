import { FrontCover } from "./FrontCover";
import { ethAddress } from "./typeDefine";
export declare class StoryManager {
    private mStoryMap;
    private mWeb3;
    private mProvider;
    constructor();
    initial(): void;
    createFrontCover(name: string, content: string): Promise<FrontCover>;
    restoreFrontCover(address: ethAddress): Promise<FrontCover>;
}
