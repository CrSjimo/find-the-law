import { Fraction } from "./math/Fraction";
import { calc } from "./calc";

export interface Solution{
    known:{
        [property:number]:Fraction;
    }
    unknown:{
        [property:number]:Fraction;
    }
    solution:Fraction[];
}

export function generateSolution(rawData:string[]){
    let report:Solution = {
        known:{},
        unknown:{},
        solution:[],
    }
    let res = calc(rawData.map((v)=>{
        if(v=='?'||v=='？'){
            return new Fraction(NaN);
        }else{
            let frac = new Fraction(v);
            if(frac.isNaF){
                throw new Error('Invalid input.');
            }else{
                return frac;
            }
        }
    }));
    report.solution = res.solution;
    rawData.forEach((v,i)=>{
        if(v=='?'||v=='？'){
            report.unknown[i]=res.a[i];
        }else{
            report.known[i]=res.a[i];
        }
    });
    return report;
}