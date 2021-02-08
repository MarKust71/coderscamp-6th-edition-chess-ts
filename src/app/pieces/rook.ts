import { Coordinates, Side, Name } from '../types';

import { Piece } from './piece';

interface RookModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
}
export class Rook extends Piece implements RookModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.ROOK;
        this.display = `<i class="fas fa-chess-rook ${side}"></i>`;
    }

    findLegalMoves = (): Coordinates[] => {
        const possibleMoves: Array<Coordinates> = [];
        return possibleMoves;
    };
}
