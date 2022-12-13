"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    constructor(path) {
        this.path = path;
        this.remainingTimeToCross = 0;
        this.currentStreet = "";
        this.hasFinished = false;
    }
}
exports.default = Car;
