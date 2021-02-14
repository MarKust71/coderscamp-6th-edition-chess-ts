import { Coordinates, Name, Side } from '../types';
import { chessBoard } from '../board/chessBoard';
import { createPromotionWindowView } from '../../view/pawnPromotion/createPromotionWindowView';
import { switchPieces } from '../../view/pawnPromotion/switchPieces';
import { showPromotionWindow } from '../../view/pawnPromotion/showPromotionWindow';

import { Piece } from './piece';

interface PawnModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    promote: () => void;
    // enPassant: () => void;
    move: (coordinates: Coordinates) => void;
}

export class Pawn extends Piece implements PawnModel {
    name: Name;
    display: string;
    direction: number;

    constructor(coordinates: Coordinates, side: Side) {
        super(coordinates, side);
        this.name = Name.PAWN;
        this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
        this.direction = this.side === Side.WHITE ? -1 : 1;
    }

    findLegalMoves = (): Coordinates[] => {
        const { x, y } = this.coordinates;
        const v = this.direction;

        const possibleMoves: Coordinates[] = [];

        if (x === (this.side === Side.WHITE ? 6 : 1)) {
            if (!chessBoard.board[x + v][y].pieceOnSquare && !chessBoard.board[x + v * 2][y].pieceOnSquare) {
                possibleMoves.push({ x: x + v * 2, y });
            }
        }

        const probablyMoves = [
            { x: x + v, y: y },
            { x: x + v, y: y + 1 },
            { x: x + v, y: y - 1 },
        ];

        probablyMoves.map((move) => {
            if (move.y === y && !chessBoard.board[move.x][move.y].pieceOnSquare) possibleMoves.push(move);
            if (chessBoard.board[move.x][move.y]) {
                const piece = chessBoard.board[move.x][move.y].pieceOnSquare;
                if (move.y !== y && piece && piece.side !== this.side) possibleMoves.push(move);
            }
        });

        return possibleMoves.filter((move) => this.checkKingIsSafe(move));
    };

    promote(): void {
        const { side } = this;
        const { x } = this.coordinates;

        if (x === (side === Side.WHITE ? 0 : 7)) {
            const promotionWindow = createPromotionWindowView(switchPieces, this.coordinates, side);
            showPromotionWindow(promotionWindow);
        }
    }

    // enPassant(): void {}
}
