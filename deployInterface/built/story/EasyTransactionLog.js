"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let util = require('util');
class EasyTransactionLog {
    constructor(ethLog) {
        this.ethLog = ethLog;
        this.mLogData = new Map();
        ethLog.forEach(element => {
            this.mLogData.set(element.event, element.args);
        });
    }
    getLogData(eventName) {
        return this.mLogData.get(eventName);
    }
    toString() {
        let rt = "";
        this.mLogData.forEach((v, k, map) => {
            let args = "";
            for (let ak in v) {
                args = util.format("%s    %s : %s\n", args, ak, v[ak]);
            }
            rt = util.format("%s%s :\n%s", rt, k, args);
        });
        return rt;
    }
}
exports.EasyTransactionLog = EasyTransactionLog;
//# sourceMappingURL=EasyTransactionLog.js.map