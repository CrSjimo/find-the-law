import { expect } from "chai"
import { Fraction } from "../math/Fraction"

describe('fraction',()=>{
    it('#1',()=>{
        let a1=new Fraction(3n,2n),a2=new Fraction(-6n,4n);
        expect(a1.toString()).eq('3/2');
        expect(a2.toString()).eq('-3/2');
        expect(a1.mul(a2).toString()).eq('-9/4');
        expect(a1.add(a2).toString()).eq('0/1');
        expect(a2.abs().toString()).eq('3/2');
        expect(a2.inv().toString()).eq('-2/3');
        expect(a2.inv().mul(a1).toString()).eq('-1/1');
        a1=new Fraction(5n,6n),a2=new Fraction(13n,22n);
        expect(a1.add(a2).toString()).eq('47/33');
        let a3 = new Fraction('5.5'), a4 = new Fraction('-3.6/1.6');
        expect(a3.toString()).eq('11/2');
        expect(a4.toString()).eq('-9/4');
        let a5 = new Fraction(NaN);
        expect(a5.toString()).eq('NaF');
        expect(a5.mul(a4).toString()).eq('NaF');
        expect(a3.add(a5).toString()).eq('NaF');
        expect(a5.inv().toString()).eq('NaF');
        
    });
})