import { movePiece } from '../../view/boardView/movePiece';
import winnerDialogBox from '../../view/winnerDialogBoxView';
import { chessBoard } from '../board/chessBoard';
import { GameHistory } from '../gameHistory/gameHistory';
import { runTimer } from '../timers/runTimer';
import { Coordinates, Name, Side } from '../types';

interface PieceModel {
    coordinates: Coordinates;
    side: Side;
    name: Name;
    move: (coordinates: Coordinates) => void;
    findLegalMoves(): Coordinates[];
    checkKingIsSafe(expectedCoordinates: Coordinates): boolean;
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

    move(coordinates: Coordinates): void {
        this.hasMoved = true;
        movePiece(this.coordinates, coordinates, this.display);
        chessBoard.movePiece(this.coordinates, coordinates, this);

        const enemyKing = chessBoard.findKing(this.side === Side.WHITE ? Side.BLACK : Side.WHITE);
        const check = enemyKing.underCheck();
        const stall = !enemyKing.hasAnyAvailableMove();
        if (check || stall) GameHistory.gameStatus(check, stall);
        if (check && stall) winnerDialogBox();

        runTimer.setOpponentsTimer();
    }

    checkKingIsSafe = (expectedXY: Coordinates): boolean => {
        const sameSideKing = chessBoard.findKing(this.side);
        const canMove = GameHistory.whoseTurn() === this.side;
        return !(canMove && sameSideKing.moveEndangerKing(this, expectedXY));
    };
}
