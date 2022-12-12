const fs = require("fs")

const data = fs.readFileSync("a.txt", "utf8").split("\n")  
const [simulationTime, nIntersections, nStreets, nCars, bonusPoints] = data[0].split(" ")
data.shift()

const input = {
    simulationTime: simulationTime,
    nIntersections: nIntersections,
    nStreets: nStreets,
    nCars: nCars,
    bonusPoints: bonusPoints,

    streets: {},
    carsPaths: []
}

for(let i=0; i<nStreets; i++){
    const [startIntersection, endIntersection, streetName, timeToCross] = data[0].split(" ")

    input.streets[streetName] = {
        startIntersection: startIntersection,
        endIntersection: endIntersection,
        timeToCross: timeToCross
    }

    data.shift()
}

for(let i=0; i<nCars; i++){
    const path = data[0].split(" ")
    path.shift()

    input.carsPaths.push(path)

    data.shift()
}

function evaluate(input, output){
    function moveNotAtStreetLight(nextCarsOnStreet){
        for(let streetName of Object.keys(carsOnStreets)){
            for(let i in carsOnStreets[streetName]){
                if(i > 0 && !carsOnStreets[streetName][i-1]){
                    nextCarsOnStreet[streetName][i-1] = carsOnStreets[streetName][i]
                    nextCarsOnStreet[streetName][i] = undefined
                }
            }
        }
    }

    function moveAtStreetLight(nextCarsOnStreet, t){
        for(let streetName of Object.keys(carsOnStreets)){
            for(let i in carsOnStreets[streetName]){
                if(i == 0 && carsOnStreets[streetName][i] && isStreetLightGreen(streetName, t)){
                    const nextStreetName = input.carsPaths[carsOnStreets[streetName][0]][0]

                    if(nextStreetName){
                        const nextStreetCrossTime = input.streets[nextStreetName].timeToCross

                        if(!carsOnStreets[nextStreetName][nextStreetCrossTime-1]){
                            nextCarsOnStreet[nextStreetName][nextStreetCrossTime-1] = carsOnStreets[streetName][0]
                            nextCarsOnStreet[streetName][0] = undefined
                            input.carsPaths[carsOnStreets[streetName][0]].shift()
                        }
                    }else{
                        nextCarsOnStreet[streetName][0] = undefined
                        score += 1000 + (input.simulationTime - t)
                    }
                }
            }
        }
    }

    function isStreetLightGreen(streetName, t){
        const endIntersection = input.streets[streetName].endIntersection
        var totalScheduleTime = 0
        var streetLightStartTime = null

        for(let intersectionStreetName of Object.keys(output[endIntersection])){
            if(intersectionStreetName == streetName && !streetLightStartTime) streetLightStartTime = totalScheduleTime
            totalScheduleTime += output[endIntersection][intersectionStreetName]
        }

        const scheduleTime = t % totalScheduleTime
        
        return streetLightStartTime != null && scheduleTime >= streetLightStartTime && scheduleTime < streetLightStartTime+output[endIntersection][streetName]
    }

    var score = 0

    var carsOnStreets = {}
    for(let streetName of Object.keys(input.streets)){
        carsOnStreets[streetName] = []
    }

    for(let i in input.carsPaths){
        carsOnStreets[input.carsPaths[i][0]].push(i)
        input.carsPaths[i].shift()
    }

    for(let t=1; t<input.simulationTime; t++){
        const nextCarsOnStreet = JSON.parse(JSON.stringify(carsOnStreets))
        moveAtStreetLight(nextCarsOnStreet, t)
        moveNotAtStreetLight(nextCarsOnStreet)
        carsOnStreets = nextCarsOnStreet
        console.log(carsOnStreets)
    }

    console.log(score)
}

evaluate(input, {
    0: {
        "rue-de-londres": 6
    },
    1: {
        "rue-d-amsterdam": 6,
        "rue-d-athenes": 4
    },
    2: {
        "rue-de-moscou": 6
    },
    3: {
        "rue-de-rome": 6
    }
})

// function f(solution) {
//     return Math.exp(28*solution[0]**3) + Math.log(2*solution[1]**2) + Math.sin(83*solution[2]) - 59
// }

// var solutions = Array.from({length: 1000}, () => [Math.random()*2000-1000, Math.random()*2000-1000, Math.random()*2000-1000])

// var nGen = 0
// while(1){
//     console.log(`Generation ${nGen}`)

//     var bestEvaluations = solutions.map(s => [s, Math.abs(f(s))]).sort((a, b) => a[1] - b[1]).slice(0, 100)
    
//     console.log(`Delta: ${bestEvaluations[0][1]} | Solution: ${bestEvaluations[0][0]}`)
//     if(bestEvaluations[0][1] < 0.0001) break
    
//     solutions = Array.from({length: 1000}, () => [bestEvaluations[Math.floor(Math.random()*bestEvaluations.length)][0][0]*(Math.random()*0.02+0.99),
//                                                   bestEvaluations[Math.floor(Math.random()*bestEvaluations.length)][0][1]*(Math.random()*0.02+0.99),
//                                                   bestEvaluations[Math.floor(Math.random()*bestEvaluations.length)][0][2]*(Math.random()*0.02+0.99)])

//     nGen++
// }