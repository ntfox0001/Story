export declare class EasyTransactionReceipt {
    ethReceipt: object;
    private mBlockHash;
    private mBlockNumber;
    private mGasUsed;
    private mTransactionIndex;
    constructor(ethReceipt: object);
    toString(): string;
}
