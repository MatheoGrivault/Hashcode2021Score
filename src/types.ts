import Street from "./street"
import Car from "./car"
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