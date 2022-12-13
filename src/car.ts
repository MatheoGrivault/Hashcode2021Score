export default class Car {
    path: string[]
    remainingTimeToCross: number
    currentStreet: string
    hasFinished: boolean

    constructor(path: string[]){
        this.path = path
        this.remainingTimeToCross = 0
        this.currentStreet = ""
        this.hasFinished = false
    }
}