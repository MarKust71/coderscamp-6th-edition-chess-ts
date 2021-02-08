import { Coordinates, Side, Name } from '../types';

import { Piece } from './piece';

interface QueenModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
}
export class Queen extends Piece implements QueenModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.QUEEN;
        this.display = `<i class="fas fa-chess-queen ${side}"></i>`;
    }

    findLegalMoves = (): Coordinates[] => {
        const possibleMoves: Array<Coordinates> = [];
        return possibleMoves;
    };
}
