"use strict";
// main
(() => {
    let gameBoardSize = 7;
    // module
    const gameBoard = ((len = 3) => {
        let arr2d = Array(len).fill(null).map(() => Array(len).fill(null));
        return { arr2d, len };
    })(gameBoardSize);
    // factory 
    const player = (name, sympol) => {
        return { name, sympol };
    };
    // module
    const renderController = ((gameBoard, htmlboard) => {
        let root = document.querySelector(":root");
        const initGameBoard = () => {
            root.style.setProperty('--boxes', `${gameBoard.len}`);
            gameBoard.arr2d.map((row, rowIndex) => {
                row.map((content, colIndex) => {
                    let div = document.createElement('div');
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
                    document.addEventListener('click', renderController.playerClick);
                    div.textContent = `${content || ""}`;
                    htmlboard.appendChild(div);
                });
            });
        };
        const playerClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            gameController.playerClick(e);
        };
        return { initGameBoard, playerClick };
    })(gameBoard, document.querySelector('#gameBoard'));
    const gameController = (() => {
        let p1 = player('bob', 'X');
        let p2 = player('sally', 'O');
        let startingPlayer = p1;
        let turn;
        const setup = () => {
            renderController.initGameBoard();
        };
        const start = () => {
        };
        const play = () => {
            return 0;
        };
        const playerClick = (e) => {
            console.log({ e });
        };
        return { play, setup, playerClick };
    })();
    gameController.setup();
})();
