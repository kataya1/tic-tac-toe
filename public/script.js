"use strict";
class GameBoard {
    constructor(len) {
        this.len = len;
        this.moveSequence = [];
        this.arr2d = Array(len).fill(null).map(() => Array(len).fill(" "));
    }
}
// factory 
const makePlayer = (name, symbol) => {
    let score = 0;
    return { name, score, symbol };
};
// module
const renderController = ((htmlboard) => {
    let root = document.querySelector(":root");
    // don't know if this is useful
    let div2dArray;
    const initGameBoard = (gameBoard) => {
        htmlboard.innerHTML = '';
        div2dArray = Array(gameBoard.len).fill(null).map(() => Array(gameBoard.len).fill(" "));
        // htmlboard.innerHTML = ''
        root.style.setProperty('--boxes', `${gameBoard.len}`);
        gameBoard.arr2d.map((row, rowIndex) => {
            row.map((content, colIndex) => {
                let div = document.createElement('div');
                //classlist 
                let cl = ['gameCell', 'doodle-border'];
                if (rowIndex !== gameBoard.len - 1)
                    cl.push('border-bottom');
                if (colIndex !== gameBoard.len - 1)
                    cl.push('border-right');
                if (colIndex !== 0)
                    cl.push('border-left');
                if (rowIndex !== 0)
                    cl.push('border-top');
                div.classList.add(...cl);
                div.setAttribute('rowIndex', rowIndex.toString());
                div.setAttribute('colIndex', colIndex.toString());
                div.addEventListener('click', renderController.playerClick);
                div.textContent = `${content !== null && content !== void 0 ? content : ' '}`;
                div2dArray[rowIndex][colIndex] = div;
                htmlboard.appendChild(div);
            });
        });
    };
    const playerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        gameController.playerClick(+e.target.getAttribute('rowindex'), +e.target.getAttribute('colindex'));
    };
    const tilePaint = (rowIndex, colIndex, symbol) => {
        let div = div2dArray[rowIndex][colIndex];
        div.innerText = symbol;
        div.classList.add('filled');
    };
    return { initGameBoard, playerClick, tilePaint };
})(document.querySelector('#gameBoard'));
// module
const gameController = (() => {
    let firstTurnPlayer;
    let players = [];
    let turn;
    let moveNumber;
    let gameBoard;
    let gameBoardSize;
    const setup = () => {
        gameBoardSize = 5;
        players.push(makePlayer('p1', 'X'));
        players.push(makePlayer('p2', 'O'));
        newGame();
    };
    const play = () => {
        return 0;
    };
    const nextTurn = () => {
        turn = (turn + 1) % players.length;
    };
    const playerClick = (rowIndex, colIndex) => {
        if (gameBoard.arr2d[rowIndex][colIndex] === " ") {
            gameBoard.arr2d[rowIndex][colIndex] = players[turn].symbol;
            gameBoard.moveSequence.push([rowIndex, colIndex]);
            renderController.tilePaint(rowIndex, colIndex, players[turn].symbol);
            nextTurn();
        }
    };
    const newGame = () => {
        gameBoard = new GameBoard(gameBoardSize);
        renderController.initGameBoard(gameBoard);
        moveNumber = 0;
        // first game? index = 0
        // this switches between who starts 
        // made this way so we can have players in the future
        firstTurnPlayer = players[players.indexOf(firstTurnPlayer) + 1 % players.length];
        // who plays after 
        turn = players.indexOf(firstTurnPlayer);
    };
    const checkWin = () => {
    };
    return { play, setup, playerClick };
})();
// main
(() => {
    // let p1 = makeplayer('bob', 'X')
    // let p2 = player('sally', 'O')
    gameController.setup();
})();
