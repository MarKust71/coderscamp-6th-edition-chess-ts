import { Square } from '../../app/square/square';

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
