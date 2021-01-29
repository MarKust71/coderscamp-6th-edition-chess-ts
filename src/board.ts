import { Pawn } from './pieces/pawn';

export const board = new Array(8);
for (let i = 0; i < 8; i++) {
    board[i] = new Array(8);
}
let pawn = new Pawn(6, 0, 'white');
board[pawn.x][pawn.y] = pawn;
pawn = new Pawn(6, 1, 'white');
board[pawn.x][pawn.y] = pawn;
