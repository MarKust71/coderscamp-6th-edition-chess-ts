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

    promote() {
        console.log('promote entered');
    }

    move(coordinates: Coordinates): void {
        chessBoard.movePiece(this.coordinates, coordinates, this.display);
        this.hasMoved = true;

        // clearing previous place
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = undefined;

        // setting new
        this.coordinates = coordinates;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = this;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare.promote();

        runTimer.setOpponentsTimer();
    }
}
