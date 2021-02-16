import { Coordinates, Name, Side } from '../types';
import { movesRelated } from '../globals';
import { chessBoard } from '../board/chessBoard';

import { Piece } from './piece';

interface RookModel {
    name: string;
    display: string;
    findLegalMoves(): Coordinates[];
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
        const possibleMoves: Coordinates[] = [];

        movesRelated.ROOK.map((item) => {
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
