import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';

import { Piece } from './piece';

interface RookModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    move: (coordinates: Coordinates) => void;
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
        for (let i = 1; i <= 7; i++) {
            if (x + i <= 7) {
                const expectedX = x + i >= 0 && x + i < 8 ? x + i : undefined;
                if (typeof expectedX === 'number') {
                    const move = chessBoard.board[expectedX][y].pieceOnSquare;
                    if (move) {
                        if (move.side !== this.side) possibleMoves.push({ x: expectedX, y: y });
                        break;
                    } else possibleMoves.push({ x: expectedX, y: y });
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (x - i <= 7) {
                const expectedX = x - i >= 0 && x - i < 8 ? x - i : undefined;
                if (typeof expectedX === 'number') {
                    const move = chessBoard.board[expectedX][y].pieceOnSquare;

                    if (move) {
                        if (move.side !== this.side) possibleMoves.push({ x: expectedX, y: y });
                        break;
                    } else possibleMoves.push({ x: expectedX, y: y });
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (y + i <= 7) {
                const expectedY = y + i >= 0 && y + i < 8 ? y + i : undefined;
                if (typeof expectedY === 'number') {
                    const piece = chessBoard.board[x][expectedY].pieceOnSquare;
                    if (piece) {
                        if (piece.side !== this.side) possibleMoves.push({ x: x, y: expectedY });
                        break;
                    } else possibleMoves.push({ x: x, y: expectedY });
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (y - i <= 7) {
                const expectedY = y - i >= 0 && y - i < 8 ? y - i : undefined;
                if (typeof expectedY === 'number') {
                    const piece = chessBoard.board[x][expectedY].pieceOnSquare;
                    if (piece) {
                        if (piece.side !== this.side) possibleMoves.push({ x: x, y: expectedY });
                        break;
                    } else possibleMoves.push({ x: x, y: expectedY });
                }
            }
        }
        return possibleMoves;
    }
}
