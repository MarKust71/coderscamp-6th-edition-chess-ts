import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/chessBoard';
import { movesRelated } from '../globals';

import { Piece } from './piece';

interface QueenModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
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
        const possibleMoves: Array<Coordinates> = [];

        movesRelated.QUEEN.map((item) => {
            for (let i = 1; i <= 7; i++) {
                if (x + item.x * i > -1 && x + item.x * i < 8 && y + item.y * i > -1 && y + item.y * i < 8) {
                    const expectedX = x + item.x * i >= 0 && x + item.x * i < 8 ? x + item.x * i : undefined;
                    const expectedY = y + item.y * i >= 0 && y + item.y * i < 8 ? y + item.y * i : undefined;
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
