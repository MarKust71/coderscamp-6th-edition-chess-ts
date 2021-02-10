import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';

import { Piece } from './piece';

interface KnightModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
}
export class Knight extends Piece implements KnightModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.KNIGHT;
        this.display = `<i class="fas fa-chess-knight ${side}"></i>`;
    }
    findLegalMoves = (): Coordinates[] => {
        const { x, y } = this.coordinates;
        const possibleMoves: Array<Coordinates> = [];
        const movesRelatedToKnightsPosition = [
            [-2, -1],
            [-2, 1],
            [2, 1],
            [2, -1],
            [-1, -2],
            [-1, 2],
            [1, 2],
            [1, -2],
        ];
        movesRelatedToKnightsPosition.map((item) => {
            if (x + item[0] > -1 && x + item[0] < 8 && y + item[1] > -1 && y + item[1] < 8) {
                const expectedX = x + item[0] >= 0 && x + item[0] < 8 ? x + item[0] : undefined;
                const expectedY = y + item[1] >= 0 && y + item[1] < 8 ? y + item[1] : undefined;
                if (chessBoard.board[x + item[0]][y + item[1]].pieceOnSquare) {
                    if (this.side !== chessBoard.board[x + item[0]][y + item[1]].pieceOnSquare.side) {
                        possibleMoves.push({ x: expectedX, y: expectedY });
                    }
                } else {
                    possibleMoves.push({ x: expectedX, y: expectedY });
                }
            }
        });
        return possibleMoves;
    };
}
