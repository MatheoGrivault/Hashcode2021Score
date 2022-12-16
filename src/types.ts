import Intersection from "./intersection"

export type Input = {
    simulationTime: number,
    bonusPoints: number,

    streets: {[name: string]: Street},
    cars: Car[]
}

export type Output = {
    [intersectionId: number]: Intersection
}

export type Street = {
    endIntersectionId: number
    timeToCross: number
    nextCarsCrossing: Car[]
}

export type Car = {
    path: string[]
    remainingTimeToCross: number
    currentStreet: string
    hasFinished: boolean
}