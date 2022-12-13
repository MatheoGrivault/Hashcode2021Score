"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Intersection {
    constructor(streetsTimeOnGreen) {
        this.streetsTimeOnGreen = streetsTimeOnGreen;
    }
    isStreetOnGreen(streetName, t) {
        if (this.streetsTimeOnGreen[streetName] == undefined)
            return false;
        var totalScheduleTime = 0;
        var streetScheduleStartTime = 0;
        for (let s of Object.keys(this.streetsTimeOnGreen)) {
            if (s == streetName)
                streetScheduleStartTime = totalScheduleTime;
            totalScheduleTime += this.streetsTimeOnGreen[s];
        }
        const scheduleTime = t % totalScheduleTime;
        return scheduleTime >= streetScheduleStartTime && scheduleTime < streetScheduleStartTime + this.streetsTimeOnGreen[streetName];
    }
}
exports.default = Intersection;
