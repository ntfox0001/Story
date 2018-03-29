"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        var err = new Error;
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
Object.defineProperty(global, '__line', {
    get: function () {
        return global["__stack"][1].getLineNumber();
    }
});
Object.defineProperty(global, '__function', {
    get: function () {
        return global["__stack"][1].getFunctionName();
    }
});
exports.__stack = global["__stack"];
exports.__line = global["__line"];
exports.__function = global["__function"];
//# sourceMappingURL=typeDefine.js.map