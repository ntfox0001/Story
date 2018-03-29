"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EasyTransactionLog_1 = require("./EasyTransactionLog");
const EasyTransactionReceipt_1 = require("./EasyTransactionReceipt");
let util = require('util');
class EasyTransaction {
    constructor(ethTx) {
        this.ethTx = ethTx;
        this.ethReceipt = null;
        this.ethLog = null;
    }
    getAddress() {
        return this.ethTx.tx;
    }
    getReceipt() {
        if (this.ethReceipt == null) {
            this.ethReceipt = new EasyTransactionReceipt_1.EasyTransactionReceipt(this.ethTx.receipt);
        }
        return this.ethReceipt;
    }
    getLog() {
        if (this.ethLog == null) {
            this.ethLog = new EasyTransactionLog_1.EasyTransactionLog(this.ethTx.logs);
        }
        return this.ethLog;
    }
    toString() {
        return util.format("transactionHash: %s.\n%s\n%s", this.ethTx.tx, this.getReceipt().toString(), this.getLog().toString());
    }
}
exports.EasyTransaction = EasyTransaction;
//# sourceMappingURL=EasyTransaction.js.map