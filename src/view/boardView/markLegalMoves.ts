import { chessBoard } from '../../app/board/chessBoard';

import { MarkLegalMovesParams } from './types';

export function markLegalMoves({ coordinates, originCoords }: MarkLegalMovesParams) {
    for (const coords of coordinates) {
        const squareElement = document.getElementById(JSON.stringify({ x: coords.x, y: coords.y }));
        squareElement.classList.add('possibleMove');
        squareElement.addEventListener('click', (event: MouseEvent) => {
            chessBoard.moveEvent(event, originCoords);
        });
    }
}
