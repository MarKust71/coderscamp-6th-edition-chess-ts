import { unmarkLegalMoves } from '../../view/boardView/unmarkLegalMoves';
import { paintPieces } from '../../view/boardView/paintPieces';
import { GameHistoryView } from '../../view/gameHistory';
import { GameHistory, Movement } from '../gameHistory/gameHistory';
import { BOARD_SIDE_LENGTH } from '../globals';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Piece } from '../pieces/piece';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';
import { Square } from '../square/square';
import { runTimer } from '../timers/runTimer';
import { Board, Coordinates, Side, Name } from '../types';
import { removePiece } from '../../view/boardView/removePiece';

export class ChessBoard {
    board: Board;

    constructor() {
        this.board = ChessBoard.pieceSetup(ChessBoard.boardSetup());
    }

    clearPieces() {
        for (const row of this.board) {
            for (const square of row) {
                square.pieceOnSquare = undefined;
            }
        }
    }

    setBoard(board: Board): void {
        this.board = board;
    }

    restartBoard() {
        this.clearPieces();
        this.setBoard(ChessBoard.pieceSetup(this.board));
        paintPieces(chessBoard.board);
    }

    static boardSetup(): Board {
        const board = [];

        for (let row = 0; row < BOARD_SIDE_LENGTH; row++) {
            board.push(new Array(BOARD_SIDE_LENGTH));
            for (let column = 0; column < BOARD_SIDE_LENGTH; column++) {
                board[row][column] = new Square(row, column);
            }
        }

        return board;
    }

    static pieceSetup(board: Board): Board {
        for (let row = 0; row <= 7; row++) {
            for (let column = 0; column <= 7; column++) {
                board[row][column].pieceOnSquare = undefined;
            }
        }
        board[7][0].pieceOnSquare = new Rook({ x: 7, y: 0 }, Side.WHITE);
        board[7][1].pieceOnSquare = new Bishop({ x: 7, y: 1 }, Side.WHITE);
        board[7][2].pieceOnSquare = new Knight({ x: 7, y: 2 }, Side.WHITE);
        board[7][3].pieceOnSquare = new Queen({ x: 7, y: 3 }, Side.WHITE);
        board[7][4].pieceOnSquare = new King({ x: 7, y: 4 }, Side.WHITE);
        board[7][5].pieceOnSquare = new Knight({ x: 7, y: 5 }, Side.WHITE);
        board[7][6].pieceOnSquare = new Bishop({ x: 7, y: 6 }, Side.WHITE);
        board[7][7].pieceOnSquare = new Rook({ x: 7, y: 7 }, Side.WHITE);

        board[0][0].pieceOnSquare = new Rook({ x: 0, y: 0 }, Side.BLACK);
        board[0][1].pieceOnSquare = new Bishop({ x: 0, y: 1 }, Side.BLACK);
        board[0][2].pieceOnSquare = new Knight({ x: 0, y: 2 }, Side.BLACK);
        board[0][3].pieceOnSquare = new Queen({ x: 0, y: 3 }, Side.BLACK);
        board[0][4].pieceOnSquare = new King({ x: 0, y: 4 }, Side.BLACK);
        board[0][5].pieceOnSquare = new Knight({ x: 0, y: 5 }, Side.BLACK);
        board[0][6].pieceOnSquare = new Bishop({ x: 0, y: 6 }, Side.BLACK);
        board[0][7].pieceOnSquare = new Rook({ x: 0, y: 7 }, Side.BLACK);

        for (let i = 0; i < 8; i++) {
            board[6][i].pieceOnSquare = new Pawn({ x: 6, y: i }, Side.WHITE);
            board[1][i].pieceOnSquare = new Pawn({ x: 1, y: i }, Side.BLACK);
        }
        return board;
    }

    moveEvent(currentTarget: HTMLElement): void {
        const { id } = currentTarget;
        const coordinates = JSON.parse(id);
        const originCoords = JSON.parse(currentTarget.getAttribute('origin'));
        const piece = chessBoard.board[originCoords.x][originCoords.y].pieceOnSquare;
        unmarkLegalMoves(this.board);
        GameHistory.newMove(new Movement(piece, coordinates, runTimer.timers));
        piece.move(coordinates);
        GameHistoryView.append(GameHistory.lastMove().notation);
    }

    movePiece(origin: Coordinates, destination: Coordinates, piece: Piece) {
        if (
            piece.name === Name.PAWN &&
            origin.x !== destination.x &&
            origin.y !== destination.y &&
            !chessBoard.board[destination.x][destination.y].pieceOnSquare
        ) {
            const pawnCoordinates = { x: origin.x, y: destination.y };
            chessBoard.removePiece(pawnCoordinates);
            removePiece(pawnCoordinates);
        }

        chessBoard.board[origin.x][origin.y].pieceOnSquare = undefined;
        this.board[destination.x][destination.y].pieceOnSquare = piece;
        if (piece instanceof King && Math.abs(origin.y - destination.y) == 2) {
            piece.castle(destination);
        }

        piece.coordinates = destination;
        if (piece instanceof Pawn) piece.promote();
    }

    removePiece(coordinates: Coordinates): void {
        this.board[coordinates.x][coordinates.y].pieceOnSquare = undefined;
    }

    addPiece(piece: Piece) {
        this.board[piece.coordinates.x][piece.coordinates.y].pieceOnSquare = piece;
    }

    findKing(side: Side): King {
        for (const row of this.board) {
            for (const square of row) {
                const piece = square.pieceOnSquare;
                if (piece && piece.side === side && piece instanceof King) {
                    return piece;
                }
            }
        }
    }
}

export const chessBoard = new ChessBoard();
