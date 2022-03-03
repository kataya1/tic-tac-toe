/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/

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
class GameBoard {
    constructor(len) {
        this.len = len;
        this.moveSequence = [];
        this.arr2d = Array(len).fill(null).map(() => Array(len).fill(" "));
    }
    checkWin() {
        return false;
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
    const whoseTurn = () => {
        return players[turn];
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGNBQWM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1REFBdUQ7QUFDNUY7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyB0aGUgcGx5ZXIgaXMgZ29ubmEgZ28gdG8gdGhlIHdlYnNpdGUgXG4vLyBncmlkIGlzIGluaXQgd2l0aCByb3dzIGFuZCBjb2xzIDMgXG4vLyB0aGVyZSB3aWxsIGJlIGEgc2xpZGVyIHRoYXQgaGF2ZSBcbi8vIChncmlkX3NpemUgMywgNCwgLi4sIG4pXG4vLyBwMSggcGxheWVyIC0gYm90KSAsXG4vLyBwMiAoIHBsYXllciAtIGJvdCBbYm90X1N0cmVuZ3RoLCBib3Rfc3BlZWQsIF0pXG4vLyBhZGQgcGxheWVyICh5b3UgY2FuIGhhdmUgbWFueSlcbi8vIHdpbiBjb25kaXRpb24gKCAzLCA0LCA1LCAuLi4gZ3JpZF9zaXplKSAgIGV4OiBncmlkX3NpemU6IDUgIHdpbi1jb25kaXRpb246IDRcbi8vIG5ld0dhbWVidXR0b25cbi8vIHVuZG8gYnV0dG9uXG4vLyBjaGFuZ2luZyBncmlkIHNpemUgb3Igd2luIGNvbmRpdGlvbiBvciBhZGRpbmcgcGxheWVycyAgd2lsbCBzdGFydCBhIG5ldyBnYW1lIChnZXQncyBhIHdhcm5pbmcpXG4vLyBjaGFuZ2luZyBmcm9tIGEgcGxheWVyIHRvIGEgYm90IG9yIHZpY2UgdmVyc2Fcbi8vIGZpbmQgd2luIGFsZ29yaXRobSBpcyBoYXJkIGluIGNhc2Ugb2YgYmlnIGdyaWQgc2l6ZSBhbmQgZGlmZmVyZW50IHdpbmQgY29uZGl0aW9uIGV4KCBncmlkIDUgd2luIDQgKVxuLy8gcG9zc2libGUgc29sb3V0aW9uIHRvIHRoZSBjaGVja1dpbiBpcyBsaWtlIGEgZ3JhcGggdHJhdmVyc2FsIFxuY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihsZW4pIHtcbiAgICAgICAgdGhpcy5sZW4gPSBsZW47XG4gICAgICAgIHRoaXMubW92ZVNlcXVlbmNlID0gW107XG4gICAgICAgIHRoaXMuYXJyMmQgPSBBcnJheShsZW4pLmZpbGwobnVsbCkubWFwKCgpID0+IEFycmF5KGxlbikuZmlsbChcIiBcIikpO1xuICAgIH1cbiAgICBjaGVja1dpbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8vIGZhY3RvcnkgXG5jb25zdCBtYWtlUGxheWVyID0gKG5hbWUsIHN5bWJvbCkgPT4ge1xuICAgIGxldCBzY29yZSA9IDA7XG4gICAgcmV0dXJuIHsgbmFtZSwgc2NvcmUsIHN5bWJvbCB9O1xufTtcbi8vIG1vZHVsZVxuY29uc3QgcmVuZGVyQ29udHJvbGxlciA9ICgoaHRtbGJvYXJkKSA9PiB7XG4gICAgbGV0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIik7XG4gICAgLy8gZG9uJ3Qga25vdyBpZiB0aGlzIGlzIHVzZWZ1bFxuICAgIGxldCBkaXYyZEFycmF5O1xuICAgIGNvbnN0IGluaXRHYW1lQm9hcmQgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICAgIGh0bWxib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZGl2MmRBcnJheSA9IEFycmF5KGdhbWVCb2FyZC5sZW4pLmZpbGwobnVsbCkubWFwKCgpID0+IEFycmF5KGdhbWVCb2FyZC5sZW4pLmZpbGwoXCIgXCIpKTtcbiAgICAgICAgLy8gaHRtbGJvYXJkLmlubmVySFRNTCA9ICcnXG4gICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tYm94ZXMnLCBgJHtnYW1lQm9hcmQubGVufWApO1xuICAgICAgICBnYW1lQm9hcmQuYXJyMmQubWFwKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgICByb3cubWFwKChjb250ZW50LCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAvL2NsYXNzbGlzdCBcbiAgICAgICAgICAgICAgICBsZXQgY2wgPSBbJ2dhbWVDZWxsJywgJ2Rvb2RsZS1ib3JkZXInXTtcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kZXggIT09IGdhbWVCb2FyZC5sZW4gLSAxKVxuICAgICAgICAgICAgICAgICAgICBjbC5wdXNoKCdib3JkZXItYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbEluZGV4ICE9PSBnYW1lQm9hcmQubGVuIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgY2wucHVzaCgnYm9yZGVyLXJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbEluZGV4ICE9PSAwKVxuICAgICAgICAgICAgICAgICAgICBjbC5wdXNoKCdib3JkZXItbGVmdCcpO1xuICAgICAgICAgICAgICAgIGlmIChyb3dJbmRleCAhPT0gMClcbiAgICAgICAgICAgICAgICAgICAgY2wucHVzaCgnYm9yZGVyLXRvcCcpO1xuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKC4uLmNsKTtcbiAgICAgICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdyb3dJbmRleCcsIHJvd0luZGV4LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2NvbEluZGV4JywgY29sSW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyQ29udHJvbGxlci5wbGF5ZXJDbGljayk7XG4gICAgICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gYCR7Y29udGVudCAhPT0gbnVsbCAmJiBjb250ZW50ICE9PSB2b2lkIDAgPyBjb250ZW50IDogJyAnfWA7XG4gICAgICAgICAgICAgICAgZGl2MmRBcnJheVtyb3dJbmRleF1bY29sSW5kZXhdID0gZGl2O1xuICAgICAgICAgICAgICAgIGh0bWxib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgcGxheWVyQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGdhbWVDb250cm9sbGVyLnBsYXllckNsaWNrKCtlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3Jvd2luZGV4JyksICtlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NvbGluZGV4JykpO1xuICAgIH07XG4gICAgY29uc3QgdGlsZVBhaW50ID0gKHJvd0luZGV4LCBjb2xJbmRleCwgc3ltYm9sKSA9PiB7XG4gICAgICAgIGxldCBkaXYgPSBkaXYyZEFycmF5W3Jvd0luZGV4XVtjb2xJbmRleF07XG4gICAgICAgIGRpdi5pbm5lclRleHQgPSBzeW1ib2w7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICB9O1xuICAgIHJldHVybiB7IGluaXRHYW1lQm9hcmQsIHBsYXllckNsaWNrLCB0aWxlUGFpbnQgfTtcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lQm9hcmQnKSk7XG4vLyBtb2R1bGVcbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgICBsZXQgZmlyc3RUdXJuUGxheWVyO1xuICAgIGxldCBwbGF5ZXJzID0gW107XG4gICAgbGV0IHR1cm47XG4gICAgbGV0IG1vdmVOdW1iZXI7XG4gICAgbGV0IGdhbWVCb2FyZDtcbiAgICBsZXQgZ2FtZUJvYXJkU2l6ZTtcbiAgICBjb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgICAgICAgZ2FtZUJvYXJkU2l6ZSA9IDU7XG4gICAgICAgIHBsYXllcnMucHVzaChtYWtlUGxheWVyKCdwMScsICdYJykpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gobWFrZVBsYXllcigncDInLCAnTycpKTtcbiAgICAgICAgbmV3R2FtZSgpO1xuICAgIH07XG4gICAgY29uc3QgcGxheSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBjb25zdCBuZXh0VHVybiA9ICgpID0+IHtcbiAgICAgICAgdHVybiA9ICh0dXJuICsgMSkgJSBwbGF5ZXJzLmxlbmd0aDtcbiAgICB9O1xuICAgIGNvbnN0IHBsYXllckNsaWNrID0gKHJvd0luZGV4LCBjb2xJbmRleCkgPT4ge1xuICAgICAgICBpZiAoZ2FtZUJvYXJkLmFycjJkW3Jvd0luZGV4XVtjb2xJbmRleF0gPT09IFwiIFwiKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmQuYXJyMmRbcm93SW5kZXhdW2NvbEluZGV4XSA9IHBsYXllcnNbdHVybl0uc3ltYm9sO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLm1vdmVTZXF1ZW5jZS5wdXNoKFtyb3dJbmRleCwgY29sSW5kZXhdKTtcbiAgICAgICAgICAgIHJlbmRlckNvbnRyb2xsZXIudGlsZVBhaW50KHJvd0luZGV4LCBjb2xJbmRleCwgcGxheWVyc1t0dXJuXS5zeW1ib2wpO1xuICAgICAgICAgICAgbmV4dFR1cm4oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgd2hvc2VUdXJuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gcGxheWVyc1t0dXJuXTtcbiAgICB9O1xuICAgIGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgIGdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQoZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgIHJlbmRlckNvbnRyb2xsZXIuaW5pdEdhbWVCb2FyZChnYW1lQm9hcmQpO1xuICAgICAgICBtb3ZlTnVtYmVyID0gMDtcbiAgICAgICAgLy8gZmlyc3QgZ2FtZT8gaW5kZXggPSAwXG4gICAgICAgIC8vIHRoaXMgc3dpdGNoZXMgYmV0d2VlbiB3aG8gc3RhcnRzIFxuICAgICAgICAvLyBtYWRlIHRoaXMgd2F5IHNvIHdlIGNhbiBoYXZlIHBsYXllcnMgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBmaXJzdFR1cm5QbGF5ZXIgPSBwbGF5ZXJzW3BsYXllcnMuaW5kZXhPZihmaXJzdFR1cm5QbGF5ZXIpICsgMSAlIHBsYXllcnMubGVuZ3RoXTtcbiAgICAgICAgLy8gd2hvIHBsYXlzIGFmdGVyIFxuICAgICAgICB0dXJuID0gcGxheWVycy5pbmRleE9mKGZpcnN0VHVyblBsYXllcik7XG4gICAgfTtcbiAgICBjb25zdCBjaGVja1dpbiA9ICgpID0+IHtcbiAgICB9O1xuICAgIHJldHVybiB7IHBsYXksIHNldHVwLCBwbGF5ZXJDbGljayB9O1xufSkoKTtcbi8vIG1haW5cbigoKSA9PiB7XG4gICAgLy8gbGV0IHAxID0gbWFrZXBsYXllcignYm9iJywgJ1gnKVxuICAgIC8vIGxldCBwMiA9IHBsYXllcignc2FsbHknLCAnTycpXG4gICAgZ2FtZUNvbnRyb2xsZXIuc2V0dXAoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=