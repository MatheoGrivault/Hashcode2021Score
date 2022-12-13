export default class Intersection {
    streetsTimeOnGreen: {[name: string]: number}

    constructor(streetsTimeOnGreen: {[name: string]: number}){
        this.streetsTimeOnGreen = streetsTimeOnGreen
    }

    isStreetOnGreen(streetName: string, t: number){
        if(this.streetsTimeOnGreen[streetName] == undefined) return false

        var totalScheduleTime = 0
        var streetScheduleStartTime = 0

        for(let s of Object.keys(this.streetsTimeOnGreen)){
            if(s == streetName) streetScheduleStartTime = totalScheduleTime
            totalScheduleTime += this.streetsTimeOnGreen[s]
        }

        const scheduleTime = t % totalScheduleTime
        
        return scheduleTime >= streetScheduleStartTime && scheduleTime < streetScheduleStartTime + this.streetsTimeOnGreen[streetName]
    }
}