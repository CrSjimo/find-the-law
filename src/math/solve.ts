/**
 * Gauss-Jordan elimination
 */

import { Fraction } from "./Fraction";


/**
 * Used internally to solve systems
 * If you want to solve A.x = B,
 * choose data=A and mirror=B.
 * mirror can be either an array representing a vector
 * or an array of arrays representing a matrix.
 */
class Mat{
    constructor(data:Fraction[][], mirror?:(Fraction|Fraction[])[]){
        // Clone the original matrix
        this.data = new Array(data.length);
        for (var i=0, cols=data[0].length; i<data.length; i++) {
            this.data[i] = new Array(cols);
            for(var j=0; j<cols; j++) {
            this.data[i][j] = data[i][j];
            }
        }

        if (mirror) {
            if (mirror[0] instanceof Fraction) {
                for (var i=0; i<mirror.length; i++) {
                    mirror[i] = [mirror[i] as Fraction];
                }
            }
            this.mirror = new Mat(mirror as Fraction[][]);
        }
    }

    data: Fraction[][];
    mirror?: Mat;

/**
 * Swap lines i and j in the matrix
 */
    swap (i:number, j:number) {
    if (this.mirror) this.mirror.swap(i,j);
    var tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
    }

/**
 * Multiply line number i by l
 */
    multline (i:number, l:Fraction) {
    if (this.mirror) this.mirror.multline(i,l);
    var line = this.data[i];
    for (var k=line.length-1; k>=0; k--) {
        line[k] = line[k].mul(l);
    }
    }

/**
 * Add line number j multiplied by l to line number i
 */
    addmul (i:number, j:number, l:Fraction) {
        if (this.mirror) this.mirror.addmul(i,j,l);
        var lineI = this.data[i], lineJ = this.data[j];
        for (var k=lineI.length-1; k>=0; k--) {
            lineI[k] = lineI[k].add(l.mul(lineJ[k]));
        }
    }

/**
 * Tests if line number i is composed only of zeroes
 */
    hasNullLine (i:number) {
        for (var j=0; j<this.data[i].length; j++) {
            if (this.data[i][j].a !== 0n) {
                return false;
            }
        }
        return true;
    }

    gauss() {
        var pivot = 0,
            lines = this.data.length,
            columns = this.data[0].length,
            nullLines = [];

        for (var j=0; j<columns; j++) {
            // Find the line on which there is the maximum value of column j
            var maxValue = new Fraction(0n), maxLine = 0;
            for (var k=pivot; k<lines; k++) {
                var val = this.data[k][j];
                if (val.abs() > maxValue.abs()) {
                    maxLine = k;
                    maxValue = val;
                } 
            }
            if (maxValue.a === 0n) {
                // The matrix is not invertible. The system may still have solutions.
                nullLines.push(pivot);
            } else {
                // The value of the pivot is maxValue
                this.multline(maxLine, maxValue.inv());
                this.swap(maxLine, pivot);
                for (var i=0; i<lines; i++) {
                    if (i !== pivot) {
                        this.addmul(i, pivot, this.data[i][j].opposite());
                    }
                }
            }
            pivot++;
        }

        // Check that the system has null lines where it should
        for (var i=0; i<nullLines.length; i++) {
            if (!this.mirror!.hasNullLine(nullLines[i])) {
                throw new Error("singular matrix");
            }
        }
        return this.mirror!.data;
    }
}

/**
 * Solves A.x = b
 * @param A
 * @param b
 * @return x
 */
export function solve(A:Fraction[][], b:(Fraction|Fraction[])[]) {
    var result = new Mat(A,b).gauss();
    if (result.length > 0 && result[0].length === 1) {
        // Convert Nx1 matrices to simple javascript arrays
        return result.map(v=>v[0]);
    }else{
        throw new TypeError();
    }
}

// function identity(n) {
//   var id = new Array(n);
//   for (var i=0; i<n; i++) {
//     id[i] = new Array(n);
//     for (var j=0; j<n; j++) {
//       id[i][j] = (i === j) ? 1 : 0;
//     }
//   }
//   return id;
// }

// /**
//  * invert a matrix
//  */
// exports.invert = function invert(A) {
//   return new Mat(A, identity(A.length)).gauss();
// }

