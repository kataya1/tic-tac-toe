
// main
(()=>{

type matrix = string[][]
type gridSize = 3 | 5 | 7 
let gameBoardSize: gridSize = 7

// module
const gameBoard = ((len: gridSize = 3) =>{
    let arr2d = Array(len).fill(null).map(()=> Array(len).fill(null))
    return { arr2d, len }
})(gameBoardSize)

// factory 
const player = (name: string, sympol: string ) => {
    return { name, sympol } 
}




// module
const renderController = ((gameBoard, htmlboard: HTMLDivElement)=>{
    let root = document.querySelector(":root")! as HTMLElement
    const initGameBoard = () => {
        root.style.setProperty('--boxes',`${gameBoard.len}`)
        gameBoard.arr2d.map((row, rowIndex)=>{ row.map((content, colIndex)=>{
            let div = document.createElement('div')
            let cl: string[] = ['gameCell', 'doodle-border']
            if (rowIndex !== gameBoard.len - 1)  cl.push('border-bottom')
            if (colIndex !== gameBoard.len - 1)  cl.push('border-right')
            if (colIndex !== 0)  cl.push('border-left')
            if (rowIndex !== 0)  cl.push('border-top')
            div.classList.add(...cl)
            document.addEventListener('click', renderController.playerClick)
            div.textContent = `${content || ""}`
            htmlboard.appendChild(div)
        })})
    }

    const playerClick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        gameController.playerClick(e)
    }


    return { initGameBoard, playerClick }
})(gameBoard, document.querySelector('#gameBoard')! as HTMLDivElement);

const gameController = (()=>{
    let p1 = player('bob', 'X')
    let p2 = player('sally', 'O')
    let startingPlayer = p1
    let turn;
    const setup = () =>{
        renderController.initGameBoard()
    }
    const start = () => {

    }
    
    const play = () => {
        
        return 0
    }

    const playerClick = (e: Event)=> {
        console.log({e})
        
    }
    return { play, setup, playerClick }
})();


    gameController.setup()
    
    
})()