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
        let possibleMoves: Array<Coordinates> = [];

        if (x === (this.side === Side.WHITE ? 6 : 1)) {
            if (!chessBoard.board[x + v][y].pieceOnSquare && !chessBoard.board[x + v * 2][y].pieceOnSquare) {
                if (this.checkKingIsSafe({ x: x + v * 2, y })) {
                    possibleMoves.push({ x: x + v * 2, y });
                }
            }
        }

        const probablyMoves = [
            { x: x + v, y: y },
            { x: x + v, y: y + 1 },
            { x: x + v, y: y - 1 },
        ];
        probablyMoves.map((move) => {
            // if (this.checkKingIsSafe(move.x, move.y)) {
            possibleMoves.push(move);
            // }
        });

        possibleMoves = possibleMoves.filter((move) => move.x >= 0 && move.x <= 7 && move.y >= 0 && move.y <= 7);
        possibleMoves = possibleMoves.filter((move) => {
            const piece = chessBoard.board[move.x][move.y].pieceOnSquare;
            if (piece) return this.side !== piece.side;
            return true;
        });
        possibleMoves = possibleMoves.filter((move) => {
            const piece = chessBoard.board[move.x][move.y].pieceOnSquare;
            if (piece) {
                if (move.y === y) return false;
                if (piece.coordinates.y !== y) return this.side !== piece.side;
                return true;
            }
            return move.y === y;
        });

        return possibleMoves;
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
