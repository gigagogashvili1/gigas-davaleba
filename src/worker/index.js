"use strict";
const { parentPort } = require("worker_threads");
function forLoopFunction() {
    let int = 0;
    for (let i = 0; i < 1e10; i++) {
        int++;
    }
    parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage(int);
}
forLoopFunction();
