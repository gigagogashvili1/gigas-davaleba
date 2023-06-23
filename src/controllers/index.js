"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncController = exports.asyncController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
function asyncController(req, res) {
    const payload = "Random text to hash -_-";
    const algorithm = "sha512";
    const salt = crypto_1.default.randomBytes(64);
    const iteration = 1000000;
    const keyLength = 64;
    crypto_1.default.pbkdf2(payload, salt, iteration, keyLength, algorithm, (err, encryptedPayload) => {
        if (err) {
            res.status(500).send("Server error");
        }
        const jsonData = encryptedPayload.toJSON();
        res.status(200).send(jsonData);
    });
}
exports.asyncController = asyncController;
function syncController(req, res) {
    const workerPath = path_1.default.resolve(process.cwd(), "src", "worker", "index.js");
    const worker = new worker_threads_1.Worker(workerPath);
    worker.on("message", (data) => {
        console.log(data);
        worker.terminate();
    });
    worker.on("error", (err) => {
        console.log(err);
        worker.terminate();
    });
    worker.on("exit", (exitCode) => {
        console.log(exitCode);
    });
    res.send("Hello sync");
}
exports.syncController = syncController;
