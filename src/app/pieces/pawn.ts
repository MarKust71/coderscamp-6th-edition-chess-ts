import { Coordinates, Side } from '../types';

import { Piece } from './piece';

interface PawnModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    promote: () => void;
    enPassant: () => void;
    move: (coordinates: Coordinates) => void;
}
export class Pawn extends Piece implements PawnModel {
    name: string;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = 'pawn';
        this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
    }

    findLegalMoves(): Array<Coordinates> {
        const possibleMoves: Array<Coordinates> = [];
        if (this.side === 'white') {
            this.coordinates.x - 1 > 0 && possibleMoves.push({ x: this.coordinates.x - 1, y: this.coordinates.y });
            this.coordinates.x - 2 > 0 && possibleMoves.push({ x: this.coordinates.x - 2, y: this.coordinates.y });
        }
        return possibleMoves;
    }
    promote(): void {}
    enPassant(): void {}
}
