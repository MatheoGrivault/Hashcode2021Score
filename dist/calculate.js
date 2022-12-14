"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("./serializer");
const evaluate_1 = __importDefault(require("./evaluate"));
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
if (process.argv.length < 4) {
    console.error("Usage: node calculate.js <inputFileOrDir> <outputFileOrDir>");
    (0, process_1.exit)();
}
if (fs_1.default.statSync(process.argv[2]).isDirectory() && fs_1.default.statSync(process.argv[3]).isDirectory()) {
    var totalScore = 0;
    var totalTime = 0;
    for (let file of fs_1.default.readdirSync(process.argv[2])) {
        const { score, nCarsFinished, time } = evaluateFile(process.argv[2] + "/" + file, process.argv[3] + "/" + file);
        totalScore += score;
        totalTime += time;
        console.log(`${file} > Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${time.toLocaleString()} ms`);
    }
    console.log(`\nTotal score: ${totalScore.toLocaleString()} | Total time: ${totalTime.toLocaleString()} ms`);
}
else {
    const { score, nCarsFinished, time } = evaluateFile(process.argv[2], process.argv[3]);
    console.log(`Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${time.toLocaleString()} ms`);
}
function evaluateFile(inputFile, outputFile) {
    const input = (0, serializer_1.deserializeInput)(inputFile);
    const output = (0, serializer_1.deserializeOutput)(outputFile);
    const startTime = Date.now();
    const { score, nCarsFinished } = (0, evaluate_1.default)(input, output);
    return { score, nCarsFinished, time: Date.now() - startTime };
}
