import { Coordinates, Name, Side } from '../types';
import { chessBoard } from '../board/board';
import { runTimer } from '../timers/runTimer';

interface PieceModel {
    coordinates: Coordinates;
    side: Side;
    name: Name;
    move: (coordinates: Coordinates) => void;
    findLegalMoves(): void;
    promote?(): void;
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

    findLegalMoves = (): Coordinates[] => {
        return [];
    };

    promote() {}

    move(coordinates: Coordinates): void {
        const newX = coordinates.x;
        const newY = coordinates.y;

        // clearing previous place
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = undefined;
        document.getElementById(JSON.stringify({ x: this.coordinates.x, y: this.coordinates.y })).innerHTML = '';

        // setting new
        this.coordinates.x = newX;
        this.coordinates.y = newY;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = this;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare.promote();
        document.getElementById(JSON.stringify({ x: coordinates.x, y: coordinates.y })).innerHTML = this.display;
        runTimer.setOpponentsTimer();
    }
}
