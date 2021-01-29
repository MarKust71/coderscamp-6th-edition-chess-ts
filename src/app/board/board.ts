import { Pawn } from '../pieces/pawn';
import { Side } from '../types';

export const board = new Array(8);
for (let i = 0; i < 8; i++) {
    board[i] = new Array(8);
}
let pawn = new Pawn({ x: 6, y: 0 }, Side.WHITE);
board[pawn.coordinates.x][pawn.coordinates.y] = pawn;
pawn = new Pawn({ x: 6, y: 1 }, Side.WHITE);
board[pawn.coordinates.x][pawn.coordinates.y] = pawn;
