export declare class EasyTransactionLog {
    ethLog: any;
    mLogData: Map<string, any>;
    constructor(ethLog: any);
    getLogData(eventName: string): any;
    toString(): string;
}
