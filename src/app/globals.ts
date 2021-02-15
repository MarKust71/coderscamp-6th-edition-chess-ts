import { MovesRelatedToPiecePosition } from './types';

export const BOARD_SIDE_LENGTH = 8;

export const movesRelated: MovesRelatedToPiecePosition = {
    ROOK: [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
    ],
    BISHOP: [
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: -1 },
    ],
    KING: [
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: -1 },
    ],
    PAWN: [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
    ],
    QUEEN: [
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
    ],
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

export const MOVE_INTERVAL = 600;

export const INTERVAL_MS = 1000;

export const INITIAL_DEFAULT_TIMER = 300;
