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
    let a:string[] = [];
    func.forEach((v,i)=>{
        if(v.a){
            let t = fractionToLatex(v);
            a.push(`${t!='1'||i==n-1?t:''} ${i!=n-1?i!=n-2?`x^{${n-i-1}}`:'x':''}`);
        }
    })
    return `f(x)=${a.join('+').replace(/\+\-/g,'-')}`;
}

export function linearFuncToText(func:Fraction[]){
    let n = func.length;
    let a:string[] = [];
    func.forEach((v,i)=>{
        if(v.a){
            let t = v.toString();
            a.push(`${t!='1'||i==n-1?t:''}${i!=n-1?i!=n-2?`x^${n-i-1}`:'x':''}`);
        }
    })
    return `f(x)=${a.join('+').replace(/\+\-/g,'-')}`;
}

export function reportToText(report:Solution){
    let section1 = '我们不妨构造一个函数$f(x)$，使得：\n\n$$\n\\begin{aligned}\n';
    for(let key in report.known){
        ///@ts-expect-error
        section1+=`f(${key})=${fractionToLatex(report.known[key][0])} \\\\\n`;
    }

    let section2 = 

`\\end{aligned}
$$

易得：

$$
${linearFuncToLatex(report.solution)}
$$

`;

    let section3 = '';
    if(Object.keys(report.unknown).length){
        section3 = '其中：\n\n$$\n\\begin{aligned}\n';
        for(let key in report.unknown){
            section3+=`f(${key})=${report.unknown[key]} \\\\\n`;
        }
        section3+='\\end{aligned}\n$$\n\n所以，应填入空缺处的数字依次为：$';
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