
export type ethAddress = string;


Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        var err = new Error;
        //Error.captureStackTrace(err, arguments.callee);
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

export let __stack: any = global["__stack"];
export let __line: any = global["__line"];
export let __function: any = global["__function"];