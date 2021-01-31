import { Coordinates, Side, Name } from '../types';
import { Piece } from '../pieces/piece';
import { Timer } from '../timers/timers';
import { chessBoard } from '../board/board';
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

    static createNotation(piece: Piece, origin: Coordinates, destination: Coordinates): string {
        const secondPieceCoordinates = sameNameFigureAbleToMove();
        let columnOrRowSymbol = '';
        let special = '';
        const figure: string =
            piece.name === Name.PAWN ? String.fromCharCode(97 + origin.x) : piece.name[0].toUpperCase();
        const move: string = String.fromCharCode(97 + destination.x) + destination.y + 1;
        const capture: string = chessBoard.board[destination.x][destination.y].pieceOnSquare ? ':' : '';

        // Adding additional origin information if two or more pieces of the same side can move on the same square
        if (secondPieceCoordinates && piece.name !== Name.PAWN) {
            columnOrRowSymbol =
                secondPieceCoordinates.y === piece.coordinates.y
                    ? String(origin.y)
                    : String.fromCharCode(97 + origin.x);
        }

        // En passant
        if (
            piece.name === Name.PAWN &&
            Math.abs(destination.x - origin.x) === 1 &&
            Math.abs(destination.y - origin.y) === 1
        ) {
            const lastMove = gameHistory.lastMove();
            if (lastMove.piece.name === Name.PAWN && Math.abs(lastMove.origin.x - lastMove.piece.coordinates.x) === 2) {
                special = '(e.p.)';
            }
        }

        // Promotion

        // Castle
        if (piece.name === Name.KING && Math.abs(origin.y - destination.y) === 2) {
            if (destination.y === 2) {
                return 'O-O-O';
            } else return 'O-O';
        }

        return figure + columnOrRowSymbol + capture + move + special;

        function sameNameFigureAbleToMove(): Coordinates | undefined {
            for (const row of chessBoard.board) {
                for (const square of row) {
                    const secondPiece = square.pieceOnSquare;
                    if (secondPiece.name === piece.name && secondPiece.side === piece.side)
                        for (const coordinates of secondPiece.findLegalMoves()) {
                            if (coordinates.x === destination.x && coordinates.y === destination.y)
                                return secondPiece.coordinates;
                        }
                }
            }
        }
    }
}

export class gameHistory {
    static getHistory(): Array<Movement> {
        return JSON.parse(localStorage.getItem('history'));
    }

    static setHistory(history: Array<Movement>): void {}

    static whoseTurn(): Side {
        return gameHistory.getHistory().length % 2 === 0 ? Side.WHITE : Side.BLACK;
    }

    static newMove(move: Movement): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        history.push(move);
        localStorage.setItem('history', JSON.stringify(history));
    }

    static undoMove(): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));
        const lastMove: Movement = history.shift();

        lastMove.piece.coordinates.x = lastMove.origin.x;
        lastMove.piece.coordinates.y = lastMove.origin.y;

        // Repaint on board
    }

    static lastMove(): Movement {
        return gameHistory.getHistory().shift();
    }

    static playFromTheStart(): void {
        const TIME_BETWEEN_MOVES = 600;
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        for (let i = 0; i < history.length; i++) {
            setTimeout(() => {
                const move: Movement = history.pop();
                const piece = chessBoard.board[move.origin.x][move.origin.y].pieceOnSquare;
                piece.move({ x: move.origin.x, y: move.origin.y });
            }, TIME_BETWEEN_MOVES);
        }
    }
}
