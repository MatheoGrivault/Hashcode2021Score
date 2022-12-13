"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Street {
    constructor(endIntersectionId, timeToCross) {
        this.nextCarsCrossing = [];
        this.endIntersectionId = endIntersectionId;
        this.timeToCross = timeToCross;
    }
}
exports.default = Street;
