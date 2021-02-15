import { Coordinates } from '../../app/types';

export function removePiece(coordinates: Coordinates) {
    document.getElementById(JSON.stringify(coordinates)).innerHTML = '';
}
