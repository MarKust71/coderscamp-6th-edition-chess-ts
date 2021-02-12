import { MovesRelatedToPiecePosition } from './types';

export const BOARD_SIDE_LENGTH = 8;

export const movesRelated: MovesRelatedToPiecePosition = {
    ROOK: [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
    ],
    BISHOP: [],
    KING: [],
    PAWN: [],
    QUEEN: [],
    KNIGHT: [
        { x: -2, y: -1 },
        { x: -2, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: -1, y: -2 },
        { x: -1, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: -2 },
    ],
};

export const INTERVAL_MS = 100;
