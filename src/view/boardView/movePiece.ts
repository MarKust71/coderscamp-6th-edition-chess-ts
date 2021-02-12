import { Coordinates } from '../../app/types';

export function movePiece(origin: Coordinates, destination: Coordinates, display: string) {
    document.getElementById(JSON.stringify(origin)).innerHTML = '';
    document.getElementById(JSON.stringify(destination)).innerHTML = display;
}
