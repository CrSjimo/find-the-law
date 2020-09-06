import { output } from "./output";
import { generateSolution } from "./generateSolution";

export default function findLaw(s:string[]){
    return output(generateSolution(s));
}