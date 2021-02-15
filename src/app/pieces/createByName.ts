import { Coordinates, Name, Side } from '../types';

import { Piece } from './piece';
import { Pawn } from './pawn';
import { Bishop } from './bishop';
import { Knight } from './knight';
import { Queen } from './queen';
import { Rook } from './rook';

export function createByName(name: Name | string, side: Side, coordinates: Coordinates): Piece {
    const { x, y } = coordinates;

    switch (name) {
        case Name.BISHOP:
            return new Bishop({ x: x, y: y }, side);
        case Name.QUEEN:
            return new Queen({ x: x, y: y }, side);
        case Name.KNIGHT:
            return new Knight({ x: x, y: y }, side);
        case Name.ROOK:
            return new Rook({ x: x, y: y }, side);
        case Name.PAWN:
            return new Pawn({ x: x, y: y }, side);
    }
}
