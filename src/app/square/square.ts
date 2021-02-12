import { Coordinates } from '../types';
import { Piece } from '../pieces/piece';

export class Square {
    coordinates: Coordinates;
    pieceOnSquare: Piece | undefined;

    constructor(x: number, y: number) {
        this.coordinates = { x: x, y: y };
    }
}
