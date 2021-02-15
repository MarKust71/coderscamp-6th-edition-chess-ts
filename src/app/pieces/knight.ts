import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/chessBoard';
import { movesRelated } from '../globals';

import { Piece } from './piece';

interface KnightModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    checkKingIsSafe(expectedCoordinates: Coordinates): boolean;
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

        movesRelated.KNIGHT.map((item) => {
            if (x + item.x > -1 && x + item.x < 8 && y + item.y > -1 && y + item.y < 8) {
                const expectedX = x + item.x >= 0 && x + item.x < 8 ? x + item.x : undefined;
                const expectedY = y + item.y >= 0 && y + item.y < 8 ? y + item.y : undefined;
                if (chessBoard.board[x + item.x][y + item.y].pieceOnSquare) {
                    if (this.side !== chessBoard.board[x + item.x][y + item.y].pieceOnSquare.side) {
                        if (this.checkKingIsSafe({ x: expectedX, y: expectedY }))
                            possibleMoves.push({ x: expectedX, y: expectedY });
                    }
                } else {
                    if (this.checkKingIsSafe({ x: expectedX, y: expectedY }))
                        possibleMoves.push({ x: expectedX, y: expectedY });
                }
            }
        });
        return possibleMoves;
    };
}
