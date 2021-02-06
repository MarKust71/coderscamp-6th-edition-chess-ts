import { Coordinates, Name, Side } from '../types';
import { chessBoard } from '../board/board';

import { Piece } from './piece';
import { Bishop } from './bishop';
import { Queen } from './queen';
import { Knight } from './knight';
import { Rook } from './rook';

interface PawnModel {
    name: string;
    display: string;
    findLegalMoves(): Array<Coordinates>;
    promote: () => void;
    enPassant: () => void;
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

    findLegalMoves(): Array<Coordinates> {
        const x = this.coordinates.x;
        const y = this.coordinates.y;
        const v = this.direction;
        let possibleMoves: Array<Coordinates> = [];
        if (x === (this.side === Side.WHITE ? 6 : 1)) {
            if (!chessBoard.board[x + v][y].pieceOnSquare && !chessBoard.board[x + v * 2][y].pieceOnSquare) {
                possibleMoves.push({ x: x + v * 2, y: y });
            }
        }
        possibleMoves.push({ x: x + v, y: y }, { x: x + v, y: y + 1 }, { x: x + v, y: y - 1 });
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
        // const sameSideKing = this.findKing(this.side);
        // const canMove = gameHistory.whoseTurn() === this.side;
        //
        // const checkKingIsSafe = (coords) => {
        //     if (!(canMove && sameSideKing.moveEndangerKing(this, coords[0], coords[2]))) {
        //         return true;
        //     }
        //     return false;
        // };
        //
        // if (!(enemy || ownInFront)) {
        //     if (this.x === (this.side === 'white' ? 6 : 1)) {
        //         if (enemyByTwo) {
        //             if (checkKingIsSafe(moveByOne)) possibleMoves.push(moveByOne);
        //         } else {
        //             if (checkKingIsSafe(moveByOne)) possibleMoves.push(moveByOne);
        //             if (checkKingIsSafe(moveByTwo)) possibleMoves.push(moveByTwo);
        //         }
        //     } else {
        //         if (this.x !== (this.side === 'white' ? 0 : 7)) {
        //             if (checkKingIsSafe(moveByOne)) possibleMoves.push(moveByOne);
        //         }
        //     }
        // }
        // if (toCaptureOnRight && this.side !== toCaptureOnRight.side) {
        //     if (checkKingIsSafe(moveCrossRight)) possibleMoves.push(moveCrossRight);
        // }
        // if (toCaptureOnLeft && this.side !== toCaptureOnLeft.side) {
        //     if (checkKingIsSafe(moveCrossLeft)) possibleMoves.push(moveCrossLeft);
        // }
    }

    promote(): void {
        const typePiece = [Name.QUEEN, Name.ROOK, Name.KNIGHT, Name.BISHOP];
        const x = this.coordinates.x;
        const y = this.coordinates.y;
        const side = this.side;
        const wrapper = document.getElementById('wrapper');
        const promotionWindow = document.createElement('div');
        const promoCover = document.createElement('div');
        function switchFigures(event: MouseEvent) {
            let newFigure;
            const { id } = event.currentTarget as HTMLAreaElement;
            // const { x, y } = JSON.parse(id);
            switch (id) {
                case Name.BISHOP:
                    newFigure = new Bishop({ x: x, y: y }, side);
                    break;
                case Name.QUEEN:
                    newFigure = new Queen({ x: x, y: y }, side);
                    break;
                case Name.KNIGHT:
                    newFigure = new Knight({ x: x, y: y }, side);
                    break;
                case Name.ROOK:
                    newFigure = new Rook({ x: x, y: y }, side);
                    break;
                default:
                    break;
            }
            chessBoard.board[x][y].pieceOnSquare = newFigure;
            document.querySelector(`[id='{ x: ${x}, y: ${y} }']`).innerHTML = newFigure.display;
            wrapper.removeChild(promotionWindow);
            wrapper.removeChild(promoCover);
        }
        if (x === (side === Side.WHITE ? 0 : 7)) {
            promotionWindow.className = 'promoChoice';
            wrapper.appendChild(promotionWindow);

            const text = document.createTextNode('Pick promoted figure:');
            const promoText = document.createElement('div');
            promoText.className = 'promoText';
            promoText.appendChild(text);
            promotionWindow.appendChild(promoText);

            const promotionWindowList = document.createElement('ul');
            promotionWindowList.className = 'promoChoiceList';
            promotionWindow.appendChild(promotionWindowList);

            promoCover.className = 'promoCover';
            wrapper.appendChild(promoCover);
            for (const piece of typePiece) {
                const promotionWindowListIcon = document.createElement('li');
                promotionWindowListIcon.className = 'promoChoiceItem';
                promotionWindowList.appendChild(promotionWindowListIcon);

                const promoteToNewPiece = document.createElement('i');
                promoteToNewPiece.className = `fas fa-chess-${piece} ${side}`;
                // promoteToNewPiece.id = `${piece}`;
                promotionWindowListIcon.appendChild(promoteToNewPiece);
                console.log(promoteToNewPiece);
                promoteToNewPiece.addEventListener('click', (event) => {
                    switchFigures(event);
                });
            }
        }
    }

    enPassant(): void {}
}
