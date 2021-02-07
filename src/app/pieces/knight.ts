import { Coordinates, Side, Name } from '../types';

import { Piece } from './piece';

interface KnightModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
}
export class Knight extends Piece implements KnightModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.KNIGHT;
        this.display = `<i class="fas fa-chess-knight ${side}"></i>`;
    }

    findLegalMoves = (): Coordinates[] => {
        const possibleMoves: Array<Coordinates> = [];
        return possibleMoves;
    };
}
