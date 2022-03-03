import { symbols} from './types'

export interface Player {
    name: string;
    playerId: number;
    symbol: symbols;
    score: number;
}
