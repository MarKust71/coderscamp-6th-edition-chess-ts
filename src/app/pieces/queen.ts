import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/chessBoard';

import { Piece } from './piece';

interface QueenModel {
    name: string;
    display: string;
    findLegalMoves(): Coordinates[];
    // move: (coordinates: Coordinates) => void;
    checkKingIsSafe(expectedCoordinates: Coordinates): boolean;
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
        const { x, y } = this.coordinates;
        const possibleMoves: Coordinates[] = [];
        const movesRelatedToPiecePosition: number[][] = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];
        movesRelatedToPiecePosition.map((item) => {
            for (let i = 1; i <= 7; i++) {
                if (x + item[0] * i > -1 && x + item[0] * i < 8 && y + item[1] * i > -1 && y + item[1] * i < 8) {
                    const expectedX = x + item[0] * i >= 0 && x + item[0] * i < 8 ? x + item[0] * i : undefined;
                    const expectedY = y + item[1] * i >= 0 && y + item[1] * i < 8 ? y + item[1] * i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (this.checkKingIsSafe({ x: expectedX, y: expectedY }))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (this.checkKingIsSafe({ x: expectedX, y: expectedY }))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        });
        return possibleMoves;
    };
}
