import { det } from "mathjs";
import { solve } from "../math/solve";
import { Fraction } from "../math/Fraction";

let d=[[2,3,-5],[1,-2,1],[3,1,3]].map(v1=>v1.map(v2=>new Fraction(v2)));

let ans = [3,0,7].map(v=>new Fraction(v));

console.log(solve(d,ans));