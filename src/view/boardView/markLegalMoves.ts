import { Coordinates } from '../../app/types';
import { chessBoard } from '../../app/board/chessBoard';

export function markLegalMoves(coordinates: Array<Coordinates>, originCoords: Coordinates) {
    for (const coords of coordinates) {
        const squareElement = document.getElementById(JSON.stringify({ x: coords.x, y: coords.y }));
        squareElement.classList.add('possibleMove');
        squareElement.addEventListener('click', (event: MouseEvent) => {
            chessBoard.moveEvent(event, originCoords);
        });
    }
}
