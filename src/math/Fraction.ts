import { gcd } from "./gcd";

function tf(x:Fraction,y:Fraction){
    let ccp = gcd(x.b,y.b);

    x.a*=y.b/ccp;
    x.b*=y.b/ccp;

    y.a*=x.b/ccp;
    y.b*=x.b/ccp;
}

export class Fraction{

    constructor(a:bigint|number,b?:bigint|number)
    constructor(x:Fraction)
    constructor(...args:[Fraction]|[bigint|number,(bigint|number)?]){
        if(args[0] instanceof Fraction){
            [this.s,this.a,this.b] = [args[0].s,args[0].a,args[0].b];
        }else{
            let a=args[0], b=args[1] ?? 1n;
            [this.a,this.b]=[BigInt(a),BigInt(b)];
            if(this.a<0){
                this.s*=-1n;
                this.a=-this.a;
            }
            if(this.b<0){
                this.s*=-1n;
                this.b=-this.b;
            }
            this._reduce();
        }
    }

    protected _reduce(){
        let ccp=gcd(this.a,this.b);
        this.a/=ccp;
        this.b/=ccp;
    }

    s:bigint=1n;
    a:bigint;
    b:bigint;

    abs(){
        return new Fraction(this.a,this.b);
    }

    add(_x:Fraction){
        let x = new Fraction(_x), y = new Fraction(this);
        tf(x,y);
        return new Fraction(x.a*x.s+y.a*y.s , x.b);
    }

    mul(x:Fraction){
        return new Fraction(x.a*x.s*this.a*this.s , x.b*this.b);
    }

    inv(){
        return new Fraction(this.s*this.b,this.a);
    }

    opposite(){
        return new Fraction(-this.s*this.a,this.b);
    }

    toString(){
        let nega = this.s<0?'-':'';
        if(this.a==0n)nega='';
        return `${nega}${this.a}/${this.b}`;
    }

}