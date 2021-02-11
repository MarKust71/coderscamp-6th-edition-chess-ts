import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';
import { GameHistory } from '../gameHistory/gameHistory';

import { Piece } from './piece';

interface QueenModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    // checkLine(): Array<Coordinates>;
    // move: (coordinates: Coordinates) => void;
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
        const directions: Array<Array<number>> = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        directions.map((item: Array<number>) => {
            this.checkLine(item[0], item[1], possibleMoves);
        });

        return possibleMoves;
    };

    checkLine(dx: number, dy: number, possibleMoves: Array<Coordinates>) {
        const sameSideKing = Piece.findKing(this.side);
        const canMove = GameHistory.whoseTurn() === this.side;

        const checkKingIsSafe = (expectedX: number, expectedY: number) => {
            return !(canMove && sameSideKing.moveEndangerKing(this, { x: expectedX, y: expectedY }));
        };
        for (let i = 1; i < 8; i++) {
            const expectedX: number = this.coordinates.x + dx * i;
            const expectedY: number = this.coordinates.y + dy * i;
            if (expectedX >= 0 && expectedX < 8 && expectedY >= 0 && expectedY < 8) {
                if (this.getSquareStatus(expectedX, expectedY) === 0) {
                    // empty square
                    if (checkKingIsSafe(expectedX, expectedY)) {
                        possibleMoves.push({ x: expectedX, y: expectedY });
                    }
                } else if (this.getSquareStatus(expectedX, expectedY) === 2) {
                    // enemy piece
                    if (checkKingIsSafe(expectedX, expectedY)) {
                        possibleMoves.push({ x: expectedX, y: expectedY });
                    }
                    break;
                } else {
                    // my piece
                    break;
                }
            } else {
                // out of board
                break;
            }
        }
    }

    getSquareStatus(x: number, y: number): number {
        let status = 0; // empty square
        const piece: Piece | undefined = chessBoard.board[x][y].pieceOnSquare;
        if (piece) {
            if (piece.side === this.side) {
                status = 1; // my piece
            } else {
                status = 2; // enemy piece
            }
        }
        return status;
    }
}
