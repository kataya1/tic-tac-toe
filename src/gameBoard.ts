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
        return (counter >= this.winCondition) 
        
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
        return (counter >= this.winCondition) 
        
    }

    
    private _checkDiagonal45deg(rowIndex: number, colIndex: number, symbol: symbols){
        let counter = 1
        //up right
        for (let i = 1; i < this.len - colIndex  && i < rowIndex + 1 ; i++){
            if( this.arr2d[rowIndex - i][colIndex + i] === symbol) counter++;
            else break;
        }
        // down left
        for (let i = rowIndex + 1, j = colIndex - 1 ; i < this.len && j >= 0; i++, j--){
            if(this.arr2d[i][j] === symbol)  counter++;
            else break;
        }
        return counter >= this.winCondition
      
    }
    private _checkDiagonal135deg(rowIndex: number, colIndex: number, symbol: symbols){
        let counter = 1
        //up left
        for( let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j>= 0; i--, j--){
            if (this.arr2d[i][j] === symbol) counter++;
            else break;
        }
        //down right
        for( let i = rowIndex + 1, j= colIndex + 1; i < this.len && colIndex< this.len; i++, j++ ){
            if (this.arr2d[i][j] === symbol) counter++;
            else break;
        }
        return counter >= this.winCondition
    }
    private _4corners(rowIndex: number, colIndex: number, symbol: symbols){
        return (this.winCondition === 4)
        ?  
            (
                this.arr2d[0][0] === symbol &&
                this.arr2d[0][this.len -1] === symbol &&
                this.arr2d[this.len - 1][0] === symbol &&
                this.arr2d[this.len - 1][this.len -1] === symbol
            )
        : false
    }
    
    checkWinPostClick(): boolean {
        let [rowIndex, colIndex] = this.moveSequence[this.moveSequence.length - 1]
        if (rowIndex >= this.len || rowIndex < 0 || colIndex >= this.len || colIndex < 0)
            return false
        let symbol = this.arr2d[rowIndex][colIndex]
        let inpt: [number, number, symbols] = [rowIndex, colIndex, symbol]
        let horiWin = this._checkHorizontal(...inpt)
        let verticalWin = this._checkvertical(...inpt)
        let diagonal45Win = this._checkDiagonal45deg(...inpt)
        let diagonal135Win = this._checkDiagonal135deg(...inpt)
        let croners4Win = this._4corners(...inpt)
        return horiWin || verticalWin || diagonal135Win || diagonal45Win || croners4Win;
    }
}