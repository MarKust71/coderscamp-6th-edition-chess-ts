import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';
import { GameHistory } from '../gameHistory/gameHistory';

import { Piece } from './piece';

interface BishopModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    // move: (coordinates: Coordinates) => void;
}

export class Bishop extends Piece implements BishopModel {
    name: Name;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.BISHOP;
        this.display = `<i class="fas fa-chess-bishop ${side}"></i>`;
    }

    findLegalMoves = (): Coordinates[] => {
        // const movesRelatedToKnightsPosition = [
        //     [-1, -1],
        //     [-1, 1],
        //     [1, 1],
        //     [1, -1],
        // ];
        const { x, y } = this.coordinates;
        const possibleMoves: Array<Coordinates> = [];
        const sameSideKing = Piece.findKing(this.side);
        const canMove = GameHistory.whoseTurn() === this.side;

        const checkKingIsSafe = (expectedX: number, expectedY: number) => {
            return !(canMove && sameSideKing.moveEndangerKing(this, { x: expectedX, y: expectedY }));
        };

        // movesRelatedToKnightsPosition.map((item) => {
        //     for (let i = 1; i < 8; i++) {
        //         if (x + item[0] > -1 && x + item[0] < 8 && y + item[1] > -1 && y + item[1] < 8) {
        //             const expectedX = x + item[0] >= 0 && x + item[0] < 8 ? x + item[0] : undefined;
        //             const expectedY = y + item[1] >= 0 && y + item[1] < 8 ? y + item[1] : undefined;
        //             if (chessBoard.board[x + item[0]][y + item[1]].pieceOnSquare) {
        //                 if (this.side !== chessBoard.board[x + item[0]][y + item[1]].pieceOnSquare.side) {
        //                     if (checkKingIsSafe(expectedX, expectedY))
        //                         possibleMoves.push({ x: expectedX, y: expectedY });
        //                 }
        //             } else {
        //                 if (checkKingIsSafe(expectedX, expectedY)) possibleMoves.push({ x: expectedX, y: expectedY });
        //             }
        //         }
        //     }
        // });

        for (let i = 1; i <= 7; i++) {
            if (x + i <= 7) {
                const expectedX = x + i >= 0 && x + i < 8 ? x + i : undefined;
                if (y + i <= 7) {
                    const expectedY = y + i >= 0 && y + i < 8 ? y + i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (checkKingIsSafe(expectedX, expectedY))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (checkKingIsSafe(expectedX, expectedY))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (x + i <= 7) {
                const expectedX = x + i >= 0 && x + i < 8 ? x + i : undefined;
                if (y - i >= 0) {
                    const expectedY = y - i >= 0 && y - i < 8 ? y - i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (checkKingIsSafe(expectedX, expectedY))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (checkKingIsSafe(expectedX, expectedY))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (x - i >= 0) {
                const expectedX = x - i >= 0 && x - i < 8 ? x - i : undefined;
                if (y + i <= 7) {
                    const expectedY = y + i >= 0 && y + i < 8 ? y + i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (checkKingIsSafe(expectedX, expectedY))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (checkKingIsSafe(expectedX, expectedY))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            if (x - i >= 0) {
                const expectedX = x - i >= 0 && x - i < 8 ? x - i : undefined;
                if (y - i >= 0) {
                    const expectedY = y - i >= 0 && y - i < 8 ? y - i : undefined;
                    if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                        const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                        if (move) {
                            if (move.side !== this.side) {
                                if (checkKingIsSafe(expectedX, expectedY))
                                    possibleMoves.push({ x: expectedX, y: expectedY });
                            }
                            break;
                        } else {
                            if (checkKingIsSafe(expectedX, expectedY))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                    }
                }
            }
        }
        return possibleMoves;
    };
}
