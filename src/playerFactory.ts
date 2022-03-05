import { symbols } from "./types";
import { Player } from "./intefaces";
// factory
const playerFactory = (name: string, symbol: symbols): Player => {
    
    let score: number = 0;
    let _name = name;
    let playerId = Math.floor(Math.random() * 10**7)

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

export default playerFactory