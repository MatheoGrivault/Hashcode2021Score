"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("./serializer");
const evaluate_1 = __importDefault(require("./evaluate"));
const input = (0, serializer_1.deserializeInput)(process.argv[2]);
const output = (0, serializer_1.deserializeOutput)(process.argv[3]);
const startTime = Date.now();
const { score, nCarsFinished } = (0, evaluate_1.default)(input, output);
console.log(`Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${(Date.now() - startTime).toLocaleString()} ms`);
