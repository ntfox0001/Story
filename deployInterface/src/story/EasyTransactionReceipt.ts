
let util = require('util');
export class EasyTransactionReceipt {
    private mBlockHash: string;
    private mBlockNumber: number;
    private mGasUsed: number;
    private mTransactionIndex: number;
    constructor(public ethReceipt: object) {
        this.mBlockHash = ethReceipt["blockHash"];
        this.mBlockNumber = ethReceipt["blockNumber"];
        this.mGasUsed = ethReceipt["gasUsed"];
        this.mTransactionIndex = ethReceipt["transactionIndex"];

    }

    public toString(): string {
        return util.format("blockHash: %s.\nblockNumber: %d.\ngasUsed: %s.\ntransactionIndex: %s"
            , this.mBlockHash, this.mBlockNumber, this.mGasUsed, this.mTransactionIndex);
    }
}

