import { Fraction } from "./math/Fraction";
import { Solution } from "./generateSolution";

export function fractionToLatex(frac:Fraction){
    if(frac.isNaF)return 'NaF';
    let nega = frac.s<0?'-':'';
    if(frac.b!=1n){
        return `${nega}\\frac{${frac.a}}{${frac.b}}`;
    }else{
        return `${nega}${frac.a}`;
    }
}

export function linearFuncToLatex(func:Fraction[]){
    let n = func.length;
    return `f(x)=${func.map((v,i)=>v.a?`${fractionToLatex(v)} ${i!=n-1?i!=n-2?`x^${n-i-1}`:'x':''}`:'').join('+').replace(/\+\-/g,'-')}`;
}

export function linearFuncToText(func:Fraction[]){
    let n = func.length;
    return `f(x)=${func.map((v,i)=>v.a?`${v.toString()} ${i!=n-1?i!=n-2?`x^${n-i-1}`:'x':''}`:'').join('+').replace(/\+\-/g,'-')}`;
}

export function reportToText(report:Solution){
    let section1 = '我们不妨构造一个函数$f(x)$，使得：\n\n$$\n';
    for(let key in report.known){
        section1+=`f(${key})=${report.known[key]} \\\\\n`;
    }

    let section2 = 

`$$

易得：

$$
${linearFuncToLatex(report.solution)}
$$

`;

    let section3 = '';
    if(Object.keys(report.unknown).length){
        section3 = '其中：\n\n$$\n';
        for(let key in report.unknown){
            section3+=`f(${key})=${report.unknown[key]} \\\\\n`;
        }
        section3+='$$\n\n所以，应填入空缺处的数字依次为：$';
        section3+=Object.values(report.unknown).join(', ');
        section3+='$.';
    }

    return section1+section2+section3;
}

export function output(report:Solution){
    return {
        text: reportToText(report),
        functionLatex: linearFuncToLatex(report.solution),
        functionText: linearFuncToText(report.solution),
    }
}