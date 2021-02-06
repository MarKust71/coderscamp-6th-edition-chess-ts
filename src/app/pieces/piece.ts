import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/board';

interface PieceModel {
    coordinates: Coordinates;
    side: Side;
    name: Name;
    move: (coordinates: Coordinates) => void;
    findLegalMoves(): void;
}
export class Piece implements PieceModel {
    coordinates: Coordinates;
    side: Side;
    hasMoved: boolean;
    display: string;
    name: Name;

    constructor(coordinates: Coordinates, side: Side) {
        this.side = side;
        this.coordinates = coordinates;
        this.hasMoved = false;
    }

    findLegalMoves(): Array<Coordinates> {
        return [];
    }

    move(coordinates: Coordinates): void {
        const newX = coordinates.x;
        const newY = coordinates.y;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = undefined;
        document.getElementById(JSON.stringify({ x: this.coordinates.x, y: this.coordinates.y })).innerHTML = '';

        // setting new
        this.coordinates.x = newX;
        this.coordinates.y = newY;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = this;
        document.getElementById(JSON.stringify({ x: coordinates.x, y: coordinates.y })).innerHTML = this.display;
    }
}
