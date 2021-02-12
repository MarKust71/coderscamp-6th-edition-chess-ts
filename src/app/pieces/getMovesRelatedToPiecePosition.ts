import { Coordinates } from '../types';
import { chessBoard } from '../board/chessBoard';

import { getMovesRelatedToPiecePositionParams } from './types';

export const getMovesRelatedToPiecePosition = ({
    origin,
    side,
    moves,
    checkKingIsSafe,
}: getMovesRelatedToPiecePositionParams): Coordinates[] => {
    const { x, y } = origin;
    const possibleMoves: Coordinates[] = [];

    moves.map((item) => {
        for (let i = 1; i <= 7; i++) {
            if (x + item.x * i > -1 && x + item.x * i < 8 && y + item.y * i > -1 && y + item.y * i < 8) {
                const expectedX = x + item.x * i >= 0 && x + item.x * i < 8 ? x + item.x * i : undefined;
                const expectedY = y + item.y * i >= 0 && y + item.y * i < 8 ? y + item.y * i : undefined;
                if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                    const move = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                    if (move) {
                        if (move.side !== side) {
                            if (checkKingIsSafe({ x: expectedX, y: expectedY }))
                                possibleMoves.push({ x: expectedX, y: expectedY });
                        }
                        break;
                    } else {
                        if (checkKingIsSafe({ x: expectedX, y: expectedY }))
                            possibleMoves.push({ x: expectedX, y: expectedY });
                    }
                }
            }
        }
    });

    return possibleMoves;
};
