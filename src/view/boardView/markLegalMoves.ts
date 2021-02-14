import { Coordinates } from '../../app/types';

export function markLegalMoves(coordinates: Array<Coordinates>, origin: Coordinates) {
    for (const coords of coordinates) {
        const squareElement = document.getElementById(JSON.stringify({ x: coords.x, y: coords.y }));
        squareElement.classList.add('possibleMove');
        squareElement.setAttribute('origin', JSON.stringify(origin));
    }
}
