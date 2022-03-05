import { gameController } from './script'
import GameBoard from './gameBoard';
import { symbols } from './types';
import { Player } from './intefaces';
export const renderController = ((htmlboard: HTMLDivElement) => {
    let root = document.querySelector(":root")! as HTMLElement;
    let playersOverlayDiv = document.querySelector("#players-overlay")! as HTMLElement;
    let newGameButton = document.querySelector('#NewGame-button') as HTMLButtonElement;
    // don't know if this is useful // another layer of verification i guess
    let div2dArray: HTMLDivElement[][];
    const initGameBoard = (gameBoard: GameBoard) => {
        htmlboard.innerHTML = "";
        div2dArray = Array(gameBoard.len)
            .fill(null)
            .map(() => Array(gameBoard.len).fill(null));

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
    
    let PlayersRadioArr: HTMLElement[] = []
    const initPlayersOverlay = (players: Player[], currentTurn: number = 0)=>{
        // <label for="p1"><input type="radio" name="players" id="p1" ><span class="player_name">p1</span></label>
        PlayersRadioArr = []
        playersOverlayDiv.innerHTML = ""
        players.forEach((player, index) => {
            let label = document.createElement("label")
            let inpt = document.createElement('input')
            let spn = document.createElement('span')
            label.setAttribute('for', `radio-${player.playerId}`)
            inpt.setAttribute('type', 'radio')
            inpt.setAttribute('name', 'players')
            inpt.setAttribute('id', `radio-${player.playerId}`)
            if(index === currentTurn) inpt.setAttribute('checked', "true")  
            spn.classList.add('player_name')
            spn.appendChild(document.createTextNode(`${player.name}`))
            label.appendChild(inpt)
            label.appendChild(spn)
            playersOverlayDiv.appendChild(label)
            PlayersRadioArr.push(inpt)
             })
        root.style.setProperty('--next-turn-symbol', `"${players[currentTurn].symbol}"`)
    }

    const advancePlayerRadio = ( index: number, oldIndex:number,)=>{
        // it changes the radio of the current player to checked 
        PlayersRadioArr[index].setAttribute('checked', 'checked')
        PlayersRadioArr[oldIndex].removeAttribute('checked')
        console.log(PlayersRadioArr[oldIndex])
    }
    const newGame = (e: Event) =>{
        e.preventDefault()
        e.stopPropagation()
        gameController.newGame()
        htmlboard.classList.remove('no_pointer_events')
        newGameButton.classList.add('hidden')

    }

    const gameOver =(text: string)=>{
        //remove pointer events
        htmlboard.classList.add('no_pointer_events')
        //display new game button
        newGameButton?.classList.remove('hidden')
        newGameButton?.addEventListener('click', newGame )
        //remove player overlay and display text
        playersOverlayDiv.innerHTML = ""
        playersOverlayDiv.innerText = text

    }

    return { initGameBoard, initPlayersOverlay, advancePlayerRadio, tilePaint, gameOver };
})(document.querySelector("#gameBoard")! as HTMLDivElement);