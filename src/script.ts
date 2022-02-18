
type matrix = string[][]

// module
const gameBoard = ((n: number = 3) =>{
    let arr2d = Array(n).fill(null).map(()=> Array(n).fill(null))
    return { arr2d }
})()

// factory 
const player = (name: string, sympol: string ) => {

    

    return { name, sympol}
}

// module
const gameController = (()=>{
    return {}
})();

// module
const renderController = ((gameBoard, board: HTMLDivElement)=>{
    const initGameBoard = () => {
        gameBoard.arr2d.map((row)=>{ row.map((content)=>{
            let div = document.createElement('div')
            div.classList.add('boardCell')
            div.textContent = `${content || "helo"}`
            board.appendChild(div)
        })})
    }
    return {initGameBoard}
})(gameBoard, document.querySelector('#gameBoard')! as HTMLDivElement);

// main
(()=>{
    renderController.initGameBoard()
    
})()