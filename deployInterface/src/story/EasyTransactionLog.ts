
let util = require('util');

export class EasyTransactionLog {
    public mLogData: Map<string, any> = new Map<string, any>();
    constructor(public ethLog: any) {
        ethLog.forEach(element => {
            this.mLogData.set(element.event, element.args);
        });
    }
    public getLogData(eventName: string): any {
        return this.mLogData.get(eventName);
    }
    public toString(): string {
        let rt: string = "";
        this.mLogData.forEach((v, k, map) => {
            let args = "";
            for (let ak in v)
            {
                args = util.format("%s    %s : %s\n", args, ak, v[ak]);
            }
            rt = util.format("%s%s :\n%s", rt, k, args);
        });
        return rt;
    }
}

