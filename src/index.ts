import { Player } from "./intefaces";
import { symbols, matrix, move } from "./types";
import './style.css'
import GameBoard from "./gameBoard";
import { renderController } from "./renderController";
import playerFactory from "./playerFactory";
// import '~doodle.css/doodle.css'

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



enum GameState {
    won  = 1,
    draw,
    undecided,
}



// module
export const gameController = (() => {
    const sympolArray: symbols[] = [ '8', 'Z', "H", "I", "O", "X"]
    let firstTurnPlayer: Player; // the player that starts in a new game changes with everygame
    let players: Player[] = [];
    let turn: number;  // 0 to players.lengths
    let moveNumber: number; 
    let gameBoard: GameBoard;
    let gameBoardSize: number;
    let winCondition: number;
    const setup = () => {
        gameBoardSize = 5;
        winCondition = 4;
        addPlayer("Min");
        addPlayer("Max");

        newGame();
    };

    const play = () => {
        return 0;
    };
    const nextTurn = () => {
        let oldTurn = turn
        turn = (turn + 1) % players.length;
        renderController.advancePlayerRadio(turn, oldTurn);
    };
    const gameOver = (state: GameState) => {

        let text: string;
        switch(state){
            case 1:
                text = `${currentTurnPlayer().name} [ ${currentTurnPlayer().symbol} ] Won the Game`
                break;
            case 2:
                text = "It's a Draw"
                break;
            default:
                text = "this can't be!!!"
                break;
        }
        renderController.gameOver(text)

    }
    const checkGameState = ()=>{
        if(gameBoard.checkWinPostClick())
            gameOver(GameState.won)
        else if (moveNumber === gameBoardSize**2)
            gameOver(GameState.draw)
        else
            nextTurn();
    }
    const playerClick = (rowIndex: number, colIndex: number) => {
        if (gameBoard.arr2d[rowIndex][colIndex] === " ") {
            gameBoard.fillCell(rowIndex, colIndex, currentTurnPlayer().symbol)
            renderController.tilePaint(rowIndex, colIndex, currentTurnPlayer().symbol, nextTurnPlayer().symbol);
            moveNumber++
            checkGameState()
            
        }
    };
    const currentTurnPlayer = () => {
        return players[turn];
    };
    const nextTurnPlayer = () => {
        return players[(turn + 1) % players.length];
    };

    const newGame = () => {
        gameBoard = new GameBoard(gameBoardSize, winCondition);
        renderController.initGameBoard(gameBoard);
        moveNumber = 0;
        // first game? index = 0
        // this switches between who starts
        // made this way so we can have more than 2 players in the future
        // first turn will be index of first plyaer will return -ve because firstTur.. is undefined
        let pIndex = (players.indexOf(firstTurnPlayer) + 1) % players.length
        firstTurnPlayer = players[pIndex];
        // who plays after 
        turn = players.indexOf(firstTurnPlayer);
        renderController.initPlayersOverlay(players, turn)
    };

    const addPlayer = (name: string) => {
        if(sympolArray.length !== 0)
            players.push(playerFactory(name, sympolArray.pop() ?? " "));
    };

    const removePlayer = (player: Player) => {
        players.splice(players.indexOf(player),1)
    }

    return { play, setup, playerClick, newGame };
})();

// main
(() => {
    // let p1 = makeplayer('bob', 'X')
    // let p2 = player('sally', 'O')
    gameController.setup();
})();
