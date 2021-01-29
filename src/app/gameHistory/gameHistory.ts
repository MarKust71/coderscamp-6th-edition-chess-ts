import { Coordinates, Side } from '../types';
import { Piece } from '../pieces/pieces';
import { Timer } from '../timers/timers';
export class Movement {
    piece: Piece;
    origin: Coordinates;
    timers: Array<Timer>;
    notation: String;

    constructor(piece: Piece, origin: Coordinates, destination: Coordinates, timers: Array<Timer>) {
        this.piece = piece;
        this.origin = origin;
        this.timers = timers;

        //this.notation = Movement.createNotation(piece, origin, destination);
    }

    // static createNotation(piece: Piece, origin: Coordinates, destination: Coordinates): string {
    //     //const sameTypeFigure = board.findPiece(piece.name, piece.side)
    //     let figure: string = piece.name === 'pawn' ? String.fromCharCode(97 + origin.x) : piece.name[0].toUpperCase();
    //     const move: string = String.fromCharCode(97 + destination.x) + destination.y + 1;
    //     const capture: string = board.pieceOnSquare(destination.x, destination.y) ? 'x' : '';
    //     // ep. - bicie w locie

    //     return '';
    // }
}

export class gameHistory {
    history: Array<Movement>;

    constructor() {
        this.history = [];
    }

    whoseTurn(): Side {
        return this.history.length % 2 === 0 ? Side.WHITE : Side.BLACK;
    }

    newMove(move: Movement): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        history.push(move);
        localStorage.setItem('history', JSON.stringify(history));
    }

    undoMove(): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));
        const lastMove: Movement = history.pop();

        lastMove.piece.coordinates.x = lastMove.origin.x;
        lastMove.piece.coordinates.y = lastMove.origin.y;

        // Repaint on board
    }

    playFromTheStart(): void {
        // Setup board
        const TIME_BETWEEN_MOVES = 600;
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        for (let i = 0; i < history.length; i++) {
            setTimeout(() => {
                const move: Movement = history.shift();
                const piece: Piece = null; //piece at square x = move.origin.x, y = move.origin.y
                piece.move({ x: move.origin.x, y: move.origin.y });
            }, TIME_BETWEEN_MOVES);
        }
    }
}
