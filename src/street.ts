import Car from "./car"

export default class Street {
    endIntersectionId: number
    timeToCross: number
    nextCarsCrossing: Car[] = []

    constructor(endIntersectionId: number, timeToCross: number) {
        this.endIntersectionId = endIntersectionId
        this.timeToCross = timeToCross
    }
}