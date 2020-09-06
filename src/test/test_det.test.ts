import { solve } from "../math/solve";
import { Fraction } from "../math/Fraction";

let d=[[2,3,-5],[1,-2,1],[3,1,3]].map(v1=>v1.map(v2=>new Fraction(v2)));

let ans = [3,0,7].map(v=>new Fraction(v));

console.log(solve(d,ans));

d=[
    [1,4,5,1,4],
    [1,9,1,9,8],
    [1,1,4,5,1],
    [2,3,3,3,3],
    [1,9,2,6,8],
].map(v1=>v1.map(v2=>new Fraction(v2)));

ans = [1,2,3,4,5].map(v=>new Fraction(v));

let solution = solve(d,ans);

for(let x of d){
    let tmp=new Fraction(0);
    for(let i =0;i<5;i++){
        tmp=tmp.add(x[i].mul(solution[i]));
    }
    console.log(tmp);
}