import { Coordinates, Name, Side } from '../types';
import { GameHistoryView } from '../../view/gameHistory';
import { chessBoard } from '../board/chessBoard';
import { Piece } from '../pieces/piece';
import { createByName } from '../pieces/createByName';
import { Timers } from '../timers/types';
import { paintPieces } from '../../view/boardView/paintPieces';
import { playerTimerClockSwitch } from '../../view/playerTimerClockSwitch';
import { runTimer } from '../timers/runTimer';
import { Pawn } from '../pieces/pawn';
import { addPiece } from '../../view/boardView/addPiece';

export class Movement {
    piece: Piece;
    destination: Coordinates;
    timers: Timers;
    notation: string;
    destinationPiece: Piece;

    constructor(piece: Piece, destination: Coordinates, timers: Timers) {
        this.piece = piece;
        this.timers = timers;
        this.destination = destination;
        this.destinationPiece = chessBoard.board[destination.x][destination.y].pieceOnSquare;
        this.notation = Movement.createNotation(piece, destination);
    }

    static createNotation(piece: Piece, destination: Coordinates): string {
        const origin = piece.coordinates;
        const secondPieceCoordinates = sameNameFigureAbleToMove();
        let columnOrRowSymbol = '';
        let special = '';
        let capture = '';
        const figure: string = piece.name === Name.PAWN ? '' : piece.name[0].toUpperCase();
        const move: string = String.fromCharCode(97 + destination.y) + String(8 - destination.x);

        // Capture
        if (chessBoard.board[destination.x][destination.y].pieceOnSquare) {
            capture = piece.name === Name.PAWN ? String.fromCharCode(97 + origin.y) + ':' : ':';
        }

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
            const lastMove = GameHistory.lastMove();
            if (
                lastMove &&
                lastMove.piece.name === Name.PAWN &&
                Math.abs(lastMove.piece.coordinates.x - lastMove.destination.x) === 2 &&
                lastMove.destination.x === piece.coordinates.x
            ) {
                special = '(e.p.)';
            }
        }

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
                    if (secondPiece && secondPiece.name === piece.name && secondPiece.side === piece.side)
                        for (const coordinates of secondPiece.findLegalMoves()) {
                            if (coordinates.x === origin.x && coordinates.y === origin.y)
                                return secondPiece.coordinates;
                        }
                }
            }
        }
    }
}

export class GameHistory {
    static getHistory(): Array<Movement> {
        return JSON.parse(localStorage.getItem('history'));
    }

    static promotion(newName: Name): void {
        const history = GameHistory.getHistory();
        history[history.length - 1].notation += newName[0].toUpperCase();
        GameHistory.setHistory(history);
        GameHistoryView.updateLast(history[history.length - 1].notation);
    }

    static gameStatus(check: boolean, stall: boolean): void {
        const history = GameHistory.getHistory();
        let status;
        if (check) {
            if (stall) {
                status = '#';
            } else status = '+';
        } else status = 'SS';
        // There is no official notation for stalemate as for any other draw.
        history[history.length - 1].notation += status;
        GameHistory.setHistory(history);
    }

    static setHistory(history: Array<Movement>): void {
        localStorage.setItem('history', JSON.stringify(history));
    }

    static whoseTurn(): Side {
        const history = GameHistory.getHistory();

        if (history) {
            return history.length % 2 === 0 ? Side.WHITE : Side.BLACK;
        } else return Side.WHITE;
    }

    static newMove(move: Movement): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        history.push(move);
        localStorage.setItem('history', JSON.stringify(history));
    }

    static undoMove(): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));
        const { piece, destination, destinationPiece, notation } = history.pop();
        const pieceAtDestination = chessBoard.board[destination.x][destination.y].pieceOnSquare;

        GameHistory.setHistory(history);
        GameHistoryView.removeLast();

        pieceAtDestination.coordinates = piece.coordinates;
        chessBoard.movePiece(destination, piece.coordinates, pieceAtDestination);

        if (destinationPiece) {
            chessBoard.board[destinationPiece.coordinates.x][
                destinationPiece.coordinates.y
            ].pieceOnSquare = createByName(destinationPiece.name, destinationPiece.side, destinationPiece.coordinates);
        } else if (notation.includes('e.p')) {
            const pawn = new Pawn(
                { x: piece.coordinates.x, y: destination.y },
                pieceAtDestination.side === 'white' ? Side.BLACK : Side.WHITE,
            );
            chessBoard.addPiece(pawn);
            addPiece(pawn);
        }

        runTimer.setOpponentsTimer();
        playerTimerClockSwitch(GameHistory.whoseTurn());
        paintPieces(chessBoard.board);
    }

    static undoMoveListener() {
        GameHistory.undoMove();
    }

    static lastMove(): Movement {
        return GameHistory.getHistory().pop();
    }

    static playFromTheStart(timeBetweenMoves = 600): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));
        GameHistory.setHistory([]);
        chessBoard.restartBoard();
        GameHistoryView.clear();
        setInterval(oneMove, timeBetweenMoves);

        function oneMove(): void {
            const move: Movement = history.shift();
            if (!move) {
                clearInterval(this);
                return;
            }
            const piece = chessBoard.board[move.piece.coordinates.x][move.piece.coordinates.y].pieceOnSquare;
            GameHistory.newMove(move);
            GameHistoryView.append(move.notation);
            piece.move({ x: move.destination.x, y: move.destination.y });
        }
    }

    static playFromTheStartListener(event: MouseEvent, timeBetweenMoves = 600): void {
        GameHistory.playFromTheStart(timeBetweenMoves);
    }
}
