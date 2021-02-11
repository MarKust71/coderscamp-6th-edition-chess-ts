import { chessBoard } from '../board/board';
import { GameHistory } from '../gameHistory/gameHistory';
import { Coordinates, Name, Side } from '../types';

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
        const sameSideKing = Piece.findKing(this.side);
        const canMove = GameHistory.whoseTurn() === this.side;

        const checkKingIsSafe = (expectedX: number, expectedY: number) => {
            return !(canMove && sameSideKing.moveEndangerKing(this, { x: expectedX, y: expectedY }));
        };

        for (let i = 1; i <= 7; i++) {
            if (x + i <= 7) {
                const expectedX = x + i >= 0 && x + i < 8 ? x + i : undefined;
                if (typeof expectedX === 'number') {
                    if (canMove && sameSideKing.moveEndangerKing(this, { x: expectedX, y: y })) continue;
                    const move = chessBoard.board[expectedX][y].pieceOnSquare;
                    if (move) {
                        if (move.side !== this.side) {
                            if (checkKingIsSafe(expectedX, y)) possibleMoves.push({ x: expectedX, y: y });
                        }
                        break;
                    } else {
                        if (checkKingIsSafe(expectedX, y)) possibleMoves.push({ x: expectedX, y: y });
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (x - i <= 7) {
                const expectedX = x - i >= 0 && x - i < 8 ? x - i : undefined;
                if (typeof expectedX === 'number') {
                    if (canMove && sameSideKing.moveEndangerKing(this, { x: expectedX, y: y })) continue;
                    const move = chessBoard.board[expectedX][y].pieceOnSquare;

                    if (move) {
                        if (move.side !== this.side) {
                            if (checkKingIsSafe(expectedX, y)) possibleMoves.push({ x: expectedX, y: y });
                        }
                        break;
                    } else {
                        if (checkKingIsSafe(expectedX, y)) possibleMoves.push({ x: expectedX, y: y });
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (y + i <= 7) {
                const expectedY = y + i >= 0 && y + i < 8 ? y + i : undefined;
                if (typeof expectedY === 'number') {
                    if (canMove && sameSideKing.moveEndangerKing(this, { x: x, y: expectedY })) continue;
                    const piece = chessBoard.board[x][expectedY].pieceOnSquare;
                    if (piece) {
                        if (piece.side !== this.side) {
                            if (checkKingIsSafe(x, expectedY)) possibleMoves.push({ x: x, y: expectedY });
                        }
                        break;
                    } else {
                        if (checkKingIsSafe(x, expectedY)) possibleMoves.push({ x: x, y: expectedY });
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (y - i <= 7) {
                const expectedY = y - i >= 0 && y - i < 8 ? y - i : undefined;
                if (typeof expectedY === 'number') {
                    if (canMove && sameSideKing.moveEndangerKing(this, { x: x, y: expectedY })) continue;
                    const piece = chessBoard.board[x][expectedY].pieceOnSquare;
                    if (piece) {
                        if (piece.side !== this.side) {
                            if (checkKingIsSafe(x, expectedY)) possibleMoves.push({ x: x, y: expectedY });
                        }
                        break;
                    } else {
                        if (checkKingIsSafe(x, expectedY)) possibleMoves.push({ x: x, y: expectedY });
                    }
                }
            }
        }
        return possibleMoves;
    };
}
