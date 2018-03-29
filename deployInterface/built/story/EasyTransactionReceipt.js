"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let util = require('util');
class EasyTransactionReceipt {
    constructor(ethReceipt) {
        this.ethReceipt = ethReceipt;
        this.mBlockHash = ethReceipt["blockHash"];
        this.mBlockNumber = ethReceipt["blockNumber"];
        this.mGasUsed = ethReceipt["gasUsed"];
        this.mTransactionIndex = ethReceipt["transactionIndex"];
    }
    toString() {
        return util.format("blockHash: %s.\nblockNumber: %d.\ngasUsed: %s.\ntransactionIndex: %s", this.mBlockHash, this.mBlockNumber, this.mGasUsed, this.mTransactionIndex);
    }
}
exports.EasyTransactionReceipt = EasyTransactionReceipt;
//# sourceMappingURL=EasyTransactionReceipt.js.map