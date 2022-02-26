
type symbols = 'X' | 'O' | ' '
type matrix = symbols[][]
type move  = [number, number]  // tuple

// the plyer is gonna go to the website 
    // grid is init with rows and cols 3 
    // there will be a slider that have 
    // (grid_size 3, 4, .., n)
    // p1( player - bot) ,
    // p2 ( player - bot [bot_Strength, bot_speed, ])
    // add player (you can have many)
    // win condition ( 3, 4, 5, ... grid_size)   ex: grid_size: 5  win-condition: 4
    // newGamebutton
    // undo button
    // changing grid size or win condition or adding players  will start a new game (get's a warning)
    // changing from a player to a bot or vice versa
    // find win algorithm is hard in case of big grid size and different wind condition ex( grid 5 win 4 )
    // possible soloution to the checkWin is like a graph traversal 

class GameBoard{
    moveSequence: move[];
    arr2d: matrix;
    len: number;
    constructor(len: number){
        this.len = len
        this.moveSequence = []
        this.arr2d = Array(len).fill(null).map(()=> Array(len).fill(" "))
    }
    checkWin(){
        return false
    }
}


interface Player{
    name:string;
    symbol: symbols;
    score: number,
}


// factory 
const makePlayer = (name: string, symbol: symbols ): Player => {
    let score: number = 0;

    return { name, score, symbol } 

}




// module
const renderController = ((htmlboard: HTMLDivElement)=>{
    let root = document.querySelector(":root")! as HTMLElement
    // don't know if this is useful
    let div2dArray: HTMLDivElement[][];
    const initGameBoard = (gameBoard: GameBoard ) => {
        htmlboard.innerHTML = ''
        div2dArray =  Array(gameBoard.len).fill(null).map(()=> Array(gameBoard.len).fill(" "));
        
        // htmlboard.innerHTML = ''
        root.style.setProperty('--boxes',`${gameBoard.len}`)
        gameBoard.arr2d.map((row, rowIndex)=>{ row.map((content, colIndex)=>{
            let div = document.createElement('div')
            //classlist 
            let cl: string[] = ['gameCell', 'doodle-border']
            if (rowIndex !== gameBoard.len - 1)  cl.push('border-bottom')
            if (colIndex !== gameBoard.len - 1)  cl.push('border-right')
            if (colIndex !== 0)  cl.push('border-left')
            if (rowIndex !== 0)  cl.push('border-top')
            div.classList.add(...cl)

            div.setAttribute('rowIndex', rowIndex.toString())
            div.setAttribute('colIndex', colIndex.toString())
            
            div.addEventListener('click', renderController.playerClick)
            div.textContent = `${content ?? ' '}`
            
            div2dArray[rowIndex][colIndex] = div

            htmlboard.appendChild(div)
        })})

    }

    const playerClick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        gameController.playerClick(
            +(e.target! as Element).getAttribute('rowindex')!,
            +(e.target! as Element).getAttribute('colindex')!
            )
    }

    const tilePaint = (rowIndex: number, colIndex: number, symbol: symbols) => {
        let div = div2dArray[rowIndex][colIndex]
        div.innerText = symbol
        div.classList.add('filled')
    }

    return { initGameBoard, playerClick, tilePaint }
})(document.querySelector('#gameBoard')! as HTMLDivElement);

// module
const gameController = (()=>{
    let firstTurnPlayer: Player;
    let players: Player[] = [];
    let turn: number;
    let moveNumber: number;
    let gameBoard: GameBoard;
    let gameBoardSize: number;
    const setup = () =>{
        gameBoardSize = 5;
        players.push(makePlayer('p1', 'X'))
        players.push(makePlayer('p2', 'O')) 
        newGame()
    }

    
    const play = () => {
        
        return 0
    }
    const nextTurn = () =>{
        turn = (turn + 1 ) % players.length
    }
    const playerClick = (rowIndex: number, colIndex: number)=> {
        
        if (gameBoard.arr2d[rowIndex][colIndex] === " "){
            gameBoard.arr2d[rowIndex][colIndex] = players[turn].symbol
            gameBoard.moveSequence.push([rowIndex, colIndex])
            renderController.tilePaint(rowIndex, colIndex, players[turn].symbol )
            nextTurn()
        }

        
    }
    const whoseTurn = () => {
        return players[turn]
    }

    const newGame = () => {
        gameBoard = new GameBoard(gameBoardSize)
        renderController.initGameBoard(gameBoard)
        moveNumber = 0
        // first game? index = 0
        // this switches between who starts 
        // made this way so we can have players in the future
        firstTurnPlayer = players[players.indexOf(firstTurnPlayer) + 1 % players.length]
        // who plays after 
        turn = players.indexOf(firstTurnPlayer)
    }
    const checkWin = ()=>{

    }
    return { play, setup, playerClick }
})();


// main
(()=>{
// let p1 = makeplayer('bob', 'X')
// let p2 = player('sally', 'O')
gameController.setup()
    
    
})()