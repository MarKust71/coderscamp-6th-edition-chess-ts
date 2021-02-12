import { Coordinates, Side } from '../types';

export type getMovesRelatedToPiecePositionParams = {
    origin: Coordinates;
    side: Side;
    moves: Coordinates[];
    checkKingIsSafe(expectedCoordinates: Coordinates): boolean;
};

export type CheckKingIsSafeParams = Coordinates;
