import { Coordinates, Name, Side } from '../types';
import { movesRelated } from '../globals';

import { Piece } from './piece';
import { getMovesRelatedToPiecePosition } from './getMovesRelatedToPiecePosition';

interface RookModel {
    name: string;
    display: string;
    findLegalMoves(): Coordinates[];
    // move: (coordinates: Coordinates) => void;
    checkKingIsSafe(expectedCoordiates: Coordinates): boolean;
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
        return getMovesRelatedToPiecePosition({
            origin: this.coordinates,
            side: this.side,
            moves: movesRelated.ROOK,
            checkKingIsSafe: this.checkKingIsSafe,
        });
    };
}
