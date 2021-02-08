import { Coordinates, Name, Side } from '../types';
import { chessBoard } from '../board/board';

import { Piece } from './piece';
import { Bishop } from './bishop';
import { Queen } from './queen';
import { Knight } from './knight';
import { Rook } from './rook';
import { GameHistory } from '../gameHistory/gameHistory';

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

    findLegalMoves = (): Coordinates[] => {
        const { x, y } = this.coordinates;
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
    };

    promote(): void {
        const { x, y } = this.coordinates;
        const { side } = this;
        const wrapper = document.getElementById('wrapper');
        const promotionWindow = document.createElement('div');
        const promoCover = document.createElement('div');
        promoCover.className = 'promoCover';

        function switchFigures(event: MouseEvent) {
            let newFigure;
            const { id } = event.currentTarget as HTMLAreaElement;
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
            document.querySelector(`[id='{"x":${x},"y":${y}}']`).innerHTML = newFigure.display;
            wrapper.removeChild(promotionWindow);
            wrapper.removeChild(promoCover);
            GameHistory.promotion(newFigure.name);
        }
        const promotionWindowView = () => {
            const typePiece = [Name.QUEEN, Name.ROOK, Name.KNIGHT, Name.BISHOP];
            const promotionWindowList = document.createElement('ul');
            promotionWindowList.className = 'promotionWindowList';
            for (const piece of typePiece) {
                const promotionWindowListIcon = document.createElement('li');
                promotionWindowListIcon.className = 'promotionWindowListIcon';
                promotionWindowList.appendChild(promotionWindowListIcon);

                const promoteToNewPiece = document.createElement('i');
                promoteToNewPiece.className = `fas fa-chess-${piece} ${side}`;
                promoteToNewPiece.id = `${piece}`;
                promotionWindowListIcon.appendChild(promoteToNewPiece);
                promoteToNewPiece.addEventListener('click', (event) => {
                    switchFigures(event);
                });
            }
            const text = document.createTextNode('Pick promoted figure:');
            const promoTitle = document.createElement('div');
            promoTitle.className = 'promoTitle';
            promoTitle.appendChild(text);
            promotionWindow.appendChild(promoTitle);
            promotionWindow.className = 'promotionWindow';
            promotionWindow.appendChild(promotionWindowList);
            return promotionWindow;
        };
        if (x === (side === Side.WHITE ? 0 : 7)) {
            wrapper.appendChild(promoCover);
            wrapper.appendChild(promotionWindowView());
        }
    }

    enPassant(): void {
        console.log(this);
    }
}
