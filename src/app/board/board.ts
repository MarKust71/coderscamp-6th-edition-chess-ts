import { Pawn } from '../pieces/pawn';
import { Piece } from '../pieces/piece';
import { Coordinates, Side } from '../types';
import { touched } from '../touched';

export class Square {
    coordinates: Coordinates;
    pieceOnSquare: Piece | undefined;

    constructor(x: number, y: number) {
        this.coordinates = { x: x, y: y };
    }
}
class Board {
    board: Array<Array<Square>>;

    constructor() {
        this.board = Board.pieceSetup(Board.boardSetup());
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
        board[6][0].pieceOnSquare = new Pawn({ x: 6, y: 0 }, Side.WHITE);
        board[6][1].pieceOnSquare = new Pawn({ x: 6, y: 1 }, Side.WHITE);

        return board;
    }

    markLegalMoves(coordinates: Array<Coordinates>, originCoords: Coordinates) {
        for (const coords of coordinates) {
            const squareElement = document.getElementById(`${coords.x},${coords.y}`);
            squareElement.classList.add('possibleMove');
            squareElement.addEventListener('click', (event: MouseEvent) => {
                this.intendedMove(event, originCoords);
            });
        }
    }

    unmarkLegalMoves() {
        for (const row of this.board) {
            for (const square of row) {
                const originalElement = document.getElementById(`${square.coordinates.x},${square.coordinates.y}`);
                originalElement.classList.remove('possibleMove');

                // Removing eventListener by cloning and replacing node
                const newElement = originalElement.cloneNode(true);
                originalElement.parentNode.replaceChild(newElement, originalElement);
                newElement.addEventListener('click', touched);
            }
        }
    }

    intendedMove(event: MouseEvent, originCoords: Coordinates) {
        const { id } = event.currentTarget as HTMLAreaElement;
        board.board[originCoords.x][originCoords.y].pieceOnSquare.move({
            x: parseInt(id[0]),
            y: parseInt(id[2]),
        });
        this.unmarkLegalMoves();
    }
}

export const board = new Board();
