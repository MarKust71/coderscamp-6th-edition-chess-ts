import { Coordinates } from '../app/types';
import { chessBoard } from '../app/board/chessBoard';
import { Square } from '../app/square/square';

export function movePiece(origin: Coordinates, destination: Coordinates, display: string) {
    document.getElementById(JSON.stringify(origin)).innerHTML = '';
    document.getElementById(JSON.stringify(destination)).innerHTML = display;
}

export function markLegalMoves(coordinates: Array<Coordinates>, originCoords: Coordinates) {
    for (const coords of coordinates) {
        const squareElement = document.getElementById(JSON.stringify({ x: coords.x, y: coords.y }));
        squareElement.classList.add('possibleMove');
        squareElement.addEventListener('click', (event: MouseEvent) => {
            chessBoard.moveEvent(event, originCoords);
        });
    }
}

export function unmarkLegalMoves(board: Array<Array<Square>>, touchedListener: (event: MouseEvent) => void) {
    for (const row of board) {
        for (const square of row) {
            const originalElement = document.getElementById(
                JSON.stringify({ x: square.coordinates.x, y: square.coordinates.y }),
            );
            originalElement.classList.remove('possibleMove');

            // Removing eventListener by cloning and replacing node
            const newElement = originalElement.cloneNode(true);
            originalElement.parentNode.replaceChild(newElement, originalElement);
            newElement.addEventListener('click', touchedListener);
        }
    }
}

export function paintPieces(board: Array<Array<Square>>): void {
    for (const row of board) {
        for (const square of row) {
            const squareElement = document.getElementById(
                JSON.stringify({ x: square.coordinates.x, y: square.coordinates.y }),
            );

            squareElement.innerHTML = board[square.coordinates.x][square.coordinates.y].pieceOnSquare
                ? board[square.coordinates.x][square.coordinates.y].pieceOnSquare.display
                : '';
        }
    }
}

export function paintBoard(touchedListener: (event: MouseEvent) => void) {
    for (let row = 0; row < chessBoard.board.length; row++) {
        for (let column = 0; column < chessBoard.board[row].length; column++) {
            const square = document.createElement('div');
            square.id = JSON.stringify({ x: row, y: column });
            square.className = 'square';
            square.className += row % 2 === column % 2 ? ' light' : ' dark';
            square.addEventListener('click', touchedListener);
            document.getElementById('board').appendChild(square);
        }
    }
}
