import fs from "fs"
import Street from "./street"
import Car from "./car"
import Intersection from "./intersection"
import type { Input, Output } from "./types"

export function deserializeInput(file: string): Input {
    const data = fs.readFileSync(file, "utf8").split("\n")  
    const [simulationTime, nIntersections, nStreets, nCars, bonusPoints] = data[0].split(" ").map(d => parseInt(d))
    data.shift()
    
    const input: Input = {
        simulationTime: simulationTime,
        bonusPoints: bonusPoints,
    
        streets: {},
        cars: []
    }
    
    for(let i=0; i<nStreets; i++){
        const [startIntersectionId, endIntersectionId, streetName, timeToCross] = data[0].split(" ")
    
        input.streets[streetName] = new Street(parseInt(endIntersectionId), parseInt(timeToCross))
    
        data.shift()
    }
    
    for(let i=0; i<nCars; i++){
        const path = data[0].split(" ")
        path.shift()
    
        input.cars.push(new Car(path))
    
        data.shift()
    }

    return input
}

export function deserializeOutput(file: string): Output {
    const data = fs.readFileSync(file, "utf8").split("\n")  
    const nIntersections = parseInt(data[0])
    data.shift()

    const output: Output = {}

    for(let i=0; i<nIntersections; i++){
        const intersectionId = parseInt(data[0])
        data.shift()

        const nStreets = parseInt(data[0])
        data.shift()
    
        const streetsTimeOnGreen: {[name: string]: number} = {}
        for(let j=0; j<nStreets; j++){
            const [streetName, timeOnGreen] = data[0].split(" ")
            data.shift()

            streetsTimeOnGreen[streetName] = parseInt(timeOnGreen)
        }

        output[intersectionId] = new Intersection(streetsTimeOnGreen)
    }

    return output
}