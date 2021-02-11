import { chessBoard } from '../board/board';
import { runTimer } from '../timers/runTimer';
import { Coordinates, Name, Side } from '../types';
import { GameHistory } from '../gameHistory/gameHistory';
import { movePiece } from '../../view/boardView';

import { King } from './king';

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
        this.hasMoved = true;
        movePiece(this.coordinates, coordinates, this.display);
        chessBoard.movePiece(this.coordinates, coordinates, this);
        this.coordinates = coordinates;

        const enemyKing = Piece.findKing(this.side === Side.WHITE ? Side.BLACK : Side.WHITE);
        const check = enemyKing.underCheck();
        const stall = !enemyKing.hasAnyAvailableMove();
        if (check || stall) GameHistory.gameStatus(check, stall);

        runTimer.setOpponentsTimer();
    }

    static findKing(side: Side): King {
        for (const row of chessBoard.board) {
            for (const square of row) {
                const piece = square.pieceOnSquare;
                if (piece && piece.side === side && piece instanceof King) {
                    return piece;
                }
            }
        }
    }
}
