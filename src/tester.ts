import { deserializeInput, deserializeOutput } from "./serializer";
import evaluate from "./evaluate";
import fs from "fs"
import { exit } from "process";

if(process.argv.length < 4){
    console.error("Usage: node tester.js <inputFileOrDir> <outputFileOrDir>")
    exit()
}

if(fs.statSync(process.argv[2]).isDirectory() && fs.statSync(process.argv[3]).isDirectory()){
    var totalScore = 0
    var totalTime = 0

    for(let file of fs.readdirSync(process.argv[2])){
        const {score, nCarsFinished, time} = evaluateFile(process.argv[2] + "/" + file, process.argv[3] + "/" + file)

        totalScore += score
        totalTime += time

        console.log(`${file} > Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${time.toLocaleString()} ms`)
    }

    console.log(`\nTotal score: ${totalScore.toLocaleString()} | Total time: ${totalTime.toLocaleString()} ms`)
}else{
    const {score, nCarsFinished, time} = evaluateFile(process.argv[2], process.argv[3])

    console.log(`Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${time.toLocaleString()} ms`)
}

function evaluateFile(inputFile: string, outputFile: string): {score: number, nCarsFinished: number, time: number} {
    const input = deserializeInput(inputFile)
    const output = deserializeOutput(outputFile)

    const startTime = Date.now()
    const {score, nCarsFinished} = evaluate(input, output)
    
    return {score, nCarsFinished, time: Date.now()-startTime}
}