import { deserializeInput, deserializeOutput } from "./serializer";
import evaluate from "./evaluate";

const input = deserializeInput(process.argv[2])
const output = deserializeOutput(process.argv[3])

const startTime = Date.now()
const {score, nCarsFinished} = evaluate(input, output)

console.log(`Score: ${score.toLocaleString()} | Cars finished: ${nCarsFinished.toLocaleString()} | Time: ${(Date.now()-startTime).toLocaleString()} ms`)