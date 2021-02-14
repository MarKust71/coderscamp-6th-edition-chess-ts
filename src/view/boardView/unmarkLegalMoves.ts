import { Board } from '../../app/types';

export function unmarkLegalMoves(board: Board) {
    for (const row of board) {
        for (const square of row) {
            const originalElement = document.getElementById(JSON.stringify(square.coordinates));
            originalElement.classList.remove('possibleMove');
        }
    }
}
