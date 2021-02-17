import { Coordinates, Side, Name } from '../types';
import { chessBoard } from '../board/chessBoard';
import { GameHistory } from '../gameHistory/gameHistory';
import { movePiece } from '../../view/boardView/movePiece';

import { Piece } from './piece';
import { Rook } from './rook';

export class King extends Piece {
    constructor(coordinates: Coordinates = { x: -1, y: -1 }, side: Side) {
        super(coordinates, side);
        this.validateInput(coordinates, side);
        this.name = Name.KING;
        this.display = `<i class="fas fa-chess-king ${side}"></i>`;

        if (coordinates.x === -1 || coordinates.y === -1) {
            this.coordinates.x = side === 'white' ? 7 : 0;
            this.coordinates.y = 4;
        } else {
            this.coordinates.x = coordinates.x;
            this.coordinates.y = coordinates.y;
        }
    }

    findLegalMoves = (): Array<Coordinates> => {
        let possibleMoves: Array<Coordinates> = [];
        const canMove = GameHistory.whoseTurn() === this.side;

        for (let x = -1; x <= 1; x++) {
            const expectedX =
                this.coordinates.x + x >= 0 && this.coordinates.x + x < 8 ? this.coordinates.x + x : undefined;
            for (let y = -1; y <= 1; y++) {
                const expectedY =
                    this.coordinates.y + y >= 0 && this.coordinates.y + y < 8 ? this.coordinates.y + y : undefined;

                if (typeof expectedX === 'number' && typeof expectedY === 'number') {
                    const piece = chessBoard.board[expectedX][expectedY].pieceOnSquare;
                    const isDestinationSafe = canMove ? this.isSafe({ x: expectedX, y: expectedY }) : true;

                    if (piece) {
                        if (piece.side !== this.side && isDestinationSafe)
                            possibleMoves.push({ x: expectedX, y: expectedY });
                    } else if (isDestinationSafe) possibleMoves.push({ x: expectedX, y: expectedY });
                }
            }
        }

        possibleMoves = canMove ? [...possibleMoves, ...this.detectCastle()] : possibleMoves;
        return possibleMoves;
    };

    isSafe(coordinates: Coordinates): boolean {
        /*
         ** Checks if the piece or square is backed (covered) by some other figure.
         ** Doing this by removing piece from board and then checking legal moves of all enemy pieces.
         */
        const enemySide = this.side === Side.WHITE ? Side.BLACK : Side.WHITE;
        const { pieceOnSquare } = chessBoard.board[coordinates.x][coordinates.y];
        let isSafe = true;
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = undefined;

        if (pieceOnSquare) chessBoard.board[coordinates.x][coordinates.y].pieceOnSquare = undefined;

        loopRow: for (const row of chessBoard.board) {
            for (const square of row) {
                const piece = square.pieceOnSquare;
                if (piece && piece.side === enemySide) {
                    if (piece.name === Name.PAWN) {
                        const direction = piece.side === 'white' ? -1 : 1;

                        if (
                            coordinates.x === piece.coordinates.x + direction &&
                            (piece.coordinates.y + 1 === coordinates.y || piece.coordinates.y - 1 === coordinates.y)
                        ) {
                            isSafe = false;
                            break loopRow;
                        }
                    } else {
                        const moves = piece.findLegalMoves();

                        if (moves.length > 0) {
                            for (const coords of moves) {
                                if (coords.x === coordinates.x && coords.y === coordinates.y) {
                                    isSafe = false;
                                    break loopRow;
                                }
                            }
                        }
                    }
                }
            }
        }
        chessBoard.board[this.coordinates.x][this.coordinates.y].pieceOnSquare = this;
        if (pieceOnSquare) chessBoard.board[coordinates.x][coordinates.y].pieceOnSquare = pieceOnSquare;
        return isSafe;
    }

    moveEndangerKing(piece: Piece, destination: Coordinates): boolean {
        chessBoard.board[piece.coordinates.x][piece.coordinates.y].pieceOnSquare = undefined;
        const pieceOnDestination = chessBoard.board[destination.x][destination.y].pieceOnSquare;
        chessBoard.board[destination.x][destination.y].pieceOnSquare = piece;
        const willBeCheck = !this.isSafe(this.coordinates);
        chessBoard.board[piece.coordinates.x][piece.coordinates.y].pieceOnSquare = piece;
        chessBoard.board[destination.x][destination.y].pieceOnSquare = pieceOnDestination;
        return willBeCheck;
    }

    underCheck(): boolean {
        return !this.isSafe(this.coordinates);
    }

    validateInput(coordinates: Coordinates, side: Side): void {
        if (coordinates.x < -1 || coordinates.x > 7) {
            throw 'x is out of range.';
        }
        if (coordinates.y < -1 || coordinates.y > 7) {
            throw 'y is out of range.';
        }
        if (side !== 'white' && side !== 'black') {
            throw `Wrong value of parameter side: ${side}`;
        }
    }

    detectCastle(): Array<Coordinates> {
        const possibleMoves: Array<Coordinates> = [];
        const rooks = findRooks(this);

        if (!this.isSafe(this.coordinates) || this.hasMoved) return [];

        for (let i = 0; i < rooks.length; i++) {
            if (rooks[i] && pathClear(rooks[i], this)) {
                possibleMoves.push({
                    x: this.coordinates.x,
                    y: this.coordinates.y > rooks[i].coordinates.y ? this.coordinates.y - 2 : this.coordinates.y + 2,
                });
            }
        }

        return possibleMoves;

        function pathClear(rook: Rook, king: King) {
            const direction = rook.coordinates.y < king.coordinates.y ? -1 : 1;
            let y = king.coordinates.y + direction;

            while (y !== rook.coordinates.y) {
                if (
                    chessBoard.board[king.coordinates.x][y].pieceOnSquare &&
                    king.isSafe({ x: king.coordinates.x, y: y })
                )
                    return false;
                y += direction;
            }

            return true;
        }

        function findRooks(king: King): Array<Rook> {
            const rooks = [];
            for (const row of chessBoard.board) {
                for (const square of row) {
                    const piece = square.pieceOnSquare;
                    if (piece && piece.side === king.side && piece.name === 'rook' && !piece.hasMoved)
                        rooks.push(piece);
                }
            }
            return rooks;
        }
    }

    hasAnyAvailableMove(): boolean {
        for (const row of chessBoard.board) {
            for (const square of row) {
                const piece = square.pieceOnSquare;
                if (piece && piece.side === this.side) {
                    const moves = piece.findLegalMoves();

                    if (moves.length > 0) return true;
                }
            }
        }
        return false;
    }

    castle(coordinates: Coordinates): void {
        const rookOrigin = { x: this.coordinates.x, y: this.coordinates.y - coordinates.y < 0 ? 7 : 0 };
        const rookDestination = { x: this.coordinates.x, y: rookOrigin.y === 0 ? 3 : 5 };
        const rook = chessBoard.board[this.coordinates.x][rookOrigin.y].pieceOnSquare;

        chessBoard.movePiece(rookOrigin, rookDestination, rook);
        rook.move(rookDestination);
        movePiece(rookOrigin, rookDestination, rook.display);
    }
}
