"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluate(input, output) {
    var score = 0;
    var nCarsFinished = 0;
    const { simulationTime, bonusPoints, streets, cars } = input;
    //Add cars to streets
    for (let car of cars) {
        car.currentStreet = car.path[0];
        car.path.shift();
    }
    //Run simulation
    for (let t = 0; t <= simulationTime; t++) {
        const alreadyPassedIntersections = []; //To allow only one car per intersection at each step
        for (let car of cars) {
            if (car.hasFinished)
                continue;
            const street = streets[car.currentStreet];
            if (car.remainingTimeToCross <= 0) {
                //Check if the car has finished its path
                if (car.path.length == 0) {
                    car.hasFinished = true;
                    score += bonusPoints + (simulationTime - t);
                    nCarsFinished++;
                }
                else {
                    //Try to make the car cross the intersection
                    if (!street.nextCarsCrossing.includes(car))
                        street.nextCarsCrossing.push(car);
                    //Check if the traffic light is green, if the car is first in the queue and that no one already crossed the intersection during this step
                    if (output[street.endIntersectionId]
                        && output[street.endIntersectionId].isStreetOnGreen(car.currentStreet, t)
                        && !alreadyPassedIntersections.includes(street.endIntersectionId)
                        && street.nextCarsCrossing[0] == car) {
                        //The car goes to the next street
                        car.currentStreet = car.path[0];
                        car.remainingTimeToCross = streets[car.currentStreet].timeToCross;
                        car.path.shift();
                        street.nextCarsCrossing.shift();
                        alreadyPassedIntersections.push(street.endIntersectionId);
                    }
                }
            }
            car.remainingTimeToCross--;
        }
    }
    return { score: score, nCarsFinished: nCarsFinished };
}
exports.default = evaluate;
