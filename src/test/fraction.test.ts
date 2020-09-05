import { expect } from "chai"
import { Fraction } from "../math/Fraction"
import { e } from "mathjs";

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
    });
})