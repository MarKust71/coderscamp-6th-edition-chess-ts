import { Coordinates, Side } from '../types';
import { board } from '../board/board';

interface PieceModel {
    coordinates: Coordinates;
    side: Side;
    move: (coordinates: Coordinates) => void;
    findLegalMoves(): void;
}
export class Piece implements PieceModel {
    coordinates: Coordinates;
    side: Side;
    hasMoved: boolean;
    display: string;

    constructor(coordinates: Coordinates, side: Side) {
        this.side = side;
        this.coordinates = coordinates;
        this.hasMoved = false;
    }

    findLegalMoves(): Array<Coordinates> {
        return [];
    }

    move(coordinates: Coordinates): void {
        console.log('Coordinates from move: ', coordinates);

        const newX = coordinates.x;
        const newY = coordinates.y;

        // clearing previous place
        board[this.coordinates.x][this.coordinates.y] = null;
        document.getElementById(`${this.coordinates.x},${this.coordinates.y}`).innerHTML = '';
        // setting new
        this.coordinates.x = newX;
        this.coordinates.y = newY;
        board[this.coordinates.x][this.coordinates.y] = this;
        document.getElementById(`${coordinates.x},${coordinates.y}`).innerHTML = this.display;
    }
}
