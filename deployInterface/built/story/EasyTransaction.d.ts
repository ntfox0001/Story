import { EasyTransactionLog } from "./EasyTransactionLog";
import { EasyTransactionReceipt } from "./EasyTransactionReceipt";
export declare class EasyTransaction {
    ethTx: any;
    private ethReceipt;
    private ethLog;
    constructor(ethTx: any);
    getAddress(): string;
    getReceipt(): EasyTransactionReceipt;
    getLog(): EasyTransactionLog;
    toString(): string;
}
