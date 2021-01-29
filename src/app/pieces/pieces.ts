import { Coordinates, Side } from '../types';
export class Piece {
    coordinates: Coordinates;
    side: Side;
    hasMoved: boolean;

    constructor(side: Side, coordinates: Coordinates) {
        this.side = side;
        this.coordinates = coordinates;
        this.hasMoved = false;
    }

    findLegalMoves(): Array<Coordinates> {
        return [];
    }

    move(coordinates: Coordinates): void {
        console.log('Coordinates from move: ', coordinates);
    }
}
