import { board } from '../board';

interface PieceModel {
    x: number;
    y: number;
    side: 'white' | 'black';
    move: (id: string) => void;
    findLegalMoves(): void;
}

export class Piece implements PieceModel {
    x: number;
    y: number;
    display: string;
    side: 'white' | 'black';
    constructor(x: number, y: number, side: 'white' | 'black') {
        this.x = x;
        this.y = y;
        this.side = side;
    }
    move(id: string): void {
        const newX = Number(id[0]);
        const newY = Number(id[2]);

        // clearing previous place
        board[this.x][this.y] = null;
        document.getElementById(`${this.x},${this.y}`).innerHTML = '';
        // setting new
        this.x = newX;
        this.y = newY;
        board[this.x][this.y] = this;
        document.getElementById(id).innerHTML = this.display;
    }

    findLegalMoves(): void {}
}
