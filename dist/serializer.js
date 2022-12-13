"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeOutput = exports.deserializeInput = void 0;
const fs_1 = __importDefault(require("fs"));
const street_1 = __importDefault(require("./street"));
const car_1 = __importDefault(require("./car"));
const intersection_1 = __importDefault(require("./intersection"));
function deserializeInput(file) {
    const data = fs_1.default.readFileSync(file, "utf8").split("\n");
    const [simulationTime, nIntersections, nStreets, nCars, bonusPoints] = data[0].split(" ").map(d => parseInt(d));
    data.shift();
    const input = {
        simulationTime: simulationTime,
        bonusPoints: bonusPoints,
        streets: {},
        cars: []
    };
    for (let i = 0; i < nStreets; i++) {
        const [startIntersectionId, endIntersectionId, streetName, timeToCross] = data[0].split(" ");
        input.streets[streetName] = new street_1.default(parseInt(endIntersectionId), parseInt(timeToCross));
        data.shift();
    }
    for (let i = 0; i < nCars; i++) {
        const path = data[0].split(" ");
        path.shift();
        input.cars.push(new car_1.default(path));
        data.shift();
    }
    return input;
}
exports.deserializeInput = deserializeInput;
function deserializeOutput(file) {
    const data = fs_1.default.readFileSync(file, "utf8").split("\n");
    const nIntersections = parseInt(data[0]);
    data.shift();
    const output = {};
    for (let i = 0; i < nIntersections; i++) {
        const intersectionId = parseInt(data[0]);
        data.shift();
        const nStreets = parseInt(data[0]);
        data.shift();
        const streetsTimeOnGreen = {};
        for (let j = 0; j < nStreets; j++) {
            const [streetName, timeOnGreen] = data[0].split(" ");
            data.shift();
            streetsTimeOnGreen[streetName] = parseInt(timeOnGreen);
        }
        output[intersectionId] = new intersection_1.default(streetsTimeOnGreen);
    }
    return output;
}
exports.deserializeOutput = deserializeOutput;
