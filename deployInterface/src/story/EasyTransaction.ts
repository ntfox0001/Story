import { EasyTransactionLog } from "./EasyTransactionLog";
import { EasyTransactionReceipt } from "./EasyTransactionReceipt";


let util = require('util');

export class EasyTransaction {
    private ethReceipt: EasyTransactionReceipt = null;
    private ethLog: EasyTransactionLog = null;
    constructor(public ethTx: any) {
    }

    public getAddress(): string {
        return this.ethTx.tx;
    }
    public getReceipt(): EasyTransactionReceipt {
        if (this.ethReceipt == null) {
            this.ethReceipt = new EasyTransactionReceipt(this.ethTx.receipt);
        }
        return this.ethReceipt;
    }
    public getLog(): EasyTransactionLog {
        if (this.ethLog == null) {
            this.ethLog = new EasyTransactionLog(this.ethTx.logs);
        }
        return this.ethLog;
    }
    public toString(): string {
        return util.format("transactionHash: %s.\n%s\n%s", this.ethTx.tx, this.getReceipt().toString(), this.getLog().toString());
    }
}

