import { chessBoard } from '../board/board';
import { Coordinates, Name, Side } from '../types';

import { Piece } from './piece';

interface RookModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    // move: (coordinates: Coordinates) => void;
    checkKingIsSafe(expectedX: number, expectedY: number): boolean;
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
        const { x, y } = this.coordinates;
        const possibleMoves: Array<Coordinates> = [];
        const movesRelatedToKnightsPosition: Array<Array<number>> = [
            [-1, 0],
            [0, -1],
            [1, 0],
            [0, 1],
        ];

        movesRelatedToKnightsPosition.map((item) => {
            for (let i = 1; i <= 7; i++) {
                if (x + item[0] * i > -1 && x + item[0] * i < 8 && y + item[1] * i > -1 && y + item[1] * i < 8) {
                    const expectedX = x + item[0] * i >= 0 && x + item[0] * i < 8 ? x + item[0] * i : undefined;
                    const expectedY = y + item[1] * i >= 0 && y + item[1] * i < 8 ? y + item[1] * i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (this.checkKingIsSafe(expectedX, expectedY))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (this.checkKingIsSafe(expectedX, expectedY))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        });
        return possibleMoves;
    };
}
