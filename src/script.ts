import { Player } from "./intefaces";
import { symbols, matrix, move } from "./types";
import './style.css'
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

class GameBoard {
    moveSequence: move[];
    arr2d: matrix;
    len: number;
    constructor(len: number) {
        this.len = len;
        this.moveSequence = [];
        this.arr2d = Array(len)
            .fill(null)
            .map(() => Array(len).fill(" "));
    }
    checkWin() {
        return false;
    }
    fillCell(rowIndex: number, colIndex: number, symbol: symbols) {
        this.arr2d[rowIndex][colIndex] = symbol;
        this._incrementMovSeq([rowIndex, colIndex])
    }
    private _incrementMovSeq(move: move){
        this.moveSequence.push(move);
    }
}

// factory
const playerFactory = (name: string, symbol: symbols): Player => {
    
    let score: number = 0;
    let _name = name;
    let playerId = Math.floor(Math.random() * 16)

    return {
        get name(): string {
            return _name;
        },
        set name(newName: string){
            _name = newName
        },
        playerId,
        score,
        symbol,
    };
};

// module
const renderController = ((htmlboard: HTMLDivElement) => {
    let root = document.querySelector(":root")! as HTMLElement;
    let playersOverlayDiv = document.querySelector("#players-overlay")! as HTMLElement;
    // don't know if this is useful // another layer of verification i guess
    let div2dArray: HTMLDivElement[][];
    const initGameBoard = (gameBoard: GameBoard) => {
        htmlboard.innerHTML = "";
        div2dArray = Array(gameBoard.len)
            .fill(null)
            .map(() => Array(gameBoard.len).fill(" "));

        // htmlboard.innerHTML = ''
        root.style.setProperty("--boxes", `${gameBoard.len}`);
        gameBoard.arr2d.map((row, rowIndex) => {
            row.map((content, colIndex) => {
                let div = document.createElement("div");
                //classlist
                let cl: string[] = ["gameCell", "doodle-border"];
                if (rowIndex !== gameBoard.len - 1) cl.push("border-bottom");
                if (colIndex !== gameBoard.len - 1) cl.push("border-right");
                if (colIndex !== 0) cl.push("border-left");
                if (rowIndex !== 0) cl.push("border-top");
                div.classList.add(...cl);

                div.setAttribute("rowIndex", rowIndex.toString());
                div.setAttribute("colIndex", colIndex.toString());

                div.addEventListener("click", playerClick);
                div.textContent = `${content ?? " "}`;

                div2dArray[rowIndex][colIndex] = div;

                htmlboard.appendChild(div);
            });
        });
    };

    const playerClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        gameController.playerClick(
            +(e.target! as Element).getAttribute("rowindex")!,
            +(e.target! as Element).getAttribute("colindex")!
        );
    };

    const tilePaint = (rowIndex: number, colIndex: number, symbol: symbols, nextTurnSympol: symbols = ' ') => {
        
        let div = div2dArray[rowIndex][colIndex];
        let cStyle = window.getComputedStyle(div)
        let fntSz = +cStyle.getPropertyValue('height').slice(0,-2) - +cStyle.getPropertyValue('--border-width').slice(0,-2) * 2
        root.style.setProperty('--cell-font-size', `${fntSz}px`) 
        console.log({nextTurnSympol})
    
        root.style.setProperty('--next-turn-symbol', `"${nextTurnSympol}"`) 
    
        
        console.log(root.style.getPropertyValue('--cell-font-size'))
        console.log(root.style.getPropertyValue('--next-turn-symbol'))
        div.innerText = symbol;
        div.classList.add("filled");
    };
    const PlayersRadioArr: HTMLElement[] = []
    const initPlayersOverlay = (players: Player[])=>{
        // <label for="p1"><input type="radio" name="players" id="p1" ><span class="player_name">p1</span></label>
        playersOverlayDiv.innerHTML = ""
        players.forEach((player, index) => {
            let label = document.createElement("label")
            let inpt = document.createElement('input')
            let spn = document.createElement('span')
            label.setAttribute('for', `radio-${player.playerId}`)
            inpt.setAttribute('type', 'radio')
            inpt.setAttribute('name', 'players')
            inpt.setAttribute('id', `radio-${player.playerId}`)
            if(index === 0) inpt.setAttribute('checked', "checked")
            spn.classList.add('player_name')
            spn.appendChild(document.createTextNode(`${player.name}`))
            label.appendChild(inpt)
            label.appendChild(spn)
            playersOverlayDiv.appendChild(label)
            PlayersRadioArr.push(label)
             })
    }

    const advancePlayerRadio = (index: number)=>{
        // it changes the radio of the current player to checked 
        PlayersRadioArr[index].click()
    }

    return { initGameBoard, initPlayersOverlay, advancePlayerRadio, tilePaint };
})(document.querySelector("#gameBoard")! as HTMLDivElement);

const sympolArray: symbols[] = ["H", "I", "O", "X"]
// module
const gameController = (() => {
    let firstTurnPlayer: Player; // the player that starts in a new game changes with everygame
    let players: Player[] = [];
    let turn: number;  // 0 to players.lengths
    let NumOfMoves: number; 
    let gameBoard: GameBoard;
    let gameBoardSize: number;
    const setup = () => {
        gameBoardSize = 5;
        addPlayer("p1");
        addPlayer("Max");
        addPlayer("jinx");
        newGame();
    };

    const play = () => {
        return 0;
    };
    const nextTurn = () => {
        turn = (turn + 1) % players.length;
        renderController.
        advancePlayerRadio(turn);
    };
    const playerClick = (rowIndex: number, colIndex: number) => {
        if (gameBoard.arr2d[rowIndex][colIndex] === " ") {
            gameBoard.fillCell(rowIndex, colIndex, currentTurnPlayer().symbol)
            renderController.tilePaint(rowIndex, colIndex, currentTurnPlayer().symbol, nextTurnPlayer().symbol);
            nextTurn();
        }
    };
    const currentTurnPlayer = () => {
        return players[turn];
    };
    const nextTurnPlayer = () => {
        return players[(turn + 1) % players.length];
    };

    const newGame = () => {
        gameBoard = new GameBoard(gameBoardSize);
        renderController.initGameBoard(gameBoard);
        renderController.initPlayersOverlay(players)
        NumOfMoves = 0;
        // first game? index = 0
        // this switches between who starts
        // made this way so we can have more than 2 players in the future
        // first turn will be index of first plyaer will return -ve because firstTur.. is undefined
        let pIndex = (players.indexOf(firstTurnPlayer) + 1) % players.length
        firstTurnPlayer = players[pIndex];
        // who plays after 
        turn = players.indexOf(firstTurnPlayer);
    };

    const addPlayer = (name: string) => {
        players.push(playerFactory(name, sympolArray.pop() ?? " "));
    };

    const removePlayer = (player: Player) => {
        players.splice(players.indexOf(player),1)
    }

    return { play, setup, playerClick };
})();

// main
(() => {
    // let p1 = makeplayer('bob', 'X')
    // let p2 = player('sally', 'O')
    gameController.setup();
})();
