import { Coordinates, Side, Name } from '../types';

import { Piece } from './piece';

interface BishopModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
}

export class Bishop extends Piece implements BishopModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.BISHOP;
        this.display = `<i class="fas fa-chess-bishop ${side}"></i>`;
    }

    findLegalMoves = (): Coordinates[] => {
        const possibleMoves: Array<Coordinates> = [];
        return possibleMoves;
    };
}
