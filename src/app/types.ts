import { Square } from './square/square';

export type BoardRow = Square[];
export type Board = BoardRow[];

export type Coordinates = {
    x: number;
    y: number;
};

export enum Side {
    WHITE = 'white',
    BLACK = 'black',
}

export enum Name {
    PAWN = 'pawn',
    ROOK = 'rook',
    KNIGHT = 'knight',
    BISHOP = 'bishop',
    QUEEN = 'queen',
    KING = 'king',
}

export const PLAYTIME = [
    { value: 1, text: '1 minute' },
    { value: 3, text: '3 minutes' },
    { value: 5, text: '5 minutes' },
    { value: 8, text: '8 minutes' },
];

export type MovesRelatedToPiecePosition = {
    [name in keyof typeof Name]: Coordinates[];
};
