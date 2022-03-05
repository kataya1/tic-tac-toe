import { move } from "./types";
import { matrix } from "./types";
import { symbols } from "./types";

export default class GameBoard {
    moveSequence: move[];
    arr2d: matrix;
    len: number;
    winCondition: number;
    constructor(len: number, winCondition?: number ) {
        this.len = len;
        this.moveSequence = [];
        this.arr2d = Array(len)
            .fill(null)
            .map(() => Array(len).fill(" "));
        this.winCondition = winCondition ?? len
        
    }

    fillCell(rowIndex: number, colIndex: number, symbol: symbols) {
        this.arr2d[rowIndex][colIndex] = symbol;
        this._incrementMovSeq([rowIndex, colIndex])
    }
    private _incrementMovSeq(move: move){
        this.moveSequence.push(move);
    }

        
    private _checkHorizontal(rowIndex: number, colIndx: number, symbol: symbols){
        let counter = 1
        for( let i = colIndx + 1; i < this.len; i++){
            if (this.arr2d[rowIndex][i] === symbol) counter++
            else break
        }
        for( let i = colIndx - 1; i >= 0; i--){
            if (this.arr2d[rowIndex][i] === symbol) counter++
            else break
        }
        return (counter === this.winCondition) 
        
    }
    private _checkvertical(rowIndex: number, colIndx: number, symbol: symbols){
        let counter = 1
        for( let i = rowIndex + 1; i < this.len; i++){
            if (this.arr2d[i][colIndx] === symbol) counter++
            else break
        }
        for( let i = rowIndex - 1; i >= 0; i--){
            if (this.arr2d[i][colIndx] === symbol) counter++
            else break
        }
        return (counter === this.winCondition) 
        
    }
    checkWinPostClick(): boolean {
        let [rowIndex, colIndex] = this.moveSequence[this.moveSequence.length - 1]
        if (rowIndex >= this.len || rowIndex < 0 || colIndex >= this.len || colIndex < 0)
            return false
        let symbol = this.arr2d[rowIndex][colIndex]
        let inpt: [number, number, symbols] = [rowIndex, colIndex, symbol]
        let horiWin = this._checkHorizontal(...inpt)
        let verticalWin = this._checkvertical(...inpt)

        return horiWin || verticalWin;
    }
}