// import { gameHistory } from '../gameHistory';
import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';

import { Piece } from './piece';

interface QueenModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
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
    }

    checkLine(dx: number, dy: number, possibleMoves: Array<Coordinates>) {
        for (let i = 1; i < 8; i++) {
            const xx: number = this.coordinates.x + dx * i;
            const yy: number = this.coordinates.y + dy * i;
            if (xx >= 0 && xx < 8 && yy >= 0 && yy < 8) {
                if (this.getSquareStatus(xx, yy) === 0) {
                    // empty square
                    possibleMoves.push({ x: xx, y: yy });
                } else if (this.getSquareStatus(xx, yy) === 2) {
                    // enemy piece
                    possibleMoves.push({ x: xx, y: yy });
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
