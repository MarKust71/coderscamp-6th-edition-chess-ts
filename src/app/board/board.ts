import { GameHistoryView } from '../../view/gameHistory';
import { Pawn } from '../pieces/pawn';
import { Piece } from '../pieces/piece';
import { King } from '../pieces/king';
import { Coordinates, Side } from '../types';
import { touched } from '../touched';
import { GameHistory, Movement } from '../gameHistory/gameHistory';
import { runTimer } from '../timers/runTimer';

export class Square {
    coordinates: Coordinates;
    pieceOnSquare: Piece | undefined;

    constructor(x: number, y: number) {
        this.coordinates = { x: x, y: y };
    }
}
export class ChessBoard {
    board: Array<Array<Square>>;

    constructor() {
        this.board = this.pieceSetup();
    }

    pieceSetup(): Square[][] {
        return ChessBoard.pieceSetup(ChessBoard.boardSetup());
    }

    paintPieces(): void {
        for (const row of this.board) {
            for (const square of row) {
                const squareElement = document.getElementById(
                    JSON.stringify({ x: square.coordinates.x, y: square.coordinates.y }),
                );

                squareElement.innerHTML = chessBoard.board[square.coordinates.x][square.coordinates.y].pieceOnSquare
                    ? chessBoard.board[square.coordinates.x][square.coordinates.y].pieceOnSquare.display
                    : '';
            }
        }
    }

    clearPieces() {
        for (const row of this.board) {
            for (const square of row) {
                square.pieceOnSquare = undefined;
            }
        }
    }

    static boardSetup(): Array<Array<Square>> {
        const BOARD_SIDE_LENGTH = 8;
        const board = [];

        for (let row = 0; row < BOARD_SIDE_LENGTH; row++) {
            board.push(new Array(BOARD_SIDE_LENGTH));
            for (let column = 0; column < BOARD_SIDE_LENGTH; column++) {
                board[row][column] = new Square(row, column);
            }
        }

        return board;
    }

    static pieceSetup(board: Array<Array<Square>>): Array<Array<Square>> {
        board[7][4].pieceOnSquare = new King({ x: 7, y: 4 }, Side.WHITE);
        board[0][4].pieceOnSquare = new King({ x: 0, y: 4 }, Side.BLACK);

        for (let i = 0; i < 8; i++) {
            board[6][i].pieceOnSquare = new Pawn({ x: 6, y: i }, Side.WHITE);
            board[1][i].pieceOnSquare = new Pawn({ x: 1, y: i }, Side.BLACK);
        }
        return board;
    }

    markLegalMoves(coordinates: Array<Coordinates>, originCoords: Coordinates): void {
        for (const coords of coordinates) {
            const squareElement = document.getElementById(JSON.stringify({ x: coords.x, y: coords.y }));
            squareElement.classList.add('possibleMove');
            squareElement.addEventListener('click', (event: MouseEvent) => {
                this.makeMove(event, originCoords);
            });
        }
    }

    unmarkLegalMoves(): void {
        for (const row of this.board) {
            for (const square of row) {
                const originalElement = document.getElementById(
                    JSON.stringify({ x: square.coordinates.x, y: square.coordinates.y }),
                );
                originalElement.classList.remove('possibleMove');

                // Removing eventListener by cloning and replacing node
                const newElement = originalElement.cloneNode(true);
                originalElement.parentNode.replaceChild(newElement, originalElement);
                newElement.addEventListener('click', touched);
            }
        }
    }

    makeMove(event: MouseEvent, originCoords: Coordinates): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { id }: any = event.currentTarget; // as HTMLAreaElement;
        const coordinates = JSON.parse(id);
        const piece = chessBoard.board[originCoords.x][originCoords.y].pieceOnSquare;

        this.unmarkLegalMoves();
        GameHistory.newMove(
            new Movement(piece, originCoords, coordinates, [
                runTimer.runTimerClockTimerWhite,
                runTimer.runTimerClockTimerBlack,
            ]),
        );
        piece.move(coordinates);
        console.log(GameHistory.getHistory(), GameHistory.whoseTurn());
        GameHistoryView.append(GameHistory.lastMove().notation);
    }
}

export const chessBoard = new ChessBoard();
