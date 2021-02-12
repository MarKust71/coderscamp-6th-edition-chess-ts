import { Square } from '../../app/square/square';

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
