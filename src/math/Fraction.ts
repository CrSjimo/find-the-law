import { gcd } from "./gcd";

function tf(x:Fraction,y:Fraction){
    let ccp = gcd(x.b,y.b);

    let xb=x.b,yb=y.b;

    x.a*=yb/ccp;
    x.b*=yb/ccp;

    y.a*=xb/ccp;
    y.b*=xb/ccp;
}

export class Fraction{

    constructor(a:bigint|number,b?:bigint|number)
    constructor(x:Fraction)
    constructor(s:string)
    constructor(...args:[string]|[Fraction]|[bigint|number,(bigint|number)?]){
        if(args[0] instanceof Fraction){
            this.fromFraction(args[0]);
        }else if(typeof args[0] == 'string'){
            this.fromString(args[0]);
        }else{
            this.fromNumber(args[0],args[1]);
        }
    }

    fromFraction(x:Fraction){
        [this.s,this.a,this.b] = [x.s,x.a,x.b];
    }

    fromString(s:string){
        if(/\//.test(s)){
            let [a,b] = s.split('/');
            this.fromNumber(Number(a),Number(b));
        }else{
            this.fromNumber(Number(s));
        }
    }

    fromNumber(a:number|bigint,b:number|bigint = 1n){
        if((typeof(a)=='number'&&isNaN(a))||(typeof(b)=='number'&&isNaN(b))){
            this._isNaF = true;
            this.a=0n;
            this.b=0n;
            return;
        }
        if(typeof(a)=='number'){
            while((a*10)%10){
                a*=10;
                if(typeof(b)=='number'){
                    b*=10;
                }else{
                    b*=10n;
                }
            }
        }
        if(typeof(b)=='number'){
            while((b*10)%10){
                b*=10;
                if(typeof(a)=='number'){
                    a*=10;
                }else{
                    a*=10n;
                }
            }
        }
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

    protected _reduce(){
        let ccp=gcd(this.a,this.b);
        this.a/=ccp;
        this.b/=ccp;
    }

    s:bigint=1n;
    a!:bigint;
    b!:bigint;
    
    protected _isNaF = false;

    get isNaF(){
        return this._isNaF;
    }

    abs(){
        if(this.isNaF){
            return new Fraction(NaN);
        }
        return new Fraction(this.a,this.b);
    }

    add(_x:Fraction){
        if(this.isNaF || _x.isNaF){
            return new Fraction(NaN);
        }
        let x = new Fraction(_x), y = new Fraction(this);
        tf(x,y);
        return new Fraction(x.a*x.s+y.a*y.s , x.b);
    }

    mul(x:Fraction){
        if(this.isNaF || x.isNaF){
            return new Fraction(NaN);
        }
        return new Fraction(x.a*x.s*this.a*this.s , x.b*this.b);
    }

    inv(){
        if(this.isNaF){
            return new Fraction(NaN);
        }
        return new Fraction(this.s*this.b,this.a);
    }

    opposite(){
        if(this.isNaF){
            return new Fraction(NaN);
        }
        return new Fraction(-this.s*this.a,this.b);
    }

    cmp(_x:Fraction){
        if(this.isNaF){
            return -2147483648;
        }
        let x = new Fraction(_x), y = new Fraction(this);
        tf(x,y);
        if(y.a>x.a)return 1;
        if(y.a==x.a)return 0;
        return -1;
    }

    toString(){
        if(this.isNaF){
            return 'NaF';
        }
        let nega = this.s<0?'-':'';
        if(this.a==0n)nega='';
        if(this.b==1n)return `${nega}${this.a}`;
        return `${nega}${this.a}/${this.b}`;
    }

}