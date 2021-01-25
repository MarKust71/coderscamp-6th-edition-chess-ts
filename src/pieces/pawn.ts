import { Piece } from './piece';

interface PieceModel {
    name: string;
    display: string;
    findLegalMoves(): string[];
    promote?: () => void;
    enPassant?: () => void;
    move?: (id: string) => void;
}
export class Pawn extends Piece implements PieceModel {
    x: number;
    y: number;
    side: 'white' | 'black';
    name: string;
    display: string;
    constructor(x: number, y: number, side: 'white' | 'black') {
        super(x, y, side);
        this.name = 'pawn';
        this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
    }
    findLegalMoves(): string[] {
        const possibleMoves: string[] = [];
        if (this.side === 'white') {
            this.x - 1 > 0 && possibleMoves.push(`${this.x - 1},${this.y}`);
            this.x - 2 > 0 && possibleMoves.push(`${this.x - 2},${this.y}`);
        }
        return possibleMoves;
    }
    promote(): void {}
    enPassant(): void {}
}
