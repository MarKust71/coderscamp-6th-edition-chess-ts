import { board } from './board/board';

import { Coordinates } from './types';

export const touched = (event: MouseEvent): void => {
    const { id } = event.currentTarget as HTMLAreaElement;
    const x: number = parseInt(id[0]);
    const y: number = parseInt(id[2]);
    if (!board[x][y]) {
        return;
    }
    const possibleMoves = board[x][y].findLegalMoves();
    for (const coordinates of possibleMoves) {
        const el = `${coordinates.x},${coordinates.y}`;
        document.getElementById(el).className += ` possibleMove`;
        document.getElementById(el).addEventListener('click', (event) => {
            const { id } = event.currentTarget as HTMLAreaElement;
            board[x][y].move({ x: parseInt(id[0]), y: parseInt(id[2]) });
            for (let x = 0; x < board.length; x++) {
                for (let y = 0; y < board[x].length; y++) {
                    document.getElementById(`${x},${y}`).className = document
                        .getElementById(`${x},${y}`)
                        .className.replace(`possibleMove`, '');

                    // TODO: rozwiązać tematykę event listenerów sprytniej, przenosząc każdy do osobnego pliku
                    const old_element = document.getElementById(`${x},${y}`);
                    const new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);

                    // document.getElementById(`${x},${y}`).removeEventListener('click');
                    document.getElementById(`${x},${y}`).addEventListener('click', (e) => {
                        touched(e);
                    });
                }
            }
        });
    }
};
