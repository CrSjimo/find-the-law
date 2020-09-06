import {Fraction} from './math/Fraction';
import { solve } from './math/solve';

const MAGIC:{[p:number]:number[]} = {
    1:[114514],
    2:[114514,1919810],
    3:[114514,1919,810],
    4:[114,514,1919,810],
    5:[114,514,19,19,810],
    6:[114,514,19,19,8,10],
    7:[11,45,14,19,19,8,10],
    8:[11,4,51,4,19,19,8,10],
    9:[11,4,51,4,19,19,8,1,0],
    10:[11,4,5,1,4,19,19,8,1,0],
};

export function calc(a:Fraction[]){
    let n=a.length;
    let magicNum = 0;
    for(let i = 0 ; i < n ; i++){
        if(a[i].isNaF){
            magicNum++;
        }
    }
    for(let i = 0 , j = 0 ; i < n ; i++){
        if(a[i].isNaF){
            a[i]=new Fraction(MAGIC[magicNum][j++]);
        }
    }
    let d:Fraction[][] = [];
    for(let i = 0 ; i < n ; i++){
        d[i]=[];
        for(let j = 0 ; j < n ; j++){
            d[i][j] = new Fraction(Math.pow(i,n-j-1));
        }
    }
    let solution = solve(d,a);
    return {a,solution};
}

