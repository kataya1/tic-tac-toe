"use strict";
// module
const gameBoard = ((n = 3) => {
    let arr2d = Array(n).fill(null).map(() => Array(n).fill(null));
    return { arr2d };
})();
// factory 
const player = (name, sympol) => {
    return { name, sympol };
};
// module
const gameController = (() => {
    return {};
})();
// module
const renderController = ((gameBoard, board) => {
    const initGameBoard = () => {
        gameBoard.arr2d.map((row) => {
            row.map((content) => {
                let div = document.createElement('div');
                div.classList.add('boardCell');
                div.textContent = `${content || "helo"}`;
                board.appendChild(div);
            });
        });
    };
    return { initGameBoard };
})(gameBoard, document.querySelector('#gameBoard'));
// main
(() => {
    renderController.initGameBoard();
})();
